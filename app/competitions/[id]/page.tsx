import { statusShorts } from "@/app/lib/api/ids";
import { AllLeaguesResponse, LeagueData } from "@/app/lib/types/allLeagues";
import { fixtureResponse } from "@/app/lib/types/fixture/fixture";
import { StandingsResponse } from "@/app/lib/types/standings";
import { TopResponse } from "@/app/lib/types/topScorers";
import { GetDate } from "@/app/page";
import { revalidateTag } from "next/cache";
import Competitions_main from "./components/competitions_main";

async function Competitions({ params }: { params: { id: number } }) {
  const API_KEY: string = process.env.API_KEY!;
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  async function GetCoverage(id: number) {
    const res = await fetch(
      process.env.API_URL +
        `/leagues?season=${GetDate(255, 0).yesterday.split("-")[0]}`,
      {
        method: "GET",
        headers: myHeaders,
        next: {
          revalidate: 604800,
          tags: ["allLeagues2"],
        },
      }
    );
    let data: AllLeaguesResponse = await res.json();
    if (data.response.length === 0) {
      revalidateTag("allLeagues");
    }
    return data.response.find((league) => {
      return league.league.id == id;
    });
  }
  async function GetStandings(id: number) {
    const res = await fetch(
      process.env.API_URL +
        `/standings?league=${id}&season=${
          GetDate(255, 1).yesterday.split("-")[0]
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
  async function GetTop(type: string, id: number) {
    const res = await fetch(
      process.env.API_URL +
        `/players/${type}?league=${id}&season=${
          GetDate(255, 1).yesterday.split("-")[0]
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
  async function getAllFixtures(id: number) {
    const res = await fetch(
      process.env.API_URL +
        `/fixtures?league=${id}&season=${
          GetDate(255, 1).yesterday.split("-")[0]
        }`,
      {
        method: "GET",
        headers: myHeaders,
        cache: "force-cache",
      }
    );
    let data: fixtureResponse = await res.json();

    return data;
  }
  let fixtures: fixtureResponse | undefined;
  let standings: StandingsResponse | undefined;
  let topScorers: TopResponse | undefined;
  let topAssists: TopResponse | undefined;
  let rounds, CurrentRound;
  const coverage: LeagueData | undefined = await GetCoverage(params.id);
  if (coverage?.seasons[coverage?.seasons.length - 1].coverage.fixtures) {
    fixtures = await getAllFixtures(params.id);
  }
  if (coverage?.seasons[coverage?.seasons.length - 1].coverage.standings) {
    standings = await GetStandings(params.id);
  }
  if (coverage?.seasons[coverage?.seasons.length - 1].coverage.top_scorers) {
    topScorers = await GetTop("topscorers", params.id);
  }
  if (coverage?.seasons[coverage?.seasons.length - 1].coverage.top_assists) {
    topAssists = await GetTop("topassists", params.id);
  }
  if (fixtures?.response) {
    rounds = [
      ...new Set(fixtures.response.map((fixture) => fixture.league.round)),
    ];
    CurrentRound = fixtures.response.reverse().find((fixture) => {
      return statusShorts.finished
        .split("-")
        .includes(fixture.fixture.status.short);
    });
  }

  return (
    <Competitions_main
      leagueId={params.id}
      coverage={coverage}
      latestRound={CurrentRound?.league.round}
      rounds={rounds}
      fixtures={fixtures}
      standings={standings}
      topScorers={topScorers}
      topAssists={topAssists}
    />
  );
}

export default Competitions;
