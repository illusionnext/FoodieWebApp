import Link from "next/link";

export default function MealsPage() {
  return (
    <section>
      <h1>Meal Page</h1>
      <p>
        This page is a meal page. It is not part of the official Next.js
        documentation.
      </p>
      <ul>
        <li>
          <Link href="/meals/meal-1">Meal 1</Link>
        </li>
        <li>
          <Link href="/meals/meal-2">Meal 2</Link>
        </li>
        <li>
          <Link href="/meals/meal-3">Meal 3</Link>
        </li>
      </ul>
    </section>
  );
}
