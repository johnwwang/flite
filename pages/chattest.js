import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Component } from "react";
import io from "socket.io-client";
import fetch from "isomorphic-fetch";
import Sidebar from "../components/sidebar.js";
import ChatHeader from "../components/chatheader.js";
import Chat from "../layouts/chat.js";

const number = 5

function Chattest() {

  return (
    <div>
      {" "}
      <ChatHeader/>
      <Sidebar/>
      <Chat number = {number} />
    </div>
  );
}

Chattest.getInitialProps = async ({req}) => {
    const response = await fetch("http://localhost:3000/messages" + {number});
        const messages = await response.json();
        return { messages };
}

export default Chattest