/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { leaguesIds } from "@/app/lib/api/ids";
import { AllLeaguesResponse } from "@/app/lib/types/allLeagues";
import { CountriesResponse } from "@/app/lib/types/countries";
import { ConfigProvider, Input, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Props {
  leagues: AllLeaguesResponse;
  countries: CountriesResponse;
}
function Competitions_home_main({ leagues, countries }: Props) {
  const [filteredLeagues, setfilteredLeagues] = useState(
    leagues.response.slice(0, 22)
  );
  const [searchValue, setsearchValue] = useState<undefined | string>(undefined);
  const [countrySearchValue, setcountrySearchValue] = useState("");
  useEffect(() => {
    if (countrySearchValue) {
      setfilteredLeagues(
        leagues.response
          .filter((league) => {
            return league.country.code === countrySearchValue;
          })
          .slice(0, 50)
      );
    } else if (countrySearchValue === "") {
      if (searchValue) {
        setfilteredLeagues(
          leagues.response
            .filter((league) => {
              return league.league.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .slice(0, 22)
        );
      } else if (searchValue === "") {
        setfilteredLeagues(leagues.response.slice(0, 22));
      }
    }
  }, [countrySearchValue]);
  useEffect(() => {
    if (searchValue) {
      if (countrySearchValue) {
        setfilteredLeagues(
          leagues.response
            .filter((league) => {
              return league.country.code === countrySearchValue;
            })
            .filter((league) => {
              return league.league.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .slice(0, 22)
        );
      } else if (countrySearchValue === "") {
        setfilteredLeagues(
          leagues.response
            .filter((league) => {
              return league.league.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .slice(0, 22)
        );
      }
    } else if (searchValue === "") {
      setfilteredLeagues(leagues.response.slice(0, 22));
    }
  }, [searchValue]);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryActive: "#fd3546",
        },
      }}
    >
      <div className="col-span-12 mx-2 text-white md:col-start-3 md:col-end-13 md:mx-0">
        <div className="w-full p-3 bg-primary-first bg-opacity-40">
          <h3 className="text-2xl font-semibold text-primary-second">
            Popular
          </h3>
          <div className="flex flex-wrap justify-center w-full gap-1 p-1 ">
            {Object.entries(leaguesIds).map((league, index) => {
              return (
                <Popover content={league[0]} key={league[1] + 8468 + index}>
                  <Link
                    href={"/competitions/" + league[1]}
                    className="flex items-center justify-center p-1 bg-white rounded-lg"
                  >
                    <Image
                      src={`https://media.api-sports.io/football/leagues/${league[1]}.png`}
                      alt={league[0] + " logo"}
                      height={50}
                      width={60}
                    />
                  </Link>
                </Popover>
              );
            })}
          </div>
        </div>
        <div className="w-full p-3 bg-primary-first bg-opacity-40">
          <h3 className="text-2xl font-semibold text-primary-second">All</h3>
          <div className="flex items-center justify-between w-full">
            <Input
              placeholder="search for a competition"
              size="large"
              className="w-[300px] mb-2 rounded-none bg-white"
              onChange={(e) => setsearchValue(e.target.value)}
            />
            <select className="p-2 bg-white text-primary-lime-green">
              <option onClick={() => setcountrySearchValue("")}>
                --Filter By Country--
              </option>
              {countries.response.map((country, index) => {
                return (
                  <option
                    key={index * 11 + 120}
                    onClick={() => setcountrySearchValue(country.code)}
                  >
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-wrap justify-center w-full gap-1 p-1 ">
            {filteredLeagues.map((league, index) => {
              return (
                <Popover
                  content={league.league.name}
                  key={league.league.id + 8468 + index}
                >
                  <Link
                    href={"/competitions/" + league.league.id}
                    className="flex items-center justify-center p-1 bg-white rounded-lg"
                  >
                    <Image
                      src={league.league.logo}
                      alt={league.league.name + " logo"}
                      height={50}
                      width={60}
                    />
                  </Link>
                </Popover>
              );
            })}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Competitions_home_main;
