import Image from "next/image";
import Link from "next/link";

function Navbar_Main() {
  return (
    <nav className="bg-black w-full p-1 px-8 text-primary-white flex items-center justify-between md:text-lg font-semibold uppercase">
      <Image
        height={60}
        width={60}
        alt="Footuane logo"
        src={"/main_logo.svg"}
      />
      <ul className="flex gap-4 items-center justify-center">
        <Link className="hover:text-primary-lime-green"  href={"/Leagues"}>Leagues</Link>
        <Link className="hover:text-primary-lime-green" href={"/Cups"}>Cups</Link>
      </ul>
      <ul className="flex gap-4 items-center justify-center">
        <Link className="hover:text-primary-purple" href={"/Today"}>Today Matches</Link>
        <Link className="hover:text-primary-purple" href={"/Tomorrow"}>Tomorrow</Link>
        <Link className="hover:text-primary-purple" href={"/Yesterday"}>Yesterday</Link>
      </ul>
    </nav>
  );
}

export default Navbar_Main;
