"use client";
// Client only to read the current path (usePathname) for the active link.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLine } from "./Doodles";
import styles from "./SiteHeader.module.css";

type NavLinksProps = { items: { href: string; label: string }[] };

export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <ul className={styles.links}>
      {items.map((item) => {
        const isCurrent = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={styles.link}
              aria-current={isCurrent ? "page" : undefined}
            >
              {item.label}
              {/* Only the current page has the line, so arriving on a page draws it fresh */}
              {isCurrent ? <NavLine /> : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
