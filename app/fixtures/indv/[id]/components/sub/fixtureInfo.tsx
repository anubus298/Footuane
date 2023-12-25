import {
  faFlagCheckered,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FixtureIndvResponse } from "@/app/lib/types/fixture/fixtureIndv";

function FixtureInfo({ fixture }: { fixture: FixtureIndvResponse }) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const router = useRouter();

  const league = fixture?.response?.[0]?.league;
  const fixtureData = fixture?.response?.[0]?.fixture;

  return (
    <div className="grid grid-cols-3 px-4 py-2 text-white bg-opacity-40 bg-primary-first">
      <div className="flex items-center col-span-1 gap-2 text-sm text-center">
        <div className="size-[40px] md:size-[30px] bg-white p-1 rounded-sm flex justify-center items-center overflow-hidden">
          {league?.logo && (
            <Image
              onClick={() => router.push(`/leagues/indv/${league.id}`)}
              alt={`${league.name} logo`}
              height={30}
              className="h-auto transition cursor-pointer hover:-translate-y-[2px]"
              width={30}
              src={league.logo}
            />
          )}
        </div>
        <Link
          href={`/leagues/indv/${league?.id}`}
          className="text-xs md:text-base"
        >
          {league?.name} {league?.round}
        </Link>
      </div>
      <div className="flex items-center justify-center col-span-1 gap-2 text-sm text-center">
        <FontAwesomeIcon icon={faFlagCheckered} className="text-xs" />
        <p className="text-xs md:text-base">
          {fixtureData?.referee?.split(",")[0]}
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
              alt={fixtureData?.venue?.name || ""}
              src={`https://media.api-sports.io/football/venues/${fixtureData?.venue?.id}.png`}
            />
          }
        >
          <p className="text-xs md:text-base ">
            {fixtureData?.venue?.name}, {fixtureData?.venue?.city}
          </p>
        </Popover>
      </div>
    </div>
  );
}

export default FixtureInfo;
