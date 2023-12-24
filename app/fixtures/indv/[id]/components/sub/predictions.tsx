import { PredictionResponse } from "@/app/lib/types/fixture/predictions";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  PolarGrid,
  Tooltip,
} from "recharts";
interface Props {
  predictions: PredictionResponse | undefined;
}
function Predictions({ predictions }: Props) {
  const prediction = [
    {
      subject: "Strength",
      home: parseInt(
        predictions?.response[0].teams.home.last_5.form || "0",
        10
      ),
      away: parseInt(
        predictions?.response[0].teams.away.last_5.form || "0",
        10
      ),
      fullMark: 100,
    },
    {
      subject: "Attack",
      home: parseInt(predictions?.response[0].teams.home.last_5.att || "0", 10),
      away: parseInt(predictions?.response[0].teams.away.last_5.att || "0", 10),
      fullMark: 100,
    },
    {
      subject: "Defense",
      home: parseInt(predictions?.response[0].teams.home.last_5.def || "0", 10),
      away: parseInt(predictions?.response[0].teams.away.last_5.def || "0", 10),
      fullMark: 100,
    },
    {
      subject: "Goals Against",
      home: Math.floor(
        (100 *
          (predictions?.response[0].teams.home.last_5.goals.against.total ||
            0)) /
          ((predictions?.response[0]?.teams?.away?.last_5?.goals?.against
            .total || 0) +
            (predictions?.response[0]?.teams?.home?.last_5?.goals?.against
              .total || 0))
      ),
      away: Math.floor(
        (100 *
          (predictions?.response[0].teams.away.last_5.goals.against.total ||
            0)) /
          ((predictions?.response[0]?.teams?.away?.last_5?.goals?.against
            .total || 0) +
            (predictions?.response[0]?.teams?.home?.last_5?.goals?.against
              .total || 0))
      ),
      fullMark: 100,
    },
    {
      subject: "Goals For",
      home: Math.floor(
        (100 *
          (predictions?.response[0].teams.home.last_5.goals.for.total || 0)) /
          ((predictions?.response[0]?.teams?.away?.last_5?.goals?.for.total ||
            0) +
            (predictions?.response[0]?.teams?.home?.last_5?.goals?.for.total ||
              0))
      ),
      away: Math.floor(
        (100 *
          (predictions?.response[0].teams.away.last_5.goals.for.total || 0)) /
          ((predictions?.response[0]?.teams?.away?.last_5?.goals?.for.total ||
            0) +
            (predictions?.response[0]?.teams?.home?.last_5?.goals?.for.total ||
              0))
      ),
      fullMark: 100,
    },
    {
      subject: "Wins",
      home: Math.floor(
        (100 *
          (predictions?.response[0].teams?.home?.league.fixtures.wins.total ||
            0)) /
          ((predictions?.response[0]?.teams?.away?.league.fixtures.wins.total ||
            0) +
            (predictions?.response[0]?.teams?.home?.league.fixtures.wins
              .total || 0))
      ),
      away: Math.floor(
        (100 *
          (predictions?.response[0].teams?.away?.league.fixtures.wins.total ||
            0)) /
          ((predictions?.response[0]?.teams?.away?.league.fixtures.wins.total ||
            0) +
            (predictions?.response[0]?.teams?.home?.league.fixtures.wins
              .total || 0))
      ),
      fullMark: 100,
    },
  ];
  const comparison = [
    {
      subject: "Form",
      home: parseInt(predictions?.response[0].comparison.form.home || "0", 10),
      away: parseInt(predictions?.response[0].comparison.form.away || "0", 10),
      fullMark: 100,
    },
    {
      subject: "ATT",
      home: parseInt(predictions?.response[0].comparison.att.home || "0", 10),
      away: parseInt(predictions?.response[0].comparison.att.away || "0", 10),

      fullMark: 100,
    },
    {
      subject: "DEF",
      home: parseInt(predictions?.response[0].comparison.def.home || "0", 10),
      away: parseInt(predictions?.response[0].comparison.def.away || "0", 10),
      fullMark: 100,
    },
    {
      subject: "Head2Head",
      home: parseInt(predictions?.response[0].comparison.h2h.home || "0", 10),
      away: parseInt(predictions?.response[0].comparison.h2h.away || "0", 10),
      fullMark: 100,
    },
    {
      subject: "Goals",
      home: parseInt(predictions?.response[0].comparison.goals.home || "0", 10),
      away: parseInt(predictions?.response[0].comparison.goals.away || "0", 10),
      fullMark: 100,
    },
    {
      subject: "Total",
      home: parseInt(predictions?.response[0].comparison.total.home || "0", 10),
      away: parseInt(predictions?.response[0].comparison.total.away || "0", 10),
      fullMark: 100,
    },
    {
      subject: "Poisson D",
      home: parseInt(
        predictions?.response[0].comparison.poisson_distribution.home || "0",
        10
      ),
      away: parseInt(
        predictions?.response[0].comparison.poisson_distribution.away || "0",
        10
      ),
      fullMark: 100,
    },
  ];
  const [displayedData, setdisplayedData] = useState(comparison);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const [isComparison, setisComparison] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center p-3 text-white bg-opacity-50 h-fit bg-primary-first">
      <h3 className="mt-3 text-lg font-semibold text-primary-second">
        {isComparison ? "Comparison" : "League Stats"}
      </h3>
      <RadarChart
        outerRadius={"70%"}
        width={isMobileScreen ? 350 : 420}
        height={350}
        data={displayedData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={20} domain={[0, 100]} />
        <Radar
          name={predictions?.response[0].teams.home.name}
          dataKey="home"
          stroke="#e67e22"
          fill="#e67e22"
          fillOpacity={0.5}
        />
        <Radar
          name={predictions?.response[0].teams.away.name}
          dataKey="away"
          stroke="#3498db"
          fill="#3498db"
          fillOpacity={0.5}
        />
        <Legend />
        <Tooltip viewBox={{ x: 0, y: 0, width: 100, height: 50 }} />
      </RadarChart>
      <button
        className="text-primary-second"
        onClick={() => {
          if (isComparison) {
            setdisplayedData(prediction);
            setisComparison(false);
          } else {
            setdisplayedData(comparison);
            setisComparison(true);
          }
        }}
      >
        {isComparison ? "View league Stats" : "View Comparison"}
      </button>
    </div>
  );
}

export default Predictions;
