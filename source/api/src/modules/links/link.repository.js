import db from "../../infra/database.js";
import { randomUUID } from "node:crypto";
import { links } from "../../infra/db/schema.js";
import { eq } from "drizzle-orm";

export class LinkRepository {
  constructor() {
    this.db = db;
  }

  async findAll() {
    try {
      const result = this.db.select().from(links);
      return result;
    } catch (error) {
      throw new Error("Erro ao buscar links: " + error.message);
    }
  }

  async findById(id) {
    try {
      const result = await this.db.select().from(links).where(eq(links.id, id));
      return result[0];
    } catch (error) {
      throw new Error("Erro ao buscar link pelo ID: " + error.message);
    }
  }

  async create(linksData) {
    try {
      const id = randomUUID();
      const result = await this.db
        .insert(links)
        .values({
          id,
          ...linksData,
        })
        .returning();
      return result[0];
    } catch (error) {
      throw new Error("Erro ao criar link: " + error.message);
    }
  }

  async update(id, linksData) {
    try {
      const result = await this.db
        .update(links)
        .set(linksData)
        .where(eq(links.id, id))
        .returning();
      return result[0];
    } catch (error) {
      throw new Error("Erro ao atualizar link: " + error.message);
    }
  }

  async remove(id) {
    try {
      const result = await this.db
        .delete(links)
        .where(eq(links.id, id))
        .returning({ id: links.id });
      return result.length > 0;
    } catch (error) {
      throw new Error("Erro ao excluir link: " + error.message);
    }
  }

  async findByCode(code) {
    try {
      const result = await this.db
        .select()
        .from(links)
        .where(eq(links.codigo, code));
      return result[0];
    } catch (error) {
      throw new Error("Erro ao buscar link pelo código: " + error.message);
    }
  }
}
