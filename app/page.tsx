import Main from "./main/main";
import { fixtureResponse, FixtureData } from "./lib/types/fixture/fixture";
import { leaguesIds, statusShorts } from "./lib/api/ids";
import { StandingsResponse } from "./lib/types/standings";
import { TopResponse } from "./lib/types/topScorers";
import { ScoreBatResponse } from "./lib/types/scoreBat";

export default async function Home() {
  const API_KEY: string = process.env.API_KEY!;
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  async function GetVideos() {
    const res = await fetch(
      `https://www.scorebat.com/video-api/v3/feed/?token=${process.env.VIDEO_KEY}`,
      {
        method: "GET",
        headers: myHeaders,
        next: {
          revalidate: 60,
        },
      }
    );
    let data: ScoreBatResponse = await res.json();
    return data;
  }
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
  async function GetFixturesFromTo(from: string, to: string) {
    const res = await fetch(
      process.env.API_URL + `/fixtures?from=${from}&to=${to}`,
      {
        method: "GET",
        headers: myHeaders,
        next: {
          revalidate: 3600,
        },
      }
    );
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
    data.response = RemoveShitLeague(data.response);
    return data;
  }
  async function GetStandings(id: number) {
    const res = await fetch(
      process.env.API_URL +
        `/standings?league=${id}&season=${
          GetDate(1, 1).tomorrow.split("-")[0]
        }`,
      {
        method: "GET",
        headers: myHeaders,
        next: {
          revalidate: 86400,
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
          revalidate: 86400,
        },
      }
    );
    let data: TopResponse = await res.json();
    return data;
  }
  const fixtures_past: fixtureResponse = await GetFixtures(
    GetDate(1, 1).yesterday
  );
  const fixtures_upcoming: fixtureResponse = await GetFixtures(
    GetDate(1, 1).tomorrow
  );
  const videos: ScoreBatResponse = await GetVideos();
  const fixtures_live: fixtureResponse = await GetLive();
  const standings: StandingsResponse = await GetStandings(61);
  const topScorers: TopResponse = await GetTopScorers(88);
  return (
    <Main
      live={fixtures_live}
      videos={videos}
      fixtures_upcoming={fixtures_upcoming}
      topScorers={topScorers}
      fixtures={fixtures_past}
      standings={standings}
    />
  );
}

//*helping function

export function GetDate(minus: number, plus: number) {
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

function SortByImportance(fixtures: FixtureData[]) {
  const ids = Object.values(leaguesIds).slice(0, 19);
  const filtered = fixtures.filter((item) => {
    return ids.includes(item.league.id);
  });
  const sorted = filtered.sort((a, b) => {
    return a.league.id - b.league.id;
  });
  return sorted;
}
function RemoveShitLeague(input: FixtureData[]): FixtureData[] {
  let mimic = [...input];
  mimic = mimic.filter((item) => {
    return item.league.id !== 383;
  });
  return mimic;
}

function RemoveLiveMatches(input: FixtureData[]): FixtureData[] {
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

function getRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
