"use server";

import { saveMeal } from "@/lib/get-meals";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Meal } from "@/types/types";

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
  let processedImage = "";

  if (image instanceof File) {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      processedImage = data.image;
    } else {
      errors.image = "Failed to upload image";
    }
  }

  const mealData: Omit<Meal, "id"> = {
    title: formData.get("title") as string,
    slug: (formData.get("title") as string).toLowerCase().replace(/\s+/g, "-"),
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: processedImage,
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
    revalidatePath("/meals", "page"); // Revalidate the "/meals" path
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
