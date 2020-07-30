import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>flite</title>
        <link rel="icon" href="/birb.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} style={{ color: "#ff684A" }}>
          flite
        </h1>
      </main>
    </div>
  );
}
