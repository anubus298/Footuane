"use client";
import { FixtureIndvResponse } from "@/app/lib/types/fixture/fixtureIndv";
import { faFlagCheckered, faLocationDot, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

function FixtureInfo({ fixture }: { fixture: FixtureIndvResponse }) {
  return (
    <div className="grid grid-cols-3 px-4 py-2 text-white bg-opacity-50 bg-primary-first">
      <div className="flex items-center col-span-1 gap-2 text-sm text-center">
        <div className="size-[30px] bg-white bg-opacity-40 rounded-sm flex justify-center items-center overflow-hidden">
          <Image
            alt={fixture.response[0].league.name + " logo"}
            height={30}
            width={30}
            src={fixture.response[0].league.logo}
          />
        </div>
        <p className="text-xs md:text-base">
          {fixture.response[0].league.name} {fixture.response[0].league.round}
        </p>
      </div>
      <div className="flex items-center justify-center col-span-1 gap-2 text-sm text-center">
        <FontAwesomeIcon icon={faFlagCheckered} className="text-xs" />
        <p className="text-xs md:text-base">{fixture.response[0].fixture?.referee?.split(',')[0]}</p>
      </div>
      <div className="flex items-center justify-end col-span-1 gap-2 text-sm text-center">
        <FontAwesomeIcon icon={faLocationDot} className="text-xs" />
        <p className="text-xs md:text-base">{fixture.response[0].fixture.venue.name}, {fixture.response[0].fixture.venue.city}</p>
      </div>
    </div>
  );
}

export default FixtureInfo;
