"use client";
import Image from "next/image";
import Table from "antd/es/table";
import { ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Player, Statistics } from "../lib/types/topScorers";
import Link from "next/link";

interface Props {
  topScorers?: {
    player?: Player;
    statistics?: Statistics[];
  }[];
  type: "full" | "cut";
}

interface PlayerInfo {
  key: number;
  player: React.ReactNode;
  goals: number;
  team: React.ReactNode;
  nationality: string;
  assists: number;
}

function TopScorersTable({ topScorers, type }: Props) {
  const dataSource: PlayerInfo[] | undefined = topScorers?.map(
    (player, index) => ({
      key: index,
      player: (
        <div className="flex items-center gap-2 ">
          {player?.player?.photo && (
            <Image
              src={player?.player?.photo}
              height={50}
              width={50}
              alt={player?.player?.name + " photo"}
            />
          )}
          <p>{player?.player?.name}</p>
        </div>
      ),
      goals: player?.statistics?.[0]?.goals?.total || 0,
      team: (
        <div className="flex items-center gap-x-2">
          <Link
            href={"/player/" + player?.player?.id}
            className="flex items-center gap-x-2"
          >
            {player?.statistics?.[0]?.team.logo && (
              <Image
                src={player?.statistics?.[0]?.team?.logo}
                height={30}
                width={30}
                alt={player?.statistics?.[0]?.team?.name + " photo"}
              />
            )}
            <p>{player?.statistics?.[0]?.team?.name}</p>
          </Link>
        </div>
      ),
      nationality: player?.player?.nationality || "",
      assists: player?.statistics?.[0]?.goals?.assists || 0,
      shots: player?.statistics?.[0]?.shots.total || 0,
      passes: player?.statistics?.[0]?.passes.total || 0,
      penalties: player?.statistics?.[0]?.penalty.scored || 0,
      rating: (
        <p
          className={
            parseFloat(
              parseFloat(player.statistics?.[0].games.rating || "0").toFixed(2)
            ) >= 7
              ? "text-green-500"
              : parseFloat(
                  parseFloat(
                    player.statistics?.[0].games.rating || "0"
                  ).toFixed(2)
                ) > 5
              ? "text-yellow-400"
              : "text-red-600"
          }
        >
          {parseFloat(player.statistics?.[0].games.rating || "0").toFixed(2) ||
            "N/A"}
        </p>
      ),
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
      responsive: ["lg"],
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
  if (type === "full") {
    columns.splice(
      3,
      0,
      {
        title: "Shots",
        dataIndex: "shots",
        key: "shots",
        align: "center",
        responsive: ["lg"],
      },
      {
        title: "Passes",
        dataIndex: "passes",
        key: "passes",
        align: "center",
        responsive: ["lg"],
      },
      {
        title: "Penalties",
        dataIndex: "penalties",
        key: "penalties",
        align: "center",
        responsive: ["lg"],
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        align: "center",
        responsive: ["lg"],
      }
    );
  }
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
            defaultPageSize: type === "full" ? 10 : 7,
            pageSize: type === "full" ? 10 : 6,
            hideOnSinglePage: true,
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
