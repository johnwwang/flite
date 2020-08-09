import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/header.js";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {" "}
      <Header></Header>
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
          <div className={styles.buttonflex}>
            <Link href="/app1">
              <button className={styles.button}>enter 1</button>
            </Link>
            <Link href="/app2">
              <button className={styles.button}>enter 2</button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
