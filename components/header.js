import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from "react";
import Head from "next/head";
import * as utils from "../public/js/myscriptheader.js";

class Header extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <script
            type="text/javascript"
            src="../public/js/myscriptheader.js"
          ></script>
        </Head>
        <div id="London" className={styles.tabcontent}>
          <h1>London</h1>
          <p>London is the capital city of England.</p>
        </div>

        <div id="Paris" className={styles.tabcontent}>
          <h1>Paris</h1>
          <p>Paris is the capital of France.</p>
        </div>

        <div id="Tokyo" className={styles.tabcontent}>
          <h1>Tokyo</h1>
          <p>Tokyo is the capital of Japan.</p>
        </div>

        <div id="Oslo" className={styles.tabcontent}>
          <h1>Oslo</h1>
          <p>Oslo is the capital of Norway.</p>
        </div>

        <button
          className={styles.tablink}
          onClick={utils.openCity("London", this, "red")}
          id="defaultOpen"
        >
          London
        </button>
        <button
          className={styles.tablink}
          onClick={utils.openCity("Paris", this, "green")}
        >
          Paris
        </button>
        <button
          className={styles.tablink}
          onClick={utils.openCity("Tokyo", this, "blue")}
        >
          Tokyo
        </button>
        <button
          className={styles.tablink}
          onClick={utils.openCity("Oslo", this, "orange")}
        >
          Oslo
        </button>
      </div>
    );
  }
}

export default Header;
