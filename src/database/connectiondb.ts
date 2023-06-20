import { Sequelize } from 'sequelize';

const connectiondb: Sequelize = new Sequelize(
    'auth_user' as string,
    'postgres' as string,
    'root' as string,

    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        pool: {
            max: 5,
            min: 0
        },
    }
);

export default connectiondb;
