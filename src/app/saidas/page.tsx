import { PrismaClient } from '@prisma/client'
import styles from '../page.module.css';
import Link from 'next/link';
import { getEntradas } from '../queries';

const prisma = new PrismaClient()

export default async function Home() {
  const result = await getEntradas();
  console.log(result);
  return (
    <main>
      <button className= {styles.navigation}><Link href="../">Inicio </Link></button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Is_Driver_Present</th>
            <th>Vehicle_Number</th>
            <th>Vehicle_License_Plate</th>
            <th>Daily_Roster_Date</th>
            <th>Duty_Name</th>
            <th>Duty_End_Time</th>
            <th>Duty_End_Node</th>
            <th>End_Lines</th>
            <th>End_DriverIDs</th>
          </tr>
        </thead>
        <tbody>
          {(result as Array<any>).map((row) => (
            <tr key={row.VehicleNr}>
              <td>{row.IsDriverPresent}</td>
              <td>{row.VehicleNr}</td>
              <td>{row.VehicleLicensePlate}</td>
              <td>{(row.DailyRosterDate.toLocaleString('pt-PT', {day: 'numeric', month: 'numeric', year: 'numeric'}))}</td>
              <td>{row.DutyName}</td>
              <td>{row.DutyEndTime}</td>
              <td>{row.DutyEndNode}</td>
              <td>{row.EndLines}</td>
              <td>{row.EndDriverId1}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>HOME</h2>
    </main>
  );
}