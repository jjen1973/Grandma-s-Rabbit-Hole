(() => {
  'use strict';
  const pages = JSON.parse(document.querySelector('#edition').textContent).pages;
  const $ = selector => document.querySelector(selector);
  const canvas = $('#paint'), ctx = canvas.getContext('2d');
  const movePage = $('#move-page');
  movePage.onclick = () => {
    const moving = movePage.getAttribute('aria-pressed') !== 'true';
    movePage.setAttribute('aria-pressed', moving);
    canvas.style.pointerEvents = moving ? 'none' : '';
    movePage.textContent = moving ? 'Back to coloring' : 'Move page';
  };
  document.querySelectorAll('#brush, #fill, #eraser').forEach(button => button.addEventListener('click', () => {
    if (movePage.getAttribute('aria-pressed') === 'true') movePage.click();
  }));
  const params = new URLSearchParams(location.search);
  const key = 'waffles-pip-paint-table-v1:' + (params.get('player') || 'guest');
  const palette = [['Berry red','#e75b63'],['Carrot orange','#ef9748'],['Sunshine yellow','#f6d75c'],['Leaf green','#83b567'],['Sky blue','#58a9da'],['Deep blue','#537abb'],['Lilac purple','#a285c9'],['Blossom pink','#edacc0'],['Earth brown','#a57854'],['Warm sand','#dec7a0'],['Soft gray','#a6a9ab'],['Midnight','#424654']];
  let page = 0, color = palette[4][1], size = 36, erasing = false, active = null, pointer = null, drawings = {};
  try { const saved = JSON.parse(localStorage.getItem(key) || '{}'); if (saved && typeof saved === 'object') drawings = saved; } catch { $('#status').textContent = 'Colors will stay here while this page is open.'; }
  const strokes = () => Array.isArray(drawings[page]) ? drawings[page] : (drawings[page] = []);
  const redo = {}, cache = new Map();
  let mode = 'brush', boundaries = null;
  const history = () => redo[page] || (redo[page] = []);
  function region(x,y) {
    if (!boundaries) return null;
    const w=canvas.width,h=canvas.height,seed=Math.floor(y)*w+Math.floor(x);
    if(x<0||y<0||x>=w||y>=h||boundaries[seed]) return null;
    if(cache.has(seed)) return cache.get(seed);
    const seen=new Uint8Array(w*h), queue=new Int32Array(w*h);
    let head=0,tail=1;queue[0]=seed;seen[seed]=1;
    const visit=n=>{if(!seen[n]&&!boundaries[n]){seen[n]=1;queue[tail++]=n;}};
    while(head<tail){const n=queue[head++],col=n%w;if(col)visit(n-1);if(col<w-1)visit(n+1);if(n>=w)visit(n-w);if(n<w*(h-1))visit(n+w);}
    const spans=[];
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(!seen[y*w+x])continue;const start=x;while(x+1<w&&seen[y*w+x+1])x++;spans.push([start,y,x-start+1]);}
    cache.set(seed,spans);return spans;
  }
  $('#art').addEventListener('load',()=>{
    const source=document.createElement('canvas');source.width=canvas.width;source.height=canvas.height;
    const context=source.getContext('2d');context.drawImage($('#art'),0,0,source.width,source.height);
    try{const data=context.getImageData(0,0,source.width,source.height).data;boundaries=new Uint8Array(source.width*source.height);
      for(let i=0;i<boundaries.length;i++)boundaries[i]=data[i*4]<200?1:0;
      $('#fill').disabled=false;render();
    }catch{$('#fill').disabled=true;$('#status').textContent='Open with Live Server to use tap to fill. Brushes still work here.';}
  });
  function save() { try { localStorage.setItem(key, JSON.stringify(drawings)); } catch { $('#status').textContent = 'This device cannot save more colors. Keep this page open to keep painting.'; } }
  function draw(stroke) {
    if(stroke.type==='reset'){ctx.clearRect(0,0,canvas.width,canvas.height);return;}
    if(stroke.type==='fill'){const spans=region(...stroke.seed);if(!spans)return;ctx.globalCompositeOperation='source-over';ctx.fillStyle=stroke.color;for(const [x,y,width] of spans)ctx.fillRect(x,y,width,1);return;}
    if (!stroke || !Array.isArray(stroke.points) || !stroke.points.length) return;
    ctx.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
    ctx.strokeStyle = ctx.fillStyle = stroke.color; ctx.lineWidth = stroke.size; ctx.lineCap = ctx.lineJoin = 'round';
    ctx.beginPath(); const first = stroke.points[0]; ctx.moveTo(first[0], first[1]);
    if (stroke.points.length === 1) {ctx.arc(first[0], first[1], stroke.size / 2, 0, Math.PI * 2);ctx.fill();}
    else {for (const point of stroke.points.slice(1)) ctx.lineTo(point[0], point[1]);ctx.stroke();}
  }
  function render() { ctx.clearRect(0, 0, canvas.width, canvas.height); strokes().forEach(draw); if(active) draw(active); $('#undo').disabled = !strokes().length; $('#redo').disabled=!history().length; $('#reset').disabled=!strokes().length || strokes().at(-1).type==='reset'; }
  function commit(action){strokes().push(action);redo[page]=[];render();save();if(action.type !== 'reset' && !action.erase) parent.postMessage({type:'waffles-colored', page}, location.origin);}
  function finish() { if (!active) return; const action=active; active=null; pointer=null; commit(action); }
  function show(index) {
    finish(); boundaries=null;cache.clear();$('#fill').disabled=true; page = index; parent.postMessage({type:'waffles-page', page}, location.origin); const item = pages[page]; $('#art').src = item.image; $('#art').alt = item.title + ' coloring page'; $('#title').textContent = item.title;
    $('#counter').textContent = `PICTURE ${page + 1} OF ${pages.length} · BOOK ${item.book}`;
    $('#previous').disabled = page === 0; $('#next').disabled = page === pages.length - 1;
    document.querySelectorAll('[data-page]').forEach(b => b.setAttribute('aria-pressed', Number(b.dataset.page) === page)); render();
  }
  palette.forEach(([name, hex]) => {
    const button = document.createElement('button'); button.className = 'well'; button.style.setProperty('--paint', hex); button.title = name; button.setAttribute('aria-label', name); button.setAttribute('aria-pressed', hex === color);
    button.onclick = () => { color = hex; erasing = false; $('#eraser').setAttribute('aria-pressed', false); document.querySelectorAll('.well').forEach(b => b.setAttribute('aria-pressed', b === button)); $('#color-name').textContent = name; $('#color-dot').style.background = hex; };
    $('#colors').append(button);
  });
  pages.forEach((item, index) => { const button = document.createElement('button'); button.dataset.page = index; const img = document.createElement('img'); img.src = item.image; img.alt = ''; img.loading = 'lazy'; button.append(img, document.createTextNode(`${index + 1}. ${item.title}`)); button.onclick = () => show(index); $('#pictures').append(button); });
  document.querySelectorAll('[data-size]').forEach(button => button.onclick = () => { size = Number(button.dataset.size); document.querySelectorAll('[data-size]').forEach(b => b.setAttribute('aria-pressed', b === button)); });
  $('#eraser').onclick = () => { erasing = !erasing; $('#eraser').setAttribute('aria-pressed', erasing); $('#color-name').textContent = erasing ? 'Eraser' : palette.find(p => p[1] === color)[0]; $('#color-dot').style.background = erasing ? '#fffaf0' : color; document.querySelectorAll('.well').forEach((b, i) => b.setAttribute('aria-pressed', !erasing && palette[i][1] === color)); };
  function setMode(value){mode=value;$('#brush').setAttribute('aria-pressed',value==='brush');$('#fill').setAttribute('aria-pressed',value==='fill');$('.hint').textContent=value==='fill'?'Tap a paint. Then tap inside a shape.':'Tap a paint. Then draw on the picture.';}
  $('#brush').onclick=()=>setMode('brush');
  $('#fill').onclick=()=>{if(erasing)$('#eraser').click();setMode('fill');};
  $('#eraser').addEventListener('click',()=>setMode('brush'));
  $('#undo').onclick=()=>{finish();if(strokes().length)history().push(strokes().pop());render();save();};
  $('#redo').onclick=()=>{if(history().length)strokes().push(history().pop());render();save();};
  $('#reset').onclick=()=>{finish();commit({type:'reset'});$('#status').textContent='A fresh picture! Undo brings your colors back.';};
  $('#previous').onclick = () => show(Math.max(0, page - 1)); $('#next').onclick = () => show(Math.min(pages.length - 1, page + 1));
  const point = event => { const r = canvas.getBoundingClientRect(); return [(event.clientX - r.left) * canvas.width / r.width, (event.clientY - r.top) * canvas.height / r.height]; };
  const touches = new Set();
  let pendingFill = null, pinching = false;
  function cancelPaint() { active = null; pendingFill = null; pointer = null; render(); }
  // Track both fingers, including one that lands outside the canvas.
  window.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') return;
    touches.add(event.pointerId);
    if (touches.size > 1) { pinching = true; cancelPaint(); }
  }, true);
  canvas.addEventListener('pointerdown', event => {
    if (pinching || pointer !== null || event.button !== 0) return;
    canvas.setPointerCapture(event.pointerId); pointer = event.pointerId;
    // Wait for release before filling so a pinch cannot accidentally fill a shape.
    if (mode === 'fill') { pendingFill = {type:'fill', color, seed:point(event)}; return; }
    active = {color, size, erase: erasing, points: [point(event)]}; render();
  });
  canvas.addEventListener('pointermove', event => { if(!active || event.pointerId !== pointer) return; active.points.push(point(event)); render(); });
  canvas.addEventListener('pointerup', event => {
    if (event.pointerId !== pointer) return;
    if (pendingFill) { const action = pendingFill; pendingFill = null; pointer = null; if(region(...action.seed)) commit(action); }
    else finish();
  });
  canvas.addEventListener('pointercancel', event => { if(event.pointerId === pointer) cancelPaint(); });
  canvas.addEventListener('lostpointercapture', event => { if(event.pointerId === pointer) cancelPaint(); });
  for (const type of ['pointerup', 'pointercancel']) window.addEventListener(type, event => {
    touches.delete(event.pointerId);
    if (!touches.size) pinching = false;
  });
  window.addEventListener('pagehide', finish);
  const initial = Number(params.get('page') || 0);
  show(Number.isInteger(initial) && initial >= 0 && initial < pages.length ? initial : 0);
})();
