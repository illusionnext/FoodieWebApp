import classes from "./meal-grid.module.css";

export default function MealsGrid({ meals }: { meals: { id: number }[] }) {
  return (
    <ul className={classes.grid}>
      {meals.map((meal) => (
        <li key={meal.id}>MEALS WILL BE HERE</li>
      ))}
    </ul>
  );
}
