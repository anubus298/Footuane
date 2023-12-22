"use client";

import { statusShorts } from "@/app/lib/api/ids";
import { FixtureIndvResponse } from "@/app/lib/types/fixture/fixtureIndv";
import { faSoccerBall } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function Pallete_main({ fixture }: { fixture: FixtureIndvResponse }) {
  const [elapsed, setelapsed] = useState(
    fixture?.response[0].fixture.status?.elapsed
  );
  const router = useRouter();
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (elapsed) {
      intervalId = setInterval(() => {
        setelapsed((prevElapsed) => prevElapsed + 1);
      }, 60000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [elapsed]);
  return (
    <div className="w-full items-center gap-2 select-none text-white">
      <div className="items-center rounded-sm bg-primary-first bg-opacity-50 flex w-full h-[100px] md:h-[180px]">
        <div className="w-full flex items-center *:w-1/3 h-full">
          <div className="flex-col md:flex-row flex items-center  gap-3 justify-start">
            <div
              className="w-[90px]  cursor-pointer hover:-translate-y-1 transition"
              onClick={() =>
                router.push(`teams/indv/${fixture.response[0].teams.home.id}`)
              }
            >
              <Image
                alt={fixture.response[0].teams.home.name + " logo"}
                src={fixture.response[0].teams.home.logo}
                height={90}
                width={90}
                className="h-auto"
              />
            </div>
            <p className="w-[100px] text-xs md:text-2xl text-center md:text-start md:w-[150px]">
              {fixture.response[0].teams.home.name}
            </p>
          </div>
          <div className="flex-col flex items-center gap-2 justify-evenly h-full md:text-2xl">
            <div className="flex flex-col justify-between items-center gap-2">
              {/*score */}
              <h4 className="text-xl">
                {fixture.response[0].fixture.status.long}
              </h4>
              <div className="flex items-center gap-2">
                <p
                  className={
                    fixture.response[0].goals.home >
                    fixture.response[0].goals.away
                      ? ""
                      : fixture.response[0].goals.home ===
                        fixture.response[0].goals.away
                      ? ""
                      : "text-gray-500"
                  }
                >
                  {fixture.response[0].goals.home ?? "-"}
                </p>
                <p
                  className={
                    fixture.response[0].goals.away >
                    fixture.response[0].goals.home
                      ? ""
                      : fixture.response[0].goals.home ===
                        fixture.response[0].goals.away
                      ? ""
                      : "text-gray-500"
                  }
                >
                  {fixture.response[0].goals.away ?? "-"}
                </p>
              </div>
            </div>
            {/*if in_play show current time*/}
            {statusShorts.in_play.includes(
              fixture.response[0].fixture.status.short
            ) && (
              <div className="flex items-center gap-1 text-primary-second">
                <p className=" font-semibold">{elapsed}&apos;</p>
                <FontAwesomeIcon
                  icon={faSoccerBall}
                  bounce
                  className="text-2xl"
                />
              </div>
            )}
            {/*if finished show ago*/}
            {(statusShorts.finished + "-" + statusShorts.scheduled)
              .split("-")
              .includes(fixture.response[0].fixture.status.short) && (
              <p className="text-primary-second">
                {getPrettyDate(fixture.response[0].fixture.date)}
              </p>
            )}
            {statusShorts.first_half ===
              fixture.response[0].fixture.status.short && (
              <p className="text-primary-second">First Half</p>
            )}
            {statusShorts.penalty ===
              fixture.response[0].fixture.status.short && (
              <p className="text-primary-second">Penalty in Progress</p>
            )}
          </div>

          <div className="flex-col md:flex-row flex items-center  gap-3 justify-end ">
            <p className="w-[100px] text-xs md:text-2xl text-center md:text-end  md:w-[150px]">
              {fixture.response[0].teams.away.name}
            </p>
            <div
              className="w-[90px] cursor-pointer hover:-translate-y-1 transition"
              onClick={() =>
                router.push(`teams/indv/${fixture.response[0].teams.away.id}`)
              }
            >
              <Image
                alt={fixture.response[0].teams.away.name + " logo"}
                src={fixture.response[0].teams.away.logo}
                height={90}
                width={90}
                className="h-auto w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPrettyDate(date: string): string {
  const targetDate = new Date(date);
  const currentDate = new Date();
  const now: number = targetDate.getTime() - currentDate.getTime();

  // Calculate the absolute difference in seconds
  const absDiffInSeconds = Math.abs(now / 1000);

  if (now > 0) {
    // Future date
    if (absDiffInSeconds >= 86400) {
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
    if (absDiffInSeconds >= 86400) {
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
