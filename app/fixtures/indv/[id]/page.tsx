import { AllLeaguesResponse, LeagueData } from "@/app/lib/types/allLeagues";
import { FixtureIndvResponse } from "@/app/lib/types/fixture/fixtureIndv";
import { oddsLiveResponse } from "@/app/lib/types/fixture/odds/odds_live";
import { PredictionResponse } from "@/app/lib/types/fixture/predictions";
import { GetDate } from "@/app/page";
import Fixture_indv_main from "./components/fixture_indv_main";
export interface FixtureHandlerResponse {
  fixtureResponse?: FixtureIndvResponse;
  predictionsResponse?: PredictionResponse;
}

async function Page({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { type: string };
}) {
  const API_KEY: string = process.env.API_KEY!;
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  async function FixtureHandler(id: number, type: string) {
    async function GetCoverage(leagueId: number | undefined) {
      if (leagueId == undefined) {
        return undefined;
      }
      const res = await fetch(
        process.env.API_URL +
          `/leagues?season=${GetDate(255, 0).yesterday.split("-")[0]}`,
        {
          method: "GET",
          headers: myHeaders,
          next: {
            revalidate: 604800,
          },
        }
      );
      let data: AllLeaguesResponse = await res.json();
      return data.response.find((league) => {
        return league.league.id == leagueId;
      });
    }
    async function getPredictions(id: number) {
      const res = await fetch(
        process.env.API_URL + `/predictions?fixture=${id}`,
        {
          method: "GET",
          headers: myHeaders,
          next: {
            revalidate: 8000,
          },
        }
      );
      const data: PredictionResponse = await res.json();
      return data;
    }
    async function getFixture(id: number) {
      const res = await fetch(process.env.API_URL + `/fixtures?id=${id}`, {
        method: "GET",
        headers: myHeaders,
        next: {
          revalidate: 8000,
        },
      });
      const data: FixtureIndvResponse = await res.json();
      return data;
    }
    let predictionsResponse: PredictionResponse | undefined;
    const fixtureResponse: FixtureIndvResponse = await getFixture(id);
    const coverage: LeagueData | undefined = await GetCoverage(
      fixtureResponse?.response?.[0]?.league?.id
    );
    if (coverage?.seasons[coverage?.seasons.length - 1].coverage.predictions) {
      predictionsResponse = await getPredictions(id);
    }
    return {
      fixtureResponse: fixtureResponse,
      predictionsResponse: predictionsResponse,
    };
  }
  const response: FixtureHandlerResponse = await FixtureHandler(
    params.id,
    searchParams.type
  );
  return <Fixture_indv_main response={response} />;
}

export default Page;
