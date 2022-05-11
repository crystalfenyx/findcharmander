//FIND CHARMANDER

//prompt-sync to get player input
const prompt = require('prompt-sync')({sigint: true});

//Initialising variables
const charmander = '♥';
const pidgey = '○';
const grass = '░';
const pokemonTrainer = '•';

//field class for methods, objects and functions for generating the field and playing the game

class Field {
  
  //construct field as 2D array
    constructor(field=[[]]) {
      this.field = field;
      //set reference location
      this.x = 0;
      this.y = 0;

      //set starting position of player - row first then columm
      this.field[0][0] = pokemonTrainer;

    }// end of constructor

    //runGame method
    runGame() {
      //make a true condition for while loop
      let playing = true;

      //while loop
      while(playing) {
        //print the field
        this.print();
        //prompt player for command of which way to go
        this.askQuestion();
        
        //if player go out of bounds game over
        if(!this.isWithinBoundary()) {
          console.log('You fell off the cliff! Game over');
          playing = false;
          break;
        } // end of if iswithinboundary

        //if player meets a pidgey
        else if (this.wildPidgey()) {
          console.log('A wild pidgey appeared! You cannot run. Game over');
          playing = false;
          break;
        } // end of wild pidgey

        //if player finds the charmander
        else if (this.charmander()) {
          console.log('Congratulations, you caught Charmander!');
          playing = false;
          break;

        } // end of charmander
        
        this.field[this.y][this.x] = pokemonTrainer;

      } // end of while loop

    } // end of runGame method

    askQuestion() {
      const answer = prompt('Hi, Pokemon Trainer! Find Charmander by pressing W (up), S(down), A(left) or D(right).\nBeware of the wild Pidgeys!');
    
      switch(answer){
        //case d is x+1
        case 'd':
        this.x += 1;
        break;

        //case a is x-1
        case 'a':
        this.x -= 1;
        break;

        //case w is y-1
        case 'w':
        this.y -= 1;
        break;

        //case s is y+1
        case 's':
        this.y += 1;
        break;

        default:
          console.log('enter W, S, A, or D');
          this.askQuestion;
          break;

      } // end of switch 
    
    } //end of askquestion

    isWithinBoundary() {
      return (
      this.x >= 0 &&
      this.y >= 0 &&
      this.x < this.field[0].length &&
      this.y < this.field.length 
      );
    } // end of isWithinBoundary

    charmander() {
      return this.field[this.y][this.x] === charmander;
    } //end of charmander method

    wildPidgey() {
      return this.field[this.y][this.x] === pidgey

    } //end of wildpidgey method

    print() {
      const displayString = this.field.map(row => {
          return row.join('');
      }).join('\n');
      console.log(displayString);
  } //end of print method
  //don't really understand the above method

  static generateField(height, width, percentage = 0.1) {
  
    const field = new Array(height).fill(0).map(el => new Array(width));

    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        const prob = Math.random();

        field[y][x] = prob > percentage ? grass : pidgey;

      } // end of nested loop

    } //end of for loop


  const charmanderLocation = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height)
    
  }; // end charmanderLocation

  while (charmanderLocation.x === 0 && charmanderLocation.y === 0) {
    // update the charmanderLocation object property 'x' with new random number
    charmanderLocation.x = Math.floor(Math.random() * width);
    // update the charmanderLocation object property 'y' with new random number
    charmanderLocation.y = Math.floor(Math.random() * height);

  }//end of generatefield method

  field[charmanderLocation.y][charmanderLocation.x] = charmander;

  return field;

}

} // end of field class

//generate instance object of field 10 by 10 with percentage of pidgeys 20%
const myField = new Field(Field.generateField(10, 10, 0.2));

myField.runGame();
