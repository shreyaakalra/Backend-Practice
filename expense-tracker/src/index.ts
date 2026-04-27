import { addExpense, deleteExpense, listExpense, summaryExpense, summaryMonthExpense } from "./expenseLogic";

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

    case "list":
        listExpense();
        break;

    case "delete":
        const id = args[2];
        if(!id){
            console.log("Add id of the expense you wanna delete!")
            break;
        }

        deleteExpense(Number(id));
        break;

    case "summary":
        if(args[1]==="--month"){
            const month = args[2];

            if(!month){
                console.log("add the month!");
                break;
            }

            summaryMonthExpense(Number(month));
            break;
        }
        else{
            summaryExpense();
            break;
        }
}