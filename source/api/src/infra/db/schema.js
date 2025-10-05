import {
  pgTable,
  text,
  integer,
  varchar,
  uuid,
  date,
} from "drizzle-orm/pg-core";

export const links = pgTable("link", {
  id: uuid("id").primaryKey(),
  legenda: text("legenda"),
  urlOriginal: text("url_original"),
  codigo: varchar("codigo", { length: 16 }).unique(),
  cliques: integer("cliques"),
  dataCriacao: date("data_criacao"),
});
