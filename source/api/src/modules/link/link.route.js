export async function linkRoutes(fastify, options) {
  fastify.get("/link", async (request, reply) => {
    return { links: ["teste"] };
  });
}
