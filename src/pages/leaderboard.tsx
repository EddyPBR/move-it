import { useSession } from "next-auth/client";
import Head from "next/head";

import { useEffect, useState } from "react";

import { Navbar } from "../components/Navbar";
import { Rank } from "../components/Rank";

import { Redirect } from "../utils/Redirect";

import api from "../services/api";

import styles from "../styles/pages/Leaderboard.module.css";

interface ILeaderboard {
  name: string;
  image: string;
  level: number;
  totalExperience: number;
  challengesCompleted: number;
}

export default function Login() {
  const [session, loading] = useSession();
  const [leaderboard, setLeaderboard] = useState<Array<ILeaderboard>>([]);

  if (!loading && !session) {
    return <Redirect to="/login" />;
  }

  useEffect(() => {
    api
      .get("/api/leaderboard")
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch(() => {
        console.warn("Error to load leaderboard");
      });
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Leaderboard | Move.it</title>
      </Head>

      <Navbar />

      <h1>Leaderboard</h1>

      <div className={styles.leaderboard}>
        <ul>
          {leaderboard.map((leaderboard, index) => (
            <li key={index}>
              <Rank
                position={index + 1}
                name={leaderboard.name}
                imageUrl={leaderboard.image}
                level={leaderboard.level}
                challengesCompleted={leaderboard.challengesCompleted}
                totalExperience={leaderboard.totalExperience}
              />
            </li>
          ))}
          {leaderboard.map((leaderboard, index) => (
            <li key={index}>
              <Rank
                position={index + 1}
                name={leaderboard.name}
                imageUrl={leaderboard.image}
                level={leaderboard.level}
                challengesCompleted={leaderboard.challengesCompleted}
                totalExperience={leaderboard.totalExperience}
              />
            </li>
          ))}
          {leaderboard.map((leaderboard, index) => (
            <li key={index}>
              <Rank
                position={index + 1}
                name={leaderboard.name}
                imageUrl={leaderboard.image}
                level={leaderboard.level}
                challengesCompleted={leaderboard.challengesCompleted}
                totalExperience={leaderboard.totalExperience}
              />
            </li>
          ))}
          {leaderboard.map((leaderboard, index) => (
            <li key={index}>
              <Rank
                position={index + 1}
                name={leaderboard.name}
                imageUrl={leaderboard.image}
                level={leaderboard.level}
                challengesCompleted={leaderboard.challengesCompleted}
                totalExperience={leaderboard.totalExperience}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
