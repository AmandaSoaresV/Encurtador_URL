import "dotenv/config";
import fastify from "fastify";
import { linksRoutes } from "./modules/links/link.route.js";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

await server.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

server.register(linksRoutes, { prefix: "/" });

server.listen({ port: process.env.PORT }, (error) => {
  if (error) {
    console.error("Erro ao executar servidor:", error);
    process.exit(1);
  }
  console.log(`Servidor executando na porta ${process.env.PORT}`);
});
