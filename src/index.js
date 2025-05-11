import { setupServer } from '../src/server.js';
import { initMongoConnection } from '../src/db/initMongoConnection.js';

await initMongoConnection();
setupServer();
