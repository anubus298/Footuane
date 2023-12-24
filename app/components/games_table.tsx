"use client";
import Competition_table from "../components/competition_table";
import Game from "./game";
import { FixturesData } from "../lib/types/fixture/fixture";
import Empty_game from "./empty/empty_game_table";
import { StandingsTeam } from "../lib/types/standings";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel } from "swiper/modules";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Player, Statistics } from "../lib/types/topScorers";
import TopScorers_table from "./topScorers_table";
import Image from "next/image";

interface mainProps {
  fixtures?: FixturesData[];
  type: string;
  result?: FixturesData[];
  direction: string;
  standings?: {
    id: number;
    name: string;
    standings: StandingsTeam[];
  };
  topScorers?: {
    player: Player;
    statistics: Statistics[];
  }[];
}
function Games_table(props: mainProps) {
  return props.direction === "left" ? (
    <div className="w-full p-1 mt-4 text-white md:p-3 selection:bg-primary-purple selection:text-primary-white">
      <div className="grid grid-cols-1 mb-2 md:grid-cols-4 md:gap-4">
        <h1 className="flex items-center col-span-2 text-5xl font-extrabold text-center uppercase text-primary-second md:text-start">
          {props.type} GAMES
        </h1>
        <div className="col-span-2">
          {props.standings?.standings && (
            <div className="flex items-center justify-between w-full gap-2 ">
              <h1 className="text-5xl font-extrabold uppercase text-primary-second">
                {props.standings?.name} standings
              </h1>
              <div className="w-[80px] bg-primary-second rounded-sm p-1">
                <Image
                  src={`https://media-4.api-sports.io/football/leagues/${props.standings.id}.png`}
                  alt={(props?.fixtures?.[0]?.league?.name || "") + " logo"}

                  className="h-auto"
                  height={80}
                  width={80}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
        <div className="flex-col flex py-2 items-start md:py-4 h-[600px] col-span-2 overflow-y-auto">
          {props?.fixtures?.length != 0 ? (
            <>
              <Swiper
                direction={"vertical"}
                spaceBetween={50}
                slidesPerView={4}
                className="w-full h-full"
                mousewheel={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, Mousewheel]}
              >
                {props?.fixtures?.map((item, index) => {
                  return (
                    <SwiperSlide key={index * 453}>
                      <Game fixture={item} type={props.type} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Link
                href={""}
                className="flex items-center gap-2 mt-2 uppercase text-primary-second"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <p>View more</p>
              </Link>
            </>
          ) : (
            <Empty_game />
          )}
        </div>
        <div className="flex items-center justify-center col-span-2 py-2 md:py-4">
          {props.standings?.standings && (
            <Competition_table standings={props.standings?.standings} />
          )}
          {props.topScorers && (
            <TopScorers_table topScorers={props.topScorers} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full p-1 mt-4 text-white md:p-3 selection:bg-primary-purple selection:text-primary-white">
      <div className="grid grid-cols-1 mb-2 md:grid-cols-4 md:gap-4">
        <div className="col-span-2">
          {props.topScorers && (
            <div className="flex items-center justify-between w-full gap-2 ">
              <h1 className="text-5xl font-extrabold uppercase text-primary-second">
                {props.topScorers[0].statistics[0].league.name} top scorers
              </h1>
              <div className="w-[80px] bg-primary-second rounded-sm p-1">
                <Image
                  src={props.topScorers[0].statistics[0].league.logo}
                  alt={props.topScorers[0].statistics[0].league.name + " logo"}
                  className="h-auto"
                  height={80}
                  width={80}
                />
              </div>
            </div>
          )}
        </div>
        <h1 className="flex items-center col-span-2 text-5xl font-extrabold text-center uppercase text-primary-second md:text-start">
          {props.type} GAMES
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
        <div className="flex items-center justify-center col-span-2 py-2 md:py-4">
          {props.standings?.standings && (
            <div className="w-full">
               <h1 className="text-5xl font-extrabold uppercase text-primary-second">
                {props.standings?.name} standings
              </h1>
              <Competition_table standings={props.standings?.standings} />
            </div>
          )}
          {props.topScorers && (
            <TopScorers_table topScorers={props.topScorers} />
          )}
        </div>
        <div className="flex-col flex py-2 items-end md:py-4 h-[600px] col-span-2 overflow-y-auto">
          {props?.fixtures?.length != 0 ? (
            <>
              <Swiper
                direction={"vertical"}
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
                {props?.fixtures?.map((item, index) => {
                  return (
                    <SwiperSlide key={index * 453}>
                      <Game fixture={item} type={props.type} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Link
                href={""}
                className="flex items-center gap-2 mt-2 uppercase text-primary-second"
              >
                <p>View more</p>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </>
          ) : (
            <Empty_game />
          )}
        </div>
      </div>
    </div>
  );
}

export default Games_table;
