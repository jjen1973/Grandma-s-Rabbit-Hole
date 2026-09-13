"""Copy the original paint studio; add the Android host/reward bridge."""
from pathlib import Path
import json, shutil

root = Path(__file__).resolve().parents[1]
source = root.parent / 'pip-waffles-books/coloring-books/01-adventures-books-1-5'
dest = root / 'public/waffles-studio'
dest.mkdir(exist_ok=True)
edition = json.loads((root / 'src/content/waffles-coloring.json').read_text(encoding='utf-8'))
html = (source / 'studio.html').read_text(encoding='utf-8').replace('__EDITION__', json.dumps(edition, ensure_ascii=False))
html = html.replace('<div class="paper">', '<div class="zoom-controls" role="group" aria-label="Picture zoom"><button id="zoom-out" aria-label="Zoom out">−</button><span id="zoom-level">100%</span><button id="zoom-in" aria-label="Zoom in">+</button><button id="zoom-reset">Fit picture</button></div><div class="zoom-viewport"><div class="paper">')
html = html.replace('</canvas></div>', '</canvas></div></div>')
html = html.replace('<script src="studio.js"></script>', '<script src="studio.js"></script><script src="host.js"></script>')
(dest / 'index.html').write_text(html, encoding='utf-8')
shutil.copy2(source / 'studio.css', dest / 'studio.css')
shutil.copy2(source / 'coloring-book.pdf', dest / 'coloring-book.pdf')
js = (source / 'studio.js').read_text(encoding='utf-8')
js = js.replace("const key = 'waffles-pip-paint-table-v1';", "const params = new URLSearchParams(location.search);\n  const key = 'waffles-pip-paint-table-v1:' + (params.get('player') || 'guest');")
js = js.replace('render();save();}\n  function finish()', "render();save();if(action.type !== 'reset' && !action.erase) parent.postMessage({type:'waffles-colored', page}, location.origin);}\n  function finish()")
js = js.replace('page = index; const item', "page = index; parent.postMessage({type:'waffles-page', page}, location.origin); const item")
js = js.replace('  show(0);', "  const initial = Number(params.get('page') || 0);\n  show(Number.isInteger(initial) && initial >= 0 && initial < pages.length ? initial : 0);")
assert "type:'waffles-colored'" in js
(dest / 'studio.js').write_text(js, encoding='utf-8')
