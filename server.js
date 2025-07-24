const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const port = 3000;


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.status(200).send({
    message: "Servidor funcionando",
  });
});

app.post("/Login", (req, res) => {
    
} )

app.post("/Register", (req, res) => {
    
} )

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});