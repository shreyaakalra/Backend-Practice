"use server";

export async function convertWeight(formData: FormData){
    const rawValue = formData.get("val");
    const fromUnit = formData.get("from") as keyof typeof weightRates;;
    const toUnit = formData.get("to") as keyof typeof weightRates;;

    console.log("Recieved on backend:", rawValue, fromUnit, toUnit);

    const weightRates = {
        Milligram: 0.001,
        Gram: 1,
        Kilogram: 1000,
        Ounce: 28.3495,
        Pound: 453.592
    }

    const convertToBase = Number(rawValue) * weightRates[fromUnit];
    const ans = convertToBase/weightRates[toUnit];

}


export async function convertLength(formData: FormData){
    const rawValue = formData.get("val");
    const fromUnit = formData.get("from");
    const toUnit = formData.get("to");

    console.log("Recieved on backend:", rawValue, fromUnit, toUnit);

    
}


export async function convertTemperature(formData: FormData){
    const rawValue = formData.get("val");
    const fromUnit = formData.get("from");
    const toUnit = formData.get("to");

    console.log("Recieved on backend:", rawValue, fromUnit, toUnit);

  
}