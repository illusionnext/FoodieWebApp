import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import classes from "./meal-item.module.css";

export default function MealItem({
  title = "Unknown Meal",
  slug = "",
  image,
  summary = "No summary available.",
  creator = "Illusion",
}: {
  title?: string;
  slug?: string;
  image: StaticImageData;
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
            src={image || "/path/to/default-image.jpg"} //add default path later
            alt={title || "Meal image"}
            fill // fill means the image will stretch to fill the container the image will occupy the full size of the parent container.
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
