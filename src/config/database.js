const config = {
    username: 'postgres',
    password: 'root',
    database: 'user_auth',
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
    },
};
module.exports = config;
