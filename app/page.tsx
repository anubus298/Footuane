import Main from "./main/main";
import { fixtureResponse, FixturesData } from "./lib/types/fixture";
import { leaguesIds, statusShorts } from "./lib/api/ids";
import { StandingsResponse } from "./lib/types/standings";
import { TopScorersResponse } from "./lib/types/topScorers";

export default async function Home() {
  const API_KEY: string = process.env.API_KEY;
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  async function GetFixtures(from: string) {
    const res = await fetch(process.env.API_URL + `/fixtures?date=${from}`, {
      method: "GET",
      headers: myHeaders,
      next: {
        revalidate: 3600,
      },
    });
    let data: fixtureResponse = await res.json();
    data.response = RemoveLiveMatches(data.response);
    data.response = SortByImportance(data.response);
    return data;
  }
  async function GetLive() {
    const res = await fetch(process.env.API_URL + `/fixtures?live=all`, {
      method: "GET",
      headers: myHeaders,
      next: {
        revalidate: 3600,
      },
    });
    let data: fixtureResponse = await res.json();
    data.response = SortByImportance(data.response);
    data.response = RemoveShitLeague(data.response);
    return data;
  }
  async function GetStandings() {
    const res = await fetch(
      process.env.API_URL +
        `/standings?league=39&season=${GetDate(1, 1).tomorrow.split("-")[0]}`,
      {
        method: "GET",
        headers: myHeaders,
        next: {
          revalidate: 3600 * 24,
        },
      }
    );
    let data: StandingsResponse = await res.json();
    return data;
  }
  async function GetTopScorers(id: number) {
    const res = await fetch(
      process.env.API_URL +
        `/players/topscorers?league=${id}&season=${
          GetDate(1, 1).tomorrow.split("-")[0]
        }`,
      {
        method: "GET",
        headers: myHeaders,
        next: {
          revalidate: 3600 * 24,
        },
      }
    );
    let data: TopScorersResponse = await res.json();
    return data;
  }
  const fixtures_upcoming: fixtureResponse = await GetFixtures(
    GetDate(0, 0).yesterday
  );
  const fixtures_past: fixtureResponse = await GetFixtures(
    GetDate(1, 1).yesterday
  );
  let fixtures_live: fixtureResponse = await GetLive();
  const standings_pl: StandingsResponse = await GetStandings();
  const topScorers: TopScorersResponse = await GetTopScorers(140);
  return (
    <Main
      live={fixtures_live}
      fixtures_upcoming={fixtures_upcoming}
      topScorers={topScorers}
      fixtures={fixtures_past}
      standings={standings_pl}
    />
  );
}

function GetDate(minus: number, plus: number) {
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + plus);
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - minus);

  const yearT = tomorrowDate.getFullYear();
  const monthT = (tomorrowDate.getMonth() + 1).toString().padStart(2, "0");
  const dayT = tomorrowDate.getDate().toString().padStart(2, "0");

  const yearY = yesterdayDate.getFullYear();
  const monthY = (yesterdayDate.getMonth() + 1).toString().padStart(2, "0");
  const dayY = yesterdayDate.getDate().toString().padStart(2, "0");

  return {
    tomorrow: `${yearT}-${monthT}-${dayT}`,
    yesterday: `${yearY}-${monthY}-${dayY}`,
  };
}

function SortByImportance(fixtures: FixturesData[]) {
  const filtered = fixtures.filter((item) => {
    return Object.values(leaguesIds).includes(item.league.id);
  });
  const sorted = filtered.sort((a, b) => {
    return a.league.id - b.league.id;
  });
  return sorted;
}
function RemoveShitLeague(input: FixturesData[]): FixturesData[] {
  let mimic = [...input];
  mimic = mimic.filter((item) => {
    return item.league.id !== 383;
  });
  return mimic;
}

function RemoveLiveMatches(input: FixturesData[]): FixturesData[] {
  const arrayCatcher = (
    statusShorts.in_play +
    "-" +
    statusShorts.first_half +
    "-" +
    statusShorts.break_time +
    "-" +
    statusShorts.penalty
  ).split("-");
  const filtered = input.filter((item) => {
    return !arrayCatcher.includes(item.fixture.status.short);
  });
  return filtered;
}
