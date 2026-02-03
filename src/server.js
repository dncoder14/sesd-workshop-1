import app from './app.js';
import { Database } from './config/database.js';
import { config } from './config/config.js';

const startServer = async () => {
    await Database.connect();

    app.listen(config.port, () => {
        console.log(`Server running in ${config.env} mode on port ${config.port}`);
    });
};

startServer();
