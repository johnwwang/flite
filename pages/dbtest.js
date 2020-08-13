import React from "react";
import fetch from "isomorphic-unfetch";

export default function Dbtest() {
  return (
    <div>
      <form action="/api/mongo" method="post">
        <label>name:</label>
        <input type="text" name="branchName" defaultValue="John" />
        <br />
        <label>age:</label>
        <input
          type="text"
          name="messages"
          defaultValue="[hi, what, are, you, doing]"
        />
        <br />
        <br />
        <input type="submit" defaultValue="Submit" />
      </form>
    </div>
  );
}
