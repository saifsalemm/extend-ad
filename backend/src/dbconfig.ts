import { DataSource } from "typeorm";
import { Comments } from "./Entities/commentsEntity.js";
import { Products } from "./Entities/productEntity.js";
import { Reviews } from "./Entities/reviewEntity.js";
import { Users } from "./Entities/userEntity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "mac",
  password: "postgres",
  database: "extenddb",
  entities: [Users, Products, Comments, Reviews],
  synchronize: true,
});
