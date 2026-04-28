import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div>
      <div className="text-7xl text-bold text-center mb-10 mt-10">Unit Converter</div>
      <div className="flex justify-center gap-10">
        <Link href={"/convert/length"}>
          <Button>Length</Button>
        </Link>
        <Link href={"/convert/weight"}>
          <Button>Weight</Button>
        </Link>
        <Link href={"/convert/temperature"}>
          <Button>Temperature</Button>
        </Link>
      </div>
    </div>
  );
}
