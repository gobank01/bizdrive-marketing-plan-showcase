#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
import os
import shutil
from html import escape
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]

parser = argparse.ArgumentParser(description='Generate the public toothpaste plan assets.')
parser.add_argument(
    '--source',
    type=Path,
    default=os.environ.get('BIZDRIVE_PLAN_SOURCE'),
    help='Private source delivery directory (or set BIZDRIVE_PLAN_SOURCE).',
)
args = parser.parse_args()
if args.source is None:
    parser.error('--source is required when BIZDRIVE_PLAN_SOURCE is not set')
SOURCE = args.source.expanduser().resolve()
if not SOURCE.is_dir():
    parser.error(f'source directory does not exist: {SOURCE}')

CONTENT = ROOT / 'content' / 'toothpaste'
PUBLIC_IMAGES = ROOT / 'public' / 'images' / 'toothpaste'
DOWNLOADS = ROOT / 'public' / 'downloads' / 'toothpaste'
PRIVACY_NOTE = (
    'Public Customer Voice records are privacy-reduced/pseudonymized, not fully anonymous. '
    'Verbatim quotes and comment/review-level identifiers remain only in the private source.'
)
VOICE_TEXT_REPLACEMENTS = {
    '### Voice examples (exact excerpts; not efficacy evidence)':
        '### Voice examples (privacy-reduced themes; not efficacy evidence)',
    '- Marvis: “Gosh they were expensive…” → price/value objection':
        '- Marvis: price/value objection',
    '- CURAPROX: “Пенится еле-еле… Вкус слабо выраженный” (foams very little; mild taste) → foam/taste preference':
        '- CURAPROX: low-foam and mild-taste preference',
    '- Oral-B/Crest: “it did make my teeth a little sensitive” → mixed outcome/comfort concern':
        '- Oral-B/Crest: mixed outcome and comfort concern',
    'Exact source URLs and full short excerpts remain record-level in `customer_voice.json`; no username is stored and no composite quote is created':
        f'{PRIVACY_NOTE} The public dataset retains coded analytical fields and generalized source URLs.',
    '## 4.3 Language customers actually use\n\nExact excerpts (not composite, not efficacy evidence):\n- “Gosh they were expensive.” — price/value\n- “show the box with the ingredients” — proof/ingredient transparency\n- “foams very little… mild taste” (translated sense from Russian excerpt; original stored) — texture/taste\n- “did make my teeth a little sensitive” — mixed benefit/comfort tension\n- “Does the flavor change it…?” — flavor/variant confusion\n- “the tube is in Thai” — packaging/local-access signal\n\nDo not convert these into testimonial copy. Use them to write research questions, FAQ and concept language; source-level exact text remains in `customer_voice.json`':
        '## 4.3 Privacy-reduced customer language themes\n\n- Price/value objection\n- Proof and ingredient-transparency need\n- Foam, texture and mild-taste preference\n- Mixed benefit and comfort tension\n- Flavor and variant confusion\n- Packaging and local-access signal\n\nDo not convert these themes into testimonial copy. Use them to write research questions, FAQ and concept language. ' + PRIVACY_NOTE,
}
DOCX_TEXT_REPLACEMENTS = {
    'Gosh they were expensive…': 'price/value objection (verbatim excerpt removed from public version)',
    'Gosh they were expensive.': 'price/value objection (verbatim excerpt removed from public version)',
    'Пенится еле-еле… Вкус слабо выраженный': 'low-foam and mild-taste preference (verbatim excerpt removed from public version)',
    'foams very little… mild taste': 'low-foam and mild-taste preference (verbatim excerpt removed from public version)',
    'it did make my teeth a little sensitive': 'mixed outcome and comfort concern (verbatim excerpt removed from public version)',
    'did make my teeth a little sensitive': 'mixed outcome and comfort concern (verbatim excerpt removed from public version)',
    'show the box with the ingredients': 'proof and ingredient-transparency need (verbatim excerpt removed from public version)',
    'Does the flavor change it…?': 'flavor and variant confusion (verbatim excerpt removed from public version)',
    'the tube is in Thai': 'packaging and local-access signal (verbatim excerpt removed from public version)',
}


def generalize_url(value: str) -> str:
    parts = urlsplit(value)
    fragment = '' if parts.fragment.lower().startswith('review-') else parts.fragment
    query = parse_qsl(parts.query, keep_blank_values=True)
    if parts.netloc.lower() in {'youtube.com', 'www.youtube.com', 'm.youtube.com'}:
        query = [(key, item) for key, item in query if key.lower() != 'lc']
    return urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(query, doseq=True), fragment))


def sanitize_urls(value):
    if isinstance(value, list):
        return [sanitize_urls(item) for item in value]
    if isinstance(value, dict):
        return {
            key: generalize_url(item) if key in {'url', 'source_url', 'price_source_url'} and isinstance(item, str)
            else sanitize_urls(item)
            for key, item in value.items()
        }
    return value


def sanitize_customer_voice(records: list[dict]) -> dict:
    public_records = []
    for source_record in records:
        record = {key: value for key, value in source_record.items() if key != 'quote'}
        record['source_url'] = generalize_url(record['source_url'])
        public_records.append(record)
    return {'privacy_note': PRIVACY_NOTE, 'records': public_records}


def sanitize_markdown(text: str) -> str:
    for unsafe, replacement in VOICE_TEXT_REPLACEMENTS.items():
        text = text.replace(unsafe, replacement)
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    return '\n'.join(line.rstrip() for line in text.split('\n')).rstrip() + '\n'


def write_sanitized_docx(source: Path, destination: Path) -> None:
    temporary = destination.with_suffix('.tmp')
    with ZipFile(source) as input_archive, ZipFile(temporary, 'w', compression=ZIP_DEFLATED) as output_archive:
        for info in input_archive.infolist():
            data = input_archive.read(info.filename)
            if info.filename == 'word/document.xml':
                text = data.decode('utf-8')
                for unsafe, replacement in DOCX_TEXT_REPLACEMENTS.items():
                    text = text.replace(unsafe, replacement)
                data = text.encode('utf-8')
            output_archive.writestr(info, data)
    temporary.replace(destination)


for path in (CONTENT / 'markdown', CONTENT / 'data', PUBLIC_IMAGES, DOWNLOADS):
    path.mkdir(parents=True, exist_ok=True)

for src in sorted((SOURCE / 'markdown').glob('*.md')):
    public_text = sanitize_markdown(src.read_text(encoding='utf-8'))
    (CONTENT / 'markdown' / src.name).write_text(public_text, encoding='utf-8')
    (DOWNLOADS / src.name).write_text(public_text, encoding='utf-8')

raw_voice = json.loads((SOURCE / 'data' / 'customer_voice.json').read_text(encoding='utf-8'))
public_voice = sanitize_customer_voice(raw_voice)
voice_json = json.dumps(public_voice, ensure_ascii=False, indent=2) + '\n'
(CONTENT / 'data' / 'customer_voice.json').write_text(voice_json, encoding='utf-8')
(DOWNLOADS / 'customer_voice.json').write_text(voice_json, encoding='utf-8')

for name in ('evidence_ledger.json', 'voice_analysis.json', 'budget_allocation.json'):
    data = json.loads((SOURCE / 'data' / name).read_text(encoding='utf-8'))
    public_json = json.dumps(sanitize_urls(data), ensure_ascii=False, indent=2) + '\n'
    (CONTENT / 'data' / name).write_text(public_json, encoding='utf-8')
    (DOWNLOADS / name).write_text(public_json, encoding='utf-8')

for name in ('competitor_matrix.csv', 'positioning_map.csv'):
    src = SOURCE / 'data' / name
    with src.open(encoding='utf-8-sig', newline='') as handle:
        reader = csv.DictReader(handle)
        fieldnames = reader.fieldnames or []
        rows = sanitize_urls(list(reader))
    with (DOWNLOADS / name).open('w', encoding='utf-8', newline='') as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, lineterminator='\n')
        writer.writeheader()
        writer.writerows(rows)
    out_name = 'competitors.json' if name == 'competitor_matrix.csv' else 'positioning.json'
    (CONTENT / 'data' / out_name).write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

shutil.copy2(SOURCE / 'maps' / 'positioning_maps.png', PUBLIC_IMAGES / 'positioning-maps.png')
shutil.copy2(SOURCE / 'maps' / 'positioning_maps.svg', DOWNLOADS / 'positioning-maps.svg')
write_sanitized_docx(
    SOURCE / 'Premium-Toothpaste-Marketing-Plan-Thailand-Trial.docx',
    DOWNLOADS / 'full-plan.docx',
)

INK = '#25211d'
MUTED = '#756e66'
PAPER = '#f7f3eb'
WHITE = '#fffdf8'
TEAL = '#137f73'
TEAL2 = '#9ed8cb'
CORAL = '#df6b4f'
YELLOW = '#efc861'
BLUE = '#5888be'
PURPLE = '#8f6cb6'
GREEN = '#69a66f'


def frame(title: str, subtitle: str, body: str, bg: str = PAPER) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img">
<title>{escape(title)}</title><desc>{escape(subtitle)}</desc>
<rect width="1200" height="800" fill="{bg}"/>
<text x="70" y="78" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2" fill="{TEAL}">BIZDRIVE • PREMIUM TOOTHPASTE</text>
<text x="70" y="130" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="{INK}">{escape(title)}</text>
<text x="70" y="165" font-family="Arial, sans-serif" font-size="20" fill="{MUTED}">{escape(subtitle)}</text>
{body}
</svg>'''


def save(name: str, title: str, subtitle: str, body: str, bg: str = PAPER) -> None:
    (PUBLIC_IMAGES / name).write_text(frame(title, subtitle, body, bg), encoding='utf-8')

# 1 Hero ritual
save('hero-ritual.svg', 'Premium that earns the ritual', 'Daily sensorial experience × inspectable proof', f'''
<circle cx="910" cy="390" r="250" fill="{TEAL2}" opacity=".45"/>
<path d="M130 520 C260 390 395 360 520 465 S780 650 1030 500" fill="none" stroke="{CORAL}" stroke-width="8" stroke-linecap="round"/>
<g transform="translate(420 250) rotate(-12)"><rect x="0" y="0" width="180" height="360" rx="36" fill="{WHITE}" stroke="{INK}" stroke-width="5"/><rect x="32" y="50" width="116" height="72" rx="12" fill="{TEAL}"/><text x="90" y="82" text-anchor="middle" font-family="Arial" font-size="18" font-weight="700" fill="white">350 THB</text><text x="90" y="105" text-anchor="middle" font-family="Arial" font-size="13" fill="white">TRIAL CONCEPT</text><path d="M52 165 Q90 130 128 165 Q90 205 52 165" fill="none" stroke="{CORAL}" stroke-width="8"/><rect x="55" y="330" width="70" height="55" rx="10" fill="{INK}"/></g>
<g transform="translate(700 310) rotate(18)"><rect x="0" y="0" width="34" height="330" rx="17" fill="{INK}"/><rect x="-8" y="-35" width="50" height="95" rx="20" fill="{YELLOW}"/><path d="M-2 -18h38M-2 0h38M-2 18h38" stroke="{INK}" stroke-width="4"/></g>
<g font-family="Arial" font-weight="700"><circle cx="900" cy="275" r="58" fill="{WHITE}" stroke="{TEAL}" stroke-width="4"/><text x="900" y="268" text-anchor="middle" font-size="15" fill="{MUTED}">PROOF</text><text x="900" y="292" text-anchor="middle" font-size="22" fill="{TEAL}">VISIBLE</text><circle cx="965" cy="500" r="58" fill="{WHITE}" stroke="{CORAL}" stroke-width="4"/><text x="965" y="493" text-anchor="middle" font-size="15" fill="{MUTED}">RITUAL</text><text x="965" y="517" text-anchor="middle" font-size="22" fill="{CORAL}">DAILY</text></g>
<text x="70" y="710" font-family="Arial" font-size="28" font-weight="700" fill="{INK}">Winning Zone</text><text x="70" y="750" font-family="Arial" font-size="23" fill="{MUTED}">Premium daily ritual × proof transparency</text>''')

# 2 Market landscape
save('market-landscape.svg', 'Category landscape', 'Directional total toothpaste context — not audited premium TAM', f'''
<g transform="translate(90 245)"><rect width="460" height="330" rx="28" fill="{WHITE}" stroke="#d8d1c8"/><text x="42" y="72" font-family="Arial" font-size="78" font-weight="700" fill="{INK}">10.2–12B</text><text x="44" y="112" font-family="Arial" font-size="24" fill="{MUTED}">THB total toothpaste context</text><path d="M45 245 C125 205 190 230 255 170 S380 115 420 75" fill="none" stroke="{TEAL}" stroke-width="10" stroke-linecap="round"/><circle cx="420" cy="75" r="12" fill="{CORAL}"/><text x="44" y="295" font-family="Arial" font-size="18" fill="{CORAL}">Trade-press range • methodology undisclosed</text></g>
<g transform="translate(640 235)" font-family="Arial"><text x="0" y="20" font-size="20" font-weight="700" fill="{INK}">PRICE / PROPOSITION LADDER</text>{''.join(f'<rect x="0" y="{70+i*76}" width="{380-i*48}" height="48" rx="10" fill="{c}"/><text x="18" y="{101+i*76}" font-size="17" font-weight="700" fill="white">{escape(label)}</text>' for i,(label,c) in enumerate([('Mass & herbal anchors',GREEN),('Mass-premium whitening',BLUE),('Thai premium ritual',TEAL),('Imported specialty',PURPLE)]))}</g>
<text x="70" y="700" font-family="Arial" font-size="24" font-weight="700" fill="{INK}">Opportunity ≠ empty price point</text><text x="70" y="738" font-family="Arial" font-size="20" fill="{MUTED}">Winning requires desirability, proof, economics, compliance and route-to-market.</text>''')

# 3 Competitor orbit
brands = ["DENTISTE'", 'MARVIS', 'APAGARD', 'CURAPROX', 'VUSSEN', 'SENSODYNE', 'COLGATE', 'ORAL-B', 'SPARKLE', 'TWIN LOTUS']
coords = [(600,255),(765,305),(855,440),(820,585),(685,655),(515,655),(380,585),(345,440),(435,305),(600,335)]
nodes = ''.join(f'<circle cx="{x}" cy="{y}" r="64" fill="{[TEAL,CORAL,YELLOW,BLUE,PURPLE,GREEN,TEAL2,CORAL,YELLOW,BLUE][i]}" opacity=".96"/><text x="{x}" y="{y+5}" text-anchor="middle" font-family="Arial" font-size="{14 if len(b)>8 else 16}" font-weight="700" fill="{INK if i in (2,6,8) else WHITE}">{b}</text>' for i,(b,(x,y)) in enumerate(zip(brands,coords)))
save('competitor-orbit.svg', 'Ten-brand competitive orbit', 'The same fixed set is used across price, claims, Voice and maps', f'''<circle cx="600" cy="455" r="250" fill="none" stroke="#d8d1c8" stroke-width="3" stroke-dasharray="10 12"/>{nodes}<circle cx="600" cy="455" r="95" fill="{INK}"/><text x="600" y="445" text-anchor="middle" font-family="Arial" font-size="18" fill="{TEAL2}">TRIAL TARGET</text><text x="600" y="477" text-anchor="middle" font-family="Arial" font-size="25" font-weight="700" fill="white">RITUAL × PROOF</text><text x="70" y="735" font-family="Arial" font-size="18" fill="{MUTED}">Analytical set — not market-share ranking.</text>''')

# 4 Price ladder
prices = [("Twin Lotus",180),("Oral-B",135),("Sparkle",145),("Sensodyne",149),("Colgate",189),("DENTISTE'",231),("VUSSEN",360),("CURAPROX",395),("Marvis",435),("APAGARD",612)]
prices.sort(key=lambda x:x[1])
bars=''.join(f'<text x="70" y="{235+i*48}" font-family="Arial" font-size="15" fill="{INK}">{escape(n)}</text><rect x="230" y="{218+i*48}" width="{int(v/612*740)}" height="25" rx="7" fill="{TEAL if v<350 else CORAL}"/><text x="{245+int(v/612*740)}" y="{237+i*48}" font-family="Arial" font-size="14" font-weight="700" fill="{INK}">{v}</text>' for i,(n,v) in enumerate(prices))
save('price-ladder.svg', 'Observed price ladder', 'THB per representative pack • dated snapshot 2026-08-28', bars + f'<line x1="652" y1="195" x2="652" y2="700" stroke="{YELLOW}" stroke-width="5" stroke-dasharray="8 8"/><text x="664" y="690" font-family="Arial" font-size="17" font-weight="700" fill="{INK}">Trial price 350 THB</text>')

# 5 Voice
voice = [('Trust / proof',74),('Whitening',63),('Price / value',46),('Adverse experience',33),('Sensitivity',27),('Packaging',21),('Taste',18)]
voicebars=''.join(f'<text x="80" y="{238+i*67}" font-family="Arial" font-size="19" fill="{INK}">{label}</text><rect x="320" y="{216+i*67}" width="650" height="34" rx="17" fill="#ded8cf"/><rect x="320" y="{216+i*67}" width="{pct*6.5}" height="34" rx="17" fill="{TEAL if i<3 else CORAL}"/><text x="995" y="{240+i*67}" font-family="Arial" font-size="22" font-weight="700" fill="{INK}">{pct}%</text>' for i,(label,pct) in enumerate(voice))
save('customer-voice.svg', 'Customer Voice — 100 records', 'Directional convenience sample • multi-label themes', voicebars + f'<text x="80" y="735" font-family="Arial" font-size="18" fill="{MUTED}">66/100 records are Colgate Optic White; percentages are not population rates.</text>')

# 6-8 Personas
persona_specs=[
('persona-ritual.svg','Ritual & Proof Upgrader','Primary test focus • 60%',TEAL,'MORNING','experience → inspect → repeat'),
('persona-appearance.svg','Appearance Seeker, Evidence First','Secondary test focus • 30%',CORAL,'CAMERA','expectation → proof → confidence'),
('persona-comfort.svg','Ingredient & Comfort Controller','Tertiary test focus • 10%',BLUE,'CONTROL','formula → feel → trust')]
for filename,title,subtitle,color,badge,flow in persona_specs:
    save(filename,title,subtitle,f'''<g transform="translate(120 245)"><circle cx="190" cy="185" r="150" fill="{color}" opacity=".18"/><circle cx="190" cy="125" r="66" fill="{color}"/><path d="M78 350 Q190 205 302 350" fill="{color}"/><circle cx="520" cy="160" r="90" fill="{WHITE}" stroke="{color}" stroke-width="5"/><text x="520" y="153" text-anchor="middle" font-family="Arial" font-size="16" fill="{MUTED}">{badge}</text><text x="520" y="185" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="{color}">NEED STATE</text><path d="M330 185 H415" stroke="{INK}" stroke-width="5" marker-end="url(#a)"/><defs><marker id="a" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0 0 L0 6 L8 3 z" fill="{INK}"/></marker></defs><rect x="650" y="95" width="320" height="180" rx="24" fill="{INK}"/><text x="810" y="160" text-anchor="middle" font-family="Arial" font-size="18" fill="{TEAL2}">DECISION FLOW</text><text x="810" y="205" text-anchor="middle" font-family="Arial" font-size="21" font-weight="700" fill="white">{flow}</text></g><text x="70" y="700" font-family="Arial" font-size="20" fill="{MUTED}">Persona is a research hypothesis, not measured market share.</text>''')

# 9 Winning zone
save('winning-zone.svg','Winning Zone','Intersection, not empty whitespace',f'''<g transform="translate(160 230)" font-family="Arial"><circle cx="280" cy="190" r="170" fill="{TEAL}" opacity=".55"/><circle cx="500" cy="190" r="170" fill="{CORAL}" opacity=".5"/><circle cx="390" cy="365" r="170" fill="{YELLOW}" opacity=".55"/><text x="210" y="100" font-size="20" font-weight="700" fill="{INK}">CUSTOMER NEED</text><text x="500" y="100" font-size="20" font-weight="700" fill="{INK}">WHITESPACE</text><text x="390" y="500" text-anchor="middle" font-size="20" font-weight="700" fill="{INK}">RIGHT-TO-WIN + ECONOMICS + COMPLIANCE</text><circle cx="390" cy="250" r="82" fill="{INK}"/><text x="390" y="238" text-anchor="middle" font-size="16" fill="{TEAL2}">PRIMARY</text><text x="390" y="270" text-anchor="middle" font-size="22" font-weight="700" fill="white">RITUAL × PROOF</text></g>''')

# 10 Channels
channels=['META','TIKTOK','GOOGLE / YT','LINE','MARKETPLACE','CREATOR','RETAIL','CLINIC','PR','EVENT']
cc=[(250,250),(450,225),(650,230),(850,270),(980,410),(870,570),(665,610),(455,600),(250,560),(170,410)]
channel_nodes=''.join(f'<circle cx="{x}" cy="{y}" r="62" fill="{[TEAL,CORAL,YELLOW,BLUE,PURPLE,GREEN,TEAL2,CORAL,YELLOW,BLUE][i]}"/><text x="{x}" y="{y+5}" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700" fill="{INK}">{c}</text><line x1="600" y1="420" x2="{x}" y2="{y}" stroke="#c9c1b7" stroke-width="3"/>' for i,(c,(x,y)) in enumerate(zip(channels,cc)))
save('channel-system.svg','All-channel learning system','Every channel has a role, owner and measurement path',channel_nodes+f'<circle cx="600" cy="420" r="108" fill="{INK}"/><text x="600" y="407" text-anchor="middle" font-family="Arial" font-size="16" fill="{TEAL2}">ONE SOURCE OF TRUTH</text><text x="600" y="442" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="white">ORDER + CRM</text>')

# 11 Budget
alloc=[('Online',1800000,TEAL),('Creator / KOL',690000,CORAL),('Offline / O2O',360000,YELLOW),('Reserve',150000,BLUE)]
x=85
blocks=[]
for label,value,color in alloc:
    w=value/3000000*1010
    blocks.append(f'<rect x="{x}" y="280" width="{w}" height="170" fill="{color}"/><text x="{x+18}" y="325" font-family="Arial" font-size="19" font-weight="700" fill="{INK}">{label}</text><text x="{x+18}" y="365" font-family="Arial" font-size="26" font-weight="700" fill="{INK}">{value:,}</text><text x="{x+18}" y="398" font-family="Arial" font-size="17" fill="{INK}">{value/3000000:.0%}</text>')
    x+=w
save('budget-allocation.svg','3,000,000 THB allocation','Three-month envelope • exact arithmetic', ''.join(blocks)+f'<text x="85" y="525" font-family="Arial" font-size="20" fill="{MUTED}">Base planning illustration: revenue / total-plan spend = 0.581×</text><text x="85" y="565" font-family="Arial" font-size="22" font-weight="700" fill="{CORAL}">Proof-first pilot — not forced month-end spending</text>')

# 12 Timeline
timeline=''.join(f'<circle cx="{105+i*88}" cy="410" r="{18 if i not in (3,7,11) else 28}" fill="{TEAL if i<4 else CORAL if i<8 else BLUE}"/><text x="{105+i*88}" y="465" text-anchor="middle" font-family="Arial" font-size="13" fill="{INK}">W{i+1}</text>' for i in range(12))
save('timeline-90-days.svg','12-week execution track','Truth → proposition pilot → economics and repeat',f'<line x1="105" y1="410" x2="1073" y2="410" stroke="#c9c1b7" stroke-width="8"/>{timeline}<text x="105" y="300" font-family="Arial" font-size="24" font-weight="700" fill="{TEAL}">1–4 • TRUTH &amp; CONTROL</text><text x="430" y="345" font-family="Arial" font-size="24" font-weight="700" fill="{CORAL}">5–8 • PROPOSITION</text><text x="770" y="300" font-family="Arial" font-size="24" font-weight="700" fill="{BLUE}">9–12 • ECONOMICS / REPEAT</text><text x="105" y="560" font-family="Arial" font-size="18" fill="{MUTED}">Owner decision gates at readiness, mid-trial and end-trial.</text>')

# 13 Evidence gate
steps=[('CLAIM',TEAL),('PRODUCT\nEVIDENCE',YELLOW),('THAI\nREVIEW',CORAL),('OWNER\nAPPROVAL',BLUE),('PUBLISH',GREEN)]
gates=[]
for i,(label,color) in enumerate(steps):
    x=80+i*220
    label_lines = label.split('\n')
    y = 360 if len(label_lines) > 1 else 383
    tspans = ''.join(
        f'<tspan x="{x+82}" dy="{0 if j == 0 else 26}">{line}</tspan>'
        for j, line in enumerate(label_lines)
    )
    gates.append(f'<rect x="{x}" y="300" width="165" height="150" rx="22" fill="{color}"/><text x="{x+82}" y="{y}" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="{INK}">{tspans}</text>')
    if i<4: gates.append(f'<path d="M{x+170} 375 H{x+210}" stroke="{INK}" stroke-width="5"/><path d="M{x+202} 365 L{x+216} 375 L{x+202} 385" fill="none" stroke="{INK}" stroke-width="5"/>')
save('evidence-gate.svg','Claim governance gate','No health-adjacent statement skips evidence or owner approval',''.join(gates)+f'<text x="80" y="560" font-family="Arial" font-size="21" font-weight="700" fill="{CORAL}">STOP: unsupported efficacy, fake reviews, before–after, hidden conditions</text>')

visuals = [
    ('hero','hero-ritual.svg','Premium daily ritual'),
    ('market','market-landscape.svg','Category landscape'),
    ('competitors','competitor-orbit.svg','Ten-brand orbit'),
    ('prices','price-ladder.svg','Observed price ladder'),
    ('voice','customer-voice.svg','Customer Voice themes'),
    ('persona-ritual','persona-ritual.svg','Ritual & Proof persona'),
    ('persona-appearance','persona-appearance.svg','Appearance persona'),
    ('persona-comfort','persona-comfort.svg','Comfort persona'),
    ('winning-zone','winning-zone.svg','Winning Zone'),
    ('positioning','positioning-maps.png','Three positioning maps'),
    ('channels','channel-system.svg','All-channel system'),
    ('budget','budget-allocation.svg','Budget allocation'),
    ('timeline','timeline-90-days.svg','12-week timeline'),
    ('evidence-gate','evidence-gate.svg','Evidence and approval gate'),
]
config = {
    'slug': 'ยาสีฟัน',
    'route': '/toothpaste',
    'title': 'แผนการตลาดยาสีฟันพรีเมียม',
    'priceThb': 350,
    'monthlyBudgetThb': 1000000,
    'durationMonths': 3,
    'totalBudgetThb': 3000000,
    'researchDate': '2026-08-28',
    'status': 'Research trial — not launch approval',
    'primaryWinningZone': 'Premium daily ritual × proof transparency',
    'secondaryTerritory': 'Gentle-brightening experience without overclaim',
    'visuals': [{'id': i, 'src': f'images/toothpaste/{name}', 'alt': alt} for i,name,alt in visuals],
}
(CONTENT / 'config.json').write_text(json.dumps(config, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'markdown': len(list((CONTENT/'markdown').glob('*.md'))), 'visuals': len(visuals), 'downloads': len(list(DOWNLOADS.iterdir()))}, ensure_ascii=False))
