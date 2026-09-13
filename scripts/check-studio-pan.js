(() => {
  const viewport = document.querySelector('.zoom-viewport');
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const before = localStorage.getItem('waffles-pip-paint-table-v1:pan-check');
  for (let i = 0; i < 8; i++) document.querySelector('#zoom-in').click();
  const touch = (type, id, x, y) => viewport.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, pointerType: 'touch', pointerId: id, clientX: x, clientY: y }));
  touch('pointerdown', 101, 100, 400); touch('pointerdown', 102, 200, 400);
  touch('pointermove', 101, 80, 300); touch('pointermove', 102, 180, 300);
  assert(viewport.scrollTop > 50, 'Two-finger drag must pan vertically');
  assert(viewport.scrollLeft > 0, 'Two-finger drag must pan horizontally');
  touch('pointerup', 101, 80, 300); touch('pointerup', 102, 180, 300);
  document.querySelector('#move-page').click();
  // Synthetic pointers are not registered by the browser's capture subsystem.
  const capture = viewport.setPointerCapture;
  viewport.setPointerCapture = () => {};
  try {
    touch('pointerdown', 103, 200, 450);
    touch('pointermove', 103, -5000, -5000);
    touch('pointerup', 103, -5000, -5000);
  } finally { viewport.setPointerCapture = capture; }
  assert(Math.abs(viewport.scrollTop - (viewport.scrollHeight - viewport.clientHeight)) < 2, 'Move page must reach bottom edge');
  assert(Math.abs(viewport.scrollLeft - (viewport.scrollWidth - viewport.clientWidth)) < 2, 'Move page must reach right edge');
  assert(localStorage.getItem('waffles-pip-paint-table-v1:pan-check') === before, 'Panning must not paint');
  document.querySelector('#zoom-reset').click();
  assert(viewport.scrollTop === 0 && viewport.scrollLeft === 0, 'Fit picture restores origin');
  return 'PASS: two-finger horizontal/vertical panning, Move page reaches bottom/right, no accidental coloring, Fit picture resets position';
})();
