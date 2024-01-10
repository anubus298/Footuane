"use client";
import Game from "@/app/components/game";
import Image from "next/image";
import { sortedFixturesByleague } from "../page";
interface Props {
  live: sortedFixturesByleague;
  type: string;
  id: string;
}
function Fixtures_game({ live, type, id }: Props) {
  return (
    <div className="grid justify-center grid-cols-1 col-span-12 gap-2 p-3 font-semibold bg-primary-first bg-opacity-40 rounded-tr-md">
      <p id={id} className="text-5xl uppercase text-primary-second">
        {type}
      </p>
      <div className="flex flex-col gap-4">
        {Object.keys(live).map((league, index) => {
          return (
            <div className="" key={index * 11 + 78654}>
              <div className="flex">
                <div className="flex items-center justify-center w-full gap-2 p-1">
                  <h3 className="text-xl text-white">{league}</h3>

                  <div className="p-1 bg-white rounded-sm h-[44px] flex justify-center items-center overflow-hidden">
                    <Image
                      src={live[league]![0].league.logo}
                      height={40}
                      className="h-auto"
                      width={40}
                      alt={live[league]![0].league.name + " logo"}
                    />
                  </div>
                </div>
              </div>
              <div
                className="overflow-y-auto max-h-[300px]"
                style={{ backgroundColor: "hsla(0,100%,50%,0)" }}
              >
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Fixtures_game;
