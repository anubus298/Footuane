/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import Game from "@/app/components/game";

import { fixtureResponse } from "@/app/lib/types/fixture/fixture";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
interface Props {
  rounds: string[];
  fixtures: fixtureResponse;
  latestRound?: string;
}
function Competitions_matches({ rounds, fixtures, latestRound }: Props) {
  const [currentRound, setcurrentRound] = useState<string>(
    latestRound || fixtures.response[0].league.round
  );
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const [filteredFixtures, setfilteredFixtures] = useState(
    fixtures.response
      .filter((fixture) => fixture.league.round === currentRound)
      .sort((a, b) => {
        return (
          new Date(a.fixture.date).getTime() -
          new Date(b.fixture.date).getTime()
        );
      })
  );
  useEffect(() => {
    setfilteredFixtures(
      fixtures.response
        .filter((fixture) => fixture.league.round === currentRound)
        .sort((a, b) => {
          return (
            new Date(b.fixture.date).getTime() -
            new Date(a.fixture.date).getTime()
          );
        })
    );
  }, [currentRound]);
  return (
    <>
      <div className="w-full mb-4 ">
        <Swiper spaceBetween={5} slidesPerView={isMobileScreen ? 5 : 12}>
          {rounds.map((item, index) => {
            return (
              <SwiperSlide key={index * 65 + 6456}>
                <div
                  onClick={() => setcurrentRound(item)}
                  className={
                    "p-1 py-2 text-center rounded-sm bg-primary-first bg-opacity-40 cursor-pointer h-[80px] flex flex-col justify-center font-light " +
                    (item === currentRound && "text-primary-second")
                  }
                >
                  <p className="text-sm ">{item.split("-")[0]}</p>
                  <p className="text-sm ">{item.split("-")[1]}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="w-full mb-4 max-h-[400px] overflow-y-auto">
        {filteredFixtures.map((fixture) => {
          return (
            <Game showLeague={false} key={fixture.fixture.id + 654} fixture={fixture} />
          );
        })}
      </div>
    </>
  );
}

export default Competitions_matches;

interface DateObject {
  day: number;
  month: number;
  weekday: string;
}

function getPastAndFutureDates(): DateObject[] {
  const currentDate: Date = new Date();
  const pastAndFutureDates: DateObject[] = [];

  const weekdayNamesShort: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  // Get past 15 days
  for (let i: number = 15; i > 0; i--) {
    const pastDate: Date = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - i);
    pastAndFutureDates.push({
      day: pastDate.getDate(),
      month: pastDate.getMonth() + 1,
      weekday: weekdayNamesShort[pastDate.getDay()], // Use weekday names
    });
  }

  // Get upcoming 15 days
  for (let i: number = 0; i < 15; i++) {
    const futureDate: Date = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + i);
    pastAndFutureDates.push({
      day: futureDate.getDate(),
      month: futureDate.getMonth() + 1,
      weekday: weekdayNamesShort[futureDate.getDay()], // Use weekday names
    });
  }

  return pastAndFutureDates;
}
