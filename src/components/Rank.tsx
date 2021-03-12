import styles from "../styles/components/Rank.module.css";

interface IRankInterface {
  position: number;
  name: string;
  imageUrl: string;
  level: number;
  challengesCompleted: number;
  totalExperience: number;
}

export function Rank({position, name, imageUrl, level, challengesCompleted, totalExperience}: IRankInterface) {
  return (
    <div className={styles.rank}>
      <div className={styles.position}>
        <b>{position}</b>
      </div>

      <div className={styles.info}>
        <div className={styles.userInfo}>
          <img
            src={imageUrl}
            alt={name}
          />
          <div>
            <b>{name}</b>
            <div>
              <img src="/assets/icons/level.svg" alt="level" />
              <span>Level {level}</span>
            </div>
          </div>
        </div>

        <div className={styles.otherInfo}>
          <span>
            <b>{challengesCompleted}</b> completados
          </span>
        </div>

        <div className={styles.otherInfo}>
          <span>
            <b>{totalExperience}</b> xp
          </span>
        </div>

      </div>
    </div>
  );
}
