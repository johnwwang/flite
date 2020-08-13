import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from "react";

class Sidebar extends React.Component {
  render() {
    return (
      <div className={styles.sidenav}>
        <Link href="/app0">
          <a>Branch 1</a>
        </Link>
        <Link href="/app1">
          <a>Branch 2</a>
        </Link>
        <Link href="/createbranch">
          <a>Create a Branch</a>
        </Link>
      </div>
    );
  }
}

export default Sidebar;
