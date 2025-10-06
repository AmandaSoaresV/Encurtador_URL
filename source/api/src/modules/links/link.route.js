import { LinkRepository } from "./link.repository.js";
import { LinkService } from "./link.service.js";
import { LinkController } from "./link.controller.js";

const linkRepository = new LinkRepository();
const linkService = new LinkService(linkRepository);
const linkController = new LinkController(linkService);

export async function linksRoutes(fastify, options) {
  fastify.get("/links", (request, reply) =>
    linkController.getLinks(request, reply)
  );

  fastify.post("/links", (request, reply) =>
    linkController.createLink(request, reply)
  );

  fastify.put("/links/:id", (request, reply) =>
    linkController.updateLink(request, reply)
  );

  fastify.delete("/links/:id", (request, reply) =>
    linkController.deleteLink(request, reply)
  );

  fastify.get("/:code", (request, reply) =>
    linkController.redirectToOriginalUrl(request, reply)
  );
}
