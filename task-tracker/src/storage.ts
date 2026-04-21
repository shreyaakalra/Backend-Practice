// 1. I need to grab the user's input from the terminal
// 2. I need to check if they typed 'add'
// 3. I need to open my database file/storage.ts
// 4. I need to push the new task into the list 

import fs from 'fs';
import path = require("path");
import { Task } from './types';

// this creates an absolute path to a file named 'tasks.json' at the root of your project
const FILE_PATH = path.join(__dirname, '../tasks.json')

// THE READER
export const getTasks = (): Task[] => {
    
    // if the file doesn't exist yet
    if(!fs.existsSync(FILE_PATH)){
        return [];
    }

    // read the raw text inside the JSON file
    const rawData = fs.readFileSync(FILE_PATH, 'utf-8');

    // convert that raw text back into a usable Javascript Array
    return JSON.parse(rawData);
};

// THE WRITER
export const saveTasks = (tasks: Task[]): void => {
  // Convert the JavaScript Array into a JSON text string
  // The "null, 2" arguments just make the JSON file perfectly indented and easy to read
  const stringifiedData = JSON.stringify(tasks, null, 2);
  
  // Write that text back into the file (this overwrites the old file with the new data)
  fs.writeFileSync(FILE_PATH, stringifiedData);
};
