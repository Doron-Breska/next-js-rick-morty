import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
import styles from "../styles/Recipes.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <nav
        style={{
          backgroundColor: "rgb(226, 129, 32",
          padding: "1rem",
        }}
      >
        <Link className={styles.navLinks} href="/">
          Home
        </Link>
        <Link className={styles.navLinks} href="/characters">
          Characters page
        </Link>
        <Link className={styles.navLinks} href="/episodes">
          Episodes page
        </Link>
      </nav>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
