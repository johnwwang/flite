import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import mongoose from "mongoose";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  await req.db.find({ name: "Bob" }, (err, foundPerson) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundPerson);
      res.status(200).json(foundPerson);
    }
  });
});

export default (req, res) => handler.apply(req, res);
