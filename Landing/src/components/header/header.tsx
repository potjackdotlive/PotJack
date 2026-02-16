import React from "react";
import classes from "./header.module.scss";
import Link from "next/link";
import LogoIcon from "@/components/icons/logo-icon";
import { navItems } from "@/components/header/utils";
import Button from "@/components/button";

function Header() {
  return (
    <header className={classes.root}>
      <nav className={classes.navigation}>
        <Link href="/" className={classes.logo}>
          <LogoIcon />
        </Link>
        <ul className={classes.linksList}>
          {navItems.map(({ label, href }) => (
            <li key={href} className={classes.linkItem}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        <Button
          size="sm"
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_LOTTERY_PLAY_URL}`}
        >
          Verify Your Entry
        </Button>
      </nav>
    </header>
  );
}

export default Header;
