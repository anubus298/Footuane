"use client";

import Game from "@/app/components/game";
import { headToHeadResponse } from "@/app/lib/types/fixture/head2head";

interface Props {
  headToheads: headToHeadResponse;
}
function HeadToHead({ headToheads }: Props) {
  return (
    <div className="px-1 py-4 text-white bg-opacity-50 md:px-4 bg-primary-first">
      <h3 className="text-2xl font-semibold text-primary-second">
        Previous Encounters
      </h3>
      <div className="w-full max-h-[300px] md:max-h-[400px] overflow-y-auto">
        {headToheads.response.map((fixture) => {
          return (
            <Game
              key={fixture.fixture.id + 546}
              fixture={fixture}
              type="passed"
            />
          );
        })}
      </div>
    </div>
  );
}

export default HeadToHead;
