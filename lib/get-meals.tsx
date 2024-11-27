import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { Meal } from "@/types/types";

// Initialize the SQLite database connection
const db = sql("meals.db");

export async function getMeals(): Promise<Meal[]> {
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

function isFile(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

export async function saveMeal(
  meal: Omit<Meal, "id"> & { image: string | File },
): Promise<Meal | null> {
  const sanitizedMeal: Omit<Meal, "id"> = {
    ...meal,
    title: xss(meal.title),
    slug: slugify(meal.title, { lower: true }),
    image: typeof meal.image === "string" ? xss(meal.image) : "",
    summary: xss(meal.summary),
    instructions: xss(meal.instructions),
    creator: xss(meal.creator),
    creator_email: xss(meal.creator_email),
  };

  if (isFile(meal.image)) {
    const extension = meal.image.name.split(".").pop();
    const fileName = `${sanitizedMeal.slug}.${extension}`;
    const filePath = `public/images/${fileName}`;

    // Save the image to the filesystem
    const stream = fs.createWriteStream(filePath);
    const arrayBuffer = await meal.image.arrayBuffer();
    stream.write(Buffer.from(arrayBuffer));
    sanitizedMeal.image = `/images/${fileName}`; // Update the image path
  }

  db.prepare(
    "INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email) VALUES (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)",
  ).run(sanitizedMeal);

  return getAMeal(sanitizedMeal.slug); // Return the stored meal
}
