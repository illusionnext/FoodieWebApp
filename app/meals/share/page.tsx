"use client";
import { useActionState } from "react";
import { shareMeal } from "@/lib/server-actions";

import Form from "next/form";
import classes from "./page.module.css";
import ImagePicker from "@/components/CSR-ClientSideRendering/image-picker/image-picker";

export default function Page() {
  const [state, formAction, isPending] = useActionState(shareMeal, {
    message: null,
    errors: {}, // Ensure errors is always initialized
  });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <Form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                spellCheck={true}
                lang="en"
                required
              />
              {state?.errors?.name && (
                <span className={classes.error}>{state.errors.name}</span>
              )}
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
              {state?.errors?.email && (
                <span className={classes.error}>{state.errors.email}</span>
              )}
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              spellCheck={true}
              lang="en-us"
              required
            />
            {state?.errors?.title && (
              <span className={classes.error}>{state.errors.title}</span>
            )}
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              spellCheck={true}
              lang="en"
              required
            />
            {state?.errors?.summary && (
              <span className={classes.error}>{state.errors.summary}</span>
            )}
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              spellCheck={true}
              lang="en"
              required
            ></textarea>
            {state?.errors?.instructions && (
              <span className={classes.error}>{state.errors.instructions}</span>
            )}
          </p>
          <ImagePicker label="Your Image" name="image" />
          {state?.message && (
            <span className={classes.error}>{state.message}</span>
          )}
          <p className={classes.actions}>
            <button type="submit" disabled={isPending}>
              {isPending ? "Sharing..." : "Share Meal"}
            </button>
          </p>
        </Form>
      </main>
    </>
  );
}
