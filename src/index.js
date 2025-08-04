import app from "./app.js";
import { sequelize } from "../database/connectToDatabase.js";

async function main() {
  if (sequelize.authenticate()) {
    try {
      await sequelize.sync({ force: false});
      app.listen(3000, () =>
        console.log("Servidor corriendo en http://localhost:3000")
      );
    } catch (error) {
      console.error('sucedio un error: ', error);
    }
  }else{
    console.error('Conexion fallida a la base de datos')
  }
}

main();
