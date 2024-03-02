"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import classes from "./nav-link.module.css";

function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`${classes.link} ${path.startsWith(href) ? classes.active : ""}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
