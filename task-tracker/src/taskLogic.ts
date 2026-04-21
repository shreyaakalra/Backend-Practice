// src/taskLogic.ts
import { getTasks, saveTasks } from './storage';
import { Task } from './types';

export const addTask = (description: string): void => {
  // 1. READ: Get the current list of tasks from the hard drive
  const tasks = getTasks();

  // 2. Calculate the new ID
  // If the array is empty, the ID is 1. 
  // Otherwise, look at the very last task in the array and add 1 to its ID.
  const lastTask = tasks[tasks.length - 1];
  
  // If lastTask exists, add 1 to its ID. If it is undefined, make the ID 1.
  const newId = lastTask ? lastTask.id + 1 : 1;

  // 3. Get the exact current date and time
  const now = new Date().toISOString();

  // 4. Create the new Task object matching our exact blueprint
  const newTask: Task = {
    id: newId,
    description: description,
    status: 'todo',
    createdAt: now,
    updatedAt: now,
  };

  // 5. WORK: Push the new task into our JavaScript array
  tasks.push(newTask);

  // 6. SAVE: Write the updated array back to the hard drive
  saveTasks(tasks);

  // 7. Print a success message for the user!
  console.log(`Task added successfully (ID: ${newId})`);
};