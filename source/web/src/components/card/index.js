"use client";
import axios from "axios";
import styles from "./card.module.css";
import React from "react";
import {
  Clipboard,
  Calendar,
  Pencil,
  Trash,
  ChartColumnBig,
} from "lucide-react";

export default function Card({ data, onDelete }) {
  const [editActive, setEditActive] = React.useState(false);
  const [editData, seteditData] = React.useState({
    legenda: data.legenda,
    urlOriginal: data.urlOriginal,
  });

  async function handleDelete() {
    try {
      await axios.delete(`http://localhost:3333/links/${data.id}`);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar link:", error);
    }
  }

  async function handleEdit(event) {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3333/links/${data.id}`, editData);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao editar link:", error);
    }
  }

  return (
    <div className={styles.card}>
      {!editActive && (
        <>
          <div className={styles.topo}>
            <h2>{data.legenda}</h2>
            <span>
              <ChartColumnBig size={20} /> {data.cliques}
            </span>
          </div>

          <a
            href={`http://localhost:3333/${data.codigo}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.urlCurta}
          >
            http://localhost:3333/{data.codigo}
          </a>

          <p className={styles.urlOriginal}>{data.urlOriginal}</p>
        </>
      )}

      {editActive && (
        <>
          <form className={styles.form} onSubmit={(event) => handleEdit(event)}>
            <input
              id="legenda"
              type="text"
              placeholder="Legenda"
              value={editData.legenda || ""}
              className={styles.input}
              onChange={({ target }) =>
                seteditData({ ...editData, legenda: target.value })
              }
            />

            <input
              id="url"
              type="text"
              placeholder="Link"
              value={editData.urlOriginal || ""}
              className={styles.input}
              onChange={({ target }) =>
                seteditData({ ...editData, urlOriginal: target.value })
              }
            />

            <button type="submit" className={styles.button}>
              Editar
            </button>
          </form>
        </>
      )}

      <div className={styles.rodape}>
        <p className={styles.data}>
          <Calendar size={16} /> criado em {data.dataCriacao}, 09:06
        </p>
        <div className={styles.botoes}>
          <button className={styles.copiar}>
            <Clipboard size={18} /> Copiar
          </button>
          <button onClick={() => setEditActive(!editActive)}>
            <Pencil size={18} className={styles.pencil} />
          </button>
          <button onClick={handleDelete}>
            <Trash size={18} className={styles.trash} />
          </button>
        </div>
      </div>
    </div>
  );
}
