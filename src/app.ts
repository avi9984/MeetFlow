import express, { Express } from 'express';
import { userRouter } from './routers/user.router.js';
import { errorHandler } from './middlewares/error-handler.js';

const app: Express = express();

app.use(express.json());

app.get('/helth', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
})

app.use('/api/users', userRouter);

app.use(errorHandler);


export { app };