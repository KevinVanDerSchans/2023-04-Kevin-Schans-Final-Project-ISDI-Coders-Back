import http from "http";
import { app } from "./app.js";
import { dbConnect } from "./db/db.connect.js";
import createDebug from "debug";
const debug = createDebug("W9");

const PORT = process.env.PORT || 2000;

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug("Conected to db:", mongoose.connection.db.databaseName);
  })
  .catch((error) => {
    server.emit("error", error);
  });

server.on('listening', () => {
  debug("Listening on port " + PORT);
});
