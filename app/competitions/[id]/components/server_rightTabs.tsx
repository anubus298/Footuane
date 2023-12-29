import { CountriesResponse, Country } from "@/app/lib/types/countries";
import RightTabs from "./rightTabs";

async function Server_rightTabs() {
  const API_KEY: string = process.env.API_KEY!;
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  async function getCountries() {
    const res = await fetch(process.env.API_URL + `/countries`, {
      method: "GET",
      headers: myHeaders,
      cache: "force-cache",
    });
    let data: CountriesResponse = await res.json();
    data.response.splice(
      data.response.findIndex((country) => {
        return country.name === "Israel";
      }),
      1
    );
    return data;
  }
  const countries: CountriesResponse = await getCountries();
  return <RightTabs countries={countries} />;
}

export default Server_rightTabs;
