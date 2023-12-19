"use client";

import { Table } from "antd";
import Image from "next/image";
import type { ColumnsType } from "antd/es/table";

interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;

function Competition_table(props: CompetitionProps) {
  const dataSource : TableItem = props.competition.standings[0].table.map((team, index) => {
    return {
      key: index,
      position: team.position,
      playedGames: team.playedGames,
      points: team.points,
      goalsFor: team.goalsFor,
      goalsAgainst: team.goalsAgainst,
      goalDifference: team.goalDifference,
      lost: team.lost,
      team: (
        <div className="flex items-center gap-2">
          <Image
            src={team.team.crest}
            alt={team.team.name + " logo"}
            height={30}
            width={30}
            className="h-auto"
          />
          <p>{team.team.shortName}</p>
        </div>
      ),
      won: team.won,
      draw: team.draw,
    };
  });
  let columns: ColumnsType<TableItem> = Object.keys(
    props.competition.standings[0].table[0]
  ).map((key, index) => {
    if (key === "goalDifference") {
      return {
        title: key.toUpperCase(),
        dataIndex: key,
        key: index,
        align: "center",
        responsive: ["md"],
      };
    } else if (key === "goalsAgainst") {
      return {
        title: key.toUpperCase(),
        dataIndex: key,
        key: index,
        align: "center",
        responsive: ["md"],
      };
    } else if (key === "position") {
      return {
        title: key.toUpperCase(),
        dataIndex: key,
        key: index,
        align: "center",
        responsive: ["md"],
      };
    } else {
      return {
        title: key.toUpperCase(),
        dataIndex: key,
        key: index,
        align: "center",
      };
    }
  });
  columns.splice(
    columns.findIndex((item) => {
      return item.title === "FORM";
    }),
    1
  );

  return (
    <div className="flex flex-col w-full overflow-auto">
      <Table
        size="small"
        rowClassName={"h-[40px] overflow-hidden"}
        pagination={{
          position: ["bottomRight", "bottomRight"],
        }}
        className="w-full selection:text-white h-full"
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}

export default Competition_table;
