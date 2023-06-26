import http from "http";
import { app } from "./app";
import debug from "debug";

const PORT = process.env.PORT || 4500;

const server = http.createServer(app);

server.on('listening', () => {
  debug('Listening on port ' + PORT);
});

server.on('error', (error) => {
  debug(error.message);
});
