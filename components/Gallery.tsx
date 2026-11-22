import Image from "next/image";
import { reveal } from "@/components/Reveal";
import styles from "./Gallery.module.css";

type Photo = { src: string; width: number; height: number; alt: string };

/*
  A Pinterest-style grid built as justified rows: every photo in a row shares
  one height, and each photo's width follows its own shape. Rows always fill
  edge to edge, so no column can end early and leave a hole.
*/
export function Gallery({ photos, order }: { photos: Photo[]; order: number }) {
  return (
    <ul className={styles.grid} aria-label="Photos">
      {photos.map((photo, index) => (
        <li
          key={photo.src}
          className={styles.item}
          {...reveal(order + index)}
          style={{
            ...reveal(order + index).style,
            "--ratio": photo.width / photo.height,
          } as React.CSSProperties}
        >
          <Image
            className={styles.photo}
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            sizes="(max-width: 52rem) 50vw, 26rem"
          />
        </li>
      ))}
    </ul>
  );
}
