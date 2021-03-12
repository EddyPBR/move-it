import Link from "next/link";
import { signOut } from "next-auth/client";

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
          <Link href="/leaderboard">
            <a>
              <GiRibbonMedal />
              <span>rank</span>
            </a>
          </Link>
        </li>

        <li>
          <button className={styles.logout} onClick={() => signOut({redirect: true, callbackUrl: `${process.env.BASE_URL}/login` })}>
            <AiOutlinePoweroff />
            <span>logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
