'use client';
import styles from '../page.module.css';
import Link from 'next/link';
import {  getSaidas } from '../queries';
import { useEffect, useState, useRef } from 'react';
import TableComponent from './table';

const content = "Esta página mostra as entradas dos motoristas. A tabela mostra as entradas dos motoristas, com a hora de entrada, a matrícula do veículo, a data do serviço, o nome do serviço, a hora de fim do serviço, o nó de fim do serviço, as linhas de fim do serviço e o id do motorista de fim do serviço. A tabela é atualizada a cada 10 segundos. As entradas que estão a menos de 10 minutos de expirar ficam a vermelho.";


export default function Home() {
  const [data, setData] = useState({ result: [], secondsPassed: 0, secondsPassed2: 0 });
  const [loading, setLoading] = useState(true);
  const infoRef = useRef(null);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    const result = await getSaidas();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const secondsPassed = Math.floor((now.getTime() - startOfDay) / 1000); 
    const secondsPassed2 = secondsPassed - 600;
    setData({ result, secondsPassed, secondsPassed2 });
    setLoading(false);
  }

  

  return (
    <main>
      <Link href="../"><button className= {styles.navigation}>Inicio </button></Link>
      {data.result.length !== 0 ? (
        <TableComponent
          result={data.result}
          secondsPassed={data.secondsPassed}
          secondsPassed2={data.secondsPassed2}
        />
      ) : null}
      {loading ? <div className = {styles.loader}></div>: null}
      <div >
        <h1 className={styles.infoheader}>Informação</h1>
        <p className = {styles.info}>{content} </p>
      </div>
    </main>
  );
}