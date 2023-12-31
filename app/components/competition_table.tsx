"use client";

import type { ColumnsType } from "antd/es/table";
import { StandingsTeam } from "../lib/types/standings";
import Image from "next/image";
import Table from "antd/es/table";
import { Collapse, ConfigProvider } from "antd";
import Link from "next/link";
interface Props {
  standings: StandingsTeam[];
  type: "full" | "cut";
}

interface TeamInfo {
  key: number; // Assuming `index` is a number
  played: number;
  rank: React.ReactNode;
  goalsFor: number;
  points: number;
  team: React.ReactNode; // You might need to adjust the type based on the actual React component
}

function Competition_table(props: Props) {
  const dataSource: TeamInfo[] = props.standings.map((team, index) => {
    return {
      key: index,
      played: team.all.played,
      rank: <div className="flex items-center justify-center gap-1">
        <div className={team.status === "same"? "triangle-middle" : team.status === "up"? "triangle-up" : "triangle-down"}></div>
        <p>{team.rank}</p>
      </div>,
      goalsFor: team.all.goals.for,
      points: team.points,
      team: (
        <div className="flex items-center gap-2 w-[160px]">
          <Link href={"/teams/indv/" + team.team.id} className="flex items-center gap-2">
            <Image
            unoptimized
              src={team.team.logo}
              alt={team.team.name + " logo"}
              height={30}
              width={30}
              className="h-auto"
            />
            <p>{team.team.name}</p>
          </Link>
        </div>
      ),
      form: <p className="text-sm text-center">{team.form}</p>,
      goalsDiff: team.goalsDiff,
      goalsAgainst: team.all.goals.against,
      lose: team.all.lose,
      draw: team.all.draw,
      won: team.all.win,
    };
  });
  let columns: ColumnsType<TeamInfo> = [
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
      title: "scored",
      dataIndex: "goalsFor",
      key: "goalsFor",
      align: "center",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      align: "center",
    },
  ];
  if (props.type === "full") {
    columns.splice(
      3,
      0,
      {
        title: "Won",
        dataIndex: "won",
        key: "won",
        align: "center",
        responsive: ["lg"],
      },
      {
        title: "Lose",
        dataIndex: "lose",
        key: "lose",
        align: "center",
        responsive: ["lg"],
      },
      {
        title: "Draw",
        dataIndex: "draw",
        key: "draw",
        align: "center",
        responsive: ["lg"],
      },
     
      {
        title: "GF",
        dataIndex: "goalsFor",
        key: "goalsFor",
        align: "center",
        responsive: ["lg"],
      },
      {
        title: "GA",
        dataIndex: "goalsAgainst",
        key: "goalsAgainst",
        align: "center",
        responsive: ["lg"],
      },
      {
        title: "GD",
        dataIndex: "goalsDiff",
        key: "goalsDiff",
        align: "center",
        responsive: ["lg"],
      },
      {
        title: "form",
        dataIndex: "form",
        key: "form",
        align: "center",
        responsive: ["lg"],
      },
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
          Collapse: {
            headerBg: "rgba(31, 50, 72, 0.2)",
          },
        },
      }}
    >
      <div className="flex flex-col w-full overflow-hidden">
        {props.standings[0].group.startsWith("Group") ? (
          <Collapse
            size="small"
            expandIconPosition="end"
            bordered={false}
            className="text-sm rounded-none *:rounded-none"
            items={[
              {
                key: "1",
                label: (
                  <div className="flex items-center gap-2">
                    <p className="mb-2 text-xl font-semibold text-primary-second">
                      {props.standings[0].group}
                    </p>
                  </div>
                ),
                children: dataSource?.[0] && (
                  <Table
                    size="small"
                    rowClassName={"h-[40px] overflow-hidden"}
                    pagination={{
                      position: ["bottomRight", "bottomRight"],
                      hideOnSinglePage: true,
                    }}
                    className="w-full h-full text-white rounded-none"
                    dataSource={dataSource}
                    columns={columns}
                  />
                ),
              },
            ]}
          />
        ) : (
          <Table
            size="small"
            rowClassName={"h-[40px] overflow-hidden"}
            pagination={{
              position: ["bottomRight", "bottomRight"],
              hideOnSinglePage: true,
            }}
            className="w-full h-full text-white "
            dataSource={dataSource}
            columns={columns}
          />
        )}
      </div>
    </ConfigProvider>
  );
}

export default Competition_table;
