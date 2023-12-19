import Main from "./main/main";
import { ApiResponse, fixtureResponse } from "./lib/types/fixture";
import { leaguesIds, statusShorts } from "./lib/api/ids";

export default async function Home() {
  const API_KEY: string = process.env?.API_KEY || "";
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  async function GetFixturesToday(
    status: string,
    id: number,
    from: string,
    to: string
  ) {
    const res = await fetch(
      process.env.API_URL +
        `/fixtures?status=${status}&league=${id}&season=${
          from.split("-")[0]
        }&from=${from}&to=${to}`,
      {
        method: "GET",
        headers: myHeaders,
        next: {
          revalidate: 3600,
        },
      }
    );
    let data = await res.json();
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
    let data = await res.json();
    return data;
  }
  const fixtures_sl: fixtureResponse = await GetFixturesToday(
    statusShorts.in_play + statusShorts.scheduled,
    140,
    GetDate(1, 1).yesterday,
    GetDate(1, 1).tomorrow
  );
  const fixtures_pl: fixtureResponse = await GetFixturesToday(
    statusShorts.finished,
    39,
    GetDate(2, 2).yesterday,
    GetDate(2, 2).tomorrow
  );
  const fixtures_live: fixtureResponse = await GetLive();

  return (
    <Main
      live={fixtures_live}
      fixtures_pl={fixtures_pl}
      fixtures_sl={fixtures_sl}
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
