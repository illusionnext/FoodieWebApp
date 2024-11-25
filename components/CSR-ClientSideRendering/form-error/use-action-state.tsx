import { useActionState } from "react";
import { shareMealReact19 } from "@/lib/server-actions";
import ShareMealPage from "@/app/meals/share/page";

export default function UseActionState() {
  const [state, formAction, isPending] = useActionState(shareMealReact19, {
    message: null,
    errors: {}, // Make sure errors is always an object
  });

  return (
    <ShareMealPage
      message={state.message}
      errors={state.errors}
      formAction={formAction}
      isPending={isPending}
    />
  );
}
