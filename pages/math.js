import React from "react";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import styles from "../styles/Home.module.css";

export default function MathLobby() {
  return(<div>
    <Header/>
    <Sidebar/>
    <div className={styles.chatcontainer}>
      <main className={styles.main}>
          <h1 className={styles.title} style={{ color: "#ff684A" }}>
            welcome to the math lobby! join a branch
          </h1>
        </main>
        </div>
  </div>)
}