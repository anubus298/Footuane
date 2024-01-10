"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { StandingsTeam } from "../lib/types/standings";
import { FixtureData } from "../lib/types/fixture/fixture";
import { Player, Statistics } from "../lib/types/topScorers";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import CompetitionTable from "../components/competition_table";
import EmptyGame from "./empty/empty_game_table";
import Game from "./game";
import TopScorersTable from "./topScorers_table";
import React from "react";

interface MainProps {
  fixtures?: FixtureData[];
  href: string;
  type: string;
  result?: FixtureData[];
  direction: string;
  standings?: {
    id?: number;
    name?: string;
    standings?: StandingsTeam[];
  };
  topScorers?: {
    player?: Player;
    statistics?: Statistics[];
  }[];
}

function GamesTable(props: MainProps) {
  const isLeftDirection = props.direction === "left";

  const renderStandingsSection = () => {
    if (props.standings?.standings) {
      return (
        <div className="flex items-center justify-between w-full gap-2">
          <h1 className="text-5xl font-extrabold uppercase text-primary-second">
            {props.standings?.name} standings
          </h1>
          <div className="w-[80px] bg-white rounded-sm p-1">
            <Image
              src={`https://media-4.api-sports.io/football/leagues/${props.standings.id}.png`}
              alt={(props?.fixtures?.[0]?.league?.name || "") + " logo"}
              className="h-auto"
              height={80}
              width={80}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  const renderTopScorersSection = () => {
    if (props.topScorers) {
      return (
        <div className="flex items-center justify-between w-full gap-2">
          <h1 className="text-5xl font-extrabold uppercase text-primary-second">
            {props?.topScorers?.[0]?.statistics?.[0].league.name} top scorers
          </h1>
          <div className="w-[80px] bg-white rounded-sm p-1">
            {props?.topScorers?.[0]?.statistics?.[0].league.logo && (
              <Image
                src={props?.topScorers?.[0]?.statistics?.[0].league.logo}
                alt={
                  props?.topScorers?.[0]?.statistics?.[0]?.league.name + " logo"
                }
                className="h-auto"
                height={80}
                width={80}
              />
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`w-full p-1 mt-4 text-white md:p-3 selection:bg-primary-purple selection:text-primary-white`}
    >
      <div className="grid grid-cols-1 grid-rows-2 mb-2 md:grid-cols-4 md:grid-rows-1 md:gap-4">
        <h1 className="flex items-center col-span-2 row-span-1 text-5xl font-extrabold text-center uppercase text-primary-second md:text-start">
          {props.type} GAMES
        </h1>
        {props.standings && (
          <div className="row-span-2 md:row-span-1 md:col-span-2">
            {renderStandingsSection()}
          </div>
        )}

        {props.topScorers && (
          <div className="row-span-2 md:row-span-1 md:col-span-2">
            {renderTopScorersSection()}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
        <div
          className={`flex-col flex py-2 items-${
            isLeftDirection ? "start" : "end"
          } md:py-4 h-[600px] col-span-2 row-span-1 overflow-y-auto`}
        >
          {props?.fixtures?.length !== 0 ? (
            <>
              <Swiper
                direction="vertical"
                spaceBetween={50}
                slidesPerView={4}
                className="w-full h-full"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
              >
                {props?.fixtures?.map((item, index) => (
                  <SwiperSlide key={index * 453}>
                    <Game fixture={item} showLeague={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Link
                href={"/fixtures/#" + props.href}
                className="flex items-center gap-2 mt-2 uppercase text-primary-second"
              >
                <p>{isLeftDirection ? "View more" : "View more"}</p>
                <FontAwesomeIcon
                  icon={isLeftDirection ? faArrowLeft : faArrowRight}
                />
              </Link>
            </>
          ) : (
            <EmptyGame />
          )}
        </div>
        <div
          className={`flex items-center justify-center col-span-2 py-2 md:py-4`}
        >
          {props.standings?.standings && (
            <CompetitionTable
              type="cut"
              standings={props.standings?.standings}
            />
          )}
          {props.topScorers && (
            <TopScorersTable topScorers={props.topScorers} type="cut" />
          )}
        </div>
      </div>
    </div>
  );
}

export default GamesTable;
