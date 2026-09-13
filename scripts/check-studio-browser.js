(() => {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const $ = (id) => document.getElementById(id);
  const painted = () => $('paint').getContext('2d').getImageData(0, 0, 1086, 1448).data.some((v, i) => i % 4 === 3 && v > 0);
  assert(painted(), 'Fill should color the canvas');
  $('undo').click(); assert(!painted(), 'Undo should clear the fill');
  $('redo').click(); assert(painted(), 'Redo should restore the fill');
  $('reset').click(); assert(!painted(), 'Reset should clear coloring');
  $('undo').click(); assert(painted(), 'Reset must be undoable');
  for (const size of [14, 36, 72]) {
    const button = document.querySelector(`[data-size="${size}"]`); button.click();
    assert(button.getAttribute('aria-pressed') === 'true', `Brush size ${size}`);
  }
  $('zoom-in').click(); assert($('zoom-level').textContent === '125%', 'Zoom in');
  $('zoom-reset').click();
  const viewport = document.querySelector('.zoom-viewport');
  const touch = (type, id, x) => viewport.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerType: 'touch', pointerId: id, clientX: x, clientY: 250 }));
  touch('pointerdown', 101, 50); touch('pointerdown', 102, 150); touch('pointermove', 102, 250);
  assert($('zoom-level').textContent === '200%', 'Two-finger gesture should zoom the picture');
  touch('pointerup', 101, 50); touch('pointerup', 102, 250); $('zoom-reset').click();
  assert(JSON.parse(localStorage.getItem('waffles-pip-paint-table-v1:verification'))['8'].length > 0, 'Save per player');
  return 'PASS: fill, undo, redo, undoable reset, all three brush sizes, zoom buttons, two-touch zoom handler, per-player saved coloring';
})();
