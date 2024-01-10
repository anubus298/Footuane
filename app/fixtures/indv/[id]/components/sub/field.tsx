"use client";
import { TeamFormation } from "@/app/lib/types/fixture/fixtureIndv";
import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { Mimic } from "./lineups";
interface Props {
  list: Mimic[][];
  lineup: TeamFormation;
  isHome: boolean;
  formation: string;
  teamLogo: string;
}
function FieldPitch({ list, lineup, isHome, teamLogo, formation }: Props) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });
  return (
    <div
      className="relative w-full h-[240px] overflow-hidden sm:w-[409px] sm:h-[277px] select-none"
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
      <div
        className={
          "absolute z-10 size-[30px] bottom-4 flex items-center gap-1 " +
          (isHome ? "right-16" : "left-4")
        }
      >
        {!isHome ? (
          <>
            <Image src={teamLogo} height={30} width={30} alt="" />
            <p className="font-semibold">{formation}</p>
          </>
        ) : (
          <>
            <p className="font-semibold">{formation}</p>
            <Image src={teamLogo} height={30} width={30} alt="" />
          </>
        )}
      </div>
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
                trigger={isMobileScreen ? "click" : "hover"}
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
