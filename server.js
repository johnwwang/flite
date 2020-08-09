const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

// fake DB
const messages1 = [];
const messages2 = [];
//connect to real DB
async function database(req, res, next) {
  var db = mongoose.connect(
    "mongodb+srv://flite:pokemen@flite.exc5x.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (error) {
      if (error) return console.log(error);

      console.log("connection successful");
    }
  );
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
// socket.io server
io.on("connection", (socket) => {
  socket.on("message1", (data) => {
    messages1.push(data);
    socket.broadcast.emit("message1", data);
  });
  socket.on("message2", (data) => {
    messages1.push(data);
    socket.broadcast.emit("message2", data);
  });
});

nextApp.prepare().then(() => {
  app.use(function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.get("/messages1", (req, res) => {
    res.json(messages1);
  });
  app.get("/messages2", (req, res) => {
    res.json(messages2);
  });
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
  app.use(database).post("/api/mongo", async (req, res) => {
    console.log(req.body.name);
    const newperson = new req.db({ name: req.body.name, age: req.body.age });
    await newperson.save();
    res.json({ message: "yes" });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
