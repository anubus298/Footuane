import LeftTabs from "./components/leftTabs";
import Server_RightTabs from "./components/server_rightTabs";

function CompetitionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-full grid-cols-12 gap-2">
      <LeftTabs />
      {children}
      <Server_RightTabs/>
    </div>
  );
}

export default CompetitionsLayout;
