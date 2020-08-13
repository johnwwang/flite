import React from "react";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function MathLobby() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={styles.chatcontainer}>
        <main className={styles.main}>
          <h1 className={styles.title} style={{ color: "#ff684A" }}>
            Welcome to the math lobby! Join a branch:
          </h1>
          <div className={styles.buttonflex}>
            <Link href="/app0">
              <button className={styles.button}>enter 1</button>
            </Link>
            <Link href="/app1">
              <button className={styles.button}>enter 2</button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
