"use client";
import Image from "next/image";
import Table from "antd/es/table";
import { ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Player, Statistics } from "../lib/types/topScorers";

interface Props {
  topScorers?: {
    player?: Player;
    statistics?: Statistics[];
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

function TopScorersTable({ topScorers }: Props) {
  const dataSource: PlayerInfo[] | undefined = topScorers?.map(
    (player, index) => ({
      key: index,
      player: (
        <div className="flex items-center gap-2 ">
          {player?.player?.photo && (
            <Image
              src={player?.player?.photo}
              height={60}
              width={60}
              alt={player?.player?.name + " photo"}
            />
          )}
          <p>{player?.player?.name}</p>
        </div>
      ),
      goals: player?.statistics?.[0]?.goals?.total || 0,
      team: (
        <div className="flex items-center gap-x-2">
          {player?.statistics?.[0]?.team.logo && (
            <Image
              src={player?.statistics?.[0]?.team?.logo}
              height={40}
              width={40}
              alt={player?.statistics?.[0]?.team?.name + " photo"}
            />
          )}
          <p>{player?.statistics?.[0]?.team?.name}</p>
        </div>
      ),
      nationality: player?.player?.nationality || "",
      assists: player?.statistics?.[0]?.goals?.assists || 0,
    })
  );

  const columns: ColumnsType<PlayerInfo> = [
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
          colorBgContainer: "rgba(31, 50, 72, 0.2)",
          colorText: "#f0f0f0",
        },
        components: {
          Table: {
            cellPaddingBlock: 4,
            cellPaddingInlineMD: 4,
            headerColor: "#FD3546",
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
          className="w-full h-full text-white "
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </ConfigProvider>
  );
}

export default TopScorersTable;
