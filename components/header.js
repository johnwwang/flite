import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className={styles.topnav}>
        <a>
          <img className={styles.headericon} src="birb.png"></img>
        </a>
        <a className={styles.active} href="#home">
          Home
        </a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
    );
  }
}

export default Header;
