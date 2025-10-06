export class LinkService {
  constructor(linksRepository) {
    this.linksRepository = linksRepository;
  }

  getAllLinks() {
    return this.linksRepository.findAll();
  }

  createLink(linkData) {
    try {
      new URL(linkData.urlOriginal);
    } catch (error) {
      throw new Error('URL inválida');
    }
    return this.linksRepository.create(linkData);
  }
}
