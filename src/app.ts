import express, { Application, Request, Response } from 'express';

import connectiondb from './database/connectiondb';
import router from './routes/router';

const app = express();
app.use(router);
app.use(express.json());

connectiondb
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });

app.listen(3000, () => {
    console.log('ENTROU');
});
