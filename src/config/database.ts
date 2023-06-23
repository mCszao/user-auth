import { Options } from 'sequelize';

const config: Options = {
    username: 'postgres',
    password: 'root',
    database: 'auth_user',
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false,
    },
};

export = config;
