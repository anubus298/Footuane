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
  fixtures: FixturesData[];
  type: string;
  result?: FixturesData[];
  direction: string;
  standings?: {
    id: string;
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
    <div className="w-full p-1 md:p-3 text-white  mt-4 selection:bg-primary-purple selection:text-primary-white">
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 mb-2">
        <h1 className="text-5xl font-extrabold text-primary-second text-center md:text-start flex items-center col-span-2 uppercase">
          {props.type} GAMES
        </h1>
        <div className="col-span-2">
          {props.standings?.standings && (
            <div className="flex w-full justify-between items-center gap-2 ">
              <h1 className="text-5xl font-extrabold uppercase text-primary-second">
                {props.standings?.name} standings
              </h1>
              <div className="w-[80px] max-h-[100px] bg-primary-second rounded-sm overflow-hidden">
                <Image
                  src={`https://media-4.api-sports.io/football/leagues/${props.standings.id}.png`}
                  alt={props.fixtures[0].league.name + " logo"}
                  className="h-auto"
                  height={80}
                  width={80}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 md:gap-4 ">
        <div className="flex-col flex py-2 items-start md:py-4 h-[600px] col-span-2 overflow-y-auto">
          {props.fixtures.length != 0 ? (
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
                className="text-primary-second uppercase flex items-center gap-2 mt-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <p>View more</p>
              </Link>
            </>
          ) : (
            <Empty_game />
          )}
        </div>
        <div className="col-span-2 flex items-center justify-center  py-2 md:py-4">
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
    <div className="w-full p-1 md:p-3 text-white mt-4 selection:bg-primary-purple selection:text-primary-white">
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4  mb-2">
        <div className="col-span-2">
          {props.topScorers && (
            <div className="flex w-full justify-between items-center gap-2 ">
              <h1 className="text-5xl font-extrabold uppercase text-primary-second">
                {props.topScorers[0].statistics[0].league.name} top scorers
              </h1>
              <div className="w-[80px] max-h-[100px] bg-primary-second rounded-sm overflow-hidden">
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
        <h1 className="text-5xl font-extrabold text-primary-second text-center md:text-start flex items-center col-span-2 uppercase">
          {props.type} GAMES
        </h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 md:gap-4 ">
        <div className="col-span-2 flex items-center justify-center  py-2 md:py-4">
          {props.standings?.standings && (
            <div className="w-full">
              <h1 className="text-5xl font-extrabold">Premier League</h1>
              <Competition_table standings={props.standings?.standings} />
            </div>
          )}
          {props.topScorers && (
            <TopScorers_table topScorers={props.topScorers} />
          )}
        </div>
        <div className="flex-col flex py-2 items-end md:py-4 h-[600px] col-span-2 overflow-y-auto">
          {props.fixtures.length != 0 ? (
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
                className="text-primary-second uppercase flex items-center gap-2 mt-2"
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
