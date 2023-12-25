import Image from "next/image";
import Link from "next/link";
import { leaguesIds } from "@/app/lib/api/ids";
import { Collapse, CollapseProps } from "antd";

function LeftTabs() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <p>hyy</p>,
    }
  ];
  return (
    <div className="flex flex-col col-start-1 col-end-3">
      <div className="grid grid-cols-2 gap-1 text-white">
      </div>
    </div>
  );
}

export default LeftTabs;
