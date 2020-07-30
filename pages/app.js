import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function App() {
  return (
    <div>
      <Head>
        <title>flite:app</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title} style={{ color: "#ff684A" }}>
          App
        </h1>
      </main>
    </div>
  );
}
