import { useSession } from "next-auth/client";

import { useContext } from "react";
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
          loading
          ? <Skeleton circle={true} height={80} width={80} duration={1.5} />
          : <img src={session.user.image} alt={session.user.name} />
        }
        <div>
          <strong>{loading ? <Skeleton width={100} duration={1.5} /> : session.user.name }</strong>
          <p>
            <img src="assets/icons/level.svg" alt="Level" />
            Level {level}
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
}
