import Head from "next/head";
import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";
import styles from "../styles/About.module.css";
import Link from "next/link";

export default function About() {
  return (
    <div>
      {" "}
      <Header></Header>
      <div className={styles.container}>
        <Head>
          <title>flite</title>
          <link rel="icon" href="/birb.png" />
        </Head>
        <Sidebar></Sidebar>
        <div className="row">
          <div className={styles.column}>
            <h2 className={styles.info} style={{ color: "#ff684A" }}>
              Forests
            </h2>
            <main className={styles.main}>
              <img className={styles.icon} src="foresticon.png"></img>
            </main>
            <h2 className={styles.info} style={{ color: "white" }}>
              Forests are the largest grouping in Flite. Each public forest is
              focused on a broader topic, like math or science, and contains
              hundreds of trees related to more specific subjects within the
              given topic. Private forests are run by institutions and contain
              all of the trees created by teachers from the institution. Your
              personal forest will contain all of the trees you have chosen to
              follow, organizing them in one central location for your easy
              access.
            </h2>
          </div>
          <div className={styles.column}>
            <h2 className={styles.info} style={{ color: "#ff684A" }}>
              Trees
            </h2>
            <main className={styles.main}>
              <img className={styles.icon} src="treeicon.png"></img>
            </main>
            <h2 className={styles.info} style={{ color: "white" }}>
              Trees are the foundation of Flite. Each tree belongs in a forest,
              and is focused on a topic relevant to the subject forest it is
              placed in. For example, the math forest would contain trees like
              an Algebra tree and a Calculus tree. You can choose to follow
              public trees that you use regularly and they will be added to your
              own private forest. Trees also contain branches, which is where
              communication in Flite takes place.
            </h2>
          </div>
          <div className={styles.column}>
            <h2 className={styles.info} style={{ color: "#ff684A" }}>
              Branches
            </h2>
            <main className={styles.main}>
              <img className={styles.icon} src="branchicon.png"></img>
            </main>
            <h2 className={styles.info} style={{ color: "white" }}>
              Branches are the hub for communication in Flite. Branches belong
              to trees and are all increasingly specific subtopics based upon
              the topic of their tree. For example, a Calculus tree would
              contain branches on Derivatives, Integrals, and limits. In these
              branches, you can participate in free-flowing discussion with
              experts, instructors, and fellow students to help better your
              understanding of the topics you need help with.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
