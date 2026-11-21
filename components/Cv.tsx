/*
  The interactive CV. Each group is a card of rows; a row with a note opens
  to show it. Built on <details>, so it works with no JavaScript and stays a
  server component.
*/
import type { CvGroup, CvRole } from "@/content/site";
import styles from "./Cv.module.css";

type CvProps = { groups: CvGroup[] };

export function Cv({ groups }: CvProps) {
  return (
    <div className={styles.cv}>
      {groups.map((group) => (
        <section key={group.label} className={styles.group}>
          <h3 className={styles.label}>{group.label}</h3>
          <ul className={styles.list}>
            {group.roles.map((role) => (
              <li key={`${role.title}-${role.dates}`} className={styles.row}>
                {role.note ? <OpenableRow role={role} note={role.note} /> : <RowHead role={role} />}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function OpenableRow({ role, note }: { role: CvRole; note: string }) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <RowHead role={role} openable />
      </summary>
      <p className={styles.note}>
        <Highlighted text={note} phrase={role.highlight} />
      </p>
    </details>
  );
}

function RowHead({ role, openable = false }: { role: CvRole; openable?: boolean }) {
  return (
    <span className={styles.head}>
      <span className={styles.title}>{role.title}</span>
      <span className={styles.dates}>{role.dates}</span>
      <span className={styles.toggle} aria-hidden="true">
        {openable ? <PlusIcon /> : null}
      </span>
      <span className={styles.detail}>{role.detail}</span>
    </span>
  );
}

function Highlighted({ text, phrase }: { text: string; phrase?: string }) {
  if (!phrase || !text.includes(phrase)) return text;
  const [before, after] = text.split(phrase);
  return (
    <>
      {before}
      <strong>{phrase}</strong>
      {after}
    </>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" className={styles.plus}>
      <path d="M3 8h10" />
      <path className={styles.upright} d="M8 3v10" />
    </svg>
  );
}
