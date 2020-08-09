import React from "react";
import fetch from "isomorphic-unfetch";

export default function Dbtest() {
  const updateMacros = async () => {
    const res = await fetch("http://localhost:3000/api/mongo", {
      method: "post",
      body: JSON.stringify(results),
    });

    console.log(res);
  };
  return (
    <div>
      <h1>Hello, HTML.</h1>
      <p>Do not use until Challenge #12</p>
      <form action="localhost:3000/api/mongo" method="post">
        <label>name:</label>
        <input type="text" name="name" defaultValue="John" />
        <br />
        <label>age:</label>
        <input type="number" name="age" defaultValue="3" />
        <br />
        <br />
        <input type="submit" defaultValue="Submit" />
      </form>
    </div>
  );
}
