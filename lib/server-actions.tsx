"use server";

import { saveMeal } from "@/lib/get-meals";
import { revalidatePath } from "next/cache";

interface ShareMealState {
  message: string | null;
  errors: Record<string, string>;
}

export async function shareMealReact19(
  prevState: ShareMealState | null,
  formData: FormData,
): Promise<ShareMealState> {
  const errors: Record<string, string> = {};
  const mealData = {
    id: Math.floor(Math.random() * 1000),
    title: formData.get("title") as string,
    slug: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: (formData.get("image") as File)?.name || "",
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  // Validate inputs
  if (!mealData.creator) errors.name = "Name is required.";
  if (!mealData.creator_email || !mealData.creator_email.includes("@"))
    errors.email = "Valid email is required.";
  if (!mealData.title) errors.title = "Title is required.";
  if (!mealData.summary) errors.summary = "Summary is required.";
  if (!mealData.instructions)
    errors.instructions = "Instructions are required.";

  if (Object.keys(errors).length > 0) {
    return {
      message: "Validation failed. Please fix the errors below.",
      errors,
    };
  }

  try {
    await saveMeal(mealData);
    revalidatePath("/meals");
    return { message: "Meal shared successfully!", errors: {} };
  } catch (error) {
    console.error("Error sharing meal:", error);
    return {
      message: "An error occurred while sharing the meal. Please try again.",
      errors: {},
    };
  }
}
