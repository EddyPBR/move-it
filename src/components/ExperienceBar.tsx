import { useSession } from "next-auth/client";

import { useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { ChallengesContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext
  );

  const [session] = useSession();

  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <SkeletonTheme color="#dcdde0" highlightColor="#F0F0F0">
      <header className={styles.experienceBar}>
        <span>0 xp</span>
        <div>
          <div style={{ width: `${percentToNextLevel || 5}%` }} />
          <span style={{ left: `${percentToNextLevel || 5}%` }}>
            {
              session 
                ? (experienceToNextLevel) 
                : (<Skeleton width={28} duration={1.5} />)
            }
            {" "}xp
          </span>
        </div>
        <span>
          {
            session 
              ? (experienceToNextLevel) 
              : (<Skeleton width={32} duration={1.5} />)
          }
          {" "}xp
        </span>
      </header>
    </SkeletonTheme>
  );
}

export default ExperienceBar;
