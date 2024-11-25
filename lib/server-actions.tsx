"use server";

import { saveMeal } from "@/lib/get-meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function shareMealReact19(formData: FormData) {
  const isInvalidText = (text: string) => {
    return !text || text.trim() === "" || text.length === 0;
  };

  const image = formData.get("image");

  // Validate the image
  if (!(image instanceof File) || image.size === 0) {
    throw new Error("Invalid image file!");
  }

  const mealData = {
    id: Math.floor(Math.random() * 1000),
    title: formData.get("title") as string,
    slug: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: image.name, // Save only the image name or adjust as needed
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  // Validate the meal data
  if (
    isInvalidText(mealData.title) ||
    isInvalidText(mealData.summary) ||
    isInvalidText(mealData.instructions) ||
    isInvalidText(mealData.creator) ||
    isInvalidText(mealData.creator_email) ||
    !mealData.creator_email.includes("@")
  ) {
    throw new Error("Invalid data inserted!");
  }

  console.dir("Saving meal data:", mealData);

  await saveMeal(mealData); // Save the meal data
  revalidatePath("/meals"); // Revalidate cache

  // Redirect after successful save
  redirect("/meals"); // Note: Execution stops here
}
