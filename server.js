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
const messages = [[], [], [], [], [], [], [], [], [], [], [], []];

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
  socket.on("messages", (data) => {
    messages[0].push(data);
    socket.broadcast.emit("messages", data);
  });
  socket.on("messages1", (data) => {
    messages[1].push(data);
    socket.broadcast.emit("messages1", data);
  });
});

nextApp.prepare().then(() => {
  app.use(function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.get("/messages", (req, res) => {
    res.json(messages[0]);
  });
  app.get("/messages1", (req, res) => {
    res.json(messages[1]);
  });
  app.get("/messages2", (req, res) => {
    res.json(messages[2]);
  });
  app.get("/messages3", (req, res) => {
    res.json(messages[3]);
  });
  app.get("/messages4", (req, res) => {
    res.json(messages[4]);
  });
  app.get("/messages5", (req, res) => {
    res.json(messages[5]);
  });
  app.get("/messages6", (req, res) => {
    res.json(messages[6]);
  });
  app.get("/messages7", (req, res) => {
    res.json(messages[7]);
  });
  app.get("/messages8", (req, res) => {
    res.json(messages[8]);
  });
  app.get("/messages9", (req, res) => {
    res.json(messages[9]);
  });
  app.get("/messages10", (req, res) => {
    res.json(messages[10]);
  });
  app.get("/messages11", (req, res) => {
    res.json(messages[11]);
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
