"use client";
import Image from "next/image";
import Link from "next/link";
import { leaguesIds } from "@/app/lib/api/ids";
import { useMediaQuery } from "react-responsive";

function LeftTabs() {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });
  return isMobileScreen ? (
    <div></div>
  ) : (
    <div className="flex flex-col md:col-start-1 md:col-end-3">
      <div className="grid grid-cols-4 gap-1 text-white bg-primary-first bg-opacity-40 rounded-tl-md">
        <div className="col-span-4">
          <h4 className="my-2 text-lg font-semibold text-center text-primary-second">
            Popular leagues
          </h4>
        </div>
        {Object.entries(leaguesIds).map((entry, index) => (
          <>
            <Link
              key={index * 546}
              href={"/competitions/" + entry[1]}
              className="flex items-center justify-center col-span-1"
            >
              <div className="h-[35px] bg-white overflow-hidden flex justify-center items-center p-1 rounded-sm">
                <Image
                  height={30}
                  width={30}
                  className="h-auto"
                  src={`https://media.api-sports.io/football/leagues/${entry[1]}.png`}
                  alt={entry[0] + " logo"}
                />
              </div>
            </Link>
            <div
              className="flex items-center col-span-3 text-sm"
              key={index * 547 + 478}
            >
              <Link href={"/competitions/" + entry[1]} className="">
                {entry[0].split("(")[0]}
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default LeftTabs;
