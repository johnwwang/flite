const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
var Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

let Person;

try {
  // Trying to get the existing model to avoid OverwriteModelError
  Person = mongoose.model("Person");
} catch {
  Person = mongoose.model("Person", personSchema);
}

export default (req, res) => {
  Person.find({ name: "Bob" }, (err, foundPerson) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundPerson);
      res.status(200).json(foundPerson);
    }
  });
};
