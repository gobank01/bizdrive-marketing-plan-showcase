#!/usr/bin/env python3
import json
import hashlib
import re
import stat
import sys
import unicodedata
from pathlib import Path, PurePosixPath
import xml.etree.ElementTree as ET
from zipfile import ZipFile

SKILL_ARCHIVE_PREFIX = 'bizdrive-strategic-marketing-plan/'


def canonical_archive_member_key(name: str) -> str:
    if not name or name.startswith(('/', '\\')) or '\\' in name or re.match(r'^[A-Za-z]:', name):
        raise ValueError(f'unsafe archive member path: {name!r}')
    if any(ord(char) < 32 or ord(char) == 127 for char in name):
        raise ValueError(f'archive member contains a control character: {name!r}')
    components = name.split('/')
    if any(component in {'', '.', '..'} for component in components):
        raise ValueError(f'archive member is not canonical POSIX: {name!r}')
    if PurePosixPath(name).as_posix() != name or not name.startswith(SKILL_ARCHIVE_PREFIX):
        raise ValueError(f'archive member is not canonical POSIX: {name!r}')
    return unicodedata.normalize('NFC', name).casefold()


if len(sys.argv) == 3 and sys.argv[1] == '--check-member-name':
    try:
        print(canonical_archive_member_key(sys.argv[2]))
    except ValueError as exc:
        print(exc, file=sys.stderr)
        raise SystemExit(2) from exc
    raise SystemExit(0)

root = Path(__file__).resolve().parents[1]
images = root / 'public' / 'images' / 'toothpaste'
downloads = root / 'public' / 'downloads' / 'toothpaste'
skill_downloads = root / 'public' / 'downloads' / 'skill'
content = root / 'content' / 'toothpaste'

svgs = sorted(images.glob('*.svg'))
for svg in svgs:
    try:
        ET.parse(svg)
    except ET.ParseError as error:
        raise SystemExit(f'{svg.name}: {error}') from error

voice_path = content / 'data' / 'customer_voice.json'
voice_download_path = downloads / 'customer_voice.json'
voice = json.loads(voice_path.read_text(encoding='utf-8'))
if voice != json.loads(voice_download_path.read_text(encoding='utf-8')):
    raise SystemExit('customer_voice.json content and download differ')
if len(voice.get('records', [])) != 100:
    raise SystemExit('sanitized Customer Voice must contain exactly 100 records')
note = voice.get('privacy_note', '').lower()
for required in ('privacy-reduced/pseudonymized', 'not fully anonymous', 'private source'):
    if required not in note:
        raise SystemExit(f'Customer Voice privacy note is missing: {required}')
for index, record in enumerate(voice['records'], start=1):
    if 'quote' in record:
        raise SystemExit(f'Customer Voice record {index} exposes a quote')
    if re.search(r'#review-|[?&]lc=', record.get('source_url', ''), re.IGNORECASE):
        raise SystemExit(f'Customer Voice record {index} exposes a record-level URL identifier')

unsafe_excerpts = (
    'Gosh they were expensive',
    'Пенится еле-еле',
    'it did make my teeth a little sensitive',
    'show the box with the ingredients',
    'Does the flavor change it',
    'the tube is in Thai',
)
public_text_files = [
    *sorted((content / 'data').glob('*.json')),
    *sorted((content / 'markdown').glob('*.md')),
    *sorted(downloads.glob('*.json')),
    *sorted(downloads.glob('*.md')),
    *sorted(downloads.glob('*.csv')),
    *sorted(downloads.glob('*.svg')),
]
for public_file in public_text_files:
    text = public_file.read_text(encoding='utf-8-sig')
    if re.search(r'#review-|[?&]lc=', text, re.IGNORECASE):
        raise SystemExit(f'{public_file.relative_to(root)} exposes a record-level URL identifier')
    for excerpt in unsafe_excerpts:
        if excerpt in text:
            raise SystemExit(f'{public_file.relative_to(root)} exposes a verbatim Customer Voice excerpt')

with ZipFile(downloads / 'full-plan.docx') as archive:
    docx_xml = archive.read('word/document.xml').decode('utf-8')
for excerpt in unsafe_excerpts:
    if excerpt in docx_xml:
        raise SystemExit('full-plan.docx exposes a verbatim Customer Voice excerpt')

skill_filename = 'bizdrive-strategic-marketing-plan-v0.9.0.zip'
skill_zip = skill_downloads / skill_filename
skill_sidecar = skill_downloads / f'{skill_filename}.sha256'
expected_skill_sha256 = '2f36245d86ec459f541c64afe37a11ebc8578fc9d52ccbac8b0589843df7683c'
actual_skill_sha256 = hashlib.sha256(skill_zip.read_bytes()).hexdigest()
sidecar_tokens = skill_sidecar.read_text(encoding='utf-8').split()
if len(sidecar_tokens) != 2 or sidecar_tokens[1] != skill_filename:
    raise SystemExit('student skill checksum sidecar filename is invalid')
sidecar_skill_sha256 = sidecar_tokens[0]
if actual_skill_sha256 != expected_skill_sha256 or sidecar_skill_sha256 != expected_skill_sha256:
    raise SystemExit('student skill ZIP checksum does not match the independently reviewed release')
with ZipFile(skill_zip) as archive:
    names = archive.namelist()
    if len(names) != 58:
        raise SystemExit(f'student skill ZIP must contain 58 members, found {len(names)}')
    if len(names) != len(set(names)):
        raise SystemExit('student skill ZIP contains duplicate members')
    if archive.testzip() is not None:
        raise SystemExit('student skill ZIP failed CRC validation')
    manifest = 'bizdrive-strategic-marketing-plan/MANIFEST-SHA256.txt'
    if names.count(manifest) != 1:
        raise SystemExit('student skill ZIP must contain exactly one manifest')
    prefix = SKILL_ARCHIVE_PREFIX
    normalized_names = set()
    if archive.comment:
        raise SystemExit('student skill ZIP archive comment is not allowed')
    for info in archive.infolist():
        name = info.filename
        try:
            normalized = canonical_archive_member_key(name)
        except ValueError as exc:
            raise SystemExit(f'student skill ZIP contains unsafe member: {name!r}') from exc
        if normalized in normalized_names:
            raise SystemExit(f'student skill ZIP contains a normalized-name collision: {name!r}')
        normalized_names.add(normalized)
        parts = PurePosixPath(name).parts
        if (
            info.is_dir()
            or not stat.S_ISREG(info.external_attr >> 16)
            or info.flag_bits & 0x1
            or info.comment
            or info.extra
            or any(part.startswith('.') for part in parts)
        ):
            raise SystemExit(f'student skill ZIP contains unsafe member: {name}')
        if any(part.lower() in {'research_private', 'private', 'raw', 'raw_data'} for part in parts):
            raise SystemExit(f'student skill ZIP contains a private/raw directory: {name}')
    manifest_lines = archive.read(manifest).decode('utf-8').splitlines()
    if len(manifest_lines) != 57:
        raise SystemExit(f'student skill manifest must contain 57 entries, found {len(manifest_lines)}')
    manifest_members = set()
    for line in manifest_lines:
        match = re.fullmatch(r'([0-9a-f]{64})  ([^\r\n]+)', line)
        if not match:
            raise SystemExit(f'invalid student skill manifest line: {line!r}')
        expected_hash, relative = match.groups()
        member = prefix + relative
        if member in manifest_members:
            raise SystemExit(f'duplicate student skill manifest entry: {relative}')
        manifest_members.add(member)
        if member not in names:
            raise SystemExit(f'student skill manifest references missing member: {relative}')
        if hashlib.sha256(archive.read(member)).hexdigest() != expected_hash:
            raise SystemExit(f'student skill manifest hash mismatch: {relative}')
    if manifest_members != set(names) - {manifest}:
        raise SystemExit('student skill manifest does not cover the exact ZIP payload')

print({
    'svg_count': len(svgs),
    'all_xml_valid': True,
    'png_count': len(list(images.glob('*.png'))),
    'voice_records': len(voice['records']),
    'privacy_reduced': True,
    'student_skill_sha256': actual_skill_sha256,
    'student_skill_members': len(names),
})
