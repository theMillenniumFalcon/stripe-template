import { DataSource } from "typeorm"
import { User } from "../entities/User"

export const connection = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL as string,
    logging: true,
    synchronize: false,
    entities: [User]
})