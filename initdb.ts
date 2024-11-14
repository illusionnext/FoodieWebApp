// This is written in TypeScript, for PostgreSQL database initialization
import { Pool } from "pg";

// Configure PostgreSQL client
const pool = new Pool({
  user: "yourUsername",
  host: "localhost",
  database: "meals",
  password: "yourPassword",
  port: 5432, // Default PostgreSQL port
});

// Define the structure for meal data
interface Meal {
  slug: string;
  title: string;
  image: string; // Storing image path as a string
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

// Sample data for meals
const dummyMeals: Meal[] = [
  {
    title: "Juicy Cheese Burger",
    slug: "juicy-cheese-burger",
    image: "/images/burger.jpg",
    summary:
      "A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.",
    instructions: `
      1. Prepare the patty: Mix 200g of ground beef with salt and pepper. Form into a patty.
      2. Cook the patty: Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.
      3. Assemble the burger: Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.
      4. Serve: Complete the assembly with the top bun and serve hot.
    `,
    creator: "John Doe",
    creator_email: "johndoe@example.com",
  },
  // Add additional meal objects as needed
];

// Function to initialize the database and insert dummy data
async function initData() {
  try {
    // Create the meals table if it does not exist
    await pool.query(`
            CREATE TABLE IF NOT EXISTS meals (
                id SERIAL PRIMARY KEY,
                slug VARCHAR(255) UNIQUE NOT NULL,
                title VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                summary TEXT NOT NULL,
                instructions TEXT NOT NULL,
                creator VARCHAR(255) NOT NULL,
                creator_email VARCHAR(255) NOT NULL
                )
        `);

    // Prepare insert statement with conflict handling for unique slugs
    const insertQuery = `
            INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
                ON CONFLICT (slug) DO NOTHING
        `;

    // Insert each meal into the database
    for (const meal of dummyMeals) {
      await pool.query(insertQuery, [
        meal.slug,
        meal.title,
        meal.image,
        meal.summary,
        meal.instructions,
        meal.creator,
        meal.creator_email,
      ]);
    }

    console.log("Database initialized with dummy data.");
  } catch (error) {
    console.error("Error initializing data:", error);
  } finally {
    // End the pool connection after initialization
    await pool.end();
  }
}

// Ensure the initData function is awaited when called
initData().catch((error) => {
  console.error("Error during database initialization:", error);
});
