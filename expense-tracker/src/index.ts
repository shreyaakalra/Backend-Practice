import { addExpense } from "./expenseLogic";

const args = process.argv.slice(2);
const command = args[0];

switch(command){
    case "add":
        const n = args.length;
        let description,amount;
        for(let i=0; i<n; i++){
            if(args[i]==="--description"){
                description = args[i+1];
            }
            if(args[i]==="--amount"){
                amount = Number(args[i+1]);
            }
        }

        if(!description || amount===undefined || amount<0){
            console.log("Add description and amount!");
            break;
        }

        addExpense(description, amount);
        break;
}