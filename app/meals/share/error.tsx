"use client";

export default function Error({ error }: { error: Error }) {
  console.error(error);
  return (
    <main className="error">
      <h1>An Error Occurred!</h1>
      <p>Failed to create meal data. Please try again later...</p>
    </main>
  );
}
