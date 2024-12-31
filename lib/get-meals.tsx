"use server";
import "server-only";

import sql from "better-sqlite3";

import { Meal } from "@/types/types";

// PRFA-65Y3-3VY4-3R48-CK2B-D6V6-KQMC

// Initialize the SQLite database connection
const db = sql("meals.db");

export async function getMeals(): Promise<Meal[]> {
  "use cache";
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}

export async function getAMeal(slug: string): Promise<Meal | null> {
  try {
    const meal = db
      .prepare("SELECT * FROM meals WHERE slug = ?")
      .get(slug) as Meal;
    return meal || null; // Return null if no meal is found to render a 404 page to run notFound() instead of error()
  } catch (error) {
    console.error("Error fetching meal:", error);
    throw error;
  }
}

export async function saveMeal(
  meal: Omit<Meal, "id"> & { image: string | File },
): Promise<Meal | null> {
  db.prepare(
    "INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email) VALUES (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)",
  ).run(meal);

  return getAMeal(meal.slug); // Return the stored meal
}
