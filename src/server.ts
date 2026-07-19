import { app } from './app.js';
import { connectDatabase } from './config/db.config.js';
import { PORT } from './config/env.js';

export async function startServer() {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`[server]: Running on port http://localhost:${PORT}`);
    })
}

startServer();