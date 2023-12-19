"use client";
import Game from "./game";
import { FixturesData } from "../lib/types/fixture";
interface mainProps {
  fixtures: FixturesData[];
  type: string;
}
function Games_table(props: mainProps) {
  return (
    <div className="w-full rounded-b-3xl p-1 md:p-3 text-black bg-primary-lime-green  mt-4 selection:bg-primary-purple selection:text-primary-white">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <h1 className="text-5xl font-extrabold text-center md:text-start flex items-center col-span-2">
          LIVE GAMES
        </h1>
        <div className=" flex items-center gap-2 col-span-2">
          <h1 className="text-5xl font-extrabold text-center md:text-start "></h1>
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4">
        <div className="flex flex-col py-2 md:py-4 h-[350px] col-span-2 overflow-y-auto">
          {props?.fixtures?.map((item, index) => {
            return <Game fixture={item} key={index * 453} type={props.type} />;
          })}
        </div>
        <div className="col-span-2 flex items-center py-2 md:py-4"></div>
      </div>
    </div>
  );
}

export default Games_table;
