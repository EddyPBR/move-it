import Head from "next/head";

import { FaGithub, FaArrowRight } from "react-icons/fa";

import styles from "../styles/pages/Login.module.css";

export default function Login() {
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
            <a href="#">Faça login com seu Github para começar</a>
          </div>

          <form className={styles.formLogin}>
            <input type="text" placeholder="Digite seu username" />
            <button>
              <FaArrowRight size={20} />
            </button>
          </form>

        </main>
      </div>
    </div>
  );
}
