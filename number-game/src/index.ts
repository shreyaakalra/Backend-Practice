import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({input, output});


const numberGame = async() => {
    console.log("Welcome to the Number Guessing Game!");
    console.log("I'm thinking of a number between 1 and 100.");
    console.log("You have 5 chances to guess the correct number.");

    
}