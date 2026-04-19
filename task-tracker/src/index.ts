// 1. Grab the arguments the user typed
const args = process.argv.slice(2);

// 2. The first word they typed is the command
const command = args[0];

// 3. The traffic cop (routing)
switch (command) {
  case 'add':
    console.log('You want to add a task! The description is:', args[1]);
    // We will call the addTask() function here later
    break;
    
  case 'update':
    console.log('You want to update task ID:', args[1]);
    break;
    
  case 'list':
    console.log('You want to list tasks!');
    break;
    
  default:
    console.log('Unknown command. Please use add, update, or list.');
    break;
}