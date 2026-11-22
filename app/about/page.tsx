import type { Metadata } from "next";
import { about, cv } from "@/content/site";
import { Cv } from "@/components/Cv";
import { Gallery } from "@/components/Gallery";
import { DocumentDoodle, Sprig } from "@/components/Doodles";
import { Annotated } from "@/components/Tooltip";
import { Words, reveal, wordCount } from "@/components/Reveal";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  // Turns in the entrance: eyebrow is 0, the heading's words follow, then the bio
  const bioTurn = 1 + wordCount(about.heading);

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.lead}>
          <p className={styles.eyebrow} {...reveal(0)}>
            {about.eyebrow}
          </p>
          <h1 className={styles.heading}>
            <Words text={about.heading} from={1} />
          </h1>
          <Sprig className={styles.sprig} />
        </div>
        <div className={styles.bio}>
          {about.bio.map((paragraph, index) => (
            <p key={paragraph} {...reveal(bioTurn + index)}>
              <Annotated text={paragraph} notes={about.notes} />
            </p>
          ))}
          <a
            className={styles.resume}
            href={about.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            {...reveal(bioTurn + about.bio.length)}
          >
            <DocumentDoodle />
            {about.resume.label}
          </a>
        </div>
      </section>

      <section className={styles.gallery}>
        <Gallery photos={about.gallery} order={bioTurn + about.bio.length + 1} />
      </section>

      <section
        className={styles.cv}
        aria-label={about.cvLabel}
        {...reveal(bioTurn + about.bio.length + 1 + about.gallery.length)}
      >
        <Cv groups={cv} />
      </section>
    </main>
  );
}
