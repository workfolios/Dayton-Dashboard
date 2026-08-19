from pathlib import Path

path = Path('index.html')
text = path.read_text(encoding='utf-8')
old = '''                        <div class="flex flex-col md:flex-row items-start md:items-center w-full">
                            <div class="md:w-1/2 pr-8 md:text-right hidden md:block"></div>
                            <!-- Mobile Icon -->'''
new = '''                        <div class="flex flex-col md:flex-row items-start md:items-center w-full relative">
                            <div class="md:w-1/2 pr-8 md:text-right hidden md:block"></div>
                            <!-- Mobile Icon -->'''
count = text.count(old)
if count != 1:
    raise SystemExit(f'mobile Sprint 2 roadmap target: expected 1 match, found {count}')
path.write_text(text.replace(old, new), encoding='utf-8')
print('Mobile Sprint 2 roadmap icon anchoring corrected.')
