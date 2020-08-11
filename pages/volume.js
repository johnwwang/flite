import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Component } from "react";
import io from "socket.io-client";
import fetch from "isomorphic-fetch";
import Sidebar from "../components/sidebar.js";
import ChatSidebar from "../components/chatsidebar.js";
import ChatHeader from "../components/chatheader.js";

class AppPage extends Component {
  // fetch old messages data from the server
  static async getInitialProps({ req }) {
    const response = await fetch(process.env.BASE_URL + "/messages11");
    const messages = await response.json();
    return { messages };
  }

  static defaultProps = {
    messages: [],
  };

  // init state with the prefetched messages
  state = {
    field: "",
    messages: this.props.messages,
  };

  // connect to WS server and listen event
  componentDidMount() {
    this.socket = io(process.env.BASE_URL);
    this.socket.on("messages11", this.handleMessage);
    this.socket.on("clear messages", this.handleClear);
  }

  // close socket connection
  componentWillUnmount() {
    this.socket.off("messages11", this.handleMessage);
    this.socket.close();
  }

  // add messages from server to the state
  handleMessage = (message) => {
    this.setState((state) => ({ messages: state.messages.concat(message) }));
  };

  handleChange = (event) => {
    this.setState({ field: event.target.value });
  };

  handleReset = () => {
    this.socket.emit("reset");
    this.setState((state) => ({ messages: (state.messages = []) }));
  };

  handleClear = () => {
    event.preventDefault();
    this.setState((state) => ({ messages: (state.messages = []) }));
  };

  // send messages to server and add them to the state
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.field.length != 0) {
      // create message object
      const message = {
        id: new Date().getTime(),
        value: this.state.field,
      };

      // send object to WS server
      this.socket.emit("messages11", message);

      // add it to state and clean current input value
      this.setState((state) => ({
        field: "",
        messages: state.messages.concat(message),
      }));
    }
  };

  render() {
    return (
      <div className={styles.chatcontainer}>
        {""}
        <ChatHeader></ChatHeader>
        <Sidebar></Sidebar>
        <Head>
          <title>Flite Chat</title>
          <link rel="icon" href="/birb.png" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title} style={{ color: "#ff684A" }}>
            Volume
          </h1>
        </main>
        <div>
          <ul className={styles.messages}>
            {this.state.messages.map((message) => (
              <li key={message.id}>{message.value}</li>
            ))}
          </ul>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <button onClick={this.handleReset}>Reset</button>
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Hello world!"
              value={this.state.field}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AppPage;
