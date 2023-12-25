import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./context";
import { appRouter } from "./router";
import cors from "@fastify/cors";
import ws from "@fastify/websocket";

const server = fastify({
  maxParamLength: 5000,
});
server.register(cors, {
  // put your options here
});
server.register(ws);

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  useWSS: true,
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await server.listen({ port: 4000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
