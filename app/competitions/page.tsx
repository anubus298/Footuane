import { AllLeaguesResponse } from "../lib/types/allLeagues";
import { CountriesResponse } from "../lib/types/countries";
import { GetDate } from "../page";
import Competitions_home_main from "./components/competitions_home_main";

async function Page() {
  const API_KEY: string = process.env.API_KEY!;
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  async function GetAllLeagues() {
    const res = await fetch(
      process.env.API_URL +
        `/leagues?season=${GetDate(255, 0).yesterday.split("-")[0]}`,
      {
        method: "GET",
        headers: myHeaders,
        next: { revalidate: 604800 },
      }
    );
    let data: AllLeaguesResponse = await res.json();
    return data;
  }
  async function getCountries() {
    const res = await fetch(process.env.API_URL + `/countries`, {
      method: "GET",
      headers: myHeaders,
      cache: "force-cache",
    });
    let data: CountriesResponse = await res.json();
    //remove Nothing from the list
    data.response.splice(
      data.response.findIndex((country) => {
        return country.name === "Israel";
      }),
      1
    );
    return data;
  }
  const allLeagues: AllLeaguesResponse = await GetAllLeagues();
  const countries: CountriesResponse = await getCountries();
  return <Competitions_home_main leagues={allLeagues} countries={countries} />;
}

export default Page;
