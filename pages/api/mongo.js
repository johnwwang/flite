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

handler.post((req, res) => {
  console.log(req.body.name);
  const newperson = new req.db({ name: req.body.name, age: req.body.age });
  newperson.save(function (err, ppl) {
    if (err) return console.log("err");
    res.json({ yes: "success" });
  });
});

export default (req, res) => handler.apply(req, res);
