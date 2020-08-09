import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Component } from "react";
import io from "socket.io-client";
import fetch from "isomorphic-fetch";

class Chat extends React.Component {
  // fetch old messages data from the server
  

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
    this.socket.on("messages"+ this.props.number, this.handleMessage);
  }

  // close socket connection
  componentWillUnmount() {
    this.socket.off("messages"+ this.props.number, this.handleMessage);
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
    event.preventDefault();
    if (this.state.field.length != 0) {

      // create message object
      const message = {
        id: new Date().getTime(),
        value: this.state.field,
      };

      // send object to WS server
      this.socket.emit("messages" + this.props.number, message);

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
        <Head>
          <title>Flite Chat</title>
          <link rel="icon" href="/birb.png" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title} style={{color: "#ff684A" }}>
            Chat {this.props.number}
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
              placeholder="gec gec"
              value={this.state.field}
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
