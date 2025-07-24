const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database/connectToDatabase");
require("./models/usuario");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Conexion a BD exitosa :::::::::");

    app.listen(port, () => {
      console.log(`Server running in http://localhost:${port}`);
    });

    try {
      await sequelize.sync()
      console.log("Tabla creada exitosamente")
    } catch (error) {
      console.error("Error: ", error)
    }
  } catch (error) {
    console.error("No se ha podido acceder a la base de datos: ", error);
    return;
  }
  app.get("/", function (req, res) {
    res.status(200).send({
      message: "Servidor funcionando",
    });
  });

  app.post("/Login", (req, res) => {});

  app.post("/Register", (req, res) => {});
}

main();
