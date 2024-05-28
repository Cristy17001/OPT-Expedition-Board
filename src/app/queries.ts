'use server';
import { PrismaClient } from "@prisma/client";
import { get } from "http";

const prisma = new PrismaClient();

export async function getEntradas() {
    const data = await prisma.$queryRaw`
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
  return JSON.parse(JSON.stringify(data));
}

export async function getSaidas() {
    const data = await prisma.$queryRaw`
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
            wb1.START_TIME as DutyStartTimeSeconds, 
            dbo.SECONDS2HHMM(wb1.START_TIME) as DutyStartTime, 
            wb1.START_NODE as DutyStartNode, 
            dbo.getRstWorkBlockLines(wb1.ID) as StartLines,
            dbo.getAssignedDriverByWorkBlockIdAndDailyRosterId(wb1.ID, dr.ID) as StartDriverId1
          FROM 
            VEHICLE_ROSTER_LINES vrl
            LEFT JOIN DAILY_VHCL_ASSIGNMENTS dva on dva.VHCL_ROSTER_LINE_ID = vrl.ID
            INNER JOIN ROSTER_VEHICLES rv ON rv.ID = dva.VEHICLE_ID 
            LEFT JOIN RST_VEHICLE_RUNS rvr ON rvr.ID = vrl.VHCL_RUN_ID 
            LEFT JOIN RST_VEHICLE_DUTIES rvd ON rvd.ID = rvr.RST_VEHICLE_DUTY_ID 
            INNER JOIN DAILY_ROSTERS dr ON dr.ID = vrl.DAILY_ROSTER_ID, 
            rst_vehicle_run_wb rvrw1, 
            rst_work_blocks wb1
          WHERE 
            dr.RST_DATE = CONVERT(DATETIME, '01-02-2024', 105)
            AND dr.ACTIVE = 'Y'
            AND vrl.END_STATE_ID is null
            AND dva.END_STATE_ID is null
            AND rvrw1.rst_vehicle_run_id = rvr.ID 
            AND rvrw1.rst_work_block_id = wb1.ID 
            AND wb1.start_time = (
              SELECT 
                MIN (start_time) 
              FROM 
                rst_vehicle_run_wb rvrw, 
                rst_work_blocks wb 
              WHERE 
                rvrw1.rst_vehicle_run_id = rvrw.rst_vehicle_run_id 
                AND rvrw.rst_work_block_id = wb.ID
            )
        ) foo 
      order by foo.DutyStartTimeSeconds
    `;
  return JSON.parse(JSON.stringify(data));
}

export async function getStations(){
  const data = await getSaidas();
  return new Set(data.map((item: any) => item.DutyStartNode));
}

