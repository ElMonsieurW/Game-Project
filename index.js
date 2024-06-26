const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const cardsRouter = require("./routes/cards");

const corsOptions = {
  origin: "*",
  Credentials: true,
  optionSuccesStatus: 200,
};
app.use("/cards", cardsRouter);

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log("Connected");
});

var server = app.listen(8081, function () {
  var host = server.address().adress;
  var port = server.address().port;

  console.log("Ca marche");
});

app.use(express.static("public"));
