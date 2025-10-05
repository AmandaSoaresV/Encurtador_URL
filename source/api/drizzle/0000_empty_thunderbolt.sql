CREATE TABLE "link" (
	"id" uuid PRIMARY KEY NOT NULL,
	"legenda" text,
	"url_original" text,
	"codigo" varchar(16),
	"cliques" integer,
	"data_criacao" date,
	CONSTRAINT "link_codigo_unique" UNIQUE("codigo")
);
