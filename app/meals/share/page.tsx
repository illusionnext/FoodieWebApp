"use client";

import { useActionState } from "react";
import { shareMealReact19 } from "@/lib/server-actions";
import ShareMealForm from "@/components/SSG-ServerSideGeneration/share-meal-form/share-meal-forum";

export default function ShareMealPage() {
  const [state, formAction, isPending] = useActionState(shareMealReact19, {
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
