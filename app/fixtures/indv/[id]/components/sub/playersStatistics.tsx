"use client";

import { Players } from "@/app/lib/types/fixture/fixtureIndv";
import { Collapse, ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

interface PlayerData {
  key: number;
  player: React.ReactNode;
  dribbles: any;
  fouls: any;
  assists: number | null;
  minutes: number | null;
  rating: number | JSX.Element;
  scored: number | null;
  shots: number | null;
  tackles: number | null;
  duels: number | null;
  offsides: number | null;
}

function PlayersStatistics({ players }: { players?: Players[] }) {
  const dataHomeSource: PlayerData[][] | undefined = players?.map((gen) => {
    return gen.players
      .filter((player) => player.statistics[0].games.minutes != 0)
      .map((player) => {
        return {
          key: player.player.id * 12 + 4546456,
          player: (
            <div className="flex flex-col items-center gap-2 md:flex-row ">
              <Image
                unoptimized
                src={player.player.photo}
                height={40}
                width={40}
                alt={player.player.name + " photo"}
              />
              <p className="text-sm text-center md:text-base md:text-start">
                {player.player.name}
              </p>
            </div>
          ),
          dribbles: player.statistics[0].dribbles.attempts || 0,
          fouls: player.statistics[0].fouls.committed || 0,
          assists: player.statistics[0].goals.assists || 0,
          minutes: player.statistics[0].games.minutes || 0,
          rating: (
            <p
              className={
                parseFloat(player.statistics[0].games.rating || "0") >= 7
                  ? "text-green-500"
                  : parseFloat(player.statistics[0].games.rating || "0") > 5
                  ? "text-yellow-400"
                  : "text-red-600"
              }
            >
              {player.statistics[0].games.rating || "N/A"}
            </p>
          ),
          scored: player.statistics[0].goals.assists || 0,
          shots: player.statistics[0].shots.total || 0,
          tackles: player.statistics[0].tackles.total || 0,
          duels: player.statistics[0].duels.won || 0,
          offsides: player.statistics[0].offsides || 0,
        };
      });
  });

  const columns: ColumnsType<PlayerData> = [
    {
      title: "Player",
      dataIndex: "player",
      key: "player",
    },
    {
      title: "Dribbles",
      dataIndex: "dribbles",
      key: "dribbles",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Fouls",
      dataIndex: "fouls",
      responsive: ["lg"],
      key: "fouls",
      align: "center",
    },
    {
      title: "Assists",
      dataIndex: "assists",
      key: "assists",
      align: "center",
    },
    {
      title: "Scored",
      dataIndex: "scored",
      key: "scored",
      align: "center",
    },
    {
      title: "Shots",
      dataIndex: "shots",
      key: "shots",
      align: "center",
    },
    {
      title: "Tackles",
      dataIndex: "tackles",
      key: "tackles",
      align: "center",
    },
    {
      title: "Duels",
      dataIndex: "duels",
      key: "duels",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Offsides",
      dataIndex: "offsides",
      key: "offsides",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Minutes",
      dataIndex: "minutes",
      key: "minutes",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      align: "center",
    },
  ];
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });

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
            headerColor: "#fd3546",
            rowSelectedBg: "#a66cff",
          },
          Collapse: {
            contentPadding: "5px 5px",
          },
        },
      }}
    >
      {dataHomeSource?.[0] && dataHomeSource?.[1] && (
        <div className="p-1 text-white bg-opacity-40 md:p-3 bg-primary-first">
          <h3 className="mb-3 text-2xl font-semibold text-primary-second">
            Players Statistics
          </h3>
          <Collapse
            bordered={false}
            size="small"
            expandIconPosition="end"
            className="text-sm"
            items={[
              {
                key: "1",
                label: (
                  <div className="flex items-center gap-2">
                    {players?.[0]?.team?.logo && (
                      <Image
                        alt=""
                        src={players[0].team.logo}
                        height={isMobileScreen ? 25 : 30}
                        width={isMobileScreen ? 25 : 30}
                      />
                    )}
                    {players?.[0]?.team?.name && (
                      <h4 className="text-xl font-semibold text-white">
                        {players[0].team.name}
                      </h4>
                    )}
                  </div>
                ),
                children: dataHomeSource?.[0] && (
                  <Table
                    size="small"
                    rowClassName={"h-[40px] overflow-hidden"}
                    pagination={{
                      position: ["bottomRight", "bottomRight"],
                      defaultPageSize: 11,
                      pageSize: 11,
                    }}
                    className="w-full text-sm text-white md:text-base"
                    dataSource={dataHomeSource[0]}
                    columns={columns}
                  />
                ),
              },
              {
                key: "2",
                label: (
                  <div className="flex items-center gap-2">
                    {players?.[1]?.team && (
                      <>
                        <Image
                          alt=""
                          src={players[1].team.logo}
                          height={isMobileScreen ? 25 : 30}
                          width={isMobileScreen ? 25 : 30}
                        />
                        <h4 className="text-xl font-semibold text-white">
                          {players[1].team.name}
                        </h4>
                      </>
                    )}
                  </div>
                ),
                children: dataHomeSource?.[1] && (
                  <Table
                    size="small"
                    rowClassName={"h-[40px] overflow-hidden"}
                    pagination={{
                      position: ["bottomRight", "bottomRight"],
                      defaultPageSize: 11,
                      pageSize: 11,
                    }}
                    className="w-full text-sm text-white md:text-base "
                    dataSource={dataHomeSource[1]}
                    columns={columns}
                  />
                ),
              },
            ]}
          />
        </div>
      )}
    </ConfigProvider>
  );
}

export default PlayersStatistics;
