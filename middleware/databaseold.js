import mongoose from "mongoose";
import nextConnect from "next-connect";

async function database(req, res, next) {
  var db = mongoose.connect(process.env.MONGO_URI, function (error) {
    if (error) return console.log(error);

    console.log("connection successful");
  });
  var Schema = mongoose.Schema;
  const personSchema = new Schema({
    name: String,
    age: Number,
    favoriteFoods: [String],
  });

  try {
    // Trying to get the existing model to avoid OverwriteModelError
    req.db = mongoose.model("Person");
  } catch {
    req.db = mongoose.model("Person", personSchema);
  }
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
