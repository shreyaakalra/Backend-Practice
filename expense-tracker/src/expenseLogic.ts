import { getExpenses, saveExpenses } from "./storage";

export const addExpense = async (description: string, amount: number) => {
    const expenses = await getExpenses();

    const lastExpense = expenses[expenses.length - 1];

    const newID = lastExpense ? lastExpense.id + 1 : 1;

    const now = new Date().toLocaleDateString('en-GB');

    const newExpense = {
        id: newID,
        description: description,
        amount: amount,
        createdAt: now,
        updatedAt: now

    }

    expenses.push(newExpense);

    await saveExpenses(expenses);

    console.log(`Expense added successfully (ID: ${newID})`);

}

export const listExpense = async() => {
    const expenses = await getExpenses();

    if(expenses.length === 0){
        console.log("No expenses found!");
        return;
    }

    console.table(expenses, ["id", "createdAt", "description", "amount"]);
}

export const deleteExpense = async(id: number) => {
    const expenses = await getExpenses();

    const updatedExpenses = expenses.filter(expense => expense.id!==id)

    if(updatedExpenses.length === expenses.length){
        console.log("expense not found!");
        return;
    }

    await saveExpenses(updatedExpenses);
    console.log("Expense deleted successfully!")
}

export const summaryExpense = async() => {
    const expenses = await getExpenses();

    let sum = 0;

    for(let i=0; i<expenses.length; i++){
        sum += expenses[i]?.amount || 0;
    }

    console.log(`Total expenses: $${sum}`)
}

export const summaryMonthExpense = async(month: number) => {
    const expenses = await(getExpenses());
    let amount = 0;

    for(let i=0; i<expenses.length; i++){
        const creationDate = expenses[i]?.createdAt;
        const date = Number(creationDate?.split('/')[1]);

        if(date===month){
            amount += expenses[i]?.amount || 0;
        }
    }

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    console.log(`Total expenses for ${months[month-1]}: ${amount}`);
}