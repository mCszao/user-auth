import express from 'express';
import App from './class/App';
import router from './routes/router';

// const app = express();
// app.use(router);

// app.listen(3000, () => {
//     console.log('ENTROU');
// });

App.server.listen(3000, () => {
    console.log('running at port 3000');
});
