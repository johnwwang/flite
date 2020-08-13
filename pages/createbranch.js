import React, { useState } from "react";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function CreateBranch() {
  const [branch, setBranch] = useState({ branchName: "branch" });
  const onChange = (event) => {
    setBranch({ branchName: event.target.value });
    console.log(event.target.value);
    console.log(JSON.stringify(branch));
  };
  const handleSubmit = async () => {
    console.log(branch);
    const res = await fetch(process.env.BASE_URL + "/dbadd", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(branch),
    });
    console.log(res);
    alert("created branch!");
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={styles.chatcontainer}>
        <main className={styles.main}>
          <h1 className={styles.title} style={{ color: "#ff684A" }}>
            create a branch
          </h1>
          <div className={styles.buttonflex}>
            <input
              type="text"
              value={branch.branchName}
              onChange={(e) => onChange(e)}
            />
            <br />
            <input type="button" defaultValue="Submit" onClick={handleSubmit} />
          </div>
        </main>
      </div>
    </div>
  );
}
