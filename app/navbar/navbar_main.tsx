"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
    <nav className="bg-primary-lime-green w-full p-1 px-8 mb-2 text-white flex items-center justify-between md:text-lg font-semibold uppercase">
      <Image
        height={60}
        width={60}
        alt="Footuane logo"
        src={"/main_logo.svg"}
      />
      <ul className="flex gap-4 items-center justify-center">
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
    </nav>
  );
}

export default Navbar_Main;
