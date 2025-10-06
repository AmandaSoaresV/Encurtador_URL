import { randomUUID } from "node:crypto";
import { customAlphabet } from "nanoid";

export class LinkService {
  constructor(linksRepository) {
    this.linksRepository = linksRepository;
  }

  #validateUrl(url) {
    try {
      new URL(url);
    } catch {
      throw new Error("URL inválida.");
    }
  }

  getAllLinks() {
    return this.linksRepository.findAll();
  }

  createLink(linkData) {
    try {
      this.#validateUrl(linkData.urlOriginal);
      if (!linkData.legenda) {
        throw new Error("Legenda é obrigatória!");
      }
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

  async updateLink(id, linkData) {
    try {
      if (linkData.urlOriginal) {
        this.#validateUrl(linkData.urlOriginal);
      }
      if (!linkData.urlOriginal && !linkData.legenda) {
        throw new Error(
          "Pelo menos um campo (urlOriginal ou legenda) deve ser fornecido para atualização."
        );
      }
    } catch (error) {
      throw new Error(error.message);
    }

    return this.linksRepository.update(id, linkData);
  }

  async getOriginalUrlAndIncrementClicks(code) {
    if (!code) {
      throw new Error("O código é obrigatório");
    }

    const link = await this.linksRepository.findByCode(code);
    if (!link) {
      throw new Error("Link não encontrado");
    }

    await this.linksRepository.update(link.id, { cliques: link.cliques + 1 });

    return link.urlOriginal;
  }
}
