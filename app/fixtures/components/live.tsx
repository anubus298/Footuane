"use client";
import Game from "@/app/components/game";
import Image from "next/image";
import { LiveLeagues } from "../page";
interface Props {
  live: LiveLeagues;
}
function Live_Now({ live }: Props) {
  return (
    <div className="bg-primary-first bg-opacity-20 col-span-12 p-3 text-primary-second font-semibold grid grid-cols-1 justify-center">
      <p className="uppercase text-5xl">Live Now</p>
      <div className="flex flex-col">
        {Object.keys(live).map((league, index) => {
          return (
            <div className="" key={index * 11 + 78654}>
              <div className="flex">
                <h3 className="text-2xl text-white">{league}</h3>
                <Image
                  src={live[league]![0].league.logo}
                  height={50}
                  width={50}
                  alt={live[league]![0].league.name + " logo"}
                />
              </div>
              {live[league]!.map((fixture) => {
                return (
                  <Game
                    showLeague={false}
                    key={fixture.fixture.id}
                    fixture={fixture}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Live_Now;
