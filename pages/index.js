import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>flite</title>
        <link rel="icon" href="/birb.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} style={{ color: "#ff684A" }}>
          welcome to
        </h1>
        <img className={styles.logo} src="flightlogo.png"></img>
        <Link href="/app">
          <button className={styles.button}>enter</button>
        </Link>
      </main>
    </div>
  );
}
