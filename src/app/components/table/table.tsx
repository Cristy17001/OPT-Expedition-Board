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
      {userPrefs.column_order.map((column, index) => {
        switch (column) {
          case "DutyStartTimeSeconds":
            return userPrefs.switch_map[0][1] && row.DutyStartTimeSeconds && <td key={index}>{new Date(row.DutyStartTimeSeconds * 1000).toISOString().substring(11, 16)}</td>;
          case "DutyEndTimeSeconds":
            return userPrefs.switch_map[1][1] && row.DutyEndTimeSeconds && <td key={index}>{new Date(row.DutyEndTimeSeconds * 1000).toISOString().substring(11, 16)}</td>;
          case "IsDriverPresent":
            return userPrefs.switch_map[2][1] && row.IsDriverPresent && <td key={index}>{row.IsDriverPresent}</td>;
          case "VehicleNr":
            return userPrefs.switch_map[3][1] && row.VehicleNr && <td key={index}>{row.VehicleNr}</td>;
          case "VehicleLicensePlate":
            return userPrefs.switch_map[4][1] && row.VehicleLicensePlate && <td key={index}>{row.VehicleLicensePlate}</td>;
          case "DailyRosterDate":
            return userPrefs.switch_map[5][1] && row.DailyRosterDate && <td key={index}>{row.DailyRosterDate}</td>;
          case "DutyName":
            return userPrefs.switch_map[6][1] && row.DutyName && <td key={index}>{row.DutyName}</td>;
          case "DutyEndTime":
            return userPrefs.switch_map[7][1] && row.DutyEndTime && <td key={index}>{row.DutyEndTime}</td>;
          case "DutyEndNode":
            return userPrefs.switch_map[8][1] && row.DutyEndNode && <td key={index}>{row.DutyEndNode}</td>;
          case "EndLines":
            return userPrefs.switch_map[9][1] && row.EndLines && <td key={index}>{row.EndLines}</td>;
          case "EndDriverId1":
            return userPrefs.switch_map[10][1] && row.EndDriverId1 && <td key={index}>{row.EndDriverId1}</td>;
          default:
            return null;
        }
      })}
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
        {userPrefs.column_order.map((column, index) => {
          const columnValue = result[0]?.[column];
          const tableMapItem = userPrefs.table_map.find(item => item[0] === column);
          const shouldRender = userPrefs.switch_map[index]?.[1] && columnValue;
          return shouldRender ? <th key={index}>{tableMapItem?.[1]}</th> : null;
        })}
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