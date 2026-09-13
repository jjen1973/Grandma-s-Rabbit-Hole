// Explicit picture zoom works inside Android WebView without zooming the player bar.
(() => {
  const paper = document.querySelector('.paper');
  const viewport = document.querySelector('.zoom-viewport');
  const pointers = new Map();
  let zoom = 1, gesture = null;
  const setZoom = (value) => {
    zoom = Math.max(1, Math.min(4, value));
    paper.style.width = `${zoom * 100}%`;
    paper.style.maxWidth = 'none';
    document.querySelector('#zoom-level').textContent = `${Math.round(zoom * 100)}%`;
  };
  document.querySelector('#zoom-in').onclick = () => setZoom(zoom + .25);
  document.querySelector('#zoom-out').onclick = () => setZoom(zoom - .25);
  document.querySelector('#zoom-reset').onclick = () => { setZoom(1); viewport.scrollTo(0, 0); };
  const measure = () => {
    const [a, b] = [...pointers.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, distance: Math.hypot(a.x - b.x, a.y - b.y) };
  };
  const moving = () => document.querySelector('#move-page').getAttribute('aria-pressed') === 'true';
  const beginGesture = () => ({ ...measure(), zoom, left: viewport.scrollLeft, top: viewport.scrollTop });
  window.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch' || !viewport.contains(event.target)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (moving()) viewport.setPointerCapture(event.pointerId);
    if (pointers.size === 2) gesture = beginGesture();
  }, true);
  window.addEventListener('pointermove', (event) => {
    if (!pointers.has(event.pointerId)) return;
    const previous = pointers.get(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 2 && gesture?.distance > 0) {
      const next = measure();
      const rect = viewport.getBoundingClientRect();
      // Keep the picture point between the fingers anchored while zooming AND panning.
      const contentX = (gesture.left + gesture.x - rect.left) / gesture.zoom;
      const contentY = (gesture.top + gesture.y - rect.top) / gesture.zoom;
      setZoom(gesture.zoom * next.distance / gesture.distance);
      viewport.scrollLeft = contentX * zoom - (next.x - rect.left);
      viewport.scrollTop = contentY * zoom - (next.y - rect.top);
      event.preventDefault();
    } else if (pointers.size === 1 && moving()) {
      viewport.scrollLeft += previous.x - event.clientX;
      viewport.scrollTop += previous.y - event.clientY;
      event.preventDefault();
    }
  }, true);
  for (const type of ['pointerup', 'pointercancel']) window.addEventListener(type, (event) => {
    pointers.delete(event.pointerId);
    gesture = pointers.size === 2 ? beginGesture() : null;
  }, true);
  const style = document.createElement('style');
  style.textContent = '.zoom-controls{display:flex;justify-content:center;align-items:center;gap:8px;margin:8px}.zoom-viewport{width:100%;max-height:65vh;overflow:auto;overscroll-behavior:contain;touch-action:none;scroll-behavior:auto}.zoom-viewport .paper{margin:0;width:100%;max-width:none}.paper canvas{touch-action:none}.paper{touch-action:none}';
  document.head.append(style);
})();
