import sql from "better-sqlite3";

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

export function getMeals(): Meal[] {
  // Fetch all meals and cast the result to the Meal type
  return db.prepare("SELECT * FROM meals").all() as Meal[]; // Type assertion to Meal[]
}

// db.prepare("SELECT * FROM meals").run(); //insert data to the database
// db.prepare("SELECT * FROM meals").get(); //fetch one data from the database
