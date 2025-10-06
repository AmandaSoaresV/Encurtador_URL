export class LinkController {
  constructor(linkService) {
    this.linkService = linkService;
  }

  async getLinks(request, reply) {
    const links = await this.linkService.getAllLinks();
    return reply.code(200).send({ links });
  }

  async createLink(request, reply) {
    let novoLink;
    try {
      novoLink = await this.linkService.createLink(request.body);
    } catch (error) {
      return reply.code(400).send({ message: error.message });
    }
    return reply.code(201).send(novoLink);
  }

  async deleteLink(request, reply) {
    const { id } = request.params;
    try {
      const deleted = await this.linkService.deleteLink(id);
      return reply.code(200).send({
        message: "link excluído",
        deleted,
      });
    } catch (error) {
      return reply.code(404).send({ message: error.message });
    }
  }

  async updateLink(request, reply) {
    const { id } = request.params;
    let novoLink;
    try {
      novoLink = await this.linkService.updateLink(id, request.body);
    } catch (error) {
      return reply.code(400).send({ message: error.message });
    }
    return reply.code(201).send(novoLink);
  }

  async redirectToOriginalUrl(request, reply) {
    const { code } = request.params;

    let originalUrl;
    try {
      originalUrl = await this.linkService.getOriginalUrlAndIncrementClicks(
        code
      );
    } catch (error) {
      return reply.code(404).send({ message: error.message });
    }

    return reply.code(302).redirect(originalUrl);
  }
}
