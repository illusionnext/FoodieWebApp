import sql from "better-sqlite3";
// import { resolve } from "node:dns";

// Define the Meal type for better readability and maintainability
interface Meal {
  id: number;
  title: string;
  slug: string;
  image: string;
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
