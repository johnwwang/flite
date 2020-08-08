import Head from "next/head";
import Header from "../components/header.js";
import styles from "../styles/About.module.css";
import Link from "next/link";

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>flite</title>
        <link rel="icon" href="/birb.png" />
      </Head>
      <Header></Header>
      <main className={styles.column}>
      <img className={styles.logo} src="foresticon.png"></img>
      </main>
      <main className={styles.column}>
      <img className={styles.logo} src="treeicon.png"></img>
      </main>
      <main className={styles.column}>
      <img className={styles.logo} src="branchicon.png"></img>
      </main>
    </div>
  );
}
