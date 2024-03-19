const express = require("express");
const bodyParser = require("body-parser");

const DataAccessObject = require("./dataAccessObject");
const Comment = require("./comment");

const app = express();
const port = process.env.PORT || 3001;
const io = require("socket.io")(app.listen(port), {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const dataAccessObject = new DataAccessObject("./database.sqlite3");
const comment = new Comment(dataAccessObject);

comment.createTable().catch((error) => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);
  socket.on("send-comment", (message) => {
    io.emit("receive-comment", message);
    console.log("new comment: ", message);
  });
  socket.on("delete-comments", () => {
    io.emit("clear-comments");
  });
});

app.post("/createComment", function (request, response) {
  const { body } = request;
  comment.createComment(body).then((result) => {
    console.log(result);
    response.send(result);
  });
});

app.get("/getComment", function (request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then((result) => {
    response.send(result);
  });
});

app.get("/getComments", function (request, response) {
  comment.getComments().then((result) => {
    response.send(result);
  });
});

app.delete("/deleteComments", function (request, response) {
  comment.deleteComments().then((result) => {
    response.send(result);
  });
});

// app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  const rootDir = __dirname.replace("/server", "");
  response.sendFile(`${rootDir}/src/index.html`);
});
