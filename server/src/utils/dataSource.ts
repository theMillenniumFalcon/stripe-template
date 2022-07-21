import { DataSource } from "typeorm"
import path from "path"
import { User } from "../entities/User"

export const connection = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: false,
    migrations: [path.join(__dirname, "../migrations/*")],
    entities: [User]
})