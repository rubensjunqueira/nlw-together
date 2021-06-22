import { ConnectionOptions } from "typeorm";

const options: ConnectionOptions = {
    type: "sqlite",
    database: "./src/database/db.sqlite",
    migrations: ["./src/database/migrations/*.ts"],
    entities: ["./src/entities/*.ts"],
    cli: {
        migrationsDir: "./src/database/migrations"
    }
};

export default options;