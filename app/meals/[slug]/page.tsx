import { notFound } from "next/navigation";
import classes from "./page.module.css";
import Image from "next/image";
import { getAMeal } from "@/lib/get-meals";

interface Meal {
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export default async function MealsSlug({
  params,
}: {
  params: Promise<{ slug: string }>; // Declare `params` as a Promise type
}) {
  const { slug } = await params; // Await the `params` Promise before destructuring
  console.log({ slug });
  // console.log(params);

  const meal: Meal | null = await getAMeal(slug);
  if (!meal) notFound();

  const { title, image, summary, instructions, creator, creator_email } = meal;

  return (
    <section>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={image}
            alt={title}
            sizes="(max-width: 30rem) 100vw, 30rem"
            fill
          />
        </div>
        <div className={classes["header-text"]}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={classes.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: instructions.replace(/\n/g, "<br />"),
          }}
        ></p>
      </main>
    </section>
  );
}
