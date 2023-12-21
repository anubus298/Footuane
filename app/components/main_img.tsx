"use client";
import Image from "next/image";

function Main_img() {
  return (
    <div className="w-full h-[300px] md:h-[720px] flex justify-center items-center text-white ">
      <Image src={"/1280.png"} alt="main" width={1280} height={720}/>
    </div>
  );
}

export default Main_img;
