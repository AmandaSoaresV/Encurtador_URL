import db from '../../infra/database.js';
import { randomUUID } from 'node:crypto';
import { links } from '../../infra/db/schema.js';

export class LinkRepository {
  links = [];
  constructor() {
    this.db = db;
  }

  async findAll() {
    return this.links;
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
      console.log
    } catch (error) {
      console.error('Erro ao cliar link:', error);
    }
    return result[0];
  }

  async update(id, clinksData) { }

  async remove(id) { }
}
