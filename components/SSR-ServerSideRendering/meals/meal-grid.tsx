import classes from "./meal-grid.module.css";
import MealItem from "@/components/SSR-ServerSideRendering/meals/meal-item";
import { StaticImageData } from "next/image";

export default function MealsGrid({
  meals,
}: {
  meals: {
    id: number;
    title: string;
    slug: string;
    image: StaticImageData;
    summary: string;
    creator: string;
  }[];
}) {
  return (
    <ul className={classes.grid}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
