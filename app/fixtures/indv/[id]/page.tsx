import { FixtureIndvResponse } from "@/app/lib/types/fixture/fixtureIndv";
import { headToHeadResponse } from "@/app/lib/types/fixture/head2head";
import { LineupsApiResponse } from "@/app/lib/types/fixture/lineups";
import { oddsLiveResponse } from "@/app/lib/types/fixture/odds/odds_live";
import { PlayersStatisticsResponse } from "@/app/lib/types/fixture/players_statistics";
import { PredictionResponse } from "@/app/lib/types/fixture/predictions";
import { StatisticsResponse } from "@/app/lib/types/fixture/statistics";
import Fixture_indv_main from "./components/fixture_indv_main";

export interface FixtureHandlerResponse {
  fixtureResponse: FixtureIndvResponse;
  PlayersStatistiqueResponse?: PlayersStatisticsResponse;
  predictionsResponse?: PredictionResponse;
  oddsLiveResponse?: oddsLiveResponse;
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
    async function getOddsLive(id: number) {
      const res = await fetch(
        process.env.API_URL + `/odds/live?fixture=${id}`,
        {
          method: "GET",
          headers: myHeaders,
          next: {
            revalidate: 8000,
          },
        }
      );
      const data: oddsLiveResponse = await res.json();
      return data;
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
    const fixtureResponse: FixtureIndvResponse = await getFixture(id);
    const predictionsResponse: PredictionResponse = await getPredictions(id);

    let oddsLiveResponse: oddsLiveResponse;
    if (type === "live") {
      oddsLiveResponse = await getOddsLive(id);
      return {
        fixtureResponse: fixtureResponse,
        predictionsResponse: predictionsResponse,
        oddsLiveResponse: oddsLiveResponse,
      };
    } else {
      return {
        fixtureResponse: fixtureResponse,
        predictionsResponse: predictionsResponse,
        oddsLiveResponse: undefined,
      };
    }
  }
  const response: FixtureHandlerResponse = await FixtureHandler(
    params.id,
    searchParams.type
  );
  return <Fixture_indv_main response={response} />;
}

export default Page;
