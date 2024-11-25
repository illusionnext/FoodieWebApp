// components/ShareMealForm.tsx
import classes from "./share-meal-forum.module.css";
import ImagePicker from "@/components/SSG-ServerSideGeneration/image-picker/image-picker";

interface ShareMealFormProps {
  message: string | null;
  errors: Record<string, string>;
  formAction: (formData: FormData) => void;
  isPending: boolean;
}

export default function ShareMealForm({
  message,
  errors,
  formAction,
  isPending,
}: ShareMealFormProps) {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
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
              {errors.name && (
                <span className={classes.error}>{errors.name}</span>
              )}
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
              {errors.email && (
                <span className={classes.error}>{errors.email}</span>
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
              lang="en"
              required
            />
            {errors.title && (
              <span className={classes.error}>{errors.title}</span>
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
            {errors.summary && (
              <span className={classes.error}>{errors.summary}</span>
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
            {errors.instructions && (
              <span className={classes.error}>{errors.instructions}</span>
            )}
          </p>
          <ImagePicker label="Your Image" name="image" />
          <p className={classes.actions}>
            <button type="submit" disabled={isPending}>
              {isPending ? "Sharing..." : "Share Meal"}
            </button>
            {message && <span className={classes.error}>{message}</span>}
          </p>
        </form>
      </main>
    </>
  );
}
