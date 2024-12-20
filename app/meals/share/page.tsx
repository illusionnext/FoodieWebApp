"use client";

import { useActionState } from "react";
import { shareMeal } from "@/lib/server-actions";
import ShareMealForm from "@/components/SSG-ServerSideGeneration/share-meal-form/share-meal-forum";

export default function ShareMealPage() {
  const [state, formAction, isPending] = useActionState(shareMeal, {
    message: null,
    errors: {}, // Ensure errors is always initialized
  });

  return (
    <ShareMealForm
      message={state.message}
      errors={state.errors}
      formAction={formAction}
      isPending={isPending}
    />
  );
}
