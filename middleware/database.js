const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ArtDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const itemsSchema = {
  id: String,
  description: String,
  path: String,
  size: String,
  price: Number,
  sold: Boolean,
};

let Art;

try {
  // Trying to get the existing model to avoid OverwriteModelError
  Art = mongoose.model("Art");
} catch {
  Art = mongoose.model("Art", itemsSchema);
}

export default (req, res) => {
  Art.find({ sold: false }, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundItems);
      res.status(200).json(foundItems);
    }
  });
};