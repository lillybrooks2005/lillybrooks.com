import { site } from "@/content/site";
import { Monogram } from "./Doodles";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Monogram className={styles.mark} />
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className={styles.note}>{site.footer}</p>
      </div>
    </footer>
  );
}
