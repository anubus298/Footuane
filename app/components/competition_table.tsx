"use client";

import type { ColumnsType } from "antd/es/table";
import { StandingsTeam } from "../lib/types/standings";
import Image from "next/image";
import Table from "antd/es/table";
import { ConfigProvider } from "antd";
interface Props {
  standings: StandingsTeam[];
}

interface TeamInfo {
  key: number; // Assuming `index` is a number
  played: number;
  rank: number;
  goalsFor: number;
  points: number;
  team: React.ReactNode; // You might need to adjust the type based on the actual React component
}

function Competition_table(props: Props) {
  const dataSource: TeamInfo[] = props.standings.map((team, index) => {
    return {
      key: index,
      played: team.all.played,
      rank: team.rank,
      goalsFor: team.all.goals.for,
      points: team.points,
      team: (
        <div className="flex items-center gap-2">
          <Image
            src={team.team.logo}
            alt={team.team.name + " logo"}
            height={30}
            width={30}
            className="h-auto"
          />
          <p>{team.team.name}</p>
        </div>
      ),
    };
  });
  const columns: ColumnsType<TeamInfo> = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
      align: "center",
    },
    {
      title: "Played",
      dataIndex: "played",
      key: "played",
      align: "center",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      align: "center",
    },
    {
      title: "scored",
      dataIndex: "goalsFor",
      key: "goalsFor",
      align: "center",
    },
  ];

  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#f0f0f000",
          colorText: "#f0f0f0",
        },
        components: {
          Table: {
            cellPaddingBlock: 4,
            cellPaddingInlineMD: 4,
            headerColor: "#defe54",
            rowSelectedBg: "#a66cff",
          },
        },
      }}
    >
      <div className="flex flex-col w-full overflow-hidden">
        <Table
          bordered
          size="small"
          rowClassName={"h-[40px] overflow-hidden"}
          pagination={{
            position: ["bottomRight", "bottomRight"],
          }}
          className="w-full text-white h-full "
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </ConfigProvider>
  );
}

export default Competition_table;

