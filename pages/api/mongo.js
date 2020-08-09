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

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  await req.db.create(
    { name: "chill", age: 10, favoriteFoods: ["beans"] },
    function (err, people) {
      if (err) {
        console.log("error");
      } else {
        console.log(people);
      }
    }
  );

  res.json({ message: "ok" });
});
export default (req, res) => handler.apply(req, res);
