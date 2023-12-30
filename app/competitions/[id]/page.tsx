import { statusShorts } from "@/app/lib/api/ids";
import { fixtureResponse, FixtureData } from "@/app/lib/types/fixture/fixture";
import { StandingsResponse } from "@/app/lib/types/standings";
import { TopResponse } from "@/app/lib/types/topScorers";
import { GetDate } from "@/app/page";
import Competitions_main from "./components/competitions_main";

async function Competitions({ params }: { params: { id: number } }) {
  const API_KEY: string = process.env.API_KEY!;
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
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
  async function GetTop(type: string, id: number) {
    const res = await fetch(
      process.env.API_URL +
        `/players/${type}?league=${id}&season=${
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

  async function getAllFixtures(id: number) {
    const res = await fetch(
      process.env.API_URL +
        `/fixtures?league=${id}&season=${GetDate(0, 0).tomorrow.split("-")[0]}
        `,
      {
        method: "GET",
        headers: myHeaders,
        cache: "force-cache",
      }
    );
    let data: fixtureResponse = await res.json();
    return data;
  }
  
  const fixtures: fixtureResponse = await getAllFixtures(params.id);
  const standings: StandingsResponse = await GetStandings(params.id);
  const topScorers: TopResponse = await GetTop("topscorers", params.id);
  const topAssists: TopResponse = await GetTop("topassists", params.id);
  const rounds = [
    ...new Set(fixtures.response.map((fixture) => fixture.league.round)),
  ];
  const CurrentRound = fixtures.response.reverse().find((fixture) => {
    return statusShorts.finished
      .split("-")
      .includes(fixture.fixture.status.short);
  });
  return (
    <Competitions_main
      leagueId={params.id}
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
