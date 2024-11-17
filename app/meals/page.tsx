import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/SSR-ServerSideRendering/meals/meal-grid";
import { getMeals } from "@/lib/get-meals";

// SSR function can be async
export default async function MealsPage() {
  const meals: {
    id: number;
    title: string;
    slug: string;
    image: string;
    summary: string;
    instructions: string;
    creator: string;
    creator_email: string;
  }[] = getMeals(); //we can fetch it without useEffect because it is SSR, we are on the server

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals created{" "}
          <span className={classes.highlight}>by you!</span>{" "}
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
