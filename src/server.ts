import app from './app';
import { Database } from './config/database';
import { config } from './config/config';

const startServer = async () => {
    await Database.connect();

    app.listen(config.port, () => {
        console.log(`Server running in ${config.env} mode on port ${config.port}`);
    });
};

startServer();
