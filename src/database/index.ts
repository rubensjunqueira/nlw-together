import { createConnection, getConnectionOptions } from "typeorm";

export default async function connect() {
    const options = await getConnectionOptions();

    return await createConnection(Object.assign(options, {
        database: process.env.NODE_ENV === 'test'
            ? 'src/database/db.test.sqlite'
            : options.database
    }));
}