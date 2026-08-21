import express, { Express } from 'express';
import { userRouter } from './routers/user.router.js';
import { eventTypeRouter } from './routers/event-type.router.js';
import { publicRouter } from './routers/public.router.js';
import { availabilityRouter } from './routers/availability.router.js';
import { errorHandler } from './middlewares/error-handler.js';
import { routeNotFound } from './middlewares/route-not-found.js';
import { bookingRouter } from './routers/booking.router.js';
import { googleRouter } from './routers/google.router.js';

const app: Express = express();

app.use(express.json());

app.get('/helth', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
})

app.use('/api/users', userRouter);
app.use('/api/event-types', eventTypeRouter);
app.use('/api/public', publicRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/google', googleRouter);

app.use(routeNotFound);
app.use(errorHandler);


export { app };