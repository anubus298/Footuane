import { FixtureData, fixtureResponse } from "../lib/types/fixture/fixture";
import { GetDate, RemoveShitLeague } from "../page";
import Main_fixtures from "./components/main_fixtures";

export interface sortedFixturesByleague {
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
  async function GetFixtures(date: string) {
    const res = await fetch(process.env.API_URL + `/fixtures?date=${date}`, {
      method: "GET",
      headers: myHeaders,
      next: {
        revalidate: 3600,
      },
    });
    let data: fixtureResponse = await res.json();

    data.response = RemoveShitLeague(data.response);
    data.response = SortByImportance(data.response);
    let stackedPerLeague: any = {};
    data.response.forEach((fixture) => {
      stackedPerLeague[fixture.league.name]
        ? stackedPerLeague[fixture.league.name].push(fixture)
        : (stackedPerLeague[fixture.league.name] = [fixture]);
    });
    return stackedPerLeague;
  }
  const live: sortedFixturesByleague = await GetLive();
  const tomorrow: sortedFixturesByleague = await GetFixtures(
    GetDate(1, 1).tomorrow
  );
  const yesterday: sortedFixturesByleague = await GetFixtures(
    GetDate(1, 1).yesterday
  );
  return (
    <Main_fixtures live={live} tomorrow={tomorrow} yesterday={yesterday} />
  );
}

function SortByImportance(fixtures: FixtureData[]) {
  const sorted = fixtures.sort((a, b) => {
    return a.league.id - b.league.id;
  });
  return sorted;
}
export default Page;
