import React from 'react';
import styles from '../table/table.module.css'
import useUserPrefs, { UserPrefs } from '@/app/user_prefs';


interface TableProps {
    type: string;
    result: any[];
    secondsPassed: number;
    secondsPassed2: number;
}

function DrawRow(row: any, index: number, isLate: boolean) {
  return (
      <tr key={index} className={isLate ? styles.late : undefined}>
        {row.DutyStartTimeSeconds && <td>{new Date(row.DutyStartTimeSeconds * 1000).toISOString().substring(11, 16)}</td>}
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

function DrawHeader(result: any[]) {
  return(
      <thead>
        <tr>
          {result[0] && result[0].DutyStartTimeSeconds && <th>{useUserPrefs().userPrefs.table_map[0][1]}</th>}
          {result[0] && result[0].DutyEndTimeSeconds && <th>{useUserPrefs().userPrefs.table_map[1][1]}</th>}
          {result[0] && result[0].IsDriverPresent && <th>{useUserPrefs().userPrefs.table_map[2][1]}</th>}
          {result[0] && result[0].VehicleNr && <th>{useUserPrefs().userPrefs.table_map[3][1]}</th>}
          {result[0] && result[0].VehicleLicensePlate && <th>{useUserPrefs().userPrefs.table_map[4][1]}</th>}
          {result[0] && result[0].DailyRosterDate && <th>{useUserPrefs().userPrefs.table_map[5][1]}</th>}
          {result[0] && result[0].DutyName && <th>{useUserPrefs().userPrefs.table_map[6][1]}</th>}
          {result[0] && result[0].DutyEndTime && <th>{useUserPrefs().userPrefs.table_map[7][1]}</th>}
          {result[0] && result[0].DutyEndNode && <th>{useUserPrefs().userPrefs.table_map[8][1]}</th>}
          {result[0] && result[0].EndLines && <th>{useUserPrefs().userPrefs.table_map[9][1]}</th>}
          {result[0] && result[0].EndDriverId1 && <th>{useUserPrefs().userPrefs.table_map[10][1]}</th>}
        </tr>
      </thead>
  )
}

const TableComponent: React.FC<TableProps> = ({type, result, secondsPassed, secondsPassed2 }) => (
    <div className={styles.table_container}>
          <table className={styles.table}>
            {DrawHeader(result)}
            <tbody>
                {(result as Array<any>).map((row, index) => {
                  if ((type == "entradas" && row.DutyEndTimeSeconds && row.DutyEndTimeSeconds > secondsPassed) || (type == "saidas" && row.DutyStartTimeSeconds && row.DutyStartTimeSeconds > secondsPassed)) {
                    return DrawRow(row, index, false);
                  }
                  else if  ((type == "entradas" && row.DutyEndTimeSeconds && row.DutyEndTimeSeconds > secondsPassed2) || (type == "saidas" && row.DutyStartTimeSeconds && row.DutyStartTimeSeconds > secondsPassed2)) {
                    return DrawRow(row, index, true);
                  }
                  return null;
                })}
              </tbody>
          </table>
    </div>
);


export default TableComponent;