"use client";
import { TeamFormation } from "@/app/lib/types/fixture/fixtureIndv";
import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Mimic } from "./lineups";
interface Props {
  list: Mimic[][];
  lineup: TeamFormation;
  isHome: boolean;
}
function FieldPitch({ list, lineup, isHome }: Props) {
  return (
    <div
      className="relative w-[409px] h-[277px] select-none"
      style={{
        display: "grid",
        gridTemplateColumns: isHome
          ? `minmax(0, 0.66fr) repeat(${
              ((parseInt(lineup.startXI[10].player.grid[0]) as number) || 4) - 1
            }, minmax(0, 1fr)) minmax(0, 0.5fr)`
          : `minmax(0, 0.5fr) repeat(${
              ((parseInt(lineup.startXI[10].player.grid[0]) as number) || 4) - 1
            }, minmax(0, 1fr)) minmax(0, 0.66fr)`,
      }}
    >
      <>
        {!isHome && (
          <div className="z-10 flex flex-col col-span-1 justify-evenly"></div>
        )}
        {list.map((column, index) => (
          <div
            className="z-10 flex flex-col col-span-1 justify-evenly"
            key={index * 45 + 456}
          >
            {column.map((player) => (
              <Popover
                content={
                  <Link href={"/players/" + player.id}>{player.name}</Link>
                }
                key={player.id + 45}
                className="shadow-none cursor-pointer"
              >
                {player.node}
              </Popover>
            ))}
          </div>
        ))}

        <Image
          src={"/field.svg"}
          quality={100}
          fill
          style={{
            objectFit: "cover",
            zIndex: 1,
          }}
          alt="the pitch"
        />
      </>
    </div>
  );
}

export default FieldPitch;
