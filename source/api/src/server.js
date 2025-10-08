import "dotenv/config";
import fastify from "fastify";
import { linksRoutes } from "./modules/links/link.route.js";

const server = fastify({ logger: true });

server.register(linksRoutes, { prefix: "/" });

server.listen({ port: process.env.PORT }, (error) => {
  if (error) {
    console.error("Erro ao executar servidor:", error);
    process.exit(1);
  }
  console.log(`Servidor executando na porta ${process.env.PORT}`);
});
