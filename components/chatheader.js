import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from "react";

class ChatHeader extends React.Component {
  render() {
    return (
      <div className={styles.topnav}>
        <a>
          <img className={styles.headericon} src="birb.png"></img>
        </a>
        <Link href="/">
          <a>Lobby</a>
        </Link>
        <Link href="about">
          <a>About</a>
        </Link>
      </div>
    );
  }
}

export default ChatHeader;
