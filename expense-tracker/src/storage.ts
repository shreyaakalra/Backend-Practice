import fs from 'fs/promises';
import path = require("path");
import { Expense } from './types';

const FILE_PATH = path.join(__dirname, '../expenses.json');

// READING 
export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);  
  } catch (err: any) {
    if (err.code === 'ENOENT') return []; 
    throw err;
  }
};

// WRITING
export const saveExpenses = async(expenses: Expense[]) => {
  const stringifiedData = JSON.stringify(expenses,null,2);
  await fs.writeFile(FILE_PATH, stringifiedData);
}