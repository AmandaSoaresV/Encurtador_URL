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
}
