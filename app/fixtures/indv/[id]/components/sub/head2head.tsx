"use client";

import Game from "@/app/components/game";
import {
  HeadToHeadFixture,
} from "@/app/lib/types/fixture/head2head";

interface Props {
  headToheads: HeadToHeadFixture[];
  teams: {
    home: {
      id: number;
      name: string;
    };
    away: {
      id: number;
      name: string;
    };
  };
}
function HeadToHead({ headToheads ,teams}: Props) {
  return (
    <div className="px-1 py-3 text-white bg-opacity-40 md:px-4 bg-primary-first">
      <div className="flex items-center gap-4">
        <p className="text-2xl font-semibold text-primary-second">
          Previous Encounters
        </p>
      </div>
      <div className="w-full max-h-[300px] md:max-h-[400px] overflow-y-auto">
        {headToheads.map((fixture) => {
          return (
            <Game
              key={fixture.fixture.id + 546}
              fixture={fixture}
              type="passed"
            />
          );
        })}
      </div>
      <div className="w-full"></div>
    </div>
  );
}

export default HeadToHead;
