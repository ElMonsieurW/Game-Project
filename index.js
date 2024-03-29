const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
    origin: "*"
    credentials: true,
    oprionSuccesStatus:200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(
    express.urlencoded({
        extended:true
    })
);

app.listen(port, () => {
    console.log
})