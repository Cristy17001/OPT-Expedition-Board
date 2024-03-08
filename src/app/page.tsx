import styles from './page.module.css';
import Link from 'next/link';

export default async function Home() {

  return (
    <main className={styles.landing}>
      <div className={styles.card}>
        <h1>Selecione uma das opções:</h1>
        <div className={styles.btn_container}>
          <Link href="/saidas"><button className= {styles.btn_nav}>
              Saídas
            </button>
          </Link>
          <Link href="/entradas"><button className= {styles.btn_nav}>
              Entradas
            </button>
          </Link>
          <Link href="/definicoes"><button className= {styles.btn_nav}>
              Definições
            </button>
          </Link>
        </div>
      </div>
    </main>
  );

}