import styles from "./form.module.css";

export default function Form() {
  return (
    <form className={styles.form}>
      <label htmlFor="legenda" className={styles.titulo3}>
        Legenda do link *
      </label>
      <input
        id="legenda"
        type="text"
        placeholder="Ex: meu portifólio, site da empresa.."
        className={styles.input}
      />

      <label htmlFor="url" className={styles.titulo3}>
        URL para Encurtar *
      </label>
      <input
        id="url"
        type="text"
        placeholder="https://exemplo.com/URLlonga"
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        Encurtar
      </button>
    </form>
  );
}
