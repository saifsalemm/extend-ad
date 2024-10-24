import "reflect-metadata";
import { app } from "./app.js";
import { AppDataSource } from "./dbconfig.js";

const port = process.env.PORT ?? 5002;

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log("server running on: " + port);
    });
  })
  .catch((error) => console.log(error));
