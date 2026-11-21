import Link from "next/link";
import { site } from "@/content/site";
import { Monogram } from "./Doodles";
import { NavLinks } from "./NavLinks";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <Link href="/" className={styles.name}>
          <Monogram className={styles.mark} />
          <span className={styles.nameText}>{site.name}</span>
        </Link>
        <NavLinks items={site.nav} />
      </nav>
    </header>
  );
}
