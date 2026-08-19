from pathlib import Path

path = Path('index.html')
text = path.read_text(encoding='utf-8')


def replace_once(old: str, new: str, label: str) -> None:
    global text
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: expected exactly 1 match, found {count}')
    text = text.replace(old, new, 1)


def replace_all(old: str, new: str, expected: int, label: str) -> None:
    global text
    count = text.count(old)
    if count != expected:
        raise SystemExit(f'{label}: expected {expected} matches, found {count}')
    text = text.replace(old, new)

replace_once(
    '    <title>Dayton 2.0 Assessment Dashboard | Pirate Chef</title>\n',
    '    <title>Dayton 2.0 Assessment Dashboard | Pirate Chef</title>\n'
    '    <meta name="description" content="Interactive Dayton 2.0 business-plan assessment dashboard for evaluating the operating model, financial assumptions, validation priorities, and funding roadmap.">\n'
    '    <link rel="canonical" href="https://workfolios.github.io/Dayton-Dashboard/">\n'
    '    <meta property="og:type" content="website">\n'
    '    <meta property="og:title" content="Dayton 2.0 Assessment Dashboard | Pirate Chef">\n'
    '    <meta property="og:description" content="Interactive business-plan assessment dashboard for the Dayton 2.0 operating model, financial assumptions, validation priorities, and funding roadmap.">\n'
    '    <meta property="og:url" content="https://workfolios.github.io/Dayton-Dashboard/">\n'
    '    <meta name="twitter:card" content="summary">\n',
    'metadata'
)

replace_once(
    '    <script src="https://cdn.tailwindcss.com"></script>\n',
    '    <link rel="stylesheet" href="./tailwind.css">\n',
    'tailwind runtime replacement'
)
replace_once(
    '    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n',
    '    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>\n',
    'chart pin'
)
replace_once(
    '    <script src="https://unpkg.com/lucide@latest"></script>\n',
    '    <script src="https://unpkg.com/lucide@1.28.0"></script>\n',
    'lucide pin'
)
replace_once(
    '        input[type=range]:focus { outline: none; }\n',
    '',
    'range focus outline removal'
)
replace_once(
    '</style>\n</head>',
    '</style>\n    <link rel="stylesheet" href="./refinement.css">\n</head>',
    'refinement stylesheet link'
)
replace_once(
    '<body class="text-zinc-800 antialiased h-screen flex flex-col md:flex-row overflow-hidden bg-[#fcfcfc]">\n',
    '<body class="text-zinc-800 antialiased h-screen flex flex-col md:flex-row overflow-hidden bg-[#fcfcfc]">\n\n    <a href="#main-content" class="skip-link">Skip to main briefing</a>\n',
    'skip link'
)
replace_once(
    '    <main class="flex-grow overflow-y-auto relative h-full bg-zinc-50/50" id="main-content">',
    '    <main class="flex-grow overflow-y-auto relative h-full bg-zinc-50/50" id="main-content" tabindex="-1">',
    'main focus target'
)
replace_all('<video controls class=', '<video controls preload="metadata" class=', 3, 'video preload')
replace_all('<audio controls class=', '<audio controls preload="metadata" class=', 3, 'audio preload')
replace_once(
    'Hover over the zones in the Dayton blueprint below to reveal how the operations, compliance, and revenue models interact in the facility.',
    'Explore the zones in the Dayton blueprint below to reveal how the operations, compliance, and revenue models interact in the facility.',
    'input-modality instruction'
)
replace_once(
    "            document.getElementById('main-content').scrollTo({ top: 0, behavior: 'smooth' });",
    "            document.getElementById('main-content').scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });",
    'reduced-motion scroll behavior'
)
replace_once(
    '    </script>\n</body>',
    '    </script>\n    <script src="./refinement.js"></script>\n</body>',
    'refinement behavior link'
)

path.write_text(text, encoding='utf-8')
print(f'Updated {path} ({len(text)} bytes)')
