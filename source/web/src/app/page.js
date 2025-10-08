import styles from "./page.module.css";
import Card from "@/components/card";
import Form from "@/components/form";
import Rodape from "@/components/rodape";
import { Link2 } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.titulo1}>
          <Link2 size={40} className={styles.link}></Link2>
          <p>Encurtador de Links</p>
        </h1>
        <h3 className={styles.titulo2}>
          Transforme links longos em URLs curtas e fáceis de compartilhar
        </h3>

        <Form className={styles.form}></Form>

        <Card />
      </div>
      <Rodape></Rodape>
    </div>
  );
}
