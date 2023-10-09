import http from 'http';
import { app } from './app.js';
import { dbConnect } from './db/db.connect.js';
import createDebug from 'debug';
const debug = createDebug('PF');

const PORT = process.env.PORT || 7777;

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('Conected to db:', mongoose.connection.db.databaseName);
  })
  .catch((error) => {
    server.emit('error', error);
  });

server.on('listening', () => {
  debug('Listening on port ' + PORT);
});
