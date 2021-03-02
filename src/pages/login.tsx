import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";

import { useEffect, MouseEvent } from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa";

import styles from "../styles/pages/Login.module.css";

export default function Login() {
  const [session, loading] = useSession();

  function Redirect({ to }) {
    const router = useRouter();
  
    useEffect(() => {
      router.push(to);
    }, [to]);
  
    return null;
  }

  function handleAuthGithub(event: MouseEvent<HTMLElement>): void {
    event.preventDefault();
    signIn("github");
  }

  if (session) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.content}>
      <Head>
        <title>Login | Move.it</title>
      </Head>

      <div className={styles.container}>
        <main>
          <img src="/assets/images/logo-white.svg" alt="Move it" />

          <strong>Bem-vindo</strong>

          <div>
            <FaGithub size={40} />
            <a href="/auth/github" onClick={handleAuthGithub}>Clique aqui e registre-se com seu Github</a>
          </div>

          <form className={styles.formLogin}>
            <input type="text" placeholder="Digite seu username" />
            <button>
              <FaArrowRight size={24} />
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
