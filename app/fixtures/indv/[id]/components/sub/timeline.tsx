"use client";
import { useMediaQuery } from "react-responsive";

import { Event } from "@/app/lib/types/fixture/fixtureIndv";
import {
  faArrowsRotate,
  faBan,
  faSoccerBall,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfigProvider, Popover, Timeline } from "antd";
import Image from "next/image";

function TimeLine({ events }: { events: Event[] }) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const TimeLineDictionnary: Record<string, JSX.Element> = {
    "Yellow Card": <div className="bg-yellow-400 card-small"></div>,
    "Red Card": <div className="bg-red-600 card-small"></div>,
    Penalty: <FontAwesomeIcon icon={faSoccerBall} className="text-green-500" />,
    "Own Goal": <FontAwesomeIcon icon={faSoccerBall} className="text-red-500" />,
    "Normal Goal": <FontAwesomeIcon icon={faSoccerBall} />,
    "Goal cancelled": <FontAwesomeIcon icon={faBan} className="text-red-500" />,
    "Substitution 1": (
      <FontAwesomeIcon icon={faArrowsRotate} className="text-gray-300" />
    ),
    "Substitution 2": (
      <FontAwesomeIcon icon={faArrowsRotate} className="text-gray-300" />
    ),
    "Substitution 3": (
      <FontAwesomeIcon icon={faArrowsRotate} className="text-gray-300" />
    ),
    "Substitution 4": (
      <FontAwesomeIcon icon={faArrowsRotate} className="text-gray-300" />
    ),
    "Substitution 5": (
      <FontAwesomeIcon icon={faArrowsRotate} className="text-gray-300" />
    ),
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Timeline: {
            colorText: "#ffffff",
            dotBg: "#defe5400",
            tailColor: "#ffffff",
            itemPaddingBottom: 10,
          },
        },
      }}
    >
      <div className="p-4 text-white bg-opacity-50 bg-primary-first">
        <h3 className="text-2xl font-semibold text-primary-second">Timeline:</h3>
        <div className="flex justify-center w-full">
          <Timeline>
            {events.map((event, index) => (
              <Timeline.Item
                dot={TimeLineDictionnary[event.detail]}
                key={index * 45 + 6456}
              >
                <Popover
                trigger={isMobileScreen ? "click" : "hover"}
                
                  content={
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        {TimeLineDictionnary[event.detail]}
                        <p className="font-semibold">{event.detail}</p>
                        <Image
                          height={30}
                          width={30}
                          alt={event.team.name + " logo"}
                          src={event.team.logo}
                        />
                      </div>
                      <p>{event.player.name}</p>
                      <p className="font-semibold">{event.comments}</p>
                    </div>
                  }
                >
                  <p className="mx-2 text-sm cursor-pointer md:text-lg">
                    {(event.time.elapsed || 0) + (event.time.extra || 0)}&quot;
                  </p>
                </Popover>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default TimeLine;
