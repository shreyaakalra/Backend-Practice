import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

const numberGame = async () => {
  console.log("Welcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.");
  console.log("You have 5 chances to guess the correct number.");

  console.log("Please select the difficulty level:");
  console.log("1. Easy (10 chances)");
  console.log("2. Medium (5 chances)");
  console.log("3. Hard (3 chances)");

  let playAgain = false;

  while (!playAgain) {
    let validLevel = false;
    let chances = 0;
    let highscore = Number.MAX_SAFE_INTEGER;
    const start = performance.now();
    while (!validLevel) {
      const level = await rl.question("Enter your choice: ");

      if (level === "1") {
        console.log(`Great! You have selected the Easy difficulty level.`);
        console.log("Let's start the game!");
        chances = 10;
        validLevel = true;
      } else if (level === "2") {
        console.log(`Great! You have selected the Medium difficulty level.`);
        console.log("Let's start the game!");
        chances = 5;
        validLevel = true;
      } else if (level === "3") {
        console.log(`Great! You have selected the Hard difficulty level.`);
        console.log("Let's start the game!");
        chances = 3;
        validLevel = true;
      } else {
        console.log("Please select a valid level : 1, 2 or 3.");
      }
    }

    const targetNumber = Math.floor(Math.random() * 100) + 1;
    let count = 0;

    while (chances !== 0) {
      const guess = await rl.question("Enter your guess: ");
      count++;
      if (Number(guess) === targetNumber) {
        console.log(
          `Congratulations! You guessed the correct number in ${count} attempts.`,
        );
        const replay = await rl.question("Do you wanna play again? (yes/no)");

        if (replay === "no") {
          playAgain = true;
          const elapsed = performance.now() - start;
          console.log(`Took ${elapsed.toFixed(2)}ms`);
          const score = Math.min(highscore, count);
          console.log(`Your high score is: ${score}`);
        }
        rl.close();
        return;
      } else {
        if (Number(guess) > targetNumber) {
          console.log(`Incorrect! The number is less than ${guess}.`);
        } else {
          console.log(`Incorrect! The number is greater than ${guess}.`);
        }
      }
      chances--;
    }

    console.log("All chances over, You lost.");

    const replay = await rl.question("Do you wanna play again? (yes/no)");

    if (replay === "no") {
      playAgain = true;
      const elapsed = performance.now() - start;
      console.log(`Took ${elapsed.toFixed(2)}ms`);
      const score = Math.min(highscore, count);
      highscore = score;
      console.log(`Your high score is: ${highscore}`);
    }
  }

  rl.close();
};

numberGame();
