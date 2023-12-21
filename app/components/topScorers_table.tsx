"use client"
import Image from "next/image";
import Table from "antd/es/table";
import { ConfigProvider } from "antd";
import { Player, Statistics } from "../lib/types/topScorers";
import type { ColumnsType } from 'antd/es/table';
interface Props {
  topScorers: {
    player: Player;
    statistics: Statistics[];
  }[];
}
interface PlayerInfo {
  key: number; 
  player: React.ReactNode;
  goals: number;
  team: React.ReactNode;
  nationality: string;
  assists: number;
}


function TopScorers_table(props: Props) {
  const dataSource : PlayerInfo[] = props.topScorers.map((player, index) => {
    return {
      key: index * 12 + 4546456,
      player: (
        <div className="flex gap-2 items-center ">
          <Image
            src={player.player.photo}
            height={60}
            width={60}
            alt={player.player.name + " photo"}
          />
          <p>{player.player.name}</p>
        </div>
      ),
      goals: player.statistics[0].goals.total,
      team: (
        <div className="flex items-center gap-x-2">
          <Image
            src={player.statistics[0].team.logo}
            height={40}
            width={40}
            alt={player.statistics[0].team.name + " photo"}
          />
          <p>{player.statistics[0].team.name}</p>
        </div>
      ),
      nationality: player.player.nationality,
      assists: player.statistics[0].goals.assists,
    };
  });
  const columns : ColumnsType<PlayerInfo> = [
    {
      title: "Player",
      dataIndex: "player",
      key: "player",
      align: "center",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "Assists",
      dataIndex: "assists",
      key: "assists",
      align: "center",
    },
    {
      title: "Goals",
      dataIndex: "goals",
      key: "goals",
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
          size="small"
          rowClassName={"h-[40px] overflow-hidden"}
          pagination={{
            position: ["bottomRight", "bottomRight"],
            defaultPageSize: 7,
            pageSize: 6,
          }}
          className="w-full text-white h-full "
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </ConfigProvider>
  );
}

export default TopScorers_table;
