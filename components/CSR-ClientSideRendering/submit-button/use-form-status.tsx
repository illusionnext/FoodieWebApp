// Currently I am using  useActionState hook to manage the form status(isPending), but I can use useFormStatus hook to manage the form status { pending }.
"use client";
import { useFormStatus } from "react-dom";

export default function UseFormStatus() {
  const { pending } = useFormStatus(); // we can destructure the pending status from the useFormStatus hook
  console.dir("status", pending);

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
