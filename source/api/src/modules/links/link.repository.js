import db from "../../infra/database.js";
import { links } from "../../infra/db/schema.js";

export class LinkRepository {
  links = [];
  constructor() {
    this.db = db;
  }

  async findAll() {
    return this.db.select().from(links);
  }

  async create(linksData) {
    let result;
    try {
      result = await this.db
        .insert(links)
        .values({ ...linksData })
        .returning();
    } catch (error) {
      console.error("Erro ao cliar link:", error);
    }
    return result[0];
  }

  async update(id, clinksData) {}

  async remove(id) {}
}
