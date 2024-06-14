'use client'
import styles from './page.module.css';
import Link from 'next/link';
import useUserPrefs from './user_prefs';
import { getStations } from './queries';
import { useEffect, useState } from 'react';

const StationSelection : React.FC = () => {
  const {userPrefs, updateUserPrefs } = useUserPrefs();
  const [stations, setStations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStations().then((stations: Set<unknown>) => {
      setStations(Array.from(stations) as string[]);
      console.log(stations);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p style={{ fontSize: '1rem' }}>Loading...</p>;
  }

  return (
    <select
    id="station"
    name="station"
    className={styles.select_station}
    value={userPrefs.station}
    onChange={(e) => updateUserPrefs({ ...userPrefs, station: e.target.value })}
  >
    <option value="">Selecione uma estação</option>
    {stations.map((station: string) => (
      <option key={station} value={station}>
        {station}
      </option>
    ))}
  </select>
  );
}

export default function Home() {

  return (
    <main className={styles.landing}>
      <div className={styles.card}>
        <h1 className={styles.title}>Selecione uma opção:</h1>
        <div className={styles.btn_container}>
          <Link href="/entradas"><button className= {styles.btn_nav}>
              Entradas
            </button>
          </Link>
          <Link href="/saidas"><button className= {styles.btn_nav}>
              Saídas
            </button>
          </Link>
          <Link href="/definicoes"><button className= {styles.btn_nav}>
              Definições
            </button>
          </Link>
        </div>
        <div className={styles.station_container}>
          <h4>Selecione uma estação:</h4>
          <StationSelection/>
        </div>
      </div>
    </main>
  );
}