/*
  The staggered entrance used on every page: things fade and settle in one
  after another, top to bottom — eyebrow, then the heading a word at a time,
  then the body, then the buttons.

  Spread `reveal(n)` onto an element to give it the nth turn:
    <p {...reveal(0)}>…</p>
  The animation itself is `[data-reveal]` in globals.css.
*/

// Milliseconds between one thing arriving and the next
const STEP = 140;

export function reveal(order: number, kind: "block" | "word" = "block") {
  return {
    "data-reveal": kind,
    style: { animationDelay: `${order * STEP}ms` },
  };
}

type WordsProps = { text: string; from: number };

/* A line of text whose words arrive one at a time, starting at turn `from` */
export function Words({ text, from }: WordsProps) {
  return text.split(" ").map((word, index) => (
    <span key={`${word}-${index}`}>
      {index > 0 ? " " : null}
      <span {...reveal(from + index, "word")}>{word}</span>
    </span>
  ));
}

/* How many turns a line takes, so whatever follows it knows where to start */
export function wordCount(text: string) {
  return text.split(" ").length;
}
