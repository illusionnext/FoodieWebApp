"use server";

import { saveMeal } from "@/lib/get-meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function shareMealReact19(formData: FormData) {
  const mealData = {
    id: Math.floor(Math.random() * 1000),
    title: formData.get("title") as string,
    slug: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as string,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  console.dir("Saving meal data:", mealData);

  await saveMeal(mealData); // Save the meal data
  revalidatePath("/meals"); // Revalidate cache

  // Redirect after successful save
  redirect("/meals"); // Note: Execution stops here
}
