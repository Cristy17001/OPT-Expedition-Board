import { PrismaClient } from '@prisma/client'
import styles from './page.module.css';

const prisma = new PrismaClient()

export default async function Home() {
  const result = await prisma.$queryRaw`
  SELECT 
      * 
    FROM 
      (
        SELECT 
		  vrl.CREW_CHECKED_IN as IsDriverPresent,
          rv.NR as VehicleNr, 
          rv.LICENSE_PLATE as VehicleLicensePlate, 
          dr.RST_DATE as DailyRosterDate, 
          rvd.NAME as DutyName, 
          wb2.END_TIME as DutyEndTimeSeconds,
		  dbo.SECONDS2HHMM(wb2.END_TIME) as DutyEndTime, 
		  wb2.END_NODE as DutyEndNode, 
          dbo.getRstWorkBlockLines(wb2.ID) as EndLines,
		  dbo.getAssignedDriverByWorkBlockIdAndDailyRosterId(wb2.ID, dr.ID) as EndDriverId1
        FROM 
          VEHICLE_ROSTER_LINES vrl
		  LEFT JOIN DAILY_VHCL_ASSIGNMENTS dva on dva.VHCL_ROSTER_LINE_ID = vrl.ID
          INNER JOIN ROSTER_VEHICLES rv ON rv.ID = dva.VEHICLE_ID 
          LEFT JOIN RST_VEHICLE_RUNS rvr ON rvr.ID = vrl.VHCL_RUN_ID 
          LEFT JOIN RST_VEHICLE_DUTIES rvd ON rvd.ID = rvr.RST_VEHICLE_DUTY_ID 
          INNER JOIN DAILY_ROSTERS dr ON dr.ID = vrl.DAILY_ROSTER_ID, 
          rst_vehicle_run_wb rvrw2, 
          rst_work_blocks wb2 
        WHERE 
          dr.RST_DATE = CONVERT(DATETIME, '01-02-2024', 105)
		  AND dr.ACTIVE = 'Y'
          AND vrl.END_STATE_ID is null
		  AND dva.END_STATE_ID is null
          AND rvrw2.rst_vehicle_run_id = rvr.ID 
          AND rvrw2.rst_work_block_id = wb2.ID 
          AND wb2.end_time = (
            SELECT 
              MAX (end_time) 
            FROM 
              rst_vehicle_run_wb rvrw, 
              rst_work_blocks wb 
            WHERE 
              rvrw2.rst_vehicle_run_id = rvrw.rst_vehicle_run_id 
              AND rvrw.rst_work_block_id = wb.ID
          )
      ) foo 
    order by foo.DutyEndTimeSeconds
  `;
  console.log(result);
  return (
    <main>
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
