import React from 'react';
import styles from '../table/table.module.css'
import useUserPrefs, { UserPrefs } from '@/app/user_prefs';


interface TableProps {
    type: string;
    result: any[];
    secondsPassed: number;
    secondsPassed2: number;
}

interface DrawRowProps {
  row: any;
  index: number;
  isLate: boolean;
}

const DrawRow: React.FC<DrawRowProps> = ({ row, index, isLate }) => {
  const { userPrefs } = useUserPrefs();
  return (
    <tr key={index} className={isLate ? styles.late : undefined}>
      {userPrefs.switch_map[0][1] && row.DutyStartTimeSeconds && <td>{new Date(row.DutyStartTimeSeconds * 1000).toISOString().substring(11, 16)}</td>}
      {userPrefs.switch_map[1][1] && row.DutyEndTimeSeconds && <td>{new Date(row.DutyEndTimeSeconds * 1000).toISOString().substring(11, 16)}</td>}
      {userPrefs.switch_map[2][1] && row.IsDriverPresent && <td>{row.IsDriverPresent}</td>}
      {userPrefs.switch_map[3][1] && row.VehicleNr && <td>{row.VehicleNr}</td>}
      {userPrefs.switch_map[4][1] && row.VehicleLicensePlate && <td>{row.VehicleLicensePlate}</td>}
      {userPrefs.switch_map[5][1] && row.DailyRosterDate && <td>{row.DailyRosterDate}</td>}
      {userPrefs.switch_map[6][1] && row.DutyName && <td>{row.DutyName}</td>}
      {userPrefs.switch_map[7][1] && row.DutyEndTime && <td>{row.DutyEndTime}</td>}
      {userPrefs.switch_map[8][1] && row.DutyEndNode && <td>{row.DutyEndNode}</td>}
      {userPrefs.switch_map[9][1] && row.EndLines && <td>{row.EndLines}</td>}
      {userPrefs.switch_map[10][1] && row.EndDriverId1 && <td>{row.EndDriverId1}</td>}
    </tr>
  );
};

interface DrawHeaderProps {
  result: any[];
}

const DrawHeader: React.FC<DrawHeaderProps> = ({ result }) => {
  const { userPrefs } = useUserPrefs();
  return (
    <thead>
      <tr>
        {userPrefs.switch_map[0][1] && result[0] && result[0].DutyStartTimeSeconds && <th>{userPrefs.table_map[0][1]}</th>}
        {userPrefs.switch_map[1][1] && result[0] && result[0].DutyEndTimeSeconds && <th>{userPrefs.table_map[1][1]}</th>}
        {userPrefs.switch_map[2][1] && result[0] && result[0].IsDriverPresent && <th>{userPrefs.table_map[2][1]}</th>}
        {userPrefs.switch_map[3][1] && result[0] && result[0].VehicleNr && <th>{userPrefs.table_map[3][1]}</th>}
        {userPrefs.switch_map[4][1] && result[0] && result[0].VehicleLicensePlate && <th>{userPrefs.table_map[4][1]}</th>}
        {userPrefs.switch_map[5][1] && result[0] && result[0].DailyRosterDate && <th>{userPrefs.table_map[5][1]}</th>}
        {userPrefs.switch_map[6][1] && result[0] && result[0].DutyName && <th>{userPrefs.table_map[6][1]}</th>}
        {userPrefs.switch_map[7][1] && result[0] && result[0].DutyEndTime && <th>{userPrefs.table_map[7][1]}</th>}
        {userPrefs.switch_map[8][1] && result[0] && result[0].DutyEndNode && <th>{userPrefs.table_map[8][1]}</th>}
        {userPrefs.switch_map[9][1] && result[0] && result[0].EndLines && <th>{userPrefs.table_map[9][1]}</th>}
        {userPrefs.switch_map[10][1] && result[0] && result[0].EndDriverId1 && <th>{userPrefs.table_map[10][1]}</th>}
      </tr>
    </thead>
  );
};

const TableComponent: React.FC<TableProps> = ({type, result, secondsPassed, secondsPassed2 }) => (
    <div className={styles.table_container}>
          <table className={styles.table}>
            {DrawHeader({ result })}
            <tbody>
                {(result as Array<any>).map((row, index) => {
                  if ((type == "entradas" && row.DutyEndTimeSeconds && row.DutyEndTimeSeconds > secondsPassed) || (type == "saidas" && row.DutyStartTimeSeconds && row.DutyStartTimeSeconds > secondsPassed)) {
                    return <DrawRow key={index} row={row} index={index} isLate={false} />;
                  }
                  else if  ((type == "entradas" && row.DutyEndTimeSeconds && row.DutyEndTimeSeconds > secondsPassed2) || (type == "saidas" && row.DutyStartTimeSeconds && row.DutyStartTimeSeconds > secondsPassed2)) {
                    return <DrawRow key={index} row={row} index={index} isLate={true} />;
                  }
                  return null;
                })}
              </tbody>
          </table>
    </div>
);


export default TableComponent;