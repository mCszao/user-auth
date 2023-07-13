import express, { json, Router } from 'express';
import sequelize from '../database/index';
import router from '../routes/router';
class App {
    public server: express.Application;
    constructor() {
        this.server = express();
        this.middlewareJSONParse();
        this.connectionDB();
        this.router();
    }

    private middlewareJSONParse() {
        this.server.use(express.json());
    }

    private async connectionDB() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    private router() {
        this.server.use(router);
    }
}

export default new App();
