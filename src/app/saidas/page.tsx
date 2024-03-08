"use client";
import { getSaidas } from "../queries";
import { useEffect, useState, useRef } from "react";
import TableComponent from "../components/table/table";
import Header from "../components/header/header";
import LoadingComponent from "../components/loading/loading";
import BottomInfo from "../components/bottomInfo/bottomInfo";
import styles from "../page.module.css";

export default function Home() {
  const [data, setData] = useState({
    result: [],
    secondsPassed: 0,
    secondsPassed2: 0,
  });
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
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    const secondsPassed = Math.floor((now.getTime() - startOfDay) / 1000);
    const secondsPassed2 = secondsPassed - 600;
    setData({ result, secondsPassed, secondsPassed2 });
    setLoading(false);
  }

  return (
    <>
      <Header type="saidas" title="Quadro De Saídas" />
      <main className={styles.flex_center}>        {data.result.length !== 0 ? (
          <TableComponent
            type="saidas"
            result={data.result}
            secondsPassed={data.secondsPassed}
            secondsPassed2={data.secondsPassed2}
          />
        ) : null}
        {loading ? <LoadingComponent /> : null}
        <BottomInfo />
      </main>
    </>
  );
}
