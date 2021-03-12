import { useSession } from "next-auth/client";

import { useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { ChallengesContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext);

  const [session] = useSession();

  return (
    <SkeletonTheme color="#dcdde0" highlightColor="#F0F0F0">
      <div className={styles.completedChallengesContainer}>
        <span>Desafios completos</span>
        <span>
        {
          session 
            ? (String(challengesCompleted).padStart(2, "0")) 
            : (<Skeleton width={50} duration={1.5} />)
        }
        </span>
      </div>
    </SkeletonTheme>
  );
}
