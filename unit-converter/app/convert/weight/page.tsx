import { convertWeight } from "@/app/actions/convert";
import { Button } from "@/components/ui/button";

export default function Weight(){
    return(
        <div className="flex items-center justify-center mt-10">
            <form action={convertWeight} className="flex flex-col gap-1 w-full max-w-md p-8">

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

                <Button>Convert</Button>
            </form>
        </div>
    );
}