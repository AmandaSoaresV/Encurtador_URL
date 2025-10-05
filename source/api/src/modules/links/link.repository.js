export class LinkRepository {
  links = [];
  constructor() {}

  async findAll() {}

  async create(linksData) {
    console.log(linksData);
    this.links.push(linksData);
    return linksData;

  }

  async update(id, clinksData) {}

  async remove(id) {}
}