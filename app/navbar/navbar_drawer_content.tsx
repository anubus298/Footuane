"use client";
import Link from "next/link";

function Navbar_drawer_content() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <ul className="flex flex-col gap-4 text-3xl text-center *:font-semibold">
        <li>
          <Link href="/"> Home</Link>
        </li>
        <li>
          <Link href="/fixtures">Fixtures</Link>
        </li>
        <li>
          <Link href="/competitions"> Competitions</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar_drawer_content;
