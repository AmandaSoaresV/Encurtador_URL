import styles from "./rodape.module.css";
import { Heart } from 'lucide-react';

export default function Rodape() {
  return (
    <footer className={styles.rodape}>
      <p>
         Realizado para a Disciplina de Desenvolvimento Web. <Heart className={styles.heart} size={18} /> 
      </p>
    </footer>
  );
}
