import { signIn, useSession } from "next-auth/client";
import Head from "next/head";

import { Redirect } from "../utils/Redirect";
import { FaGithub, FaArrowRight } from "react-icons/fa";

import styles from "../styles/pages/Login.module.css";

export default function Login() {
  const [session] = useSession();

  function handleAuthGithub(event: React.MouseEvent<HTMLElement>): void {
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
            <a href="/auth/github" onClick={handleAuthGithub}>
              Clique aqui e registre-se com seu Github
            </a>
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
