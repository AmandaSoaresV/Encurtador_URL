import { randomUUID } from "node:crypto";
import { customAlphabet } from "nanoid";

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
      throw new Error("URL inválida");
    }

    const genCode = customAlphabet(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      6
    );

    return this.linksRepository.create({
      id: randomUUID(),
      codigo: genCode(),
      ...linkData,
    });
  }
}
