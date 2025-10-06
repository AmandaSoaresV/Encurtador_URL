import db from "../../infra/database.js";
import { randomUUID } from "node:crypto";
import { links } from "../../infra/db/schema.js";
import { eq } from "drizzle-orm";
import { link } from "node:fs";

export class LinkRepository {
  links = [];
  constructor() {
    this.db = db;
  }

  async findAll() {
    return this.db.select().from(links);
  }

  async findById(id) {
    const result = await this.db.select().from(links).where(eq(links.id, id));
    return result[0];
  }

  async create(linksData) {
    let result;
    try {
      const id = randomUUID();
      result = await this.db
        .insert(links)
        .values({
          id,
          ...linksData,
        })
        .returning();
    } catch (error) {
      console.error("Erro ao cliar link:", error);
    }
    return result[0];
  }

  async update(id, clinksData) {
    let result;
    try {
      result = await this.db
        .update(links)
        .set(clinksData)
        .where(eq(links.id, id))
        .returning();
    } catch (error) {
      console.error("Erro ao atualizar cliques", error);
    }
    return result[0];
  }

  async remove(id) {
    try {
      const result = await this.db
        .delete(links)
        .where(eq(links.id, id))
        .returning({ id: links.id });
      return result.length > 0;
    } catch (error) {
      console.error("Erro ao deletar link", error);
    }
  }

  async findByCode(code) {
    const result = await this.db
      .select()
      .from(links)
      .where(eq(links.codigo, code));
    return result[0];
  }
}
