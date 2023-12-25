import LeftTabs from "./components/leftTabs";

function CompetitionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-full grid-cols-12">
      <LeftTabs />
      {children}
    </div>
  );
}

export default CompetitionsLayout;
