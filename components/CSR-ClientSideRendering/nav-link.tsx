"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import classes from "./nav-link.module.css";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = usePathname(); // currently active path

  return (
    <Link
      href={href}
      className={clsx(classes.link, {
        [classes.active]: path.startsWith(href),
      })}
      // className={clsx(classes.nav, { [classes.active]: path.startsWith("/meals") })}
    >
      {children}
    </Link>
  );
}
