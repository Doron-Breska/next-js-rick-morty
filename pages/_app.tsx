import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
import styles from "../styles/Recipes.module.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <MainLayout>
      <div
        style={{
          backgroundColor: "rgb(234, 102, 7)",
          padding: "1rem",
        }}
      >
        <Link
          href="/"
          className={
            router.pathname === "/" ? styles.activeLink : styles.navLinks
          }
        >
          Episodes page
        </Link>
        <Link
          href="/characters"
          className={
            router.pathname === "/characters"
              ? styles.activeLink
              : styles.navLinks
          }
        >
          Characters page
        </Link>
        {/* <Link
          href="/episodes"
          className={
            router.pathname === "/episodes"
              ? styles.activeLink
              : styles.navLinks
          }
        >
          Episodes page
        </Link> */}
      </div>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
