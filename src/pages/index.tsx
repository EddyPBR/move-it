import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { useEffect } from "react";

import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";
import { Navbar } from "../components/Navbar";

import styles from "../styles/pages/Home.module.css";

interface IHomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: IHomeProps) {
  const [session, loading] = useSession();

  function Redirect({ to }) {
    const router = useRouter();
  
    useEffect(() => {
      router.push(to);
    }, [to]);
  
    return null;
  }

  if (!loading && !session) {
    return <Redirect to="/login" />;
  }
  
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | Move.it</title>
        </Head>

        <Navbar />

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
