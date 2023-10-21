import http from "http";
import app from "./app";

function bootstrap() {
  const server = http.createServer(app);
  server.listen(3000);

}

bootstrap()