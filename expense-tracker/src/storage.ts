import fs from 'fs/promises';
import path = require("path");
import { Expense } from './types';

const FILE_PATH = path.join(__dirname, '../tasks.json');

// READING FILES
export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);  // ← must have return
  } catch (err: any) {
    if (err.code === 'ENOENT') return [];  // ← must have return
    throw err;
  }
};
