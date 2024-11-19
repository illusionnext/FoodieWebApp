import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/SSR-ServerSideRendering/meals/meal-grid";
import { getMeals } from "@/lib/get-meals";
import { Suspense } from "react";

async function MealsData() {
  const meals: {
    id: number;
    title: string;
    slug: string;
    image: string;
    summary: string;
    instructions: string;
    creator: string;
    creator_email: string;
  }[] = await getMeals(); //we can fetch it without useEffect because it is SSR, we are on the server
  return <MealsGrid meals={meals} />;
}

// SSR function can be async
export default function MealsPage() {
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
        {/*Suspense is used to wrap the component that is being fetched, It does the same action as the loading component background.*/}
        <Suspense
          fallback={<h1 className={classes.loading}>Meals are loading...</h1>}
        >
          <MealsData />
        </Suspense>
      </main>
    </>
  );
}
