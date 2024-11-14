import Image from "next/image";
import { perks } from "./data";
import classes from "./page.module.css";

export default function CommunityPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          One shared passion: <span className={classes.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>

      <main className={classes.main}>
        <h2>Community Perks</h2>
        <ul className={classes.perks}>
          {perks.map((perk, index) => (
            <li key={index}>
              <Image src={perk.icon} alt={perk.textAlt} key={index + 99} />
              <p key={index + 999}>{perk.textP}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
