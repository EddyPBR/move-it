import Link from "next/link";

import { useState } from "react";

import { AiOutlineHome, AiOutlinePoweroff } from "react-icons/ai";
import { GiRibbonMedal } from "react-icons/gi";

import styles from "../styles/components/Navbar.module.css";

export function Navbar() {

  return (
    <nav className={styles.navbar}>
      <div>
        <img src="/assets/images/logo-mini.svg" alt="move-it" />
      </div>

      <ul>
        <li>
          <Link href="/">
            <a>
              <AiOutlineHome />
              <span>home</span>
            </a>
          </Link>
        </li>

        <li>
          <Link href="/rank">
            <a>
              <GiRibbonMedal />
              <span>rank</span>
            </a>
          </Link>
        </li>

        <li>
          <a href="/auth/logout" className={styles.logout}>
            <AiOutlinePoweroff />
            <span>logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
