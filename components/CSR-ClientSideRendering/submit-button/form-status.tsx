"use client";
import { useFormStatus } from "react-dom";

export default function FormStatus() {
  // const status = useFormStatus(); // it is an object with status and pending properties
  const { pending } = useFormStatus(); // we can destructure the pending status from the useFormStatus hook
  console.dir("status", pending);

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
