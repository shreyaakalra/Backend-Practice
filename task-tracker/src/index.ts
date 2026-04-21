import { addTask, listTasks, updateTask } from "./taskLogic";

// 1. Grab the arguments the user typed
const args = process.argv.slice(2);

// 2. The first word they typed is the command
const command = args[0];

// 3. The traffic cop (routing)
switch (command) {
  case "add":
    if (!args[1]) {
      console.log("Error: Please provide a description for the task.");
    } else {
      addTask(args[1]);
    }
    break;

  case "update":
    if (!args[1] || !args[2]) {
      console.log(
        'Error: Please provide an ID and a new description. Example: update 1 "New text"',
      );
    } else {
      // Terminal arguments are ALWAYS strings ("1"). We must convert it to a Number.
      updateTask(Number(args[1]), args[2]);
    }
    break;

  case "list":
    listTasks(args[1]);
    break;

  default:
    console.log("Unknown command. Please use add, update, or list.");
    break;
}
