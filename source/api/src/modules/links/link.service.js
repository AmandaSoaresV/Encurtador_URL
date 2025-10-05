export class LinkService {
  constructor(linksRepository) {
    this.linksRepository = linksRepository;
  }

  getAllLinks() {
    return this.linksRepository.findAll();
  }

  createLink(linkData) {
    return this.linksRepository.create(linkData);
  }
}
