#!/usr/bin/env python3
import json
import re
from pathlib import Path
import xml.etree.ElementTree as ET
from zipfile import ZipFile

root = Path(__file__).resolve().parents[1]
images = root / 'public' / 'images' / 'toothpaste'
downloads = root / 'public' / 'downloads' / 'toothpaste'
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

print({
    'svg_count': len(svgs),
    'all_xml_valid': True,
    'png_count': len(list(images.glob('*.png'))),
    'voice_records': len(voice['records']),
    'privacy_reduced': True,
})
