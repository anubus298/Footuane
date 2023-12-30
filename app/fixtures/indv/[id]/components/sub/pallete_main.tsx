import {
  faSoccerBall,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FixtureIndvResponse } from "@/app/lib/types/fixture/fixtureIndv";
import { statusShorts } from "@/app/lib/api/ids";

// Pallete_main component
function Pallete_main({ fixture }: { fixture: FixtureIndvResponse }) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const router = useRouter();

  const homeTeam = fixture?.response?.[0]?.teams?.home;
  const awayTeam = fixture?.response?.[0]?.teams?.away;
  const goals = fixture?.response?.[0]?.goals;
  const fixtureInfo = fixture?.response?.[0]?.fixture;
  const date = new Date(fixture?.response?.[0]?.fixture?.date || "");
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const [elapsed, setElapsed] = useState(fixtureInfo?.status?.elapsed ?? 0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (elapsed) {
      intervalId = setInterval(() => {
        setElapsed((prevElapsed) => (prevElapsed || 0) + 1);
      }, 60000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [elapsed]);

  const prettyDate = getPrettyDate(fixtureInfo?.date || "");

  return (
    <div className="items-center w-full gap-2 text-white select-none">
      <div className="items-center rounded-tl-md bg-primary-first bg-opacity-40 flex w-full h-[140px] md:h-[180px]">
        <div className="w-full flex items-center *:w-1/3 h-full">
          {/* Home team */}
          <div className="flex flex-col items-center justify-start gap-3 md:flex-row">
            <div
              className="w-[90px] flex justify-center items-center cursor-pointer hover:-translate-y-1 transition"
              onClick={() => router.push(`/teams/indv/${homeTeam?.id}`)}
            >
              {homeTeam?.logo && (
                <Image
                  alt={`${homeTeam?.name} logo`}
                  src={homeTeam?.logo}
                  height={isMobileScreen ? 60 : 90}
                  width={isMobileScreen ? 60 : 90}
                  className="h-auto"
                />
              )}
            </div>
            <p className="w-[100px] text-xs md:text-2xl text-center md:text-start md:w-[150px]">
              {homeTeam?.name}
            </p>
          </div>

          {/* Middle */}
          <div className="flex flex-col items-center h-full gap-2 justify-evenly md:text-2xl">
            <div className="flex flex-col items-center justify-between gap-2">
              {/* Score */}
              <h4 className="text-xl">{fixtureInfo?.status?.long}</h4>
              <div className="flex items-center gap-2 font-semibold">
                {typeof goals?.home === "number" &&
                  typeof goals?.away === "number" && (
                    <>
                      <p
                        className={
                          goals?.home > goals?.away ? "" : "text-gray-500"
                        }
                      >
                        {goals?.home ?? "-"}
                      </p>
                      <p
                        className={
                          goals?.away > goals?.home ? "" : "text-gray-500"
                        }
                      >
                        {goals?.away ?? "-"}
                      </p>
                    </>
                  )}
              </div>
            </div>
            {/* If in_play show current time */}
            {statusShorts.in_play.includes(
              fixtureInfo?.status?.short || ""
            ) && (
              <div className="flex items-center gap-1 font-normal text-primary-second">
                <p className="font-semibold ">{elapsed}&apos;</p>
                <FontAwesomeIcon
                  icon={faSoccerBall}
                  bounce
                  className="text-2xl"
                />
              </div>
            )}
            {/* If finished show ago */}
            {(statusShorts.finished + "-" + statusShorts.scheduled)
              .split("-")
              .includes(fixtureInfo?.status?.short || "") && (
              <p className="font-normal text-primary-second">{prettyDate}</p>
            )}
            {statusShorts.first_half === fixtureInfo?.status.short && (
              <p className="text-primary-second">First Half</p>
            )}
            {statusShorts.penalty === fixtureInfo?.status.short && (
              <p className="text-primary-second">Penalty in Progress</p>
            )}
            <p className="text-xs">{formattedDate}</p>
          </div>

          {/* Away team */}
          <div className="flex flex-col-reverse items-center justify-end gap-3 md:justify-center md:flex-row ">
            <p className="w-[100px] text-xs md:text-2xl text-center md:text-end  md:w-[150px] ">
              {awayTeam?.name}
            </p>
            <div
              className="w-[90px] flex justify-center items-center cursor-pointer hover:-translate-y-1 transition"
              onClick={() => router.push(`/teams/indv/${awayTeam?.id}`)}
            >
              {awayTeam?.logo && (
                <Image
                  alt={`${awayTeam?.name} logo`}
                  src={awayTeam?.logo}
                  height={isMobileScreen ? 60 : 90}
                  width={isMobileScreen ? 60 : 90}
                  className="w-auto h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for date formatting
function getPrettyDate(date: string): string {
  const targetDate = new Date(date);
  const currentDate = new Date();
  const now: number = targetDate.getTime() - currentDate.getTime();

  // Calculate the absolute difference in seconds
  const absDiffInSeconds = Math.abs(now / 1000);

  if (now > 0) {
    // Future date
    if (absDiffInSeconds >= 31536000) {
      const diffInYears = Math.floor(absDiffInSeconds / 31536000);
      return new Intl.RelativeTimeFormat("en").format(diffInYears, "year");
    } else if (absDiffInSeconds >= 2592000) {
      const diffInMonths = Math.floor(absDiffInSeconds / 2592000);
      return new Intl.RelativeTimeFormat("en").format(diffInMonths, "month");
    } else if (absDiffInSeconds >= 86400) {
      const diffInDays = Math.floor(absDiffInSeconds / 86400);
      return new Intl.RelativeTimeFormat("en").format(diffInDays, "day");
    } else if (absDiffInSeconds >= 3600) {
      const diffInHours = Math.floor(absDiffInSeconds / 3600);
      return new Intl.RelativeTimeFormat("en").format(diffInHours, "hour");
    } else {
      const diffInMinutes = Math.floor(absDiffInSeconds / 60);
      return new Intl.RelativeTimeFormat("en").format(diffInMinutes, "minute");
    }
  } else if (now < 0) {
    // Past date
    if (absDiffInSeconds >= 31536000) {
      const diffInYears = Math.floor(absDiffInSeconds / 31536000);
      return new Intl.RelativeTimeFormat("en").format(-diffInYears, "year");
    } else if (absDiffInSeconds >= 2592000) {
      const diffInMonths = Math.floor(absDiffInSeconds / 2592000);
      return new Intl.RelativeTimeFormat("en").format(-diffInMonths, "month");
    } else if (absDiffInSeconds >= 86400) {
      const diffInDays = Math.floor(absDiffInSeconds / 86400);
      return new Intl.RelativeTimeFormat("en").format(-diffInDays, "day");
    } else if (absDiffInSeconds >= 3600) {
      const diffInHours = Math.floor(absDiffInSeconds / 3600);
      return new Intl.RelativeTimeFormat("en").format(-diffInHours, "hour");
    } else {
      const diffInMinutes = Math.floor(absDiffInSeconds / 60);
      return new Intl.RelativeTimeFormat("en").format(-diffInMinutes, "minute");
    }
  } else {
    // Same date
    return "Now";
  }
}

export default Pallete_main;
