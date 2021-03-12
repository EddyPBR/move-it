import styles from "../styles/components/Rank.module.css";

export function Rank() {
  return (
    <div className={styles.rank}>
      <div className={styles.position}>
        <b>1</b>
      </div>

      <div className={styles.info}>
        <div className={styles.userInfo}>
          <img
            src="https://avatars.githubusercontent.com/u/48658479?s=400&u=51365e1c6a53cb7c4a0741bb7dda1ebcf64d4417&v=4"
            alt="Edvaldo Junior"
          />
          <div>
            <b>Edvaldo Junior</b>
            <div>
              <img src="/assets/icons/level.svg" alt="level" />
              <span>Level 43</span>
            </div>
          </div>
        </div>

        <div className={styles.otherInfo}>
          <span>
            <b>127</b> completados
          </span>
        </div>

        <div className={styles.otherInfo}>
          <span>
            <b>154000</b> xp
          </span>
        </div>

      </div>
    </div>
  );
}
