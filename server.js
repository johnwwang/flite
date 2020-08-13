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
var messages = [[], [], [], [], [], [], [], [], [], [], [], []];
var pollAns = [];

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
  const branchSchema = new Schema({
    branchName: String,
    messages: [String],
  });

  try {
    // Trying to get the existing model to avoid OverwriteModelError
    req.db = mongoose.model("Branch");
  } catch {
    req.db = mongoose.model("Branch", branchSchema);
  }
  return next();
}

function handleCommand(message, chatID, socket) {
  if (message.substr(0, 1) != "!") return;

  if (message.substr(1, 4).toUpperCase() == "POLL") {
    handlePoll(
      message
        .replace(/\"$/, "")
        .replace(/ \"/, '" "')
        .replace(/ /, '" "')
        .split('" "'),
      chatID,
      socket
    );
  }
}

function handlePoll(pollArgs, chatID, socket) {
  var response = "";
  if (!pollArgs[1] || pollArgs[1].toUpperCase() == "HELP") {
    response = {
      id: new Date().getTime(),
      value:
        '!Poll syntax: !Poll create "question" "answer1" "answer2" "answer3" ...  Accepts an undefined number of answers. Answer polls with ' +
        '!Poll answer "youranswer". Poll answers are case-insensitive. After 30 seconds, the poll will end and its results will be broadcast.',
    };
  } else if (pollArgs[1].toUpperCase() == "ANSWER") {
    for (var i = 0; i < pollAns.length; i++) {
      if (pollArgs[2] == pollAns[i][0]) {
        pollAns[i][1]++;
      }
    }
  } else if (pollArgs[1].toUpperCase() == "CREATE") {
    pollAns = [];
    for (var i = 3; i < pollArgs.length; i++) {
      pollAns.push([pollArgs[i], 0]);
    }
    response = {
      id: new Date().getTime(),
      value: "A poll has been created: " + pollArgs[2] + " Options: ",
    };
    for (var i = 0; i < pollAns.length; i++) {
      response.value += pollAns[i][0];
      response.value += ", ";
    }
    response.value.slice(0, -2);
    messages[chatID].push(response);
    socket.emit("messages" + chatID, response);
    setTimeout(function () {
      handlePollEnd(chatID, socket);
    }, 10000);
    return;
  } else {
    response = "Incorrect syntax. Try !Poll help.";
  }

  messages[chatID].push(response);
  socket.emit("messages" + chatID, response);
}

function handlePollEnd(chatID, socket) {
  var winner = pollAns[0];
  for (var i = 1; i < pollAns.length; i++) {
    if (pollAns[i][1] > winner[1]) {
      winner = pollAns[i];
    }
  }
  response = {
    id: new Date().getTime(),
    value: 'The poll has concluded. The winner is "' + winner[0] + '".',
  };
  messages[chatID].push(response);
  socket.emit("messages" + chatID, response);
  return;
}

// socket.io server
io.on("connection", (socket) => {
  socket.on("reset", () => {
    messages = [[], [], [], [], [], [], [], [], [], [], [], []];
    socket.broadcast.emit("clear messages");
  });
  socket.on("messages0", (data) => {
    messages[0].push(data);
    socket.broadcast.emit("messages0", data);
    handleCommand(data.value, 0, socket);
  });
  socket.on("messages1", (data) => {
    messages[1].push(data);
    socket.broadcast.emit("messages1", data);
    handleCommand(data.value, 1);
  });
  socket.on("messages2", (data) => {
    messages[2].push(data);
    socket.broadcast.emit("messages2", data);
    handleCommand(data.value, 2);
  });
  socket.on("messages3", (data) => {
    messages[3].push(data);
    socket.broadcast.emit("messages3", data);
    handleCommand(data.value, 3);
  });
  socket.on("messages4", (data) => {
    messages[4].push(data);
    socket.broadcast.emit("messages4", data);
    handleCommand(data.value, 4);
  });
  socket.on("messages5", (data) => {
    messages[5].push(data);
    socket.broadcast.emit("messages5", data);
    handleCommand(data.value, 5);
  });
  socket.on("messages6", (data) => {
    messages[6].push(data);
    socket.broadcast.emit("messages6", data);
    handleCommand(data.value, 6);
  });
  socket.on("messages7", (data) => {
    messages[7].push(data);
    socket.broadcast.emit("messages7", data);
    handleCommand(data.value, 7);
  });
  socket.on("messages8", (data) => {
    messages[8].push(data);
    socket.broadcast.emit("messages8", data);
    handleCommand(data.value, 8);
  });
  socket.on("messages9", (data) => {
    messages[9].push(data);
    socket.broadcast.emit("messages9", data);
    handleCommand(data.value, 9);
  });
  socket.on("messages10", (data) => {
    messages[10].push(data);
    socket.broadcast.emit("messages10", data);
    handleCommand(data.value, 10);
  });
  socket.on("messages11", (data) => {
    messages[11].push(data);
    socket.broadcast.emit("messages11", data);
    handleCommand(data.value, 11);
  });
});

nextApp.prepare().then(() => {
  app.use(function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.get("/messages0", (req, res) => {
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
  app.get("/erasemesages", (req, res) => {
    res.status(200).json({ ok: "yes" });
  });
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
  app.use(database).post("/dbadd", async (req, res) => {
    console.log(req.body);
    const newBranch = new req.db({
      branchName: req.body.branchName,
      messages: [],
    });
    await newBranch.save();
    res.json({ message: "ok" });
  });

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
