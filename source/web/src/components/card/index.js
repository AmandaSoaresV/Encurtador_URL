import styles from "./card.module.css";
import { Clipboard, Calendar, Pencil, Trash, ChartColumnBig } from "lucide-react";

export default function Card() {
    return (

        <div className={styles.card}>
            <div className={styles.topo}>
                <h2>Exame Seleção Técnico 2026</h2>
                <span > <ChartColumnBig size={20} /> 124</span>
            </div>

            <a
                href="https://youtube.com"
                target="_blank"
                rel="aaaaaaaaaaa"
                className={styles.urlCurta}
            >
                https://short.ly/ersb6d
            </a>


            <p className={styles.urlOriginal}>
                https://www.utfpr.edu.br/editais/grdddddvdvdfbergwrw/campoefjewhao/ex...
            </p>

            <div className={styles.rodape}>
                <p className={styles.data}>
                    <Calendar size={16} /> criado em 22/05/2006, 09:06
                </p>
                <div className={styles.botoes}>
                    <button className={styles.copiar}>
                        <Clipboard size={18} /> Copiar
                    </button>
                    <button><Pencil size={18} className={styles.pencil} /></button>
                    <button><Trash size={18} className={styles.trash} /></button>
                </div>
            </div>
        </div>
    );
}


