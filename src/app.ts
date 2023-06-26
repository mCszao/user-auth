import express, { Application, Request, Response } from 'express';

import connectiondb from './config/database';
import router from './routes/router';

const app = express();
app.use(router);
app.use(express.json());


app.listen(3000, () => {
    console.log('ENTROU');
});
