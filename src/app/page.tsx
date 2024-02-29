import { PrismaClient } from '@prisma/client'
import styles from './page.module.css';
import Link from 'next/link';

const prisma = new PrismaClient()

export default async function Home() {
  
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Selecione a sua opção</h1>
      <button className= {styles.navigation}><Link href="/saidas">
          Saídas
        </Link></button>
      <button className= {styles.navigation}><Link href="/entradas">
          Entradas
        </Link></button>
    </main>
  );
            
}
