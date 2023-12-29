"use client";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { CountriesResponse } from "@/app/lib/types/countries";

interface Props {
  countries: CountriesResponse;
}
function RightTabs({ countries }: Props) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });
  return isMobileScreen ? (
    <div></div>
  ) : (
    <div className="flex flex-col md:col-start-11 md:col-end-13 bg-primary-first bg-opacity-40 max-h-[1320px]  rounded-tr-md">
      <h4 className="mb-2 text-lg font-semibold text-center text-primary-second">
        By Countries
      </h4>
      <div className="grid grid-cols-4 gap-1 text-white  max-h-[1320px] overflow-y-auto">
        {countries.response.map((country, index) => {
          return (
            <>
              <div
                className="flex items-center justify-end col-span-3 text-sm"
                key={index * 54 + 5464}
              >
                <Link
                  href={"/competitions/countries/indv/" + country.code}
                  className=""
                >
                  {country.name}
                </Link>
              </div>
              <Link
                key={index * 54 + 5467}
                href={"/competitions/countries/indv/" + country.code}
                className="flex items-center justify-center col-span-1"
              >
                <div className="h-[35px] bg-white overflow-hidden flex justify-center items-center p-1 rounded-sm">
                  <Image
                    height={30}
                    width={30}
                    className="h-auto"
                    src={`https://media.api-sports.io/flags/${country.code}.svg`}
                    alt={country.name + " logo"}
                  />
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default RightTabs;
