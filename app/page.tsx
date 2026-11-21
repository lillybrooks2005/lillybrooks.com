import Image from "next/image";
import Link from "next/link";
import { home, site } from "@/content/site";
import { ArrowDoodle, Blossom, Garland, Underline } from "@/components/Doodles";
import { Words, reveal, wordCount } from "@/components/Reveal";
import styles from "./page.module.css";

export default function HomePage() {
  const [before, after] = home.heading.split(home.accent);
  const lead = before.trim();
  // Turns in the entrance: eyebrow is 0, the heading's words follow, then everything below
  const accentTurn = 1 + wordCount(lead);

  return (
    <main className={styles.hero} data-fit-screen>
      <div>
        <p className={styles.eyebrow} {...reveal(0)}>
          {home.eyebrow}
        </p>
        <h1 className={styles.heading}>
          <Words text={lead} from={1} />{" "}
          <em className={styles.accent} {...reveal(accentTurn, "word")}>
            {home.accent}
            <Underline />
          </em>
          {after}
          <Blossom className={styles.period} />
        </h1>
        <p className={styles.intro} {...reveal(accentTurn + 1)}>
          {home.intro}
        </p>
        <div className={styles.ctas}>
          <Link href={home.primaryCta.href} className={styles.primary} {...reveal(accentTurn + 2)}>
            {home.primaryCta.label}
          </Link>
          <Link href={home.secondaryCta.href} className={styles.secondary} {...reveal(accentTurn + 3)}>
            {home.secondaryCta.label}
            <ArrowDoodle />
          </Link>
        </div>
      </div>

      <figure className={styles.portrait} {...reveal(accentTurn + 1)}>
        <Image
          src={site.headshot}
          alt={site.headshotAlt}
          width={site.headshotWidth}
          height={site.headshotHeight}
          priority
          quality={90}
          sizes="(max-width: 52rem) 80vw, 22rem"
          className={styles.photo}
        />
        <Garland className={styles.garland} />
      </figure>
    </main>
  );
}
