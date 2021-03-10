import { useSession } from "next-auth/client";

import { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

import api from "../services/api";

import { LevelUpModal } from "../components/LevelUpModal";

import chalenges from "../resources/challenges.json";

interface IChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface IChallengeObject {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface IChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: IChallengeObject;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export interface IProfileSchema {
  githubId: number;
  login: string;
  name: string;
  image: string;
  level: number;
  currentExperience: number;
  totalExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as IChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: IChallengesProviderProps) {
  const [session, loading] = useSession();

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    if(!loading) {
      api
      .get(`/api/profile/${session?.githubId}`)
      .then((response) => {
        const { level, currentExperience, challengesCompleted } = response.data as IProfileSchema;
        setLevel(level);
        setCurrentExperience(currentExperience);
        setChallengesCompleted(challengesCompleted);
      })
      .catch((error) => console.log(error));
    }
  }, [session, loading]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * chalenges.length);
    const challenge = chalenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("assets/sounds/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function saveOnDatabase(level: number, currentExperience: number, totalExperience: number): void {
    api.put(`/api/profile/${session?.githubId}`, {
      level: level + 1,
      currentExperience,
      totalExperience
    })
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    const totalExperience: number = currentExperience + amount;
    let finalExperience: number = currentExperience + amount;
    

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);

    saveOnDatabase(level, finalExperience, totalExperience);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        experienceToNextLevel,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  );
}
