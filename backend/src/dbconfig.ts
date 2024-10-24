import { DataSource } from "typeorm";
import { Users } from "./Entities/userEntity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "extendad.cjiwmg20i9q2.us-east-1.rds.amazonaws.com",
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  port: 5432,
  username: "postgres",
  password: "Saifsalem_123",
  database: "extendad",
  entities: [Users],
  synchronize: true,
});
