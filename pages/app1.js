import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Component } from "react";
import io from "socket.io-client";
import fetch from "isomorphic-fetch";
import Sidebar from "../components/sidebar.js";
import ChatHeader from "../components/chatheader.js";

class AppPage extends Component {
  // fetch old messages data from the server
  static async getInitialProps({ req }) {
    const response = await fetch("http://localhost:3000/messages1");
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
    this.socket = io("http://localhost:3000");
    this.socket.on("message1", this.handleMessage);
  }

  // close socket connection
  componentWillUnmount() {
    this.socket.off("message1", this.handleMessage);
    this.socket.close();
  }

  // add messages from server to the state
  handleMessage = (message) => {
    this.setState((state) => ({ messages: state.messages.concat(message) }));
  };

  handleChange = (event) => {
    this.setState({ field: event.target.value });
  };

  // send messages to server and add them to the state
  handleSubmit = (event) => {
    if (this.state.field.length != 0) {
      event.preventDefault();

      // create message object
      const message = {
        id: new Date().getTime(),
        value: this.state.field,
      };

      // send object to WS server
      this.socket.emit("message1", message);

      // add it to state and clean current input value
      this.setState((state) => ({
        field: "",
        messages: state.messages.concat(message),
      }));
    }
  };

  render() {
    return (
      <div>
        <Head>
          <title>Flite Chat</title>
        </Head>
        <ChatHeader></ChatHeader>
        <Sidebar></Sidebar>
        <main className={styles.main}>
          <h1 className={styles.title} style={{ color: "#ff684A" }}>
            Chat 1
          </h1>
        </main>
        <div>
          <ul className={styles.messages}>
            {this.state.messages.map((message) => (
              <li key={message.id}>{message.value}</li>
            ))}
          </ul>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Hello world!"
              value={this.state.field}
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AppPage;
