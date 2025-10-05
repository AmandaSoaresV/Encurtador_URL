import { LinkRepository } from "./link.repository.js";
import { LinkService } from "./link.service.js";
import { LinkController } from "./link.controller.js";

const linkRepository = new LinkRepository();
const linkService = new LinkService(linkRepository);
const linkController = new LinkController(linkService);

export async function linksRoutes(fastify, options) {
  fastify.get("/links", async (request, reply) => {
    return { links: ["teste"] };
  });

  fastify.post ("/links", (request, reply) => linkController.createLink(request, reply));
}
