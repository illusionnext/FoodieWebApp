import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import classes from "./meal-item.module.css";
import placeholderImage from "@/assets/placeholder.jpg";

export default function MealItem({
  id = 999,
  title = "Unknown Meal",
  slug = "",
  image,
  summary = "No summary available.",
  creator = "Illusion",
}: {
  id?: number;
  title?: string;
  slug?: string;
  image: StaticImageData | string; // Allow image to be a string or StaticImageData
  summary?: string;
  creator?: string;
}) {
  if (!slug) {
    console.warn("No slug provided for MealItem, link will not work!");
  }

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={image || placeholderImage} // Use placeholder image if no image is provided
            alt={title || "Meal image"}
            // layout="intrinsic"
            // loading="lazy" enabled by default
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // priority //lazy loading will be disabled
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <section className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          {slug ? (
            <Link href={`/meals/${slug}`}>View Details</Link>
          ) : (
            <span>Details Unavailable</span>
          )}
        </div>
      </section>
    </article>
  );
}
