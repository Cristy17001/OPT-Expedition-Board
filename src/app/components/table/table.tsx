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
  return (row.DutyEndNode == userPrefs.station) || (row.DutyStartNode == userPrefs.station) ?
    <tr key={index} className={isLate ? styles.late : undefined}>
      {userPrefs.column_order.map((column, index) => {
        const columnValue = row[column];
        const shouldRender = userPrefs.switch_map[index]?.[1] && columnValue;
        if(column == "DutyStartTimeSeconds" || column == "DutyEndTimeSeconds") {
          return shouldRender ? <td key={index}>{new Date(columnValue * 1000).toISOString().substring(11, 16)}</td> : null;
        }
        return shouldRender ? <td key={index}>{columnValue}</td> : null;
      })}
    </tr>
  : null;
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