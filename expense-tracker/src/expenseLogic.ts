import { getExpenses, saveExpenses } from "./storage";

export const addExpense = async (description: string, amount: number) => {
    const expenses = await getExpenses();

    const lastExpense = expenses[expenses.length - 1];

    const newID = lastExpense ? lastExpense.id + 1 : 1;

    const now = new Date().toISOString();

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