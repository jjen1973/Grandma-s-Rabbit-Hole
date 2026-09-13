import React, { useEffect, useRef, useState } from 'react';
import FamilyGate from './FamilyGate';
import wafflesBook3 from './content/waffles-book-3.json';
import wafflesBook4 from './content/waffles-book-4.json';
import wafflesBook5 from './content/waffles-book-5.json';
import wafflesColoring from './content/waffles-coloring.json';

const pages = [
  { letter: 'A', title: 'Apple', image: '/pages/letter-book/a-apple.png', description: 'A big apple page for the first letter.', accent: '#ff6b6b' },
  { letter: 'B', title: 'Banana Bird', image: '/pages/letter-book/b-banana-bird.png', description: 'A banana bird page with a friendly shape to color.', accent: '#f9c74f' },
  { letter: 'C', title: 'Cat', image: '/pages/letter-book/c-cat.png', description: 'A calm cat page for coloring practice.', accent: '#90be6d' },
  { letter: 'D', title: 'Dog', image: '/pages/letter-book/d-dog.png', description: 'A happy dog page with simple outlines.', accent: '#4cc9f0' },
  { letter: 'E', title: 'Elephant', image: '/pages/letter-book/e-elephant.png', description: 'The E page for the toddler coloring book.', accent: '#7b61ff' },
  { letter: 'F', title: 'Flower', image: '/pages/letter-book/f-flower.png', description: 'A flower page for bright, easy coloring.', accent: '#ff8fab' },
  { letter: 'G', title: 'Grapes', image: '/pages/letter-book/g-grapes.png', description: 'A bunch of grapes for a gentle coloring page.', accent: '#8e7dff' },
  { letter: 'H', title: 'Hat', image: '/pages/letter-book/h-hat.png', description: 'A hat page with bold outline shapes.', accent: '#f4a261' },
  { letter: 'I', title: 'Ice Cream', image: '/pages/letter-book/i-ice-cream.png', description: 'A sweet ice cream page for tiny hands.', accent: '#06d6a0' },
  { letter: 'J', title: 'Jellyfish', image: '/pages/letter-book/j-jellyfish.png', description: 'A floating jellyfish page with easy curves.', accent: '#bde0fe' },
  { letter: 'K', title: 'Kangaroo', image: '/pages/letter-book/k-kangaroo.png', description: 'A mother kangaroo and joey ready to color.', accent: '#f4a261' },
  { letter: 'L', title: 'Lion', image: '/pages/letter-book/l-lion.png', description: 'A friendly lion with a big fluffy mane.', accent: '#f9c74f' },
  { letter: 'M', title: 'Moon Macaw', image: '/pages/letter-book/m-moon-macaw.png', description: 'A moon macaw page with bold coloring shapes.', accent: '#cdb4db' },
  { letter: 'N', title: 'Narwhal', image: '/pages/letter-book/n-narwhal.png', description: 'A smiling narwhal swimming under the sea.', accent: '#4cc9f0' },
  { letter: 'O', title: 'Octopus', image: '/pages/letter-book/o-octopus.png', description: 'A cheerful octopus with curling arms.', accent: '#ff8fab' },
  { letter: 'P', title: 'Penguin', image: '/pages/letter-book/p-penguin.png', description: 'A happy penguin standing on the ice.', accent: '#90be6d' },
  { letter: 'Q', title: 'Quail', image: '/pages/letter-book/q-quail.png', description: 'A gentle quail in a grassy field.', accent: '#cdb4db' },
  { letter: 'R', title: 'Rainbow', image: '/pages/letter-book/r-rainbow.png', description: 'A bright rainbow waiting for every color.', accent: '#ff6b6b' },
  { letter: 'S', title: 'Sun', image: '/pages/letter-book/s-sun.png', description: 'A smiling sun with warm, wavy rays.', accent: '#f9c74f' },
  { letter: 'T', title: 'Turtle', image: '/pages/letter-book/t-turtle.png', description: 'A friendly turtle beside a little pond.', accent: '#90be6d' },
  { letter: 'U', title: 'Umbrella', image: '/pages/letter-book/u-umbrella.png', description: 'A cheerful umbrella for a rainy day.', accent: '#4cc9f0' },
  { letter: 'V', title: 'Volcano', image: '/pages/letter-book/v-volcano.png', description: 'A gentle volcano puffing round clouds.', accent: '#f4a261' },
  { letter: 'W', title: 'Whale', image: '/pages/letter-book/w-whale.png', description: 'A happy whale swimming under the sea.', accent: '#bde0fe' },
  { letter: 'X', title: 'Xylophone', image: '/pages/letter-book/x-xylophone.png', description: 'A toy xylophone ready for a song.', accent: '#ff8fab' },
  { letter: 'Y', title: 'Yak', image: '/pages/letter-book/y-yak.png', description: 'A shaggy yak in a mountain meadow.', accent: '#cdb4db' },
  { letter: 'Z', title: 'Zebra', image: '/pages/letter-book/z-zebra.png', description: 'A smiling zebra with bold stripes.', accent: '#ff6b6b' },
];

const crayons = ['#ff6b6b', '#f9c74f', '#90be6d', '#4cc9f0', '#bde0fe', '#ffafcc', '#cdb4db', '#f4a261'];

function ElephantArt() {
  return (
    <svg viewBox="0 0 700 860" className="elephant-art" role="img" aria-label="Elephant coloring page">
      <rect x="18" y="18" width="664" height="824" rx="34" fill="#fff" stroke="#111" strokeWidth="8" />
      <text
        x="350"
        y="250"
        textAnchor="middle"
        className="page-letter"
        fill="none"
        stroke="#111"
        strokeWidth="14"
        fontSize="270"
        fontWeight="900"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        E
      </text>
      <g transform="translate(0,34)" fill="none" stroke="#111" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="346" cy="520" rx="170" ry="126" strokeWidth="8" />
        <ellipse cx="468" cy="456" rx="92" ry="114" strokeWidth="8" />
        <path d="M520 446 C566 460, 582 512, 560 548 C545 572, 520 585, 500 574" strokeWidth="8" />
        <path d="M463 500 C512 492, 548 522, 547 575 C547 620, 524 653, 499 662" strokeWidth="8" />
        <path d="M452 586 C424 648, 398 696, 370 700" strokeWidth="8" />
        <path d="M315 589 C287 648, 268 693, 256 700" strokeWidth="8" />
        <path d="M238 516 C210 536, 204 584, 219 622 C228 646, 245 658, 260 662" strokeWidth="8" />
        <path d="M250 404 C222 395, 198 410, 189 434 C172 480, 184 526, 203 563 C220 596, 247 623, 287 635" strokeWidth="8" />
        <path d="M167 487 C139 486, 117 508, 110 538" strokeWidth="8" />
        <path d="M165 469 C160 439, 163 412, 175 382 C190 345, 221 321, 255 304" strokeWidth="8" />
        <circle cx="289" cy="436" r="28" strokeWidth="8" />
        <circle cx="291" cy="437" r="9" fill="#111" stroke="none" />
        <path d="M205 328 C182 285, 183 238, 204 210" strokeWidth="8" />
        <path d="M200 210 C190 200, 176 201, 168 212" strokeWidth="8" />
        <path d="M220 324 C214 285, 224 250, 250 226" strokeWidth="8" />
        <path d="M253 226 C240 216, 223 219, 214 231" strokeWidth="8" />
        <path d="M175 235 C157 226, 144 204, 140 178" strokeWidth="8" />
        <path d="M250 244 C277 237, 294 248, 304 273" strokeWidth="8" />
        <path d="M478 348 C518 323, 562 327, 591 351" strokeWidth="8" />
        <path d="M476 420 C515 400, 556 406, 581 433" strokeWidth="8" />
        <path d="M300 585 C322 607, 378 607, 398 589" strokeWidth="8" />
        <path d="M274 701 C283 723, 304 737, 329 740" strokeWidth="8" />
        <path d="M366 701 C377 724, 399 738, 425 740" strokeWidth="8" />
        <path d="M451 700 C456 723, 472 737, 495 740" strokeWidth="8" />
      </g>
    </svg>
  );
}

function ColoringCanvas({ color, strokes, onStrokeComplete }) {
  const canvasRef = useRef(null);
  const currentStrokeRef = useRef(null);

  const drawStroke = (context, stroke, width, height) => {
    if (!stroke?.points.length) {
      return;
    }

    const points = stroke.points.map((point) => ({ x: point.x * width, y: point.y * height }));
    context.save();
    context.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over';
    context.strokeStyle = stroke.erase ? '#000' : stroke.color;
    context.fillStyle = stroke.erase ? '#000' : stroke.color;
    context.lineWidth = Math.max(stroke.erase ? 16 : 7, Math.min(width, height) * (stroke.erase ? 0.075 : 0.035));
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.globalAlpha = 0.72;

    if (points.length === 1) {
      context.beginPath();
      context.arc(points[0].x, points[0].y, context.lineWidth / 2, 0, Math.PI * 2);
      context.fill();
    } else {
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      points.slice(1).forEach((point) => context.lineTo(point.x, point.y));
      context.stroke();
    }
    context.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const redraw = () => {
      const rectangle = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rectangle.width * ratio));
      canvas.height = Math.max(1, Math.round(rectangle.height * ratio));
      const context = canvas.getContext('2d');
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, rectangle.width, rectangle.height);
      strokes.forEach((stroke) => drawStroke(context, stroke, rectangle.width, rectangle.height));
    };

    redraw();
    const observer = new ResizeObserver(redraw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [strokes]);

  const pointFromEvent = (event) => {
    const rectangle = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1, (event.clientX - rectangle.left) / rectangle.width)),
      y: Math.max(0, Math.min(1, (event.clientY - rectangle.top) / rectangle.height)),
    };
  };

  const startDrawing = (event) => {
    if (!color) {
      return;
    }
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    currentStrokeRef.current = { color: color === 'eraser' ? null : color, erase: color === 'eraser', points: [pointFromEvent(event)] };
  };

  const continueDrawing = (event) => {
    const stroke = currentStrokeRef.current;
    if (!stroke) {
      return;
    }
    event.preventDefault();
    const nextPoint = pointFromEvent(event);
    const canvas = canvasRef.current;
    const rectangle = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');
    const previousPoint = stroke.points[stroke.points.length - 1];
    drawStroke(context, { color: stroke.color, erase: stroke.erase, points: [previousPoint, nextPoint] }, rectangle.width, rectangle.height);
    stroke.points.push(nextPoint);
  };

  const finishDrawing = () => {
    if (!currentStrokeRef.current) {
      return;
    }
    onStrokeComplete(currentStrokeRef.current);
    currentStrokeRef.current = null;
  };

  return (
    <canvas
      ref={canvasRef}
      className={`coloring-canvas ${color ? 'enabled' : ''}`}
      onPointerDown={startDrawing}
      onPointerMove={continueDrawing}
      onPointerUp={finishDrawing}
      onPointerCancel={finishDrawing}
      aria-label={color ? 'Color this page with the crayon' : 'Pick up a crayon to color this page'}
    />
  );
}

function PageArtwork({ page, crayonColor, strokes = [], onStrokeComplete }) {
  return (
    <div className="page-art">
      {page.image ? <img src={page.image} alt={page.title} draggable="false" /> : <ElephantArt />}
      {onStrokeComplete ? (
        <ColoringCanvas color={crayonColor} strokes={strokes} onStrokeComplete={onStrokeComplete} />
      ) : null}
    </div>
  );
}

function PageFace({ page, side, blank, drawingTool, strokes, onStrokeComplete, onPickUpEraser, eraserHeld, onResetPage, onResetColoring, onRestartBook, hasColoring, rewarded }) {
  if (blank) {
    return (
      <article className={`page-sheet ${side} blank`}>
        <div className="page-sheet__top">
          <span>End</span>
          <span>All done!</span>
        </div>
        <div className="blank-page">
          <span className="end-page__star" aria-hidden="true">★</span>
          <h2>Great coloring!</h2>
          <p>Ready to make a brand-new book?</p>
          <button
            type="button"
            className="reset-coloring-button"
            onClick={onResetColoring}
            disabled={!hasColoring}
          >
            Reset all coloring
          </button>
          <button type="button" className="restart-book-button" onClick={onRestartBook}>
            Back to the beginning
          </button>
          <small>{hasColoring ? 'This clears every colored page.' : 'Your pages are already clean.'}</small>
        </div>
      </article>
    );
  }

  return (
    <article className={`page-sheet ${side}`} style={{ '--page-accent': page.accent }}>
      {rewarded ? (
        <span className="page-complete-star" role="img" aria-label={`${page.title} page colored`}>
          ★
        </span>
      ) : null}
      <div className="page-sheet__top">
        <span>{page.label}</span>
        <span>{page.title}</span>
      </div>
      <PageArtwork page={page} crayonColor={drawingTool} strokes={strokes} onStrokeComplete={onStrokeComplete} />
      <div className="page-footer">
        <button
          type="button"
          className={`page-eraser-button ${eraserHeld ? 'held' : ''}`}
          onClick={onPickUpEraser}
          aria-pressed={eraserHeld}
          aria-label={`${eraserHeld ? 'Put down' : 'Pick up'} eraser for ${page.title}`}
        >
          <span className="eraser-icon" aria-hidden="true" />
          Eraser
        </button>
        <button
          type="button"
          className="reset-page-button"
          onClick={onResetPage}
          disabled={!strokes?.length}
          aria-label={`Reset coloring on ${page.title}`}
        >
          Reset this page
        </button>
      </div>
    </article>
  );
}

function BookCover({ onOpen }) {
  return (
    <article className="book-cover">
      <div className="book-cover__letters" aria-hidden="true">A B C</div>
      <p>My first coloring book</p>
      <h2>A-Z<br />Coloring</h2>
      <div className="book-cover__picture" aria-hidden="true">
        <span>★</span>
        <span>🖍</span>
        <span>★</span>
      </div>
      <button type="button" onClick={onOpen}>Open the book</button>
    </article>
  );
}

const coloringBooks = [
  { id: 'abc', title: 'ABC Coloring Book', cover: '/pages/letter-book/a-apple.png', pages: pages.map((page) => ({ ...page, id: page.letter, label: `Letter ${page.letter}` })) },
  { id: 'waffles-pip', title: 'Waffles & Pip Adventures', cover: '/pages/waffles-book/waffles-pip-adventures.png', pages: wafflesColoring.pages.map((page) => ({ ...page, id: `waffles-pip-${page.number}`, label: `Picture ${page.number}`, accent: '#f4a261' })) },
];

// Original named paints from Waffles & Pip's paint table.
const wafflesPaints = [['Berry red', '#e75b63'], ['Carrot orange', '#ef9748'], ['Sunshine yellow', '#f6d75c'], ['Leaf green', '#83b567'], ['Sky blue', '#58a9da'], ['Deep blue', '#537abb'], ['Lilac purple', '#a285c9'], ['Blossom pink', '#edacc0'], ['Earth brown', '#a57854'], ['Warm sand', '#dec7a0'], ['Soft gray', '#a6a9ab'], ['Midnight', '#424654']];

function WafflesPaintStudio({ initialPage, family, onExit, onChoosePicture, onChangeBook }) {
  const frame = useRef(null);
  const pending = useRef(new Set());
  const [activePage, setActivePage] = useState(initialPage);
  const [frameHeight, setFrameHeight] = useState(650);
  const pageId = `waffles-pip-${activePage + 1}`;
  useEffect(() => {
    const resize = () => setFrameHeight(Math.max(300, window.innerHeight - frame.current.getBoundingClientRect().top - 8));
    resize();
    const observer = new ResizeObserver(resize);
    const toolbar = document.querySelector('.family-toolbar');
    if (toolbar) observer.observe(toolbar);
    window.addEventListener('resize', resize);
    return () => { observer.disconnect(); window.removeEventListener('resize', resize); };
  }, []);
  useEffect(() => {
    const receive = (event) => {
      if (event.source !== frame.current?.contentWindow || event.origin !== window.location.origin) return;
      const { type, page } = event.data || {};
      if (!Number.isInteger(page) || page < 0 || page >= wafflesColoring.pages.length) return;
      if (type === 'waffles-page') setActivePage(page);
      if (type !== 'waffles-colored' || !family?.awardColoringPage) return;
      const id = `waffles-pip-${page + 1}`;
      if (family.child?.coloringRewards?.includes(id) || pending.current.has(id)) return;
      pending.current.add(id);
      family.awardColoringPage(id, 'waffles-pip').catch(() => {}).finally(() => pending.current.delete(id));
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [family]);
  const player = `${family?.user?.uid || 'guest'}:${family?.child?.id || 'guest'}`;
  return (
    <main className="coloring-workspace waffles-studio-workspace">
      <nav className="coloring-navigation" aria-label="Coloring navigation">
        <button type="button" onClick={onExit}>← Tunnel</button>
        <button type="button" onClick={onChangeBook}>Change Book</button>
        <button type="button" onClick={onChoosePicture}>Choose Picture</button>
        <span role="status">{family?.child?.coloringRewards?.includes(pageId) ? '★ Star earned' : 'Color to earn a star'}</span>
      </nav>
      <iframe ref={frame} title="Waffles and Pip complete paint studio" src={`/waffles-studio/index.html?page=${initialPage}&player=${encodeURIComponent(player)}`} style={{ width: '100%', height: frameHeight, border: 0, display: 'block' }} />
    </main>
  );
}

function ColoringBook({ onExit, family }) {
  const [bookId, setBookId] = useState(null);
  const book = coloringBooks.find((item) => item.id === bookId);
  const pages = book?.pages || [];
  const [pageIndex, setPageIndex] = useState(-1);
  const [turn, setTurn] = useState(null);
  const [selectedColor, setSelectedColor] = useState(crayons[0]);
  const [heldColor, setHeldColor] = useState(null);
  const [eraserHeld, setEraserHeld] = useState(false);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [drawings, setDrawings] = useState({});
  const rewardRequests = useRef(new Set());

  const currentPage = pages[pageIndex] || null;
  const isCover = pageIndex === -1;
  const isEnd = pageIndex === pages.length;
  const hasColoring = pages.some((page) => drawings[page.id]?.some((stroke) => !stroke.erase));
  const drawingTool = eraserHeld ? 'eraser' : heldColor;
  const usesPaint = bookId === 'waffles-pip';

  useEffect(() => {
    const initialColor = bookId === 'waffles-pip' ? wafflesPaints[4][1] : crayons[0];
    setSelectedColor(initialColor);
    setHeldColor(bookId === 'waffles-pip' ? initialColor : null);
    setEraserHeld(false);
  }, [bookId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [bookId, pageIndex]);

  useEffect(() => {
    if (!turn) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setPageIndex((prev) => {
        if (turn.direction === 'next') {
          return Math.min(prev + 1, pages.length);
        }
        return Math.max(prev - 1, -1);
      });
      setTurn(null);
    }, 620);

    return () => window.clearTimeout(timeoutId);
  }, [turn, bookId]);

  useEffect(() => {
    if (!heldColor && !eraserHeld) {
      return undefined;
    }

    const followPointer = (event) => {
      setPointerPosition({ x: event.clientX, y: event.clientY });
    };
    const putCrayonDown = (event) => {
      if (event.key === 'Escape') {
        setHeldColor(null);
        setEraserHeld(false);
      }
    };

    window.addEventListener('pointermove', followPointer);
    window.addEventListener('keydown', putCrayonDown);

    return () => {
      window.removeEventListener('pointermove', followPointer);
      window.removeEventListener('keydown', putCrayonDown);
    };
  }, [heldColor, eraserHeld]);

  const pickUpCrayon = (color, event) => {
    setSelectedColor(color);
    setPointerPosition({ x: event.clientX, y: event.clientY });
    setEraserHeld(false);
    setHeldColor((current) => (current === color ? null : color));
  };

  const pickUpEraser = (event) => {
    setPointerPosition({ x: event.clientX, y: event.clientY });
    setHeldColor(null);
    setEraserHeld((current) => !current);
  };

  const saveStroke = (letter, stroke) => {
    setDrawings((current) => ({
      ...current,
      [letter]: [...(current[letter] || []), stroke],
    }));
    const alreadyRewarded = family?.child?.coloringRewards?.includes(letter);
    if (family?.awardColoringPage && !stroke.erase && !alreadyRewarded && !rewardRequests.current.has(letter)) {
      rewardRequests.current.add(letter);
      family.awardColoringPage(letter, bookId).catch(() => rewardRequests.current.delete(letter));
    }
  };

  const resetPage = (letter) => {
    setDrawings((current) => ({ ...current, [letter]: [] }));
  };

  const restartBook = () => {
    setPageIndex(-1);
    setTurn(null);
    setHeldColor(null);
    setEraserHeld(false);
  };

  const goNext = () => {
    if (turn || pageIndex >= pages.length) {
      return;
    }
    setTurn({ direction: 'next' });
  };

  const goBack = () => {
    if (turn || pageIndex <= -1) {
      return;
    }
    setTurn({ direction: 'prev' });
  };

  if (!book || isCover) {
    return (
      <main className="books-choice-page coloring-library">
        <nav className="coloring-navigation" aria-label="Coloring navigation">
          <button type="button" onClick={onExit}>← Tunnel</button>
          {book ? <button type="button" onClick={() => { restartBook(); setBookId(null); }}>Change Book</button> : null}
        </nav>
        <header><p>{book ? book.title : 'Pick a cover'}</p><h1>{book ? 'Choose a Picture' : 'Choose a Coloring Book'}</h1></header>
        <section className={`book-picture-choices ${book ? 'coloring-picture-grid' : 'coloring-cover-grid'}`} aria-label={book ? 'Coloring pictures' : 'Coloring books'}>
          {book ? pages.map((page, index) => (
            <button type="button" className="book-picture-choice" key={page.id} onClick={() => setPageIndex(index)} aria-label={`Color ${page.title}`}>
              <img src={page.image} alt={page.title} loading="lazy" />
              <strong>{page.title}</strong>
              <small>{family?.child?.coloringRewards?.includes(page.id) ? '★ Star earned' : page.label}</small>
            </button>
          )) : coloringBooks.map((choice) => (
            <button type="button" className="book-picture-choice" key={choice.id} onClick={() => setBookId(choice.id)}>
              <img src={choice.cover} alt={choice.id === 'abc' ? 'Apple and the letter A' : 'Waffles the rabbit and Pip the bird'} />
              <strong>{choice.title}</strong><small>{choice.pages.length} pictures · Pick any page</small>
            </button>
          ))}
        </section>
      </main>
    );
  }

  if (usesPaint) {
    return <WafflesPaintStudio initialPage={pageIndex} family={family} onExit={onExit} onChoosePicture={restartBook} onChangeBook={() => { restartBook(); setBookId(null); }} />;
  }

  return (
    <div className={`page-shell coloring-workspace ${drawingTool && (!usesPaint || eraserHeld) ? 'holding-tool' : ''}`}>
      {heldColor && !usesPaint ? (
        <div
          className="crayon held-crayon"
          style={{ '--crayon-color': heldColor, left: pointerPosition.x, top: pointerPosition.y }}
          aria-hidden="true"
        >
          <span className="crayon-label">CRAYON</span>
        </div>
      ) : null}
      {eraserHeld ? (
        <div
          className="held-eraser"
          style={{ left: pointerPosition.x, top: pointerPosition.y }}
          aria-hidden="true"
        />
      ) : null}
      <button type="button" className="back-to-tunnel" onClick={onExit}>
        <span aria-hidden="true">←</span> Tunnel
      </button>
      <nav className="coloring-navigation" aria-label="Coloring navigation">
        <button type="button" onClick={() => { restartBook(); setBookId(null); }}>Change Book</button>
        <button type="button" onClick={restartBook}>Choose Picture</button>
      </nav>
      <header className="hero">
        <div>
          <h1 className="hero-title">{book.title}</h1>
        </div>
        <div className="hero-pill">
          {isEnd ? 'The End' : `${currentPage.label} · ${pageIndex + 1} of ${pages.length}`}
        </div>
      </header>

      <main className={`book-stage ${turn ? `turning ${turn.direction}` : ''}`}>
        <section className="book-spread single-page-book" aria-label={isEnd ? 'End of book' : `${currentPage.title} coloring page`}>
          {isCover ? (
            <BookCover onOpen={goNext} />
          ) : currentPage ? (
            <PageFace
              page={currentPage}
              rewarded={family?.child?.coloringRewards?.includes(currentPage.id)}
              side="single"
              drawingTool={drawingTool}
              strokes={drawings[currentPage.id] || []}
              onStrokeComplete={(stroke) => saveStroke(currentPage.id, stroke)}
              onPickUpEraser={pickUpEraser}
              eraserHeld={eraserHeld}
              onResetPage={() => resetPage(currentPage.id)}
            />
          ) : (
            <PageFace side="single" blank onResetColoring={() => setDrawings((current) => Object.fromEntries(Object.entries(current).filter(([id]) => !pages.some((page) => page.id === id))))} onRestartBook={restartBook} hasColoring={hasColoring} />
          )}

          <button
            type="button"
            className="nav-button nav-prev"
            onClick={goBack}
            disabled={pageIndex === -1 || !!turn}
            aria-label="Previous page"
          >
            ‹
          </button>
          <button
            type="button"
            className="nav-button nav-next"
            onClick={goNext}
            disabled={pageIndex === pages.length || !!turn}
            aria-label="Next page"
          >
            ›
          </button>
        </section>

        {currentPage && usesPaint ? (
          <section className="waffles-paint-tray" aria-label="Waffles and Pip paint palette">
            <p>Your little paint box</p>
            <h2>Pick a happy color</h2>
            <div className="waffles-paint-colors" role="group" aria-label="Paint colors">
              {wafflesPaints.map(([name, hex]) => (
                <button type="button" key={hex} className="waffles-paint-well" style={{ '--paint': hex }} title={name} aria-label={name} aria-pressed={!eraserHeld && heldColor === hex} onClick={() => { setSelectedColor(hex); setHeldColor(hex); setEraserHeld(false); }} />
              ))}
            </div>
            <p aria-live="polite">{eraserHeld ? 'Eraser' : wafflesPaints.find(([, hex]) => hex === selectedColor)?.[0]}</p>
          </section>
        ) : currentPage ? (
        <section className="toolstrip" aria-label="Color palette">
          <div className="toolstrip__copy">
            <p className="eyebrow">Crayons</p>
            <h2>Pick a color</h2>
          </div>
          <div className="crayon-grid" role="list">
            {crayons.map((color) => (
              <button
                key={color}
                type="button"
                className={`crayon ${selectedColor === color ? 'selected' : ''} ${heldColor === color ? 'held' : ''}`}
                style={{ '--crayon-color': color }}
                onClick={(event) => pickUpCrayon(color, event)}
                aria-label={`${heldColor === color ? 'Put down' : 'Pick up'} ${color} crayon`}
                aria-pressed={heldColor === color}
              >
                <span className="crayon-label" aria-hidden="true">CRAYON</span>
              </button>
            ))}
          </div>
          <div className="selected-color-box">
            <span className="selected-swatch" style={{ background: selectedColor }} />
            <span aria-live="polite">{heldColor ? 'Crayon in your hand' : 'Current crayon'}</span>
            {heldColor ? (
              <button type="button" className="drop-crayon" onClick={() => setHeldColor(null)}>
                Put it down
              </button>
            ) : null}
          </div>
        </section>
        ) : null}
      </main>
    </div>
  );
}

function StartPage({ onEnterTunnel }) {
  const [rabbitStage, setRabbitStage] = useState('waiting');
  const [reactions, setReactions] = useState({ grandma: false, macaw: false, tree: false });
  const reactionTimeoutRefs = useRef({});
  const macawAudioRef = useRef(null);
  const grandmaVoicesRef = useRef([]);
  const grandmaUtteranceRef = useRef(null);

  useEffect(() => () => {
    Object.values(reactionTimeoutRefs.current).forEach((timeoutId) => window.clearTimeout(timeoutId));
  }, []);

  useEffect(() => {
    const macawAudio = new Audio('/audio/cracker-macaw.m4a');
    macawAudio.preload = 'auto';
    macawAudioRef.current = macawAudio;

    return () => {
      macawAudio.pause();
      macawAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      return undefined;
    }

    const loadGrandmaVoices = () => {
      grandmaVoicesRef.current = window.speechSynthesis.getVoices();
    };

    loadGrandmaVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadGrandmaVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadGrandmaVoices);
  }, []);

  const showReaction = (name) => {
    window.clearTimeout(reactionTimeoutRefs.current[name]);
    setReactions((current) => ({ ...current, [name]: true }));
    reactionTimeoutRefs.current[name] = window.setTimeout(() => {
      setReactions((current) => ({ ...current, [name]: false }));
    }, 1500);
  };

  const greetFromGrandma = () => {
    showReaction('grandma');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const speakHello = () => {
        const voices = grandmaVoicesRef.current.length
          ? grandmaVoicesRef.current
          : window.speechSynthesis.getVoices();
        const greeting = new SpeechSynthesisUtterance('Hello!');
        const preferredFemaleVoice = voices.find((voice) => (
          /^en/i.test(voice.lang)
          && /zira|samantha|victoria|karen|moira|susan|hazel|aria|jenny|ava|serena|tessa|emma|sonia|libby|natasha|michelle|nicole|joanna|salli|female|google us english|english united states/i.test(voice.name)
        )) || voices.find((voice) => /^en[-_](us|gb|au|ca)/i.test(voice.lang));
        if (preferredFemaleVoice) {
          greeting.voice = preferredFemaleVoice;
        }
        greeting.rate = 0.82;
        greeting.pitch = 1.2;
        grandmaUtteranceRef.current = greeting;
        greeting.onend = () => {
          grandmaUtteranceRef.current = null;
        };
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(greeting);
        return true;
      };

      speakHello();
    }
  };

  const squawkFromMacaw = () => {
    showReaction('macaw');
    const macawAudio = macawAudioRef.current;
    if (!macawAudio) {
      return;
    }
    macawAudio.pause();
    macawAudio.currentTime = 0;
    macawAudio.play().catch(() => {});
  };

  const rustleTreeLeaves = () => {
    showReaction('tree');
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    const audioContext = new AudioContextClass();
    const duration = 1.25;
    const sampleCount = Math.ceil(audioContext.sampleRate * duration);
    const buffer = audioContext.createBuffer(1, sampleCount, audioContext.sampleRate);
    const samples = buffer.getChannelData(0);
    let smoothedNoise = 0;

    for (let index = 0; index < sampleCount; index += 1) {
      smoothedNoise = (smoothedNoise * 0.78) + (((Math.random() * 2) - 1) * 0.22);
      const flutter = 0.45 + (0.55 * Math.sin(index * 0.013) ** 2);
      samples[index] = smoothedNoise * flutter;
    }

    const source = audioContext.createBufferSource();
    const highPass = audioContext.createBiquadFilter();
    const lowPass = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    source.buffer = buffer;
    highPass.type = 'highpass';
    highPass.frequency.value = 650;
    lowPass.type = 'lowpass';
    lowPass.frequency.value = 4200;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.13, audioContext.currentTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    source.connect(highPass);
    highPass.connect(lowPass);
    lowPass.connect(gain);
    gain.connect(audioContext.destination);
    source.start();
    source.stop(audioContext.currentTime + duration);
    window.setTimeout(() => audioContext.close(), 1500);
  };

  useEffect(() => {
    if (rabbitStage === 'hopping') {
      const timeoutId = window.setTimeout(() => setRabbitStage('at-hole'), 1050);
      return () => window.clearTimeout(timeoutId);
    }

    if (rabbitStage === 'descending') {
      const timeoutId = window.setTimeout(onEnterTunnel, 1800);
      return () => window.clearTimeout(timeoutId);
    }

    return undefined;
  }, [rabbitStage, onEnterTunnel]);

  return (
    <main className={`start-page ${rabbitStage === 'hopping' ? 'following' : ''} ${rabbitStage === 'at-hole' ? 'rabbit-at-hole' : ''}`}>
      <section className="start-scene" aria-label="Grandma, a macaw, and a rabbit beside a rabbit hole">
        <picture className="start-scene-picture">
          <source
            media="(max-width: 600px) and (orientation: portrait)"
            srcSet="/pages/start-page/portrait-character-free-background.png"
          />
          <img
            className="start-scene-art"
            src={rabbitStage === 'waiting'
              ? '/pages/start-page/rabbit-hole-start-grandma-rest.png'
              : '/pages/start-page/rabbit-hole-start-empty-hole.png'}
            alt="Grandma standing beside a tree with Cracker the macaw, while a white rabbit waits beside its rabbit hole"
          />
        </picture>
        {!reactions.grandma ? (
          <img className="portrait-reaction-overlay grandma-portrait-rest portrait-scene-layer" src="/pages/start-page/grandma-portrait-rest-overlay.png" alt="" aria-hidden="true" />
        ) : null}
        {!reactions.macaw ? (
          <img className="portrait-reaction-overlay cracker-portrait-rest portrait-scene-layer" src="/pages/start-page/cracker-portrait-rest-overlay.png" alt="" aria-hidden="true" />
        ) : null}
        {rabbitStage === 'waiting' ? (
          <img className="portrait-reaction-overlay rabbit-portrait-rest portrait-scene-layer" src="/pages/start-page/rabbit-portrait-rest-overlay.png" alt="" aria-hidden="true" />
        ) : null}
        {rabbitStage === 'hopping' ? (
          <>
            <img className="rabbit-runner desktop-scene-layer" src="/pages/start-page/rabbit-runner.png" alt="" aria-hidden="true" />
            <img className="rabbit-runner portrait-rabbit-runner portrait-scene-layer" src="/pages/start-page/rabbit-portrait-run-overlay.png" alt="" aria-hidden="true" />
          </>
        ) : null}
        {reactions.grandma ? (
          <>
            <img className="start-scene-art grandma-wave-scene desktop-scene-layer" src="/pages/start-page/rabbit-hole-start-grandma-wave.png" alt="" aria-hidden="true" />
            <img className="portrait-reaction-overlay grandma-portrait-wave portrait-scene-layer" src="/pages/start-page/grandma-portrait-wave-overlay.png" alt="" aria-hidden="true" />
          </>
        ) : null}
        {reactions.macaw ? (
          <>
            <img className="start-scene-art macaw-fluff-scene desktop-scene-layer" src="/pages/start-page/rabbit-hole-start-macaw-fluff.png" alt="" aria-hidden="true" />
            <img className="portrait-reaction-overlay cracker-portrait-fluff portrait-scene-layer" src="/pages/start-page/cracker-portrait-fluff-overlay.png" alt="" aria-hidden="true" />
          </>
        ) : null}
        {reactions.tree ? (
          <>
            <img className="start-scene-art tree-rustle-scene desktop-scene-layer" src="/pages/start-page/rabbit-hole-start-grandma-rest.png" alt="" aria-hidden="true" />
            <img
              className="start-scene-art tree-rustle-scene portrait-tree-rustle portrait-scene-layer"
              src="/pages/start-page/portrait-character-free-background.png"
              alt=""
              aria-hidden="true"
            />
          </>
        ) : null}
        <button type="button" className="character-hotspot tree-leaves-hotspot" onClick={rustleTreeLeaves} aria-label="Tap the green leaves to make them rustle" />
        <button type="button" className="character-hotspot grandma-hotspot" onClick={greetFromGrandma} aria-label="Tap Grandma to hear her say hello" />
        <button type="button" className="character-hotspot macaw-hotspot" onClick={squawkFromMacaw} aria-label="Tap the macaw to hear it squawk" />
        <button
          type="button"
          className="follow-hotspot rabbit-hotspot"
          onClick={() => {
            setRabbitStage('hopping');
          }}
          disabled={rabbitStage !== 'waiting'}
          aria-label="Tap the rabbit to follow it"
        >
          {rabbitStage === 'waiting' ? <span className="hotspot-ring" aria-hidden="true" /> : null}
        </button>
        <button
          type="button"
          className="follow-hotspot rabbit-hole-hotspot"
          onClick={() => setRabbitStage('descending')}
          disabled={rabbitStage !== 'at-hole'}
          aria-label="Enter the rabbit hole"
        >
          {rabbitStage === 'at-hole' ? <span className="hotspot-ring" aria-hidden="true" /> : null}
        </button>
        {rabbitStage !== 'waiting' ? (
          <div className="follow-rabbit-message" aria-live="polite">Follow the Rabbit!</div>
        ) : null}
        {reactions.grandma ? <div className="scene-reaction grandma-reaction">Hello!</div> : null}
        {reactions.macaw ? <div className="scene-reaction macaw-reaction">SQUAWK!</div> : null}
      </section>
      {rabbitStage === 'descending' ? (
        <div className="rabbit-hole-fall" role="status" aria-label="Falling down the rabbit hole">
          <div className="rabbit-hole-spiral" aria-hidden="true">
            <span className="tunnel-ring ring-one" />
            <span className="tunnel-ring ring-two" />
            <span className="tunnel-ring ring-three" />
            <span className="tunnel-center" />
          </div>
          <div className="falling-message">Wheee!</div>
        </div>
      ) : null}
    </main>
  );
}

const BALL_READY_ENABLED = true;
const memoryPictures = [
  { value: 'parrot', picture: '🦜', label: 'Colorful parrot' },
  { value: 'fish', picture: '🐠', label: 'Tropical fish' },
  { value: 'frog', picture: '🐸', label: 'Green frog' },
  { value: 'fox', picture: '🦊', label: 'Orange fox' },
  { value: 'rabbit', picture: '🐇', label: 'White rabbit' },
  { value: 'turtle', picture: '🐢', label: 'Green turtle' },
  { value: 'lion', picture: '🦁', label: 'Friendly lion' },
  { value: 'whale', picture: '🐳', label: 'Blue whale' },
  { value: 'bear', picture: '🐻', label: 'Brown bear' },
  { value: 'bee', picture: '🐝', label: 'Busy bee' },
  { value: 'owl', picture: '🦉', label: 'Wise owl' },
  { value: 'penguin', picture: '🐧', label: 'Happy penguin' },
];

const memoryLevels = Array.from({ length: 10 }, (_, index) => ({
  level: index + 1,
  pairs: index + 3,
}));

function makeMemoryDeck(pairCount) {
  return memoryPictures.slice(0, pairCount)
    .flatMap((item) => [0, 1].map((copy) => ({ ...item, id: `${item.value}-${copy}` })))
    .sort(() => Math.random() - 0.5);
}

function MemoryGame({ onExit, family }) {
  const unlockedLevel = Math.min(memoryLevels.length, family?.child?.memoryUnlockedLevel || 1);
  const completedLevels = family?.child?.memoryCompletedLevels || [];
  const [level, setLevel] = useState(unlockedLevel);
  const pairCount = memoryLevels[level - 1].pairs;
  const [cards, setCards] = useState(() => makeMemoryDeck(pairCount));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [turns, setTurns] = useState(0);
  const rewardRequested = useRef(new Set());

  useEffect(() => {
    if (flipped.length !== 2) return undefined;

    const [firstId, secondId] = flipped;
    const firstCard = cards.find((card) => card.id === firstId);
    const secondCard = cards.find((card) => card.id === secondId);
    const isMatch = firstCard.value === secondCard.value;

    const matchTimer = window.setTimeout(() => {
      if (isMatch) setMatched((current) => [...current, firstCard.value]);
      setFlipped([]);
    }, isMatch ? 500 : 850);

    return () => window.clearTimeout(matchTimer);
  }, [cards, flipped]);

  const turnCard = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.value)) return;
    setFlipped((current) => {
      const next = [...current, card.id];
      if (next.length === 2) setTurns((count) => count + 1);
      return next;
    });
  };

  const startLevel = (nextLevel) => {
    setLevel(nextLevel);
    setCards(makeMemoryDeck(memoryLevels[nextLevel - 1].pairs));
    setFlipped([]);
    setMatched([]);
    setTurns(0);
  };

  const gameWon = matched.length === pairCount;
  const levelAlreadyCompleted = completedLevels.includes(level);

  useEffect(() => {
    if (!gameWon || levelAlreadyCompleted || rewardRequested.current.has(level)) return;
    rewardRequested.current.add(level);
    family?.awardMemoryLevel(level, memoryLevels.length)
      .catch(() => rewardRequested.current.delete(level));
  }, [family, gameWon, level, levelAlreadyCompleted]);

  return (
    <main className="memory-game-page">
      <button type="button" className="memory-back-button" onClick={onExit}>← Back to Tunnel</button>
      <header className="memory-game-heading">
        <p>Left Tunnel Two</p>
        <h1>Memory Match</h1>
        <span>Level {level} · Find {pairCount} matching pairs!</span>
      </header>
      <nav className="rabbit-maze-progress" aria-label="Rabbit grass maze level progress">
        <div className="maze-grass-path" aria-hidden="true" />
        {memoryLevels.map((item) => {
          const locked = item.level > unlockedLevel;
          const complete = completedLevels.includes(item.level);
          const milestone = item.level % 5 === 0;
          return (
            <button type="button" key={item.level} disabled={locked} className={(item.level === level ? 'current ' : '') + (complete ? 'complete' : '')} onClick={() => startLevel(item.level)} aria-label={(locked ? 'Locked' : complete ? 'Completed' : 'Available') + ' level ' + item.level}>
              <span aria-hidden="true">{item.level === level ? '🐇' : complete ? '🥕' : locked ? '🔒' : milestone ? '✨' : '🌼'}</span>
              <strong>Level {item.level}</strong>
              {milestone ? <small>Gold</small> : null}
            </button>
          );
        })}
      </nav>
      <section className="memory-card-grid" aria-label="Memory matching cards">
        {cards.map((card) => {
          const isFaceUp = flipped.includes(card.id) || matched.includes(card.value);
          return (
            <button
              type="button"
              className={`memory-card ${isFaceUp ? 'memory-card-up' : ''} ${matched.includes(card.value) ? 'memory-card-matched' : ''}`}
              key={card.id}
              onClick={() => turnCard(card)}
              aria-label={isFaceUp ? card.label : 'Hidden memory card'}
            >
              <span className="memory-card-inner">
                <span className="memory-card-back" aria-hidden="true">?</span>
                <span className="memory-card-front" aria-hidden="true">{card.picture}</span>
              </span>
            </button>
          );
        })}
      </section>
      <div className="memory-game-status" aria-live="polite">
        {gameWon ? <strong>{levelAlreadyCompleted ? 'You matched them all again!' : level % 5 === 0 ? 'Level complete · carrot + gold carrot!' : 'Level complete · 1 carrot earned!'}</strong> : <span>Matches: {matched.length} of {pairCount}</span>}
        <span>Turns: {turns}</span>
      </div>
      {gameWon ? <div className="memory-rabbit-win"><img src="/pages/start-page/rabbit-runner.png" alt="A happy rabbit eating its carrot reward" /><span aria-hidden="true">🥕</span><strong>Crunch! Great matching!</strong></div> : null}
      <button type="button" className="memory-restart-button" onClick={() => startLevel(gameWon && level < memoryLevels.length ? level + 1 : level)}>{gameWon && level < memoryLevels.length ? 'Play Next Level!' : gameWon ? 'Replay This Level' : 'Mix the Cards'}</button>
    </main>
  );
}

const tookieStoryPages = [
  {
    image: '/pages/tookie-book/pages-3-4.png',
    alt: 'Tookie calmly watches the toddlers and guards the stairs',
    text: 'Tookie was the Official Baby Watcher. When Theo tugged her tail, she gave a gentle mew and walked away. When Mabel toddled toward the stairs, Tookie became a furry little gate.',
  },
  {
    image: '/pages/tookie-book/pages-5-6.png',
    alt: 'Tookie sits patiently while the toddlers play with toys',
    text: 'When blocks tumbled everywhere, Tookie stayed patient. Her steady purr softened the loudest wiggles until the whole room felt calm.',
  },
  {
    image: '/pages/tookie-book/pages-7-9.png',
    alt: 'Tookie naps safely between two sleeping toddlers',
    text: 'At naptime, Tookie purred her lullaby. One by one, the children fell asleep. She stayed beside them until morning, curled up like a promise kept.',
  },
];

const wafflesStoryPages = [
  {
    image: '/pages/waffles-book/breakfast.png',
    alt: 'Waffles considers clover, a dandelion, and a suspicious mushroom for breakfast',
    text: 'One sunny morning, Waffles woke with a very noisy tummy. Clover was too leafy. The dandelion was too yellow. Then a mushroom appeared to stare back at him. “Nope,” said Waffles, hopping away very quickly.',
  },
  {
    image: '/pages/waffles-book/berry-warning.png',
    alt: 'Pip warns Waffles not to eat the enormous red berry',
    text: 'Waffles found the biggest, reddest berry he had ever seen. “DON’T EAT THAT!” cried a tiny blue bird. Her name was Pip. She explained that the suspicious berry would make his tummy hurt.',
  },
  {
    image: '/pages/waffles-book/puddle.png',
    alt: 'A dripping wet Waffles climbs out of a puddle while Pip tries not to laugh',
    text: 'Pip offered to find him a safe breakfast. She flew over a log and across a puddle. Waffles jumped across it—mostly. SPLASH! “You look like a mop,” said Pip. “I am a majestic forest rabbit,” said Waffles.',
  },
  {
    image: '/pages/waffles-book/strawberries.png',
    alt: 'Pip playfully removes a dab of strawberry from Waffles nose',
    text: 'Then Pip found wild strawberries. Waffles’ ears stood straight up. “I think I have found true love.” Soon his cheeks were full and strawberry covered his nose. Pip pecked it away and flew off laughing.',
  },
  {
    image: '/pages/waffles-book/friends.png',
    alt: 'Waffles and Pip head down a sunny woodland path together',
    text: 'Still hungry, Waffles followed Pip to find lunch. “Are you sure you know what you’re doing?” he asked. “Absolutely not,” Pip said. “Perfect!” And off went two new friends with absolutely no plan at all.',
  },
];

const acornEmergencyStoryPages = [
  {
    image: '/pages/waffles-book-2/acorn-bonks.png',
    alt: 'Falling acorns surprise Waffles while Pip laughs beneath the oak tree',
    text: 'Pip woke with a feeling that something was wrong. BONK! An acorn landed on Waffles’ head. Then another bounced off his bottom. Pip laughed so hard she fell from her branch. Waffles glared up. “This tree has declared war.”',
  },
  {
    image: '/pages/waffles-book-2/leaf-carrier.png',
    alt: 'Pip pulls and Waffles pushes a giant leaf loaded with acorns',
    text: 'Acorns covered the path, the bushes, and even Waffles’ head. “We have an acorn emergency,” he announced. To stop anyone else from getting bonked, Pip and Waffles piled the acorns onto a giant leaf. Pip pulled. Waffles pushed. The heavy leaf moved one tiny inch.',
  },
  {
    image: '/pages/waffles-book-2/leaf-rip.png',
    alt: 'The giant leaf tears and sends acorns flying into a puddle and bushes',
    text: 'They pulled harder. They pushed harder. Then—RIIIIIP! The leaf tore in half and acorns flew everywhere. One went PLOP into a puddle. One went POOF into a bush. One landed between Waffles’ ears. “Do not laugh,” he told Pip. She laughed anyway—and soon Waffles did too.',
  },
  {
    image: '/pages/waffles-book-2/meet-squirrel.png',
    alt: 'Waffles and Pip apologize to a worried squirrel beside his scattered acorns',
    text: 'A tiny voice said, “Excuse me!” A squirrel popped out from behind the log and stared at the mess. They were his winter acorns! Waffles whispered, “We may have made the emergency worse.” Pip promised they could fix it. “We are excellent fixers,” said Waffles. “We are... acceptable fixers,” said Pip.',
  },
  {
    image: '/pages/waffles-book-2/acorn-pile.png',
    alt: 'Pip, Waffles, and their squirrel friend happily rebuild the acorn pile',
    text: 'The three friends gathered every acorn. Pip searched from above, the squirrel carried them in his cheeks, and Waffles pushed them with his nose. At last, the winter pile was perfect. Then—BONK! One more acorn landed on Waffles. Pip led everyone away to find dinner while Waffles kept a very close eye on that tree.',
  },
];

// Book collection map: add future Waffles and Pip releases to `books` below.
// A book becomes readable when `readerKey` matches an entry in storyBooksById.
const storyBooksById = {
  'waffles-and-pip-5': wafflesBook5,
  'waffles-and-pip-3': wafflesBook3,
  'waffles-and-pip-4': wafflesBook4,
  tookie: {
    title: 'Tookie the Babysitter Cat',
    cover: '/pages/tookie-book/cover.png',
    pages: tookieStoryPages,
  },
  'waffles-and-pip-1': {
    title: 'Waffles the White Rabbit and the Very Suspicious Berry',
    cover: '/pages/waffles-book/cover.png',
    pages: wafflesStoryPages,
  },
  'waffles-and-pip-2': {
    title: 'Pip and Waffles and the Great Acorn Emergency',
    cover: '/pages/waffles-book-2/cover.png',
    pages: acornEmergencyStoryPages,
  },
};

const WAFFLES_ADDITION_ID = 'waffles-and-pip-books-3-4';

const bookCollections = {
  wafflesAndPip: {
    id: 'waffles-and-pip',
    title: 'Waffles and Pip',
    shelfTitle: 'Waffles and Pip Adventures',
    artwork: '/pages/waffles-book/waffles-pip-adventures.png',
    artworkAlt: 'Waffles the white rabbit and Pip the blue bird',
    books: [
      {
        id: 'waffles-and-pip-book-5',
        number: 5,
        title: 'The Pig Who Wasn’t Bacon',
        cover: wafflesBook5.cover,
        coverAlt: wafflesBook5.title,
        readerKey: 'waffles-and-pip-5',
        available: true,
      },
      ...[wafflesBook3, wafflesBook4].map((book, index) => ({
        id: `waffles-and-pip-book-${index + 3}`,
        number: index + 3,
        title: index === 0 ? 'The Missing Carrot Mystery' : 'Investigate the Garden',
        cover: book.cover,
        coverAlt: book.title,
        readerKey: `waffles-and-pip-${index + 3}`,
        available: true,
        unlockItem: WAFFLES_ADDITION_ID,
      })),
      {
        id: 'waffles-and-pip-book-1',
        number: 1,
        title: 'The Very Suspicious Berry',
        cover: '/pages/waffles-book/cover.png',
        coverAlt: 'Waffles and Pip beside a suspicious berry',
        readerKey: 'waffles-and-pip-1',
        available: true,
      },
      {
        id: 'waffles-and-pip-book-2',
        number: 2,
        title: 'The Great Acorn Emergency',
        cover: '/pages/waffles-book-2/cover.png',
        coverAlt: 'Waffles the white rabbit and Pip the blue bird in the forest',
        manuscript: '/content/pip-and-waffles/great-acorn-emergency.txt',
        readerKey: 'waffles-and-pip-2',
        available: true,
      },
    ],
  },
};

const tunnelSlots = Object.freeze({
  outerLeft1: 'outer-left-1',
  outerLeft2: 'outer-left-2',
  outerRight1: 'outer-right-1',
  outerRight2: 'outer-right-2',
  deepLeft1: 'deep-left-1',
  deepLeft2: 'deep-left-2',
  deepRight1: 'deep-right-1',
  deepRight2: 'deep-right-2',
});

const deepTunnelDoors = [
  { slot: tunnelSlots.deepLeft1, name: 'Deep Left 1', activity: 'memory' },
  { slot: tunnelSlots.deepLeft2, name: 'Deep Left 2', activity: 'books' },
  { slot: tunnelSlots.deepRight2, name: 'Deep Right 2', activity: 'locked' },
  { slot: tunnelSlots.deepRight1, name: 'Deep Right 1', activity: 'lily' },
];

function BooksPage({ onExit, family }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [pageIndex, setPageIndex] = useState(-1);
  const [message, setMessage] = useState('');
  const [confirmAddition, setConfirmAddition] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const purchaseInFlight = useRef(false);
  const additionUnlocked = (family?.child?.ownedItems || []).includes(WAFFLES_ADDITION_ID);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedBook, selectedSeries, pageIndex]);

  const unlockAddition = async () => {
    if (purchaseInFlight.current) return;
    purchaseInFlight.current = true;
    setPurchasing(true);
    setMessage('');
    try {
      if (!family?.purchaseItem) throw new Error('Choose a child profile to unlock these books.');
      if (!additionUnlocked && (family.child?.goldCarrots || 0) < 1) {
        throw new Error('You need 1 gold carrot to unlock both books.');
      }
      const purchased = await family.purchaseItem(WAFFLES_ADDITION_ID, 0, 1);
      if (!purchased) throw new Error('Choose a child profile to unlock these books.');
      setConfirmAddition(false);
      setMessage('Books 3 and 4 are unlocked!');
    } catch (error) {
      setMessage(error.message || 'Could not unlock the books. Please try again.');
    } finally {
      purchaseInFlight.current = false;
      setPurchasing(false);
    }
  };

  const additionDialog = confirmAddition ? (
    <PurchaseConfirmationDialog
      icon={'\uD83E\uDD55'}
      title="Unlock Books 3 & 4?"
      message={message || 'Get The Missing Carrot Mystery and Investigate the Garden together for 1 gold carrot.'}
      confirmLabel="1 gold carrot"
      busy={purchasing}
      onCancel={() => { setConfirmAddition(false); setMessage(''); }}
      onConfirm={unlockAddition}
    />
  ) : null;

  if (selectedBook && (!['waffles-and-pip-3', 'waffles-and-pip-4'].includes(selectedBook) || additionUnlocked)) {
    const book = storyBooksById[selectedBook];
    const storyPages = book.pages;
    const cover = book.cover;
    const title = book.title;
    const isCover = pageIndex < 0;
    const page = storyPages[Math.max(0, pageIndex)];
    return (
      <main className="story-book-page">
        <button type="button" className="story-back-button" onClick={() => { setSelectedBook(null); setPageIndex(-1); }}>
          <span aria-hidden="true">&#8617;</span> Book Choices
        </button>
        <section className="tookie-reader" aria-label={`${title} picture book`}>
          {isCover ? (
            <button type="button" className="tookie-cover-button" onClick={() => setPageIndex(0)} aria-label={`Open ${title}`}>
              <img src={cover} alt={`${title} book cover`} />
              <span>Tap to open</span>
            </button>
          ) : (
            <article className="tookie-story-card">
              <img src={page.image} alt={page.alt} />
              <div className="tookie-story-text">
                <p>{page.text}</p>
                {pageIndex === storyPages.length - 1 && !page.text.trim().endsWith('The End') ? <strong>The End</strong> : null}
              </div>
            </article>
          )}
        </section>
        {!isCover ? (
          <nav className="story-page-controls" aria-label="Story pages">
            <button type="button" disabled={pageIndex === 0} onClick={() => setPageIndex((index) => index - 1)}>Back</button>
            <span>{pageIndex + 1} of {storyPages.length}</span>
            <button type="button" disabled={pageIndex === storyPages.length - 1} onClick={() => setPageIndex((index) => index + 1)}>Next</button>
          </nav>
        ) : null}
      </main>
    );
  }

  if (selectedSeries) {
    const collection = Object.values(bookCollections).find((item) => item.id === selectedSeries);
    return (
      <main className="books-choice-page">
        <button type="button" className="story-back-button" onClick={() => { setSelectedSeries(null); setMessage(''); }}>
          <span aria-hidden="true">&#8617;</span> All Books
        </button>
        <header>
          <p>Adventure Books</p>
          <h1>{collection.title}</h1>
        </header>
        <section className="book-picture-choices waffles-pip-book-choices" aria-label="Choose a Waffles and Pip adventure">
          {[...collection.books].sort((a, b) => a.number - b.number).map((book) => (
            <button
              type="button"
              className={`book-picture-choice ${book.available ? '' : 'series-book-coming-soon'}`}
              key={book.id}
              disabled={!book.available}
              onClick={() => {
                if (book.unlockItem && !additionUnlocked) { setMessage(''); setConfirmAddition(true); return; }
                setSelectedBook(book.readerKey); setPageIndex(-1);
              }}
              aria-label={`${book.unlockItem && !additionUnlocked ? 'Unlock Books 3 and 4 for 1 gold carrot:' : 'Open'} ${collection.title} Book ${book.number}, ${book.title}`}
            >
              <img src={book.cover} alt={book.coverAlt} />
              {book.unlockItem && !additionUnlocked ? <span className="book-series-count">Locked · 2 books / 1 gold carrot</span> : null}
              <strong>Book {book.number}</strong>
              <small>{book.title}{book.available ? '' : ' — Coming Soon'}</small>
            </button>
          ))}
        </section>
        <p className="book-choice-message" aria-live="polite">{message}</p>
        {additionDialog}
      </main>
    );
  }

  return (
    <main className="books-choice-page">
      <button type="button" className="story-back-button" onClick={onExit}><span aria-hidden="true">&#8617;</span> Tunnel</button>
      <header>
        <p>Pick a picture</p>
        <h1>Books</h1>
      </header>
      <section className="book-picture-choices" aria-label="Choose a picture book">
        <button type="button" className="book-picture-choice" onClick={() => setSelectedBook('tookie')}>
          <img src="/pages/tookie-book/cover.png" alt="Orange cat" />
          <strong>Cat</strong>
        </button>
        <button type="button" className="book-picture-choice" onClick={() => setSelectedSeries(bookCollections.wafflesAndPip.id)} aria-label={`Open ${bookCollections.wafflesAndPip.shelfTitle}`}>
          <span className="book-series-count">{bookCollections.wafflesAndPip.books.length}-Book Series</span>
          <img src={bookCollections.wafflesAndPip.artwork} alt={bookCollections.wafflesAndPip.artworkAlt} />
          <strong>{bookCollections.wafflesAndPip.shelfTitle}<span className="book-addition-caption">{additionUnlocked ? 'Books 3 & 4 unlocked' : 'Books 3 & 4 · 2 books for 1 gold carrot'}</span></strong>
        </button>
        <button type="button" className="book-picture-choice locked-book-choice" disabled aria-label="Locked book">
          <span aria-hidden="true">&#128274;</span>
        </button>
      </section>
      <button type="button" className="book-addition-offer" onClick={() => {
        if (additionUnlocked) setSelectedSeries(bookCollections.wafflesAndPip.id);
        else { setMessage(''); setConfirmAddition(true); }
      }}>
        <strong>Waffles and Pip · Books 3 &amp; 4</strong>
        <span>{additionUnlocked ? 'Both books unlocked — Read now' : '2-book addition · 1 gold carrot to unlock both'}</span>
      </button>
      <p className="book-choice-message" aria-live="polite">{message}</p>
      {additionDialog}
    </main>
  );
}

function PurchaseConfirmationDialog({ icon, title, message, confirmLabel, cancelLabel, busy, busyLabel = 'Purchasing...', noticeActionLabel, onNoticeAction, onCancel, onConfirm }) {
  return (
    <div className="purchase-confirmation-backdrop" role="presentation">
      <section className="purchase-confirmation-dialog" role="dialog" aria-modal="true" aria-labelledby="purchase-confirmation-title">
        <span className="purchase-confirmation-icon" aria-hidden="true">{icon}</span>
        <h2 id="purchase-confirmation-title">{title}</h2>
        <p>{message}</p>
        <div className="purchase-confirmation-actions">
          {onConfirm ? (
            <>
              <button type="button" onClick={onCancel} disabled={busy}>{cancelLabel || 'Not yet'}</button>
              <button type="button" className="confirm" onClick={onConfirm} disabled={busy}>
                {busy ? busyLabel : confirmLabel}
              </button>
            </>
          ) : (
            <>
              <button type="button" className="leave" onClick={onCancel}>{cancelLabel || 'Leave'}</button>
              {onNoticeAction ? <button type="button" className="ask-parent" onClick={onNoticeAction}>{noticeActionLabel}</button> : null}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function TunnelPage({ family, onOpenColoring, onOpenMemory, onOpenBallReady, onOpenBooks, onGoHome }) {
  const [deepTunnelStage, setDeepTunnelStage] = useState('waiting');

  const [booksMessage, setBooksMessage] = useState('');
  const [unlockingBooks, setUnlockingBooks] = useState(false);
  const [confirmBooksPurchase, setConfirmBooksPurchase] = useState(false);
  const [booksParentNotice, setBooksParentNotice] = useState(false);
  const booksUnlocked = (family?.child?.ownedItems || []).includes('books-tunnel');

  const openOrUnlockBooks = async () => {
    if (booksUnlocked) {
      onOpenBooks();
      return;
    }
    if ((family?.child?.carrots || 0) < 2) {
      setBooksMessage('Go play another activity and earn some more!');
      return;
    }
    setBooksMessage('');
    setConfirmBooksPurchase(true);
  };

  const purchaseBooks = async () => {
    setUnlockingBooks(true);
    setBooksMessage('');
    try {
      await family.purchaseItem('books-tunnel', 2, 0);
      setConfirmBooksPurchase(false);
      onOpenBooks();
    } catch (error) {
      setBooksMessage(error.message || 'Books could not be unlocked yet.');
    } finally {
      setUnlockingBooks(false);
    }
  };

  useEffect(() => {
    if (deepTunnelStage !== 'traveling' && deepTunnelStage !== 'returning') return undefined;

    const travelTimer = window.setTimeout(() => {
      setDeepTunnelStage(deepTunnelStage === 'traveling' ? 'revealed' : 'waiting');
    }, 1450);

    return () => window.clearTimeout(travelTimer);
  }, [deepTunnelStage]);

  return (
    <main className={`tunnel-page deep-tunnel-${deepTunnelStage}`}>
      <div className="deeper-tunnel-background" aria-hidden="true" />
      <button type="button" className="tunnel-home-button" onClick={onGoHome}>
        <span aria-hidden="true">←</span> Outside
      </button>
      <header className="tunnel-heading">
        <p>Welcome down the rabbit hole!</p>
        <h1>Pick a Tunnel</h1>
      </header>
      <div className="tunnel-viewport">
      <div className="tunnel-scene">
      <div className="deeper-tunnel-background" aria-hidden="true" />
      <section className="activity-doors" aria-label="Activity rabbit holes">
        <button type="button" className="activity-door tunnel-entrance outer-tunnel-entrance tunnel-slot-outer-left-1 coloring-door" data-tunnel-name="Outer Left 1" onClick={onOpenColoring} aria-label="Enter Outer Left 1 to open the Coloring Book">
          <span className="door-icon" aria-hidden="true">📖</span>
          <strong>Coloring Book</strong>
          <span className="door-knob" aria-hidden="true" />
        </button>
        <a
          className="activity-door tunnel-entrance outer-tunnel-entrance tunnel-slot-outer-right-1 watch-shows-door"
          data-tunnel-name="Outer Right 1"
          href="https://tubitv.com/category/preschool"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch Shows on Tubi preschool, opens in a new tab"
        >
          <span className="watch-shows-icon" aria-hidden="true"><span>📺</span></span>
          <strong>Watch Shows</strong>
        </a>
        <button
          type="button"
          className="activity-door tunnel-entrance outer-tunnel-entrance tunnel-slot-outer-left-2 memory-door"
          data-tunnel-name="Outer Left 2"
          onClick={onOpenMemory}
          aria-label="Enter Outer Left 2 to play Memory Match"
        >
          <span className="memory-door-icon" aria-hidden="true">🧠</span>
          <strong>Memory</strong>
        </button>
        {BALL_READY_ENABLED ? <button type="button" className="activity-door tunnel-entrance outer-tunnel-entrance tunnel-slot-outer-right-2 locked-door ball-ready-door" data-tunnel-name="Outer Right 2" onClick={onOpenBallReady} aria-label="Enter Outer Right 2 to help Lily">
          <span className="door-lock" aria-hidden="true">👗</span>
          <strong>Help Lily</strong>
        </button> : null}
      </section>
      <button
        type="button"
        className="deep-tunnel-hotspot"
        onClick={() => setDeepTunnelStage('traveling')}
        disabled={deepTunnelStage !== 'waiting'}
        aria-label="Follow the rabbit deeper down the tunnel"
      >
        <span>Go deeper!</span>
      </button>
      <section className="deeper-door-locks" aria-label="Activity tunnel entrances">
        {deepTunnelDoors.map((door) => door.activity === 'memory' ? (
          <button
            type="button"
            className={`deeper-door-lock tunnel-entrance tunnel-slot-${door.slot} deep-activity-entrance memory-tunnel-entrance`}
            key={door.slot}
            data-tunnel-slot={door.slot}
            data-tunnel-name={door.name}
            onClick={onOpenMemory}
            aria-label="Enter deep tunnel one on the left to play Memory Match"
          >
            <span aria-hidden="true">🧠</span>
            <strong>Memory</strong>
          </button>
        ) : door.activity === 'books' ? (
          <button
            type="button"
            className={`deeper-door-lock tunnel-entrance tunnel-slot-${door.slot} deep-activity-entrance books-tunnel-entrance${booksUnlocked ? '' : ' books-tunnel-locked'}`}
            key={door.slot}
            data-tunnel-slot={door.slot}
            data-tunnel-name={door.name}
            onClick={openOrUnlockBooks}
            disabled={unlockingBooks}
            aria-label={booksUnlocked ? 'Enter deep tunnel two on the left to choose a book' : 'Spend 2 carrots to unlock Books'}
          >
            <span aria-hidden="true">{booksUnlocked ? '\uD83D\uDCDA' : '\uD83D\uDD12'}</span>
            <strong>Books</strong>
            {!booksUnlocked ? <small className="books-unlock-cost">{'\uD83E\uDD55 2'}</small> : null}
          </button>
        ) : door.activity === 'lily' ? (
          <button
            type="button"
            className={`deeper-door-lock tunnel-entrance tunnel-slot-${door.slot} deep-activity-entrance lily-tunnel-entrance`}
            key={door.slot}
            data-tunnel-slot={door.slot}
            data-tunnel-name={door.name}
            onClick={onOpenBallReady}
            aria-label="Enter the first deep tunnel on the right to help Lily"
          >
            <span aria-hidden="true">👧</span>
            <strong>Help Lily</strong>
          </button>
        ) : (
          <button
            type="button"
            className={`deeper-door-lock tunnel-entrance tunnel-slot-${door.slot}`}
            key={door.slot}
            data-tunnel-slot={door.slot}
            data-tunnel-name={door.name}
            disabled
            aria-label={`${door.name} tunnel entrance is locked`}
          >
            <span aria-hidden="true">&#128274;</span>
          </button>
        ))}
      </section>
      {booksMessage ? (
        <PurchaseConfirmationDialog
          icon="🥕"
          title="You need 2 carrots"
          message={booksMessage}
          onCancel={() => setBooksMessage('')}
          noticeActionLabel="Ask Parent"
          onNoticeAction={() => { setBooksMessage(''); setBooksParentNotice(true); }}
        />
      ) : null}
      {booksParentNotice ? (
        <PurchaseConfirmationDialog
          icon="⭐"
          title="Ask a Parent"
          message="The parent shop is coming soon!"
          onCancel={() => setBooksParentNotice(false)}
        />
      ) : null}
      {confirmBooksPurchase ? (
        <PurchaseConfirmationDialog
          icon="📚"
          title="Unlock Books?"
          message="Costs 2 carrots"
          confirmLabel="🥕 Unlock"
          busy={unlockingBooks}
          busyLabel="Unlocking..."
          onCancel={() => setConfirmBooksPurchase(false)}
          onConfirm={purchaseBooks}
        />
      ) : null}
      <img className="tunnel-guide-rabbit" src="/pages/start-page/rabbit-runner.png" alt="The white rabbit waits beside the activity rabbit holes" />
      </div>
      </div>
      <div className="tunnel-decoration" aria-hidden="true" />
      {deepTunnelStage === 'revealed' ? (
        <button type="button" className="tunnel-back-one-button" onClick={() => setDeepTunnelStage('returning')}>
          <span aria-hidden="true">&#8617;</span> Back One Tunnel
        </button>
      ) : null}

    </main>
  );
}

const ballTasks = [
  { id: 'wash', label: 'Wash Face', icon: '🫧', free: true },
  { id: 'comb', label: 'Comb Hair', icon: '🪮', free: true },
  { id: 'bun', label: 'Make a Bun', icon: '💇‍♀️', free: true },
  { id: 'braids', label: 'Braids', icon: '🎀', carrots: 3, choice: 'hair' },
  { id: 'dress', label: 'Ball Dress', icon: '👗', carrots: 3 },
  { id: 'shoes', label: 'Ball Shoes', icon: '👠', carrots: 3 },
  { id: 'necklace', label: 'Necklace', icon: '📿', carrots: 4 },
  { id: 'bow', label: 'Hair Bow', icon: '🎀', carrots: 3 },
  { id: 'tiara', label: 'Tiara', icon: '👑', gold: 1 },
];

const ballLayerAssets = [
  { slot: 'dress', src: '/pages/ball-ready/layer-dress-canvas.png', bunSrc: '/pages/ball-ready/layer-dress-bun-canvas.png', label: 'Her lavender ball dress', layerClass: 'layer-dress' },
  { slot: 'shoes', src: '/pages/ball-ready/layer-shoes-canvas.png', bunSrc: '/pages/ball-ready/layer-shoes-bun-canvas.png', label: 'Her lavender ball shoes', layerClass: 'layer-shoes' },
  { slot: 'necklace', src: '/pages/ball-ready/layer-necklace-canvas.png', bunSrc: '/pages/ball-ready/layer-necklace-bun-canvas.png', label: 'Her purple heart necklace', layerClass: 'layer-necklace' },
  { slot: 'bow', src: '/pages/ball-ready/layer-bow-canvas.png', bunSrc: '/pages/ball-ready/layer-bow-bun-canvas.png', label: 'Her lavender hair bow', layerClass: 'layer-bow' },
  { slot: 'tiara', src: '/pages/ball-ready/layer-tiara-canvas.png', bunSrc: '/pages/ball-ready/layer-tiara-bun-canvas.png', label: 'Her silver and lavender tiara', layerClass: 'layer-tiara' },
];

function BallroomDancerOverlay({ side }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = new Image();
    image.onload = () => {
      const sourceWidth = image.naturalWidth / 2;
      canvas.width = sourceWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(image, side === 'left' ? 0 : sourceWidth, 0, sourceWidth, image.naturalHeight, 0, 0, sourceWidth, image.naturalHeight);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      for (let index = 0; index < pixels.data.length; index += 4) {
        const red = pixels.data[index];
        const green = pixels.data[index + 1];
        const blue = pixels.data[index + 2];
        const lightest = Math.max(red, green, blue);
        const darkest = Math.min(red, green, blue);
        if (darkest > 218 && lightest - darkest < 19) pixels.data[index + 3] = 0;
      }
      context.putImageData(pixels, 0, 0);
    };
    image.src = '/pages/ball-ready/ballroom-child-dancers-v1.png';
  }, [side]);

  return <canvas ref={canvasRef} className={`ballroom-dancers-overlay ${side}`} aria-label={`Children dancing to Lily's ${side}`} />;
}

function BallReady({ family, onExit }) {
  const emptyMakeover = { face: 'dirty', hairCare: 'messy', hairstyle: null, dress: false, shoes: false, necklace: false, bow: false, tiara: false };
  const [stage, setStage] = useState('adventure');
  const [done, setDone] = useState([]);
  const [makeover, setMakeover] = useState(emptyMakeover);
  const [message, setMessage] = useState('');
  const [finishing, setFinishing] = useState(false);
  const [washingFace, setWashingFace] = useState(false);
  const [combingHair, setCombingHair] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [pendingPurchase, setPendingPurchase] = useState(null);
  const [purchaseNotice, setPurchaseNotice] = useState(null);
  const [parentPurchaseNotice, setParentPurchaseNotice] = useState(false);
  const [purchasingItem, setPurchasingItem] = useState(false);
  const owned = family?.child?.ownedItems || [];
  const required = ['wash', 'comb', 'dress', 'shoes', 'necklace', 'tiara'];
  const ready = required.every((id) => done.includes(id)) && (done.includes('bun') || done.includes('braids'));

  const isTaskUnlocked = (taskId) => {
    if (taskId === 'wash' || taskId === 'comb') return true;
    if (taskId === 'bun') return done.includes('wash') && done.includes('comb');
    if (taskId === 'braids') return false;
    if (taskId === 'dress') return done.includes('bun') || done.includes('braids');
    if (taskId === 'shoes') return done.includes('dress');
    if (taskId === 'necklace') return done.includes('shoes');
    if (taskId === 'bow') return false;
    if (taskId === 'tiara') return done.includes('necklace');
    return false;
  };

  const applyItem = async (task) => {
    if (task.id === 'wash') {
      setWashingFace(true);
      await new Promise((resolve) => window.setTimeout(resolve, 1600));
      setMakeover((current) => ({ ...current, face: 'clean' }));
      setWashingFace(false);
    } else if (task.id === 'comb') {
      setCombingHair(true);
      await new Promise((resolve) => window.setTimeout(resolve, 1700));
      setMakeover((current) => ({ ...current, hairCare: 'combed' }));
      setCombingHair(false);
    } else {
      setActiveItem(task);
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      setMakeover((current) => task.id === 'bun' || task.id === 'braids'
        ? { ...current, hairstyle: task.id }
        : { ...current, [task.id]: true });
      setActiveItem(null);
    }
    setDone((current) => {
      const withoutOtherHair = task.choice === 'hair' ? current.filter((id) => id !== 'bun') : task.id === 'bun' ? current.filter((id) => id !== 'braids') : current;
      return withoutOtherHair.includes(task.id) ? withoutOtherHair : [...withoutOtherHair, task.id];
    });
  };

  const useItem = async (task) => {
    setMessage('');
    if (!isTaskUnlocked(task.id)) {
      setMessage('Finish the glowing steps first to unlock this item.');
      return;
    }
    if (!task.free && !owned.includes('ball-' + task.id)) {
      const currency = task.gold ? 'gold carrots' : 'carrots';
      const cost = task.gold || task.carrots || 0;
      const balance = task.gold ? (family?.child?.goldCarrots || 0) : (family?.child?.carrots || 0);
      if (balance < cost) {
        setPurchaseNotice({
          icon: task.gold ? '\uD83E\uDD55\u2728' : '\uD83E\uDD55',
          title: `You need ${cost} ${currency}`,
          message: 'Go play another activity and earn some more!',
        });
        return;
      }
      setPendingPurchase(task);
      return;
    }
    await applyItem(task);
  };

  const confirmItemPurchase = async () => {
    const task = pendingPurchase;
    if (!task) return;
    setPurchasingItem(true);
    setMessage('');
    try {
      await family.purchaseItem('ball-' + task.id, task.carrots || 0, task.gold || 0);
      setPendingPurchase(null);
      await applyItem(task);
    } catch (error) {
      setPendingPurchase(null);
      setPurchaseNotice({ icon: '\uD83E\uDD55', title: 'Not enough carrots yet', message: 'Go play another activity and earn some more!' });
    } finally {
      setPurchasingItem(false);
    }
  };

  const usesBunDressState = makeover.hairstyle === 'bun' && makeover.dress;
  const usesBunDressShoesState = usesBunDressState && makeover.shoes;
  const usesBunNecklaceState = usesBunDressShoesState && makeover.necklace;
  const usesBunTiaraState = usesBunNecklaceState && makeover.tiara;
  const gettingReadyImage = usesBunTiaraState
      ? '/pages/ball-ready/getting-ready-bun-elegant-complete-v1.png'
    : usesBunNecklaceState
    ? '/pages/ball-ready/getting-ready-bun-dress-shoes-necklace-v1.png'
    : usesBunDressShoesState
    ? '/pages/ball-ready/getting-ready-bun-dress-shoes-v1.png'
    : usesBunDressState
    ? '/pages/ball-ready/getting-ready-bun-dress-v1.png'
    : makeover.hairstyle === 'bun'
    ? '/pages/ball-ready/getting-ready-bun-v1.png'
    : makeover.hairCare === 'combed'
      ? makeover.face === 'clean' ? '/pages/ball-ready/getting-ready.png' : '/pages/ball-ready/getting-ready-combed-dirty.png'
      : makeover.face === 'clean' ? '/pages/ball-ready/getting-ready-clean-messy.png?v=2' : '/pages/ball-ready/getting-ready-messy.png';

  const finishGettingReady = async () => {
    setFinishing(true);
    setMessage('');
    try {
      await family.awardBallReadyCompletion();
      setStage('celebrating');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setFinishing(false);
    }
  };

  useEffect(() => {
    if (stage !== 'celebrating') return undefined;
    const ballroomTimer = window.setTimeout(() => setStage('finished'), 2400);
    return () => window.clearTimeout(ballroomTimer);
  }, [stage]);

  if (stage === 'adventure') return (
    <main className="ball-ready-page adventure-stage">
      <button type="button" className="memory-back-button" onClick={onExit}>← Back to Tunnel</button>
      <img src="/pages/ball-ready/getting-ready-messy.png" alt="Lily with a dirty face and messy hair asking for help" />
      <img className="lily-room-rabbit" src="/pages/start-page/rabbit-runner.png" alt="The little white rabbit sitting near Lily's mirror" />
      <div className="ball-dialogue lily-adventure-copy">
        <h1>Hi, I am Lily!</h1>
        <p>Help me on my adventures!</p>
      </div>
      <nav className="lily-adventure-grid" aria-label="Choose one of Lily's adventures">
        <button type="button" className="lily-adventure-panel available" onClick={() => setStage('dream')}>
          <span aria-hidden="true">👗</span>
          <strong>Get me to the ball</strong>
        </button>
        {[1, 2, 3].map((adventureNumber) => (
          <button type="button" className="lily-adventure-panel locked" disabled aria-label={`Future Lily adventure ${adventureNumber} locked`} key={adventureNumber}>
            <span aria-hidden="true">🔒</span>
          </button>
        ))}
      </nav>
    </main>
  );

  if (stage === 'dream') return (
    <main className="ball-ready-page dream-stage">
      <button type="button" className="memory-back-button" onClick={onExit}>← Back to Tunnel</button>
      <img src="/pages/ball-ready/ball-dream.png" alt="A girl dressed beautifully and ready for the ball" />
      <img className="ball-dream-rabbit" src="/pages/start-page/rabbit-runner.png" alt="The little white rabbit sitting near the mirror" />
      <div className="ball-dialogue ball-dream-copy"><h1>My Ball Dream!</h1><p>Will you help me get ready?</p><button type="button" onClick={() => setStage('ready')}>Let's help!</button></div>
    </main>
  );

  return (
    <main className="ball-ready-page ready-stage">
      <button type="button" className="memory-back-button" onClick={onExit}>← Back to Tunnel</button>
      <div className={'ball-character-canvas ' + (makeover.hairstyle === 'bun' ? 'bun-character-state' : '')}>
      <img src={stage === 'finished' ? '/pages/ball-ready/lily-ballroom-v1.png' : gettingReadyImage} alt={stage === 'finished' ? 'Lily fully dressed at the royal ball' : 'Lily showing every makeover choice selected so far'} />
      {stage === 'finished' ? <>
        <BallroomDancerOverlay side="left" />
        <BallroomDancerOverlay side="right" />
        <img className="ballroom-rabbit" src="/pages/start-page/rabbit-runner.png" alt="The little white rabbit enjoying the ball" />
      </> : null}
      {stage !== 'finished' && !makeover.dress ? <img className="ready-room-rabbit" src="/pages/start-page/rabbit-runner.png" alt="The little white rabbit sitting beneath the table" /> : null}
      {stage !== 'finished' ? ballLayerAssets.map((layer) => makeover[layer.slot] && !(usesBunDressState && layer.slot === 'dress') && !(usesBunDressShoesState && layer.slot === 'shoes') && !(usesBunNecklaceState && layer.slot === 'necklace') && !(usesBunTiaraState && layer.slot === 'tiara') ? (
        <img className={'character-layer ' + layer.layerClass} src={makeover.hairstyle === 'bun' ? layer.bunSrc : layer.src} alt={layer.label} key={layer.slot} />
      ) : null) : null}
      {stage !== 'finished' && makeover.hairstyle === 'braids' ? <div className="makeover-slot makeover-braids" aria-label="Hair styled in braids"><span>〰</span><span>〰</span></div> : null}
      {washingFace ? <div className="wash-face-action" role="status" aria-label="Washing her face"><span className="wash-rag" aria-hidden="true">🧼</span><span className="suds suds-one" aria-hidden="true" /><span className="suds suds-two" aria-hidden="true" /><span className="suds suds-three" aria-hidden="true" /><strong>Wash, wash, wash!</strong></div> : null}
      {combingHair ? <div className="comb-hair-action" role="status" aria-label="Combing her hair"><span aria-hidden="true">🪮</span><strong>Comb, comb, comb!</strong></div> : null}
      {activeItem ? <div className={'makeover-item-action action-' + activeItem.id} role="status"><span>{activeItem.icon}</span><strong>Adding {activeItem.label}!</strong></div> : null}
      {makeover.face === 'clean' && makeover.hairCare !== 'combed' && !washingFace ? <div className="face-clean-badge" aria-live="polite">✨ Face is clean! ✨</div> : null}
      </div>
      {stage === 'celebrating' ? (
        <div className="lily-ready-celebration" role="status" aria-live="polite">
          <div className="celebration-confetti" aria-hidden="true">{Array.from({ length: 28 }, (_, index) => <span key={index} />)}</div>
          <h1>Wow! I Look Beautiful! Thank You!</h1>
        </div>
      ) : stage === 'finished' ? <div className="ball-dialogue ball-finale-copy"><button type="button" onClick={() => { setStage('ready'); setDone([]); setMakeover(emptyMakeover); }}>Play Again</button></div> : (
        <>
        <div className="ball-ready-instruction">
          <h1>Help Me Get Ready</h1>
          <p>Tap each job and item.</p>
        </div>
        <aside className="ball-task-panel">
          <div className="ball-task-grid">{ballTasks.filter((task) => task.id !== 'braids' && task.id !== 'bow').map((task) => {
            const isPurchased = owned.includes('ball-' + task.id);
            const isOwned = task.free || isPurchased;
            const isUnlocked = isTaskUnlocked(task.id);
            const stateClass = done.includes(task.id) ? 'done' : isUnlocked ? 'unlocked' : isPurchased ? 'locked owned-locked' : 'locked';
            return <button type="button" key={task.id} className={stateClass} disabled={!isUnlocked || washingFace || combingHair || Boolean(activeItem)} onClick={() => useItem(task)}><span>{task.icon}</span><strong>{task.label}</strong><small>{!isUnlocked ? isPurchased ? 'Owned • Locked' : 'Locked' : isOwned ? done.includes(task.id) ? 'Done!' : 'Use' : task.gold ? task.gold + ' gold carrot' : task.carrots + ' carrots'}</small></button>;
          })}</div>
          {message ? <p className="ball-shop-message" role="alert">{message}</p> : null}
          <button type="button" className="ball-finish-button" disabled={!ready || finishing} onClick={finishGettingReady}>{finishing ? 'Saving...' : "I'm Ready!"}</button>
        </aside>
        </>
      )}
      {pendingPurchase ? (
        <PurchaseConfirmationDialog
          icon={pendingPurchase.icon}
          title={`Buy ${pendingPurchase.label}?`}
          message={pendingPurchase.gold ? `Spend ${pendingPurchase.gold} gold carrot${pendingPurchase.gold === 1 ? '' : 's'}?` : `Spend ${pendingPurchase.carrots} carrots?`}
          confirmLabel={pendingPurchase.gold ? `Spend ${pendingPurchase.gold} gold carrot` : `\uD83E\uDD55 Spend ${pendingPurchase.carrots}`}
          busy={purchasingItem}
          onCancel={() => setPendingPurchase(null)}
          onConfirm={confirmItemPurchase}
        />
      ) : null}
      {purchaseNotice ? (
        <PurchaseConfirmationDialog
          icon={purchaseNotice.icon}
          title={purchaseNotice.title}
          message={purchaseNotice.message}
          onCancel={() => setPurchaseNotice(null)}
          noticeActionLabel="Ask Parent"
          onNoticeAction={() => { setPurchaseNotice(null); setParentPurchaseNotice(true); }}
        />
      ) : null}
      {parentPurchaseNotice ? (
        <PurchaseConfirmationDialog
          icon="\u2B50"
          title="Ask a Parent"
          message="The parent shop is coming soon!"
          onCancel={() => setParentPurchaseNotice(false)}
        />
      ) : null}
    </main>
  );
}

function ToddlerApp({ family }) {
  const validRoutes = ['/', '/tunnel', '/coloring', '/memory', '/books', ...(BALL_READY_ENABLED ? ['/ball-ready'] : [])];
  const getRoute = () => (validRoutes.includes(window.location.pathname) ? window.location.pathname : '/');
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const syncRoute = () => setRoute(getRoute());
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (route === '/tunnel') {
    return <TunnelPage family={family} onOpenColoring={() => navigate('/coloring')} onOpenMemory={() => navigate('/memory')} onOpenBallReady={() => navigate('/ball-ready')} onOpenBooks={() => navigate('/books')} onGoHome={() => navigate('/')} />;
  }

  if (route === '/coloring') {
    return <ColoringBook key={family?.child?.id || 'coloring-player'} family={family} onExit={() => navigate('/tunnel')} />;
  }

  if (route === '/memory') {
    return <MemoryGame key={family?.child?.id || 'memory-player'} family={family} onExit={() => navigate('/tunnel')} />;
  }

  if (route === '/books') {
    return <BooksPage key={family?.child?.id || 'books-player'} family={family} onExit={() => navigate('/tunnel')} />;
  }

  if (BALL_READY_ENABLED && route === '/ball-ready') {
    return <BallReady family={family} onExit={() => navigate('/tunnel')} />;
  }

  return <StartPage onEnterTunnel={() => navigate('/tunnel')} />;
}

function App() {
  return <FamilyGate><ToddlerApp /></FamilyGate>;
}

export default App;
