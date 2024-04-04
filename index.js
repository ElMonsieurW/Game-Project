const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "*",
  Credentials: true,
  optionSuccesStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log("Octopute");
});

var server = app.listen(8081, function () {
  var host = server.address().adress;
  var port = server.address().port;

  console.log("Ca marche, nique toi");
});
