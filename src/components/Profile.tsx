import { useSession } from "next-auth/client";

import { useContext, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { ChallengesContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);

  const [session, loading] = useSession();

  return (
    <SkeletonTheme color="#dcdde0" highlightColor="#F0F0F0">
      <div className={styles.profileContainer}>
        {
          session
          ? <img src={session.user.image} alt={session.user.name} />
          : <Skeleton circle={true} height={80} width={80} duration={1.5} />
        }
        <div>
          <strong>{session ? session.user.name : <Skeleton width={100} duration={1.5} />}</strong>
          <p>
            <img src="assets/icons/level.svg" alt="Level" />
            Level {level}
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
}
