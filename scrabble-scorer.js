// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85
let word = ""
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  word = input.question("Let's play some scrabble! Enter a word:");
  //console.log(oldScrabbleScorer(word))

};

let simpleScore= function(word) {
  return word.length
};

let vowelBonusScore = function(word) {
  word = word.toUpperCase()
  let score = 0;
  for (let i=0; i < word.length; i++) {
    if (word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U") {
      score += 3
    }
    else {
      score++
    }
  }
  return score
};

let scrabbleScorer = function(word) {
  word = word.toLowerCase();
	let score = 0;
  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]]
  }
  return score
}

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScore
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer

  }
];

function scorerPrompt() {
  let choice = input.question(`What scoring algorithm would you like to use?
  0 - Simple: One point per character
  1 - Vowel Bonus: Vowels are worth 3 points
  2 - Scrabble: Uses scrabble point system
  Enter 0, 1, or 2: `)
  if (choice == 0) {
    console.log("algorith name: " + scoringAlgorithms[0].name);
    console.log("Score: " + scoringAlgorithms[0].scorerFunction(word));
  }
  if (choice == 1) {
    console.log("algorith name: " + scoringAlgorithms[1].name);
    console.log("Score: " + scoringAlgorithms[1].scorerFunction(word));
  }
  if (choice == 2) {
    console.log("algorith name: " + scoringAlgorithms[2].name);
    console.log("Score: " + scoringAlgorithms[2].scorerFunction(word));
  }
}

function transform(obj) {
  let newObj = {}
  for (key in obj) {
    for (let i = 0; i < obj[key].length; i++) {
          let low = (obj[key][i]).toLowerCase()
          newObj[low] = Number(key)
    }
  }
  return newObj
};

let newPointStructure = transform(oldPointStructure);
console.log(newPointStructure)
function runProgram() {
   initialPrompt();
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};