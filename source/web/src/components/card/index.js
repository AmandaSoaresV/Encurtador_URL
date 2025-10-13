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

  function UrlValida(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async function handleDelete() {
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir o link "${data.legenda}"?`
    );
    if (!confirmar) return;
    try {
      await axios.delete(`http://localhost:3333/links/${data.id}`);
      alert("Link excluído com sucesso");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar link:", error);
    }
  }

  async function handleEdit(event) {
    event.preventDefault();

    if (!editData.legenda || !editData.urlOriginal) {
      alert("Preencha todos os campos");
      return;
    }

    if (!UrlValida(editData.urlOriginal)) {
      alert("URL inválida. Tente novamente");
      return;
    }

    const confirmar = window.confirm(
      `Deseja salvar as alterações no link "${data.legenda}"?`
    );
    if (!confirmar) return;

    try {
      await axios.put(`http://localhost:3333/links/${data.id}`, editData);
      alert("Link editado com sucesso");
      window.location.reload();
    } catch (error) {
      const message =
        error.response?.data?.message || "Ocorreu um erro ao editar o link.";
      alert(message);
      console.error("Erro ao editar link:", error);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(`http://localhost:3333/${data.codigo}`);
    alert("Link copiado para a área de transferência!");
  }

  const opcoes = { day: "numeric", month: "long" };
  const dataFormatada = new Date(data.dataCriacao).toLocaleDateString(
    "pt-BR",
    opcoes
  );
  const horaFormatada = new Date(data.dataCriacao).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

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
              autoComplete="off"
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
              autoComplete="off"
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
          <Calendar size={16} /> criado em {dataFormatada} às {horaFormatada}
        </p>
        <div className={styles.botoes}>
          <button onClick={handleCopy} className={styles.copiar}>
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
