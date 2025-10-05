export class LinkService {
  constructor(linksRepository) {
    this.linksRepository = linksRepository;
  }

  createLink(linkData) {
    return this.linksRepository.create(linkData);
  }
}