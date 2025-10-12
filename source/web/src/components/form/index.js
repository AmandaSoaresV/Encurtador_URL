"use client";

import { useState } from "react";
import styles from "./form.module.css";
import axios from "axios";

export default function Form() {
  const [data, setData] = useState({ legenda: "", urlOriginal: "" });

  async function handleCreate(event) {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3333/links`, data);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar link:", error);
    }
  }

  return (
    <form className={styles.form} onSubmit={(event) => handleCreate(event)}>
      <label htmlFor="legenda" className={styles.titulo3}>
        Legenda do link *
      </label>
      <input
        id="legenda"
        type="text"
        placeholder="Ex: meu portifólio, site da empresa.."
        className={styles.input}
        onChange={({ target }) => setData({ ...data, legenda: target.value })}
      />

      <label htmlFor="url" className={styles.titulo3}>
        URL para Encurtar *
      </label>
      <input
        id="url"
        type="text"
        placeholder="https://exemplo.com/URLlonga"
        className={styles.input}
        onChange={({ target }) =>
          setData({ ...data, urlOriginal: target.value })
        }
      />

      <button type="submit" className={styles.button}>
        Encurtar
      </button>
    </form>
  );
}
