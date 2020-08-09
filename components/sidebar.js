import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from "react";

class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.sidenav}>
        <a href="/app0">Branch 1</a>
        <a href="/app1">Branch 2</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
    );
  }
}

export default Sidebar;
