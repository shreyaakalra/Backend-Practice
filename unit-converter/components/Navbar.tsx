"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div>
      <div className="text-7xl text-bold text-center mb-10 mt-10">Unit Converter</div>
      <div className="flex justify-center gap-10">
        <Link href={"/convert/length"}>
          <Button
            variant={pathname==="/convert/length" ? "default" : "outline"}
            className={pathname==="/convert/length" ? "outline-1" : "border-black"}
          >
            Length
          </Button>
        </Link>
        <Link href={"/convert/weight"}>
          <Button
            variant={pathname==="/convert/weight" ? "default" : "outline"}
            className={pathname==="/convert/weight" ? "outline-1" : "border-black"}
          >Weight</Button>
        </Link>
        <Link href={"/convert/temperature"}>
          <Button
            variant={pathname==="/convert/temperature" ? "default" : "outline"}
            className={pathname==="/convert/temperature" ? "outline-1" : "border-black"}
          >
            Temperature
          </Button>
        </Link>
      </div>
    </div>
  );
}
