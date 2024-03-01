import styles from '../page.module.css'
import Link from 'next/link';
import { getEntradas } from '../queries';



export default async function Home() {
  const result = await getEntradas();
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const secondsPassed = Math.floor((now.getTime() - startOfDay) / 1000); 
  const secondsPassed2 = secondsPassed - 600;
  

  return (
    <main>
      <button className={styles.navigation}>
        <Link href="../">Início</Link>
      </button>
    <div style={{ overflow: 'auto', height: '50rem' }}>
      <table className={styles.table}>
        <thead>
          <tr>
            {result[0] && result[0].DutyEndTimeSeconds && <th>DutyEndTimeSeconds</th>}
            {result[0] && result[0].IsDriverPresent && <th>IsDriverPresent</th>}
            {result[0] && result[0].VehicleNr && <th>VehicleNr</th>}
            {result[0] && result[0].VehicleLicensePlate && <th>VehicleLicensePlate</th>}
            {result[0] && result[0].DailyRosterDate && <th>DailyRosterDate</th>}
            {result[0] && result[0].DutyName && <th>DutyName</th>}
            {result[0] && result[0].DutyEndTime && <th>DutyEndTime</th>}
            {result[0] && result[0].DutyEndNode && <th>DutyEndNode</th>}
            {result[0] && result[0].EndLines && <th>EndLines</th>}
            {result[0] && result[0].EndDriverId1 && <th>EndDriverId1</th>}
          </tr>
        </thead>
        <tbody>
            {(result as Array<any>).map((row) => {
              if (row.DutyEndTimeSeconds && row.DutyEndTimeSeconds > secondsPassed) {
                return (
                  <tr>
                    {row.DutyEndTimeSeconds && <td>{new Date(row.DutyEndTimeSeconds * 1000).toISOString().substring(11, 16)}</td>}
                    {row.IsDriverPresent && <td>{row.IsDriverPresent}</td>}
                    {row.VehicleNr && <td>{row.VehicleNr}</td>}
                    {row.VehicleLicensePlate && <td>{row.VehicleLicensePlate}</td>}
                    {row.DailyRosterDate && <td>{new Date(row.DailyRosterDate).toLocaleDateString('pt-PT')}</td>}
                    {row.DutyName && <td>{row.DutyName}</td>}
                    {row.DutyEndTime && <td>{row.DutyEndTime}</td>}
                    {row.DutyEndNode && <td>{row.DutyEndNode}</td>}
                    {row.EndLines && <td>{row.EndLines}</td>}
                    {row.EndDriverId1 && <td>{row.EndDriverId1}</td>}
                  </tr>
                );
              }
              else if  (row.DutyEndTimeSeconds && row.DutyEndTimeSeconds > secondsPassed2) {
                return (
                <tr className={styles.late}>
                  {row.DutyEndTimeSeconds && <td>{new Date(row.DutyEndTimeSeconds * 1000).toISOString().substring(11, 16)}</td>}
                  {row.IsDriverPresent && <td>{row.IsDriverPresent}</td>}
                  {row.VehicleNr && <td>{row.VehicleNr}</td>}
                  {row.VehicleLicensePlate && <td>{row.VehicleLicensePlate}</td>}
                  {row.DailyRosterDate && <td>{new Date(row.DailyRosterDate).toLocaleDateString('pt-PT')}</td>}
                  {row.DutyName && <td>{row.DutyName}</td>}
                  {row.DutyEndTime && <td>{row.DutyEndTime}</td>}
                  {row.DutyEndNode && <td>{row.DutyEndNode}</td>}
                  {row.EndLines && <td>{row.EndLines}</td>}
                  {row.EndDriverId1 && <td>{row.EndDriverId1}</td>}
                </tr>
            );}
            return null;
          })}
          </tbody>
        </table>
      </div>
    </main>
  );
}