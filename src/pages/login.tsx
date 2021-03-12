import { signIn, useSession } from "next-auth/client";
import Head from "next/head";

import { Redirect } from "../utils/Redirect";
import { FaGithub, FaArrowRight } from "react-icons/fa";

import styles from "../styles/pages/Login.module.css";

export default function Login() {
  const [session] = useSession();

  function handleAuthGithub(event: React.MouseEvent<HTMLElement>): void {
    event.preventDefault();
    signIn("github", {redirect: true, callbackUrl: `${process.env.BASE_URL}`});
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
              Clique aqui e faça login com o Github
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
