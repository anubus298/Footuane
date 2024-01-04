import { FixtureData, fixtureResponse } from "../lib/types/fixture/fixture";
import { RemoveShitLeague } from "../page";
import Main_fixtures from "./components/main_fixtures";

export interface LiveLeagues {
  [leagueName: string]: FixtureData[] | undefined;
}

async function Page() {
  const API_KEY: string = process.env.API_KEY!;
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  async function GetLive() {
    const res = await fetch(process.env.API_URL + `/fixtures?live=all`, {
      method: "GET",
      headers: myHeaders,
      next: {
        revalidate: 3600,
      },
    });
    let data: fixtureResponse = await res.json();
    data.response = RemoveShitLeague(data.response);
    let stackedPerLeague: any = {};
    data.response.forEach((fixture) => {
      stackedPerLeague[fixture.league.name]
        ? stackedPerLeague[fixture.league.name].push(fixture)
        : (stackedPerLeague[fixture.league.name] = [fixture]);
    });
    return stackedPerLeague;
  }
  const live: LiveLeagues = await GetLive();
  return <Main_fixtures live={live} />;
}

export default Page;
