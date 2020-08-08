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
        <Link href="home"><a>Home</a></Link>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <Link href="about"><a>About</a></Link>
      </div>
    );
  }
}

export default Header;
