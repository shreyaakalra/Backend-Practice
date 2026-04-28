import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="text-7xl text-bold text-center mb-10">Unit Converter</div>
      <div className="flex justify-center gap-10">
        <Link href={"/length.tsx"}>
        <Button>Length</Button>
        </Link>
        <Link href={"/weight.tsx"}>
        <Button>Weight</Button>
        </Link>
        <Link href={"/temperature.tsx"}>
        <Button>Temperature</Button>
        </Link>
      </div>
    </div>
  );
}
