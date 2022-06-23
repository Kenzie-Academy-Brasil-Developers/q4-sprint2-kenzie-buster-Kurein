import app from "./app";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    const port = process.env.PORT ?? 3000;

    app.listen(port, () => {
      console.log(`Running on localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error During Data Source Initialization", err);
  });
