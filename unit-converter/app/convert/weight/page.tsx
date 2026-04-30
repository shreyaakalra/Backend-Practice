"use client"

import { convertWeight } from "@/app/actions/convert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";

export default function Weight() {
  const [state, formAction] = useActionState(convertWeight, { result: null as number | null });
  return (
    <div className="flex items-center justify-center mt-10">
      <form
        action={formAction}
        className="flex flex-col gap-1 w-full max-w-md p-8"
      >
        <h2 className="font-black">Enter the weight to convert</h2>
        <input
          type="number"
          className="border-2 border-black mb-6"
          name="val"
        />

        <h2 className="font-black">Unit to Convert from :</h2>
        <select className="border-2 border-black mb-6" name="from">
          <option>Milligram</option>
          <option>Gram</option>
          <option>Ounce</option>
          <option>Kilogram</option>
          <option>Pound</option>
        </select>

        <h2 className="font-black">Unit to Convert to :</h2>
        <select className="border-2 border-black mb-10" name="to">
          <option>Milligram</option>
          <option>Gram</option>
          <option>Ounce</option>
          <option>Kilogram</option>
          <option>Pound</option>
        </select>

       
        <Button type="submit">Convert</Button>

        {/* 4. Actually display the answer when it comes back! */}
        {state.result !== null && (
          <div className="mt-6 p-4 bg-emerald-100 border-2 border-emerald-500 rounded-md text-center">
            <h3 className="text-xl font-bold text-emerald-900">
              Result: {state.result}
            </h3>
          </div>
        )}
      </form>
    </div>
  );
}
