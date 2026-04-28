import { Button } from "@/components/ui/button";

export default function Length(){
    return(
        <div className="flex items-center justify-center mt-10">
            <form className="flex flex-col gap-1 w-full max-w-md p-8">

                <h2 className="font-black">Enter the teperature to convert</h2>
                <input 
                    type="number"
                    className="border-2 border-black mb-6"
                />

                <h2 className="font-black">Unit to Convert from :</h2>
                <select className="border-2 border-black mb-6">
                    <option>Celsius</option>
                    <option>Fahrenheit</option>
                    <option>Kelvin</option>
                </select>

                <h2 className="font-black">Unit to Convert to :</h2>
                <select className="border-2 border-black mb-10">
                    <option>Celsius</option>
                    <option>Fahrenheit</option>
                    <option>Kelvin</option>
                </select>

                <Button>Convert</Button>
            </form>
        </div>
    );
}