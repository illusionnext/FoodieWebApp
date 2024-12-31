"use server";
import "server-only";

import { saveMeal } from "@/lib/get-meals";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { Meal } from "@/types/types";

import xss from "xss";
import slugify from "slugify";
import fs from "node:fs";

interface ShareMealState {
  message: string | null;
  errors: Record<string, string>;
}

// Check if the value is a File object
const isFile = (value: unknown): value is File => {
  return typeof File !== "undefined" && value instanceof File;
};

export async function shareMeal(
  prevState: ShareMealState | null,
  formData: FormData,
): Promise<ShareMealState> {
  const errors: Record<string, string> = {};

  const title = formData.get("title") as string,
    slug = formData.get("title") as string,
    summary = formData.get("summary") as string,
    instructions = formData.get("instructions") as string,
    image = formData.get("image") as File,
    creator = formData.get("name") as string,
    creator_email = formData.get("email") as string;

  // Check if the image is a File object
  if (isFile(image)) {
    const extension = image.name.split(".").pop();
    const fileName = `${slug}.${extension}`;
    const filePath = `public/images/${fileName}`;

    const sanitizedMeal = {
      title: xss(title),
      slug: slugify(title, { lower: true }),
      image: xss(filePath),
      summary: xss(summary),
      instructions: xss(instructions),
      creator: xss(creator),
      creator_email: xss(creator_email),
    };

    // Save the image to the filesystem
    const stream = fs.createWriteStream(filePath);
    const arrayBuffer = await image.arrayBuffer();
    stream.write(Buffer.from(arrayBuffer));
    sanitizedMeal.image = `/images/${fileName}`; // Update the image path

    // Validate inputs
    if (!sanitizedMeal.creator) errors.name = "Name is required.";
    if (
      !sanitizedMeal.creator_email ||
      !sanitizedMeal.creator_email.includes("@")
    )
      errors.email = "Valid email is required.";
    if (!sanitizedMeal.title) errors.title = "Title is required.";
    if (!sanitizedMeal.summary) errors.summary = "Summary is required.";
    if (!sanitizedMeal.instructions)
      errors.instructions = "Instructions are required.";

    // Return errors if validation fails
    if (Object.keys(errors).length > 0) {
      return {
        message: "Validation failed. Please fix the errors below.",
        errors,
      };
    }

    // No errors: Proceed to save data
    try {
      await saveMeal(sanitizedMeal);
      console.dir('Revalidating "/meals" path... 💥🦈');
      revalidatePath("/meals", "layout");
    } catch (error) {
      console.error("Error sharing meal: ❌🥊", error);
      return {
        message: "An error occurred while sharing the meal. Please try again.",
        errors: {},
      };
    }
    console.dir("Redirecting to meals page... 💥🦈");
    redirect("/meals");
  }

  return {
    message: "Image is not a valid file.",
    errors: {},
  };
}
