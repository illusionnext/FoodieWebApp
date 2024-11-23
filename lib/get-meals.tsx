import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

// Define the Meal type for better readability and maintainability
interface Meal {
  id: number;
  title: string;
  slug: string;
  image: string | File; // Support both string (base64) and File objects
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

// Initialize the SQLite database connection
const db = sql("meals.db");

export async function getMeals(): Promise<Meal[]> {
  // Simulate an async operation
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error("Fetching meals failed!");
  // Fetch all meals and cast the result to the Meal type
  return db.prepare("SELECT * FROM meals").all() as Meal[]; // Type assertion to Meal[]
}

// db.prepare("SELECT * FROM meals").run(); //insert data to the database
// db.prepare("SELECT * FROM meals").get(); //fetch one data from the database

export async function getAMeal(slug: string): Promise<Meal | null> {
  try {
    const meal = db
      .prepare("SELECT * FROM meals WHERE slug = ?")
      .get(slug) as Meal;
    return meal || null; // Return null if the meal is not found
  } catch (error) {
    console.error("Error fetching meal:", error);
    throw error; // Retain for other errors like database issues
  }
}

export async function saveMeal(meal: Meal): Promise<Meal | null> {
  // Validate the meal data
  if (
    !meal.title ||
    !meal.slug ||
    !meal.image ||
    !meal.summary ||
    !meal.instructions ||
    !meal.creator ||
    !meal.creator_email
  ) {
    throw new Error("Meal Data is invalid");
  }

  // Sanitize the meal data
  const sanitizedMeal = {
    ...meal,
    title: xss(meal.title),
    slug: slugify(meal.title, { lower: true }),
    image: meal.image instanceof File ? meal.image : xss(meal.image),
    summary: xss(meal.summary),
    instructions: xss(meal.instructions),
    creator: xss(meal.creator),
    creator_email: xss(meal.creator_email),
  };
  console.dir(sanitizedMeal);

  if (sanitizedMeal.image instanceof File) {
    const extension: string | undefined = sanitizedMeal.image.name
        .split(".")
        .pop(),
      fileName = `${sanitizedMeal.slug}.${extension}`,
      stream = fs.createWriteStream(`public/images/${fileName}`),
      arrayBuffer = await sanitizedMeal.image.arrayBuffer(), // Get ArrayBuffer
      bufferedImage = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer

    stream.write(bufferedImage);

    sanitizedMeal.image = `/images/${fileName}`; // Set the image path
  }

  // Insert the meal into the database
  db.prepare(
    "INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email) VALUES (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)",
  ).run(sanitizedMeal);

  // Return the inserted meal
  return getAMeal(sanitizedMeal.slug);
}

// Storing images in the database is a bad idea, it's better to store the image in a folder and store the path in the database
// Using public folder for user uploaded images is not a good idea, it's better to use a separate folder for user uploaded images
