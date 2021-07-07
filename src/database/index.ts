import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async function connect(): Promise<Connection> {
    const options = await getConnectionOptions();

    return createConnection(
        Object.assign(options, {
            database:
                process.env.NODE_ENV === 'test'
                    ? 'src/database/db.test.sqlite'
                    : options.database,
        })
    );
}
