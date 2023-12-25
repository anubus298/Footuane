"use client";
function Empty_Lineups() {
  return (
    <div className="h-72 px-2 pt-4 text-sm font-light text-white bg-opacity-50 bg-primary-first md:text-base">
      <div className="flex flex-col h-full col-span-4 pb-3 font-medium text-center ">
        <p>Teams Composition</p>
        <div className="flex items-center justify-center h-full">
          <p>Available 40 minutes before the match.</p>
        </div>
      </div>
    </div>
  );
}

export default Empty_Lineups;
