"use client";
import { FixtureIndvResponse } from "@/app/lib/types/fixture/fixtureIndv";
import {
  faFlagCheckered,
  faLocationDot,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

function FixtureInfo({ fixture }: { fixture: FixtureIndvResponse }) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const router = useRouter();
  return (
    <div className="grid grid-cols-3 px-4 py-2 text-white bg-opacity-50 bg-primary-first">
      <div className="flex items-center col-span-1 gap-2 text-sm text-center">
        <div className="size-[40px] md:size-[30px] bg-primary-second p-1 rounded-sm flex justify-center items-center overflow-hidden">
          <Image
            onClick={() =>
              router.push(`/leagues/indv/${fixture.response[0].league.id}`)
            }
            alt={fixture.response[0].league.name + " logo"}
            height={30}
            className="h-auto transition cursor-pointer hover:-translate-y-[2px]"
            width={30}
            src={fixture.response[0].league.logo}
          />
        </div>
        <Link
          href={`/leagues/indv/${fixture.response[0].league.id}`}
          className="text-xs md:text-base"
        >
          {fixture.response[0].league.name} {fixture.response[0].league.round}
        </Link>
      </div>
      <div className="flex items-center justify-center col-span-1 gap-2 text-sm text-center">
        <FontAwesomeIcon icon={faFlagCheckered} className="text-xs" />
        <p className="text-xs md:text-base">
          {fixture.response[0].fixture?.referee?.split(",")[0]}
        </p>
      </div>
      <div className="flex items-center justify-end col-span-1 gap-2 text-sm text-center">
        <FontAwesomeIcon icon={faLocationDot} className="text-xs" />
        <Popover
          className="cursor-pointer"
          placement={isMobileScreen ? "bottom" : "top"}
          trigger={isMobileScreen ? "click" : "hover"}
          content={
            <Image
              height={200}
              width={200}
              alt={fixture.response[0].fixture.venue.name}
              src={`https://media.api-sports.io/football/venues/${fixture.response[0].fixture.venue.id}.png`}
            />
          }
        >
          <p className="text-xs md:text-base ">
            {fixture.response[0].fixture.venue.name},{" "}
            {fixture.response[0].fixture.venue.city}
          </p>
        </Popover>
      </div>
    </div>
  );
}

export default FixtureInfo;
