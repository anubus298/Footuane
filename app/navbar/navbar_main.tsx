"use client";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { leaguesIds } from "../lib/api/ids";
function Navbar_Main() {
  const params = usePathname();
  const list: Record<string, string> = {
    home: "Home",
    matches: "Matches",
    competitions: "Competitions",
    teams: "Teams",
  };
  const [ReferenceClass, setReferenceClass] = useState(
    Object.values(list).map(() => false)
  );
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });

  useEffect(() => {
    function ChangeNavbar() {
      let mimic = Object.values(list).map(() => false);
      mimic[
        Object.keys(list).findIndex((item) => {
          if (item !== "home") {
            return params === "/" + item;
          } else {
            return params === "/";
          }
        })
      ] = true;
      setReferenceClass(mimic);
    }
    ChangeNavbar();
  }, [params]);
  return (
    <nav className="flex items-center justify-between w-full p-1 px-8 mb-6 font-semibold text-white uppercase bg-primary-lime-green md:text-lg">
      <Image height={60} width={60} alt="Footuane logo" src={"/logo193.png"} />
      {!isMobileScreen && (
        <>
          <Menu>
            <div className="relative z-20 hidden md:block">
              <Menu.Button className={""}>LEAGUES</Menu.Button>
              <Menu.Items
                className={
                  "absolute flex flex-col bg-primary-lime-green bg-opacity-90 gap-3 top-10 *:px-2 *:text-xs w-48 py-3 text-primary-second"
                }
              >
                {Object.keys(leaguesIds).map((league, index) => {
                  return (
                    <Menu.Item disabled key={102 + index * 2}>
                      {({ active }) => (
                        <Link
                          href={`leagues/indv/${leaguesIds[league]}`}
                          className={`${active && "text-white"}`}
                        >
                          {league}
                        </Link>
                      )}
                    </Menu.Item>
                  );
                })}
              </Menu.Items>
            </div>
          </Menu>
          <ul className="flex items-center justify-center gap-4">
            {Object.keys(list).map((key, index) => {
              if (key !== "home") {
                return (
                  <Link
                    key={index * 45 + 874564}
                    className={
                      "hover:text-primary-second relative " +
                      (ReferenceClass[index] && "selected-nav")
                    }
                    href={"/" + list[key].toLowerCase()}
                  >
                    {key}
                  </Link>
                );
              } else {
                return (
                  <Link
                    key={index * 45 + 874564}
                    className={
                      "hover:text-primary-second relative " +
                      (ReferenceClass[index] && "selected-nav")
                    }
                    href={"/"}
                  >
                    home
                  </Link>
                );
              }
            })}
          </ul>
        </>
      )}
    </nav>
  );
}

export default Navbar_Main;
