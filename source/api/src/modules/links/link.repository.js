export class LinkRepository {
  links = [];
  constructor() {}

  async findAll() {
    return this.links;
  }

  async create(linksData) {
    this.links.push(linksData);
    return linksData;
  }

  async update(id, clinksData) {}

  async remove(id) {}
}
