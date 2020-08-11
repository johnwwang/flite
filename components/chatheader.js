import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from "react";

class ChatHeader extends React.Component {
  render() {
    return (
      <div className={styles.topnav}>
        <a>
          <img className={styles.headericon} src="/flitebird.gif"></img>
        </a>
        <Link href="/math">
          <a>Lobby</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <span className={styles.topnavright}>
          <a onClick={this.props.handleReset}>Reset</a>
        </span>
      </div>
    );
  }
}

export default ChatHeader;
