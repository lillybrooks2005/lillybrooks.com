import type { Metadata } from "next";
import { contact } from "@/content/site";
import { Bloom } from "@/components/Doodles";
import { Words, reveal, wordCount } from "@/components/Reveal";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  // Turns in the entrance: eyebrow is 0, the heading's words follow, then the rest
  const bodyTurn = 1 + wordCount(contact.heading);

  return (
    <main className={styles.page} data-fit-screen>
      <div>
        <p className={styles.eyebrow} {...reveal(0)}>
          {contact.eyebrow}
        </p>
        <h1 className={styles.heading}>
          <Words text={contact.heading} from={1} />
        </h1>
        <p className={styles.body} {...reveal(bodyTurn)}>
          {contact.body}
        </p>
        <a className={styles.email} href={`mailto:${contact.email}`} {...reveal(bodyTurn + 1)}>
          {contact.email}
        </a>
        <p className={styles.note} {...reveal(bodyTurn + 2)}>
          <span className={styles.dot} aria-hidden="true" />
          {contact.note}
        </p>
      </div>

      <aside className={styles.card} {...reveal(bodyTurn + 3)}>
        <dl className={styles.details}>
          {contact.details.map((item) => (
            <div key={item.label} className={styles.item}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <Bloom className={styles.bloom} />
      </aside>
    </main>
  );
}
