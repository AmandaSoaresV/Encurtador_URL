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
    function validateLinkData(linkData) {
      try {
        new URL(linkData.urlOriginal);
      } catch {
        throw new Error("URL inválida.");
      }
      if (!linkData.legenda) {
        throw new Error("Legenda é obrigatória!");
      }
    }

    try {
      validateLinkData(linkData);
    } catch (error) {
      throw new Error(error.message);
    }

    const genCode = customAlphabet(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      6
    );

    return this.linksRepository.create({
      id: randomUUID(),
      codigo: genCode(),
      dataCriacao: new Date(),
      cliques: 0,
      ...linkData,
    });
  }

  async deleteLink(id) {
    if (!id) {
      throw new Error(" o ID é obrigatório para excluir");
    }
    const deleted = await this.linksRepository.remove(id);
    if (!deleted) {
      throw new Error("Link não encontrado");
    }

    return deleted;
  }
}
