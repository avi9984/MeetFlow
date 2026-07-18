import express, { Express } from 'express';

const app: Express = express();

app.get('/helth', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
})

export { app };