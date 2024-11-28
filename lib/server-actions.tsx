"use server";

import { saveMeal } from "@/lib/get-meals";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ShareMealState {
  message: string | null;
  errors: Record<string, string>;
}

export async function shareMealReact19(
  prevState: ShareMealState | null,
  formData: FormData,
): Promise<ShareMealState> {
  const errors: Record<string, string> = {};

  const image = formData.get("image");
  let processedImage: string | File;

  if (image instanceof File) {
    processedImage = image; // Keep the image as File if it's a valid File object
  } else {
    processedImage = ""; // Default to empty or a placeholder if no image is selected
  }

  const mealData = {
    title: formData.get("title") as string,
    slug: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: typeof processedImage === "string" ? processedImage : "", // Ensure image is a string
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  // **Validate inputs**
  if (!mealData.creator) errors.name = "Name is required.";
  if (!mealData.creator_email || !mealData.creator_email.includes("@"))
    errors.email = "Valid email is required.";
  if (!mealData.title) errors.title = "Title is required.";
  if (!mealData.summary) errors.summary = "Summary is required.";
  if (!mealData.instructions)
    errors.instructions = "Instructions are required.";

  // **Return errors if validation fails**
  if (Object.keys(errors).length > 0) {
    return {
      message: "Validation failed. Please fix the errors below.",
      errors,
    };
  }

  // **No errors: Proceed to save data**
  try {
    await saveMeal(mealData);
    console.dir('Revalidating "/meals" path... 🦈');
    revalidatePath("/meals", "layout");
  } catch (error) {
    console.error("Error sharing meal:", error);
    return {
      message: "An error occurred while sharing the meal. Please try again.",
      errors: {},
    };
  }
  console.dir("Redirecting to meals page... 🦈");
  redirect("/meals");
}
