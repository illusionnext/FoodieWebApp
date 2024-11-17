import Image from "next/image";
import classes from "./main-header.module.css";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import MainHeaderBackground from "@/components/SSG-ServerSideGeneration/main-header/main-header-background";
import NavLink from "@/components/CSR-ClientSideRendering/nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image
            src={Logo}
            alt="A plate with food on it"
            width={128}
            height={128}
            priority
          />
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href={"/meals"}>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href={"/community"}>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
