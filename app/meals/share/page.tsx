import classes from "./page.module.css";
import ImagePicker from "@/components/SSG-ServerSideGeneration/image-picker/image-picker";
import { shareMealReact19 } from "@/lib/server-actions";
import FormStatus from "@/components/CSR-ClientSideRendering/submit-button/form-status";

export default function ShareMealPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={shareMealReact19}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                spellCheck="true"
                lang="en"
                required
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              spellCheck="true"
              lang="en"
              required
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              spellCheck="true"
              lang="en"
              required
            />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              spellCheck="true"
              lang="en"
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker label="Your Image" name="image" />
          <p className={classes.actions}>
            <FormStatus />
          </p>
        </form>
      </main>
    </>
  );
}
