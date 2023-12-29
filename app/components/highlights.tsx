import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ScoreBatMatch } from "../lib/types/scoreBat";

interface MainImgProps {
  videos?: ScoreBatMatch[];
}

const Highlight: React.FC<MainImgProps> = ({ videos }) => {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(
    null
  );
  const filteredVideos = selectedCompetition
    ? videos?.filter((video) => video.competition === selectedCompetition)
    : videos;
  const uniqueCompetitions = Array.from(
    new Set(videos?.map((video) => video.competition))
  );
  const EmbededRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full">
      <h3 className="w-full mb-2 text-5xl font-extrabold text-center uppercase text-primary-second">
        Highlights
      </h3>
      <div className="grid w-full grid-cols-12 gap-2 text-white md:mb-20 md:justify-between md:h-[550px]">
        <MatchCard
          ref={EmbededRef}
          match={filteredVideos?.[currentVideoIndex]}
        />

        {/* Competitions Menu */}
        {isMobileScreen ? (
          <select
            className="flex flex-col col-span-12 gap-1 overflow-y-auto text-center text-primary-lime-green md:col-span-2 md:text-start"
            value={selectedCompetition || ""}
            onChange={(e) => setSelectedCompetition(e.target.value || null)}
          >
            <option value="">All Competitions</option>
            {uniqueCompetitions.map((competition, index) => (
              <option key={index} value={competition}>
                {competition.toLowerCase()}
              </option>
            ))}
          </select>
        ) : (
          <div className="flex flex-col col-span-12 gap-1 overflow-y-auto text-center md:col-span-2 md:text-start">
            <p
              className={`cursor-pointer text-sm ${
                !selectedCompetition ? "text-primary-second" : ""
              }`}
              onClick={() => setSelectedCompetition(null)}
            >
              All Competitions
            </p>
            {uniqueCompetitions.map((competition, index) => (
              <p
                key={index}
                className={`cursor-pointer text-sm ${
                  competition === selectedCompetition
                    ? "text-primary-second"
                    : ""
                }`}
                onClick={() => setSelectedCompetition(competition)}
              >
                -{competition.split(":")[1]}
              </p>
            ))}
          </div>
        )}

        {/* Videos Menu */}
        {isMobileScreen ? (
          <select
            style={{ height: EmbededRef.current?.clientHeight }}
            className={`flex flex-col col-span-12 md:col-span-2 gap-1 text-primary-lime-green overflow-y-auto text-center md:text-start`}
            value={currentVideoIndex}
            onChange={(e) => setCurrentVideoIndex(Number(e.target.value))}
          >
            {filteredVideos &&
              filteredVideos.map((item, index) => (
                <option key={102 + index * 2} value={index}>
                  {item.title}
                </option>
              ))}
          </select>
        ) : (
          <div
            style={{ height: EmbededRef.current?.clientHeight }}
            className={`flex flex-col col-span-12 md:col-span-2 gap-1 overflow-y-auto text-center md:text-start`}
          >
            {filteredVideos &&
              filteredVideos.map((item, index) => (
                <p
                  key={102 + index * 2}
                  className={`cursor-pointer text-sm ${
                    index === currentVideoIndex ? "text-primary-second" : ""
                  }`}
                  onClick={() => setCurrentVideoIndex(index)}
                >
                  {item.title}
                </p>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Highlight;

interface VideoEmbedProps {
  embedCode?: string;
}
interface MatchCardProps {
  match?: ScoreBatMatch;
  ref: React.RefObject<HTMLDivElement>;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, ref }) => {
  return (
    <div
      ref={ref}
      className="flex items-center justify-center w-full col-span-12 md:col-span-8"
    >
      <VideoEmbed embedCode={match?.videos?.[0]?.embed} />
    </div>
  );
};

interface VideoEmbedProps {
  embedCode?: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ embedCode }) => {
  if (embedCode) {
    return (
      <div
        style={{
          width: "100%",
          background: "#313131",
        }}
        dangerouslySetInnerHTML={{
          __html: embedCode || <div className="">No videos</div>,
        }}
      />
    );
  } else {
    return (
      <div className="flex justify-center h-full">
        <p>Choose A Highlight</p>
      </div>
    );
  }
};

interface MainImgProps {
  videos?: ScoreBatMatch[];
}
