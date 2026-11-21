/*
  A word in running text that opens a small note on hover or keyboard focus.
  Opening is CSS only (see Tooltip.module.css), so the note works without
  JavaScript. The note is a flat card with a small doodled flower on its corner.
*/
import { Blossom } from "./Doodles";
import styles from "./Tooltip.module.css";

export type Note = {
  // The word shown in the sentence
  term: string;
  // What the note says
  text: string;
  // Optional link at the end of the note
  href?: string;
  linkLabel?: string;
};

type TooltipProps = { id: string; note: Note };

export function Tooltip({ id, note }: TooltipProps) {
  const bubbleId = `note-${id}`;
  return (
    <span className={styles.wrap} tabIndex={0} aria-describedby={bubbleId}>
      <span className={styles.term}>{note.term}</span>
      <span role="tooltip" id={bubbleId} className={styles.bubble}>
        <Blossom className={styles.flower} />
        <span className={styles.text}>
          {note.text}
          {note.href ? (
            <>
              {" "}
              <a href={note.href} target="_blank" rel="noopener noreferrer">
                {note.linkLabel}
              </a>
            </>
          ) : null}
        </span>
      </span>
    </span>
  );
}

type AnnotatedProps = { text: string; notes: Record<string, Note> };

/* Turns "{marching}" in a sentence into the matching tooltip. */
export function Annotated({ text, notes }: AnnotatedProps) {
  return text.split(/\{(\w+)\}/).map((part, index) => {
    if (index % 2 === 0) return part;
    const note = notes[part];
    return note ? <Tooltip key={index} id={part} note={note} /> : part;
  });
}
