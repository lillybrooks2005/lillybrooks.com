/*
  Hand-drawn doodles: ink linework first, with a flat pink or green wash set
  slightly off the line, like a print that didn't quite register. The offset
  is the charm — don't "fix" it.

  Nothing here is symmetrical on purpose. Every petal is its own wobbly path,
  loops don't quite close, and lines overshoot. If you redraw one, keep it
  uneven: a tidy, mirrored flower reads as clip-art.

  Each line draws itself in, in the order a pen would make it (`order`), and
  the colour washes in once the linework is down.
*/
import styles from "./Doodles.module.css";

type DoodleProps = { className?: string };

/*
  When a drawing starts and how quickly it goes: `start` is the wait before
  its first stroke and `beat` the gap between one stroke and the next, both in
  milliseconds. Most doodles use the default.

  The home page runs three in sequence, after the heading's words have
  faded in (components/Reveal.tsx): the squiggle under the heading first
  (timed in Doodles.module.css, 1.1s to 2.3s), then the flower that ends the
  heading, then the vine round the photo, which is deliberately slow.
*/
type Pace = { start: number; beat: number };

const DEFAULT_PACE: Pace = { start: 450, beat: 130 };
const BLOSSOM_PACE: Pace = { start: 2400, beat: 110 };
const SPRIG_LINE_PACE: Pace = { start: 1100, beat: 130 };
const GARLAND_PACE: Pace = { start: 3600, beat: 320 };
// How long the vine's stem takes to grow; its leaves open along it as it passes
const GARLAND_STEM_MS = 4200;

function delay(order: number, pace: Pace) {
  return `${pace.start + order * pace.beat}ms`;
}

type StrokeProps = { d: string; order: number; pace?: Pace; duration?: number };

/*
  One pen stroke. `pathLength` lets the CSS draw every line the same way,
  whatever its real length. A stroke given its own `duration` moves at a
  steady speed instead of easing, so things timed along it stay in step.
*/
function Stroke({ d, order, pace = DEFAULT_PACE, duration }: StrokeProps) {
  const timing = duration
    ? { animationDuration: `${duration}ms`, animationTimingFunction: "linear" }
    : {};
  return (
    <path
      className={styles.stroke}
      d={d}
      pathLength={1}
      style={{ animationDelay: delay(order, pace), ...timing }}
    />
  );
}

type WashProps = { d: string; order: number; tone: "pink" | "green"; pace?: Pace };

/* A flat fill of colour that fades in after the lines around it are drawn */
function Wash({ d, order, tone, pace = DEFAULT_PACE }: WashProps) {
  const toneClass = tone === "pink" ? styles.washPink : styles.washGreen;
  return <path className={toneClass} d={d} style={{ animationDelay: delay(order, pace) }} />;
}

/*
  `strokeWidth` on each drawing is in that drawing's own units, picked so the
  line lands near 2.2px at the size it's used. (`vector-effect:
  non-scaling-stroke` would do this automatically, but it breaks the draw-in
  animation in Chrome and Safari.)
*/

/* The flower head, shared by the standing flower (Bloom) and the little one on its own (Blossom) */
const FLOWER_PETALS = [
  "M56.7 53.4 C55.5 51.9, 50.4 47.8, 49.3 44.3 C48.1 40.8, 47.8 35.3, 49.8 32.4 C51.8 29.5, 58.7 27.2, 61.5 27 C64.3 26.8, 65.4 28.2, 66.7 31.2 C68 34.2, 70.2 41.1, 69.4 44.9 C68.6 48.7, 63.2 52.5, 62 54.1",
  "M64.2 54 C64.9 52, 66.3 44.3, 68.8 42.4 C71.3 40.5, 76.8 41.3, 79.4 42.6 C82 43.9, 83.4 47.2, 84.3 50.4 C85.2 53.6, 86.6 58.9, 84.9 61.8 C83.2 64.6, 77.4 67.9, 73.9 67.6 C70.4 67.2, 65.6 60.9, 63.9 59.6",
  "M65.3 61.5 C66.8 62.1, 72.1 62.9, 74.4 65 C76.6 67.2, 78.7 71.4, 78.7 74.3 C78.6 77.2, 76.2 81.4, 74 82.6 C71.8 83.9, 68.2 83.3, 65.6 81.8 C63 80.3, 59.6 76.9, 58.7 73.7 C57.7 70.5, 59.6 64.5, 59.8 62.6",
  "M58.4 64.4 C59.1 66, 63.1 71.9, 62.5 74.4 C61.9 77, 57.6 78.6, 55 79.5 C52.3 80.3, 49.4 81.2, 46.8 79.4 C44.1 77.5, 39.6 71.5, 39.2 68.4 C38.8 65.3, 41.7 61.9, 44.2 60.6 C46.8 59.3, 52.7 60.5, 54.4 60.5",
  "M55.6 58.4 C53.7 59.2, 47.9 62.9, 44.2 63 C40.5 63.1, 35.3 61.2, 33.6 58.8 C31.9 56.4, 32.6 51.5, 33.9 48.8 C35.1 46, 38.4 43.4, 41.3 42.4 C44.2 41.3, 48.6 40.8, 51.4 42.5 C54.1 44.2, 56.8 51, 57.8 52.7",
];
const FLOWER_HEART =
  "M57 58 C57.2 57.3, 57 54.7, 58 54 C59 53.3, 62.2 53.2, 63 54 C63.8 54.8, 63.7 57.5, 63 59 C62.3 60.5, 60.5 63, 59 63 C57.5 63, 54.5 60.8, 54 59 C53.5 57.2, 54.3 53.3, 56 52 C57.7 50.7, 62.2 50, 64 51 C65.8 52, 66.5 56.8, 67 58";
const FLOWER_WASH =
  "M89.7 54 C90.4 60.3, 90.4 68.7, 86.2 73.8 C82.1 78.9, 71.4 85.2, 65 84.6 C58.6 84, 51.9 75.2, 47.7 70.1 C43.5 65, 39.8 59.5, 40 54 C40.1 48.5, 44.4 41.5, 48.6 36.9 C52.8 32.3, 59.5 26.6, 65 26.4 C70.5 26.2, 77.7 31.1, 81.8 35.8 C85.9 40.4, 88.9 47.7, 89.7 54Z";

export function Bloom({ className }: DoodleProps) {
  return (
    <svg
      className={`${styles.doodle} ${className ?? ""}`}
      viewBox="0 0 120 220"
      aria-hidden="true"
    >
      <Wash tone="pink" order={11} d={FLOWER_WASH} />
      <Wash tone="green" order={12} d="M63.8 156 C65.3 154, 70.7 144.8, 75.3 141.4 C79.9 137.9, 86.4 138.2, 91.2 135.3 C96 132.4, 102.5 122.5, 104.1 124 C105.7 125.6, 103.8 139.1, 100.8 144.4 C97.8 149.7, 91.7 154.6, 85.9 156 C80.2 157.5, 70 153, 66.3 153 C62.6 153, 62.3 157.9, 63.8 156Z" />
      <Wash tone="green" order={12} d="M54.5 120.6 C53.1 118.9, 48.2 111.2, 44 109.2 C39.8 107.1, 33.3 109.8, 29.1 108.5 C24.9 107.2, 19.7 100, 18.8 101.5 C17.9 103, 20.1 113.7, 23.4 117.6 C26.7 121.5, 34 124.3, 38.8 124.7 C43.7 125.1, 49.8 120.5, 52.4 119.8 C55 119.1, 55.9 122.4, 54.5 120.6Z" />

      <g className={styles.ink} strokeWidth={3.5}>
        {/* Stem, from the ground up */}
        <Stroke order={0} d="M56.9 214.2 C57.4 208.8, 60.4 192.9, 60.1 181.9 C59.8 170.9, 55.2 159.5, 55 148.2 C54.9 136.9, 58.6 124.3, 59.2 114 C59.7 103.8, 58.4 94.9, 58.3 86.8 C58.3 78.7, 58.8 69, 58.9 65.5" />
        {/* Leaves, each with a vein that stops short of the tip */}
        <Stroke order={2} d="M56.9 152.8 C59.2 150.1, 65.4 139.9, 70.5 136.8 C75.6 133.7, 82.3 136.6, 87.3 134.2 C92.2 131.8, 99.3 121.4, 100.4 122.3 C101.5 123.2, 97.5 134.6, 94.1 139.7 C90.7 144.8, 85.7 151.3, 80.1 152.9 C74.4 154.5, 63.5 149.9, 60.2 149.3" />
        <Stroke order={3} d="M62.2 147.9 C64.2 147.2, 70.3 145.5, 73.9 143.5 C77.5 141.6, 81 138.6, 84 136.2 C87 133.8, 90.7 130.4, 92 129.3" />
        <Stroke order={3} d="M57.9 117.4 C56.3 115.9, 52.3 110.3, 48.3 108.3 C44.3 106.3, 38.3 107.4, 33.9 105.5 C29.4 103.7, 22.8 96.1, 21.5 97.3 C20.3 98.5, 22.9 108.8, 26.5 112.9 C30 117, 37.6 121.3, 42.7 121.7 C47.8 122.2, 54.5 116.7, 56.9 115.7" />
        <Stroke order={4} d="M54.7 115.6 C52.8 114.7, 46.4 112.1, 43.2 110.5 C40 108.9, 38.1 107.4, 35.7 106 C33.3 104.5, 29.9 102.5, 28.8 101.8" />
        {/* Five petals, one at a time, going round, then a scribbled swirl for the middle */}
        {FLOWER_PETALS.map((petal, index) => (
          <Stroke key={petal} order={5 + index} d={petal} />
        ))}
        <Stroke order={10} d={FLOWER_HEART} />
      </g>
    </svg>
  );
}

/*
  Just the flower head, no stem: small enough to stand in for a full stop at
  the end of the home page heading. The viewBox is cropped to the head.
*/
export function Blossom({ className }: DoodleProps) {
  return (
    <svg
      className={`${styles.doodle} ${className ?? ""}`}
      viewBox="28 22 66 66"
      aria-hidden="true"
    >
      <Wash tone="pink" order={7} pace={BLOSSOM_PACE} d={FLOWER_WASH} />
      <g className={styles.ink} strokeWidth={4.2}>
        {FLOWER_PETALS.map((petal, index) => (
          <Stroke key={petal} order={index} pace={BLOSSOM_PACE} d={petal} />
        ))}
        <Stroke order={5} pace={BLOSSOM_PACE} d={FLOWER_HEART} />
      </g>
    </svg>
  );
}

export function Sprig({ className }: DoodleProps) {
  return (
    <svg
      className={`${styles.doodle} ${className ?? ""}`}
      viewBox="0 0 100 140"
      aria-hidden="true"
    >
      <Wash tone="pink" order={8} d="M88.8 19 C88.9 21.1, 88.1 23.5, 86.5 24.6 C84.9 25.6, 80.9 26.3, 79.2 25.4 C77.4 24.5, 75.9 21, 75.9 19 C76 17, 77.7 14.5, 79.4 13.4 C81.1 12.2, 84.8 11.2, 86.3 12.1 C87.9 13, 88.8 16.9, 88.8 19Z" />
      <Wash tone="pink" order={8} d="M69 40 C69.1 42.1, 67.1 45.3, 65.4 46.2 C63.8 47.1, 60.4 46.4, 59 45.3 C57.5 44.3, 56.7 41.8, 56.7 40 C56.7 38.2, 57.7 35.6, 59 34.6 C60.3 33.6, 62.8 32.9, 64.4 33.8 C66.1 34.7, 68.8 37.9, 69 40Z" />
      <Wash tone="pink" order={8} d="M46 72 C46 73.4, 45.1 75.7, 43.8 76.4 C42.5 77.2, 39.7 77.4, 38.5 76.7 C37.4 75.9, 36.9 73.6, 36.9 72 C36.9 70.4, 37.4 67.5, 38.6 66.9 C39.8 66.2, 42.7 67.2, 43.9 68.1 C45.2 68.9, 46.1 70.6, 46 72Z" />

      <g className={styles.ink} strokeWidth={2.5}>
        <Stroke order={0} d="M17.9 135 C19.4 130.9, 22.9 119.4, 26.8 110.9 C30.7 102.4, 36.2 93.6, 41.1 83.9 C46.1 74.3, 50.3 62.9, 56.5 53.1 C62.7 43.3, 74.7 29.8, 78.3 25.2" />
        {/* Leaves, bottom to top */}
        <Stroke order={2} d="M30 98 C 22 95, 13 98, 10 105 C 18 108, 27 105, 31 97" />
        <Stroke order={3} d="M46 66 C 54 65, 63 70, 66 77 C 58 79, 49 75, 45 67" />
        <Stroke order={4} d="M64 42 C 72 43, 79 50, 80 57 C 72 56, 65 51, 63 43" />
        {/* Buds */}
        <Stroke order={5} d="M37 80 C 33 73, 39 67, 43 71 C 47 75, 43 82, 36 79" />
        <Stroke order={6} d="M56 50 C 51 42, 58 35, 62 39 C 67 43, 62 51, 55 49" />
        <Stroke order={7} d="M78 24 C 75 16, 82 9, 86 14 C 91 18, 86 27, 77 23" />
      </g>
    </svg>
  );
}

/*
  A sprig laid on its side, used as the underline beneath "Lilly." in the
  About heading: a stem running left to right with a few leaves either side
  and a bud at the tip. It starts once the word above has faded in.
*/
export function SprigLine({ className }: DoodleProps) {
  const pace = SPRIG_LINE_PACE;
  return (
    <svg
      className={`${styles.doodle} ${className ?? ""}`}
      viewBox="0 0 232 40"
      aria-hidden="true"
    >
      <Wash tone="green" order={7} pace={pace} d="M49.5 24.5 C 53.5 15.5, 63.5 13.5, 69.5 14.5 C 67.5 21.5, 59.5 25.5, 50.5 24.5Z" />
      <Wash tone="green" order={7} pace={pace} d="M93.5 28.5 C 99.5 35.5, 109.5 37.5, 115.5 35.5 C 112.5 29.5, 103.5 26.5, 94.5 28.5Z" />
      <Wash tone="green" order={8} pace={pace} d="M139.5 22.5 C 143.5 13.5, 153.5 11.5, 159.5 12.5 C 157.5 19.5, 149.5 23.5, 140.5 22.5Z" />
      <Wash tone="green" order={8} pace={pace} d="M179.5 22.5 C 185.5 29.5, 194.5 30.5, 199.5 28.5 C 196.5 23.5, 188.5 20.5, 180.5 22.5Z" />
      <Wash tone="pink" order={9} pace={pace} d="M223.5 13 C 219 7.5, 225 2, 229.5 6 C 233.5 10, 229.5 16.5, 223.5 13Z" />

      <g className={styles.ink} strokeWidth={2.4}>
        <Stroke order={0} pace={pace} d="M4 26 C 40 18, 80 30, 120 24 C 160 18, 195 22, 221 12.5" />
        <Stroke order={2} pace={pace} d="M48 23 C 52 14, 62 12, 68 13 C 66 20, 58 24, 49 23.4" />
        <Stroke order={3} pace={pace} d="M92 27 C 98 34, 108 36, 114 34 C 111 28, 102 25, 93 26.6" />
        <Stroke order={4} pace={pace} d="M138 21 C 142 12, 152 10, 158 11 C 156 18, 148 22, 139 21.4" />
        <Stroke order={5} pace={pace} d="M178 21 C 184 28, 193 29, 198 27 C 195 22, 187 19, 179 20.6" />
        <Stroke order={6} pace={pace} d="M222 12 C 217.5 6, 224 0.5, 228.5 5 C 232.5 9, 228 15.5, 221 11.6" />
      </g>
    </svg>
  );
}

/*
  The same sprig, drawn longer for a longer word: it underlines "connection"
  in the home page heading. Two drawings rather than one stretched, so the
  leaves stay the same size under either word.
*/
export function SprigLineLong({ className }: DoodleProps) {
  const pace = SPRIG_LINE_PACE;
  return (
    <svg
      className={`${styles.doodle} ${className ?? ""}`}
      viewBox="0 0 420 40"
      aria-hidden="true"
    >
      <Wash tone="green" order={6} pace={pace} d="M 49.5 24.5 C 53.5 15.5 63.5 13.5 69.5 14.5 C 67.5 21.5 59.5 25.5 50.5 24.5Z" />
      <Wash tone="green" order={7} pace={pace} d="M 93.5 28.5 C 99.5 35.5 109.5 37.5 115.5 35.5 C 112.5 29.5 103.5 26.5 94.5 28.5Z" />
      <Wash tone="green" order={8} pace={pace} d="M 169.5 22.5 C 173.5 13.5 183.5 11.5 189.5 12.5 C 187.5 19.5 179.5 23.5 170.5 22.5Z" />
      <Wash tone="green" order={9} pace={pace} d="M 213.5 26.5 C 219.5 33.5 229.5 35.5 235.5 33.5 C 232.5 27.5 223.5 24.5 214.5 26.5Z" />
      <Wash tone="green" order={10} pace={pace} d="M 289.5 22.5 C 293.5 13.5 303.5 11.5 309.5 12.5 C 307.5 19.5 299.5 23.5 290.5 22.5Z" />
      <Wash tone="green" order={11} pace={pace} d="M 333.5 26.5 C 339.5 33.5 349.5 35.5 355.5 33.5 C 352.5 27.5 343.5 24.5 334.5 26.5Z" />
      <Wash tone="pink" order={10} pace={pace} d="M 411.5 13 C 407 7.5 413 2 417.5 6 C 421.5 10 417.5 16.5 411.5 13Z" />

      <g className={styles.ink} strokeWidth={2.4}>
        <Stroke order={0} pace={pace} d="M4 26 C 40 18, 80 30, 120 24 C 160 18, 200 30, 240 24 C 280 18, 320 30, 360 23 C 385 19, 400 16, 409 12.5" />
        <Stroke order={2} pace={pace} d="M 48 23 C 52 14 62 12 68 13 C 66 20 58 24 49 23.4" />
        <Stroke order={3} pace={pace} d="M 92 27 C 98 34 108 36 114 34 C 111 28 102 25 93 26.6" />
        <Stroke order={4} pace={pace} d="M 168 21 C 172 12 182 10 188 11 C 186 18 178 22 169 21.4" />
        <Stroke order={5} pace={pace} d="M 212 25 C 218 32 228 34 234 32 C 231 26 222 23 213 24.6" />
        <Stroke order={6} pace={pace} d="M 288 21 C 292 12 302 10 308 11 C 306 18 298 22 289 21.4" />
        <Stroke order={7} pace={pace} d="M 332 25 C 338 32 348 34 354 32 C 351 26 342 23 333 24.6" />
        <Stroke order={8} pace={pace} d="M 410 12 C 405.5 6 412 0.5 416.5 5 C 420.5 9 416 15.5 409 11.6" />
      </g>
    </svg>
  );
}

export function Daisy({ className }: DoodleProps) {
  return (
    <svg
      className={`${styles.doodle} ${className ?? ""}`}
      viewBox="0 0 60 60"
      aria-hidden="true"
    >
      <Wash tone="pink" order={9} d="M39 31 C39 33.4, 38.2 35.8, 36.5 36.9 C34.7 38.1, 30.8 39, 28.6 38 C26.4 37, 23.4 33.5, 23.3 31 C23.1 28.5, 25.6 24.2, 27.7 22.8 C29.8 21.5, 34.1 21.5, 36 22.8 C37.9 24.2, 38.9 28.6, 39 31Z" />

      <g className={styles.ink} strokeWidth={2.6}>
        <Stroke order={0} d="M35.1 28.6 C35.9 28, 37.8 25.6, 40 25.5 C42.1 25.4, 46.1 27.1, 47.9 28.1 C49.7 29.1, 50.9 30.2, 50.9 31.5 C50.9 32.8, 50.1 35.1, 48 36 C45.9 36.8, 41 37, 38.4 36.5 C35.9 36, 33.8 33.7, 32.9 33.1" />
        <Stroke order={1} d="M32.9 32 C33.9 32.1, 37.4 31.2, 39.1 32.4 C40.9 33.7, 42.9 37.7, 43.5 39.6 C44.1 41.5, 44 43.1, 42.7 43.8 C41.5 44.5, 37.8 44.7, 36 43.9 C34.3 43.1, 33.2 40.2, 32 38.8 C30.8 37.4, 29.3 35.9, 28.8 35.3" />
        <Stroke order={2} d="M31.4 34.5 C31.8 35.3, 33.7 36.9, 34.1 39.3 C34.6 41.7, 35.2 46.9, 34.1 48.8 C32.9 50.7, 28.9 51.2, 27.4 50.8 C25.8 50.4, 25.4 48.2, 24.9 46.4 C24.4 44.6, 23.9 42.1, 24.3 40 C24.8 37.8, 27.2 34.5, 27.8 33.4" />
        <Stroke order={3} d="M28 33.5 C27.5 34.3, 26.2 36.8, 24.8 38.3 C23.3 39.8, 20.5 41.7, 19.1 42.7 C17.6 43.6, 16.7 45.1, 16 44.1 C15.3 43.2, 14.5 38.9, 15 37.1 C15.6 35.3, 17.9 34.7, 19.5 33.5 C21.1 32.3, 23.7 30.6, 24.6 30.1" />
        <Stroke order={4} d="M24.7 31 C24.1 31.4, 22.7 33.4, 20.9 33.7 C19.1 34, 15.9 33.2, 13.9 32.8 C11.9 32.5, 9.1 32.5, 8.9 31.4 C8.8 30.3, 11 27.2, 13.1 26.2 C15.2 25.3, 19 25.4, 21.6 25.6 C24.1 25.8, 27.1 27.1, 28.2 27.4" />
        <Stroke order={5} d="M24.4 28.8 C23.8 28.3, 22.6 27.4, 20.9 26 C19.2 24.5, 15.1 21.9, 14.1 20.2 C13.1 18.6, 13.9 16.8, 14.8 16.1 C15.6 15.4, 17.2 15, 19.1 16 C21 16.9, 24.6 20.2, 26.2 22 C27.8 23.8, 28.2 26.1, 28.6 26.9" />
        <Stroke order={6} d="M28.5 27 C28.1 26.1, 25.7 23.6, 25.7 21.5 C25.7 19.4, 27.4 16.3, 28.6 14.7 C29.7 13, 31.9 11.7, 32.7 11.7 C33.5 11.8, 32.9 13.1, 33.4 14.8 C33.9 16.6, 35.6 20.2, 35.7 22.2 C35.7 24.1, 34.1 25.7, 33.7 26.4" />
        <Stroke order={7} d="M31.9 26.7 C32.3 25.6, 32.4 22.2, 34.4 20 C36.4 17.8, 41.9 14.6, 44 13.6 C46.2 12.5, 46.4 12.6, 47.2 13.7 C48.1 14.8, 50.1 17.8, 49 20.2 C47.9 22.7, 43.2 26.4, 40.5 28.2 C37.9 30, 34.3 30.7, 33.1 31.2" />
        <Stroke order={8} d="M29 30 C29.2 29.5, 29.3 27.2, 30 27 C30.7 26.8, 32.7 28, 33 29 C33.3 30, 32.8 32.3, 32 33 C31.2 33.7, 29 33.7, 28 33 C27 32.3, 25.7 30.3, 26 29 C26.3 27.7, 28.7 25.2, 30 25 C31.3 24.8, 33.3 27.5, 34 28" />
      </g>
    </svg>
  );
}

/*
  The squiggle beneath the accented word in a heading: a soft wave that curls
  into a loop and flicks up at the end, like a signature flourish. Same pen
  as the flowers — one even line that draws itself in.

  The viewBox is the same shape as the space it fills (about 9.5 times wider
  than tall), so the line keeps an even weight all the way round the loop.
*/
export function Underline({ className }: DoodleProps) {
  return (
    <svg
      className={`${styles.underline} ${className ?? ""}`}
      viewBox="0 0 380 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M 5.1 21 C 43.1 9 88.7 7 136.8 15 C 187.5 24 235.6 31 276.1 23 C 304 17 305.3 4 288.8 5 C 271.1 7 273.6 27 304 27 C 331.9 27 355.9 17 374.9 9" pathLength={1} />
    </svg>
  );
}

/*
  The logo: a script L and b written together in one unbroken line, four
  loops in all. The L is the part that goes wrong easily: it needs a narrow
  loop on top, a long slanted stem, a small loop at the foot and a base that
  sweeps right into the b. That base is one long curve from the foot loop
  to the top of the b, with no bump where the letters meet. The L's top loop
  curls to the right of its stem, toward the b, and stays clear of it, so the
  letters join along the bottom only. An earlier
  version let the stem hook straight into a big lower loop with no base, and
  it read as a J.
*/
export function Monogram({ className }: DoodleProps) {
  return (
    <svg
      className={`${styles.doodle} ${className ?? ""}`}
      viewBox="3 0 63 55"
      aria-hidden="true"
    >
      <g className={styles.ink} strokeWidth={2.8}>
        <Stroke order={0} d="M27.69 14.01 C 33.5 10.5, 39.5 9, 39.5 4 C 39.5 0.2, 28 0.2, 28 6 C 28 12, 27.3 21, 26 27 C 24 36, 21 46, 14 46 C 7 46, 6 38, 13 37 C 23 35, 30 50, 42 46 C 52 42, 55 22, 53 11 C 51 3, 44 4, 44 13 C 44 24, 44 36, 46 44 C 47 35, 58 32, 61 39 C 64 47, 54 52, 47 45" />
      </g>
    </svg>
  );
}

/*
  The line under the current page's name in the header: plain and straight,
  on purpose — a wavy one read as scribbly at this size. It draws in each
  time a page opens.
*/
export function NavLine({ className }: DoodleProps) {
  return (
    <svg
      className={`${styles.navLine} ${className ?? ""}`}
      viewBox="0 0 60 6"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M2 3 H 58" pathLength={1} />
    </svg>
  );
}

/*
  The ground Lilly sits on in the home page photo: one long wobbly line, gone
  over a second time in the middle, with a few blades of grass. The paper
  shape under the line is invisible against the page — it's there to hide
  where the original photo was cropped below her seat.
*/
export function Ground({ className }: DoodleProps) {
  return (
    <svg
      className={`${styles.doodle} ${className ?? ""}`}
      viewBox="0 0 400 96"
      aria-hidden="true"
    >
      <path className={styles.paper} d="M2.5 25.6 C10.4 25.1, 34 22.3, 50.1 22.3 C66.2 22.4, 82.4 25.9, 98.9 25.9 C115.4 26, 132.4 23.1, 149.3 22.7 C166.2 22.3, 183.5 23.8, 200.5 23.6 C217.4 23.5, 234.3 21.6, 250.9 21.7 C267.5 21.7, 283.7 23.7, 300 24 C316.4 24.2, 332.8 22.9, 348.8 23.1 C364.7 23.2, 387.9 24.4, 395.7 24.7 L395.7 96 L2.5 96Z" />
      <g className={styles.ink} strokeWidth={2.1}>
        <Stroke order={0} d="M2.5 25.6 C10.4 25.1, 34 22.3, 50.1 22.3 C66.2 22.4, 82.4 25.9, 98.9 25.9 C115.4 26, 132.4 23.1, 149.3 22.7 C166.2 22.3, 183.5 23.8, 200.5 23.6 C217.4 23.5, 234.3 21.6, 250.9 21.7 C267.5 21.7, 283.7 23.7, 300 24 C316.4 24.2, 332.8 22.9, 348.8 23.1 C364.7 23.2, 387.9 24.4, 395.7 24.7" />
        <Stroke order={3} d="M127.7 30.1 C136.2 29.7, 161.2 27.9, 178.6 27.9 C196.1 27.9, 214.9 30.1, 232.5 30.3 C250.1 30.5, 269.1 29.1, 284.1 29.2 C299.1 29.3, 316.1 30.5, 322.4 30.7" />
        {/* Grass */}
        <Stroke order={5} d="M22 24 C 21 17, 18 11, 14 7" />
        <Stroke order={6} d="M27 23.5 C 28 15, 31 9, 35 4" />
        <Stroke order={7} d="M32 23 C 34 18, 38 14, 43 12" />
      </g>
    </svg>
  );
}

/*
  A leafy vine that climbs the left side of the home page photo, goes over
  the arch and trails down the right. Its viewBox matches the photo (200 wide,
  arch of radius 100), so the vine sits just outside the frame at any size.

  Leaves only, in green — no buds or berries, which made it read as a string
  of fairy lights. Each leaf is pointed, has a vein, and lies along the vine
  rather than sticking straight out. Kept thin and sparse: it should be
  noticed second, after her.
*/
export function Garland({ className }: DoodleProps) {
  return (
    <svg
      className={`${styles.doodle} ${className ?? ""}`}
      viewBox="0 0 200 301"
      aria-hidden="true"
    >
      <Wash tone="green" order={4} pace={GARLAND_PACE} d="M-5.5 166.4 C-11.3 166, -13.9 160.2, -13.2 155 C-8.7 155.9, -4.1 160.5, -5.2 165.7Z" />
      <Wash tone="green" order={5} pace={GARLAND_PACE} d="M-8.9 126.9 C-10.2 123.2, -7.5 120.7, -5.1 120.1 C-4.1 122.8, -5.4 126, -8.2 126.7Z" />
      <Wash tone="green" order={6} pace={GARLAND_PACE} d="M-3.9 87.6 C-11 86.4, -13.2 79.9, -11.5 73.6 C-5.7 75.6, -1.7 80.8, -3.6 86.9Z" />
      <Wash tone="green" order={7} pace={GARLAND_PACE} d="M5.1 49.4 C6.4 44.9, 10 44.1, 13.6 44.8 C12.8 48.3, 9.3 50.9, 5.8 49.7Z" />
      <Wash tone="green" order={8} pace={GARLAND_PACE} d="M30.5 19 C26.3 13.7, 28.4 8.3, 33.6 4.6 C35.4 8.7, 36.4 15.7, 31.1 18.6Z" />
      <Wash tone="green" order={9} pace={GARLAND_PACE} d="M65.2 0.9 C70 -1.5, 73.7 0.6, 75.3 5 C71.4 6.4, 67.3 5.8, 65.5 1.6Z" />
      <Wash tone="green" order={10} pace={GARLAND_PACE} d="M103.5 -9.2 C104.3 -16.1, 109.8 -19.2, 115.4 -19.4 C115.2 -12.7, 110.1 -8.3, 104.3 -9Z" />
      <Wash tone="green" order={11} pace={GARLAND_PACE} d="M141.3 2.7 C145.8 2.9, 147 6.7, 147.8 9.6 C144.3 9.7, 141 6.5, 141.2 3.5Z" />
      <Wash tone="green" order={12} pace={GARLAND_PACE} d="M175.6 21.7 C181.1 18.4, 186.3 20.9, 189.6 25.9 C185 27.9, 179.1 27.4, 176 22.4Z" />
      <Wash tone="green" order={13} pace={GARLAND_PACE} d="M199 53.7 C201.7 56.2, 200.5 59.6, 199.8 61.7 C197 59.5, 196.2 56, 198.4 54.2Z" />
      <Wash tone="green" order={14} pace={GARLAND_PACE} d="M207 92 C213.6 92.6, 216.3 98.7, 215.6 103.9 C210.7 102.7, 205.9 98.7, 206.8 92.8Z" />
      <Wash tone="green" order={15} pace={GARLAND_PACE} d="M211.4 131.4 C213.1 136.1, 210.2 139.8, 207.1 141.8 C206 138, 206.5 132.6, 210.6 131.7Z" />

      <g className={styles.ink} strokeWidth={1}>
        <Stroke order={0} pace={GARLAND_PACE} duration={GARLAND_STEM_MS} d="M-7.6 205 C-7.9 201.7, -9.6 191.8, -9.4 185.2 C-9.3 178.6, -7 172, -6.5 165.4 C-6 158.8, -5.7 152.3, -6.2 145.7 C-6.7 139.1, -9.2 132.5, -9.4 125.9 C-9.7 119.3, -8.3 112.7, -7.7 106.1 C-7.1 99.5, -6.3 93.1, -5.8 86.5 C-5.3 79.9, -6.3 72.9, -4.7 66.5 C-3.2 60.1, -0.2 53.6, 3.5 48.2 C7.3 42.8, 13.5 39.1, 17.8 34 C22.1 29, 24.7 22.7, 29.2 17.9 C33.7 13.1, 38.9 8.3, 44.8 5.3 C50.6 2.4, 57.8 2.1, 64.2 0.4 C70.5 -1.4, 76.5 -3.4, 82.8 -5.1 C89.2 -6.7, 95.8 -9.6, 102.3 -9.7 C108.8 -9.9, 115.6 -7.8, 121.9 -5.9 C128.3 -4.1, 134 -1, 140.3 1.2 C146.6 3.4, 153.8 4.1, 159.5 7.3 C165.3 10.4, 170.5 15.3, 174.8 20.3 C179 25.4, 181.1 32.2, 184.8 37.6 C188.6 43, 194 47.2, 197.5 52.8 C201.1 58.3, 204.6 64.5, 206.1 70.9 C207.5 77.3, 205.9 84.4, 206.2 91 C206.5 97.6, 207.2 104.1, 208 110.7 C208.7 117.2, 211 123.8, 210.8 130.4 C210.6 137, 207.2 143.6, 206.5 150.2 C205.8 156.8, 206.5 166.7, 206.5 170" />
        {/* Leaves, in the order the vine reaches them: outline, then vein */}
        <Stroke order={1} pace={GARLAND_PACE} d="M-6.7 165.4 C-12.5 165, -15.1 159.2, -14.4 154 C-9.9 154.9, -5.3 159.5, -6.4 164.7" />
        <Stroke order={2} pace={GARLAND_PACE} d="M-7.5 164.2 C-9.2 161, -9.2 161, -12.6 157.8" />
        <Stroke order={2} pace={GARLAND_PACE} d="M-10.1 125.9 C-11.4 122.2, -8.7 119.7, -6.3 119.1 C-5.3 121.8, -6.6 125, -9.4 125.7" />
        <Stroke order={3} pace={GARLAND_PACE} d="M-9.4 124.6 C-8.6 124, -8.6 124, -7.7 120.9" />
        <Stroke order={3} pace={GARLAND_PACE} d="M-5.1 86.6 C-12.2 85.4, -14.4 78.9, -12.7 72.6 C-6.9 74.6, -2.9 79.8, -4.8 85.9" />
        <Stroke order={4} pace={GARLAND_PACE} d="M-5.9 85.3 C-7.5 81.2, -7.5 81.2, -10.9 77.1" />
        <Stroke order={4} pace={GARLAND_PACE} d="M3.9 48.4 C5.2 43.9, 8.8 43.1, 12.4 43.8 C11.6 47.3, 8.1 49.9, 4.6 48.7" />
        <Stroke order={5} pace={GARLAND_PACE} d="M5.3 47.7 C7.4 47.5, 7.4 47.5, 10 45.3" />
        <Stroke order={5} pace={GARLAND_PACE} d="M29.3 18 C25.1 12.7, 27.2 7.3, 32.4 3.6 C34.2 7.7, 35.2 14.7, 29.9 17.6" />
        <Stroke order={6} pace={GARLAND_PACE} d="M29.5 16.5 C30.3 12.8, 30.3 12.8, 30.7 7.8" />
        <Stroke order={6} pace={GARLAND_PACE} d="M64 -0.1 C68.8 -2.5, 72.5 -0.4, 74.1 4 C70.2 5.4, 66.1 4.8, 64.3 0.6" />
        <Stroke order={7} pace={GARLAND_PACE} d="M65.4 0.4 C67.5 1.9, 67.5 1.9, 71.3 2.3" />
        <Stroke order={7} pace={GARLAND_PACE} d="M102.3 -10.2 C103.1 -17.1, 108.6 -20.2, 114.2 -20.4 C114 -13.7, 108.9 -9.3, 103.1 -10" />
        <Stroke order={8} pace={GARLAND_PACE} d="M103.5 -11.1 C106.9 -13.4, 106.9 -13.4, 111.2 -16.6" />
        <Stroke order={8} pace={GARLAND_PACE} d="M140.1 1.7 C144.6 1.9, 145.8 5.7, 146.6 8.6 C143.1 8.7, 139.8 5.5, 140 2.5" />
        <Stroke order={9} pace={GARLAND_PACE} d="M141.1 2.9 C142 4.4, 142 4.4, 144.2 7" />
        <Stroke order={9} pace={GARLAND_PACE} d="M174.4 20.7 C179.9 17.4, 185.1 19.9, 188.4 24.9 C183.8 26.9, 177.9 26.4, 174.8 21.4" />
        <Stroke order={10} pace={GARLAND_PACE} d="M175.9 21.1 C179.3 22.2, 179.3 22.2, 184.3 23.6" />
        <Stroke order={10} pace={GARLAND_PACE} d="M197.8 52.7 C200.5 55.2, 199.3 58.6, 198.6 60.7 C195.8 58.5, 195 55, 197.2 53.2" />
        <Stroke order={11} pace={GARLAND_PACE} d="M197.8 54.2 C197.3 55.3, 197.3 55.3, 197.6 58.3" />
        <Stroke order={11} pace={GARLAND_PACE} d="M205.8 91 C212.4 91.6, 215.1 97.7, 214.4 102.9 C209.5 101.7, 204.7 97.7, 205.6 91.8" />
        <Stroke order={12} pace={GARLAND_PACE} d="M206.7 92.2 C208.6 95.3, 208.6 95.3, 211.5 99.5" />
        <Stroke order={12} pace={GARLAND_PACE} d="M210.2 130.4 C211.9 135.1, 209 138.8, 205.9 140.8 C204.8 137, 205.3 131.6, 209.4 130.7" />
        <Stroke order={13} pace={GARLAND_PACE} d="M209.6 131.8 C208 133.7, 208 133.7, 206.8 137.6" />
      </g>
    </svg>
  );
}

/*
  Small doodled icons for buttons and links. They take the colour of the text
  beside them and scale with its size. They sit still on load; a button that
  sets `--icon-draw` on hover (see `--redraw` in globals.css) makes its icon
  draw itself again.
*/
type IconStrokeProps = { d: string; delay?: number };

function IconStroke({ d, delay = 0 }: IconStrokeProps) {
  return (
    <path
      className={styles.iconStroke}
      d={d}
      pathLength={1}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

export function ArrowDoodle({ className }: DoodleProps) {
  return (
    <svg className={`${styles.icon} ${className ?? ""}`} viewBox="0 0 24 16" aria-hidden="true">
      <IconStroke d="M2 8.7 C 6 7.2, 11 9.5, 20.4 7.8" />
      <IconStroke delay={220} d="M15 3.2 C 17.2 5.2, 19.3 6.6, 21.4 7.7 C 19 9.2, 17.1 10.9, 15.7 13" />
    </svg>
  );
}

export function DocumentDoodle({ className }: DoodleProps) {
  return (
    <svg className={`${styles.icon} ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true">
      {/* The page, a little off-square, then its folded corner */}
      <IconStroke d="M6.2 3.5 C 9 2.8, 12 3.2, 14.7 2.9 L 19.3 7.7 C 19.7 12, 19.1 16.5, 19.5 20.6 C 15 21.4, 10 20.7, 5.5 21.2 C 6 15, 5.2 9, 6.2 3.5" />
      <IconStroke delay={200} d="M14.5 3.3 C 14.3 5, 14.7 6.5, 14.8 7.8 C 16.4 7.5, 17.8 7.8, 19 7.6" />
      {/* Lines of writing */}
      <IconStroke delay={300} d="M8.8 11.3 C 11 10.7, 13.5 11.4, 15.9 10.9" />
      <IconStroke delay={380} d="M8.6 14.4 C 10.8 15, 13 14.2, 16 14.7" />
      <IconStroke delay={460} d="M8.9 17.9 C 10.2 17.5, 11.4 18, 12.7 17.6" />
    </svg>
  );
}
