function Empty_live_now() {
  return (
    <div className="bg-primary-first bg-opacity-20 col-span-12 p-3 text-primary-second font-semibold grid grid-cols-1 justify-center">
      <p className="uppercase text-5xl">Live Now</p>
      <div className="flex flex-col text-white text-center my-10 font-medium">
        No matches
      </div>
    </div>
  );
}

export default Empty_live_now;
