'use client';
import styles from '../page.module.css'
import Link from 'next/link';
import { getEntradas } from '../queries';
import { useEffect, useState } from 'react';
import TableComponent from './table';

export default function Home() {
  const [data, setData] = useState({ result: [], secondsPassed: 0, secondsPassed2: 0 });

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    const result = await getEntradas();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const secondsPassed = Math.floor((now.getTime() - startOfDay) / 1000); 
    const secondsPassed2 = secondsPassed - 600;
    setData({ result, secondsPassed, secondsPassed2 });
  }

  return (
    <main>
      <button className={styles.navigation}>
        <Link href="../">Início</Link>
      </button>
      <TableComponent result={data.result} secondsPassed={data.secondsPassed} secondsPassed2={data.secondsPassed2} />
    </main>
  );
}