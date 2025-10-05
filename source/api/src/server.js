import fastify from "fastify";
import { linkRoutes } from "./modules/link/link.route.js";

const port = 3000;

const server = fastify({ logger: true });

server.register(linkRoutes, { prefix: "/api" });

server.listen({ port }, (error) => {
  if (error) {
    console.error("Erro ao executar servidor:", error);
    process.exit(1);
  }
  console.log(`Servidor executando na porta ${port}`);
});
