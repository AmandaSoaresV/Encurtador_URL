import styles from "./page.module.css";
import Card from "@/components/card";
import Form from "@/components/form";
import Rodape from "@/components/rodape";
import axios from "axios";
import { Link2 } from "lucide-react";

export default async function Home() {
  async function getLinks() {
    try {
      const response = await axios.get("http://localhost:3333/links");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar links:", error);
    }
  }

  const { links } = await getLinks();
  links.forEach((link) => console.log(link));

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

        {links.map((link) => (
          <Card key={link.id} data={link} />
        ))}
      </div>
      <Rodape></Rodape>
    </div>
  );
}
