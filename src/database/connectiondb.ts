import { Sequelize } from 'sequelize';

const connectiondb: Sequelize = new Sequelize(
    'auth_user' as string,
    'postgres' as string,
    'root' as string,

    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
    }
);

export default connectiondb;
