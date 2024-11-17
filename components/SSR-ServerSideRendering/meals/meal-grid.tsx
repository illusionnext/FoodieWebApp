import classes from "./meal-grid.module.css";
import MealItem from "@/components/SSR-ServerSideRendering/meals/meal-item";
// import { StaticImageData } from "next/image";

export default function MealsGrid({
  meals,
}: {
  meals: {
    id: number;
    title: string;
    slug: string;
    image: string;
    summary: string;
    instructions: string;
    creator: string;
    creator_email: string;
  }[];
}) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
