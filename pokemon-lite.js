const chalk = require("chalk"); // Chalk package to add colour in console log

// POKEMON CLASS ----------------------------------------

class Pokemon {
  constructor(name, health, magic, skills = [], counter = 0) {
    this.name = name; // Pokemon's name
    this.health = health; // Pokemon's health points
    this.magic = magic; // Pokemon's magic points
    this.skills = skills; // An array of Pokemon's skills
    this.counter = counter; // A counter to track successful battles
    this.hasWon = false; // Add a property to track if this Pokemon has already won
  }

  learnAttackSkill(newSkill) {
    this.skills.push(newSkill); // Adds new AttackSkill to Pokemon's skill array
  }

  showStatus() {
    // Displays updated status, taking into account the win state
    return `
    ${chalk.cyan("Name")}: ${this.name}
    ${chalk.cyan("Current Health")}: ${this.health}
    ${chalk.cyan("Magic")}: ${this.magic}
    ${chalk.cyan("Won Battle")}: ${this.hasWon ? "Yes" : "No"}
    `;
  }

  getMagic() {
    const randomInteger = Math.floor(Math.random() * 21); // Creates a random number between 0 and 20
    return (this.magic += randomInteger); // Adds above number to Pokemon's magic points
  }

  hasEnoughMagic(skillName) {
    return this.magic >= skillName.magic; // Checks if Pokemon has enough magic for specified Attack
  }

  isAlive() {
    return this.health > 0; // Checks if Pokemon's health is greater than 0
  }

  checkWinCondition(opponent) {
    // Grouped win condition: if opponent is dead or this Pokemon has 3+ successful Attacks
    if (!opponent.isAlive() || (this.counter >= 3 && this.health > 20)) {
      this.hasWon = true; // Set hasWon to true if win condition is met
      console.log(
        chalk.bold.yellowBright(
          `Congratulations, ${this.name}! You have won the battle.`
        )
      );
    }
  }

  attack(skillName, opponent) {
    if (
      this.isAlive() && // Checks if Pokemon is alive
      opponent.isAlive() && // Checks if opponent is alive
      this.hasEnoughMagic(skillName) // Checks if Pokemon has enough magic for chosen Attack
    ) {
      // If all conditions are met...
      this.magic -= skillName.magic; // Reduces Pokemon's magic by chosen Attack magic points
      opponent.health -= skillName.damage; // Reduces opponent's health by chosen Attack damage points
      this.counter++; // Increases Pokemon's successful Attack counter by 1

      console.log(`
      ${chalk.bold.green(
        `${this.name} attacks ${opponent.name} with ${skillName.attack}.`
      )}
      `);

      // Check win condition after the attack
      this.checkWinCondition(opponent);

      // Show the updated status of both Pokemon after the Attack
      console.log(`${this.showStatus()} ${opponent.showStatus()}`);

      // If this Pokemon has already won, return early to stop further actions
      if (this.hasWon) {
        return;
      }
    } else {
      console.log("You cannot carry out this attack. Check Pokemon Status.");
    }
  }
}

// ATTACKSKILL CLASS -----------------------------------

class AttackSkill {
  constructor(attack, damage, magic) {
    this.attack = attack; // AttackSkill name
    this.damage = damage; // AttackSkill damage points
    this.magic = magic; // AttackSkill magic points
  }
}

// INSTANTIATION OF POKEMON -------------------------

// Instantiating 3 new Pokemon with 100 health and 100 magic. Skills and Counter have default values so are not specifed here.

const pikachu = new Pokemon("Pikachu", 100, 100);
const bulbasaur = new Pokemon("Bulbasaur", 100, 100);
const charmander = new Pokemon("Charmander", 100, 100);

// INSTANTIATION OF ATTACKS -------------------------

// Instantiating 3 new Attacks for each pokemon with specified damage and magic points.

// Pikachu's Attacks
const thunderbolt = new AttackSkill("Thunderbolt", 30, 20);
const quickAttack = new AttackSkill("Quick Attack", 15, 10);
const ironTail = new AttackSkill("Iron Tail", 40, 30);

// Bulbasaur's Attacks
const razorLeaf = new AttackSkill("Razor Leaf", 25, 15);
const vineWhip = new AttackSkill("Vine Whip", 20, 20);
const solarBeam = new AttackSkill("Solar Beam", 50, 35);

// Charmander's Attacks
const flamethrower = new AttackSkill("Flamethrower", 30, 20);
const scratch = new AttackSkill("Scratch", 15, 10);
const fireSpin = new AttackSkill("Fire Spin", 20, 15);

// LEARN ATTACKS ------------------------------------

// Making each Pokemon learn their new Attacks which will now show in an array when printing their status.

pikachu.learnAttackSkill(thunderbolt);
pikachu.learnAttackSkill(quickAttack);
pikachu.learnAttackSkill(ironTail);

bulbasaur.learnAttackSkill(vineWhip);
bulbasaur.learnAttackSkill(razorLeaf);
bulbasaur.learnAttackSkill(solarBeam);

charmander.learnAttackSkill(flamethrower);
charmander.learnAttackSkill(scratch);
charmander.learnAttackSkill(fireSpin);

// FIGHT! ------------------------------------------

pikachu.attack(thunderbolt, bulbasaur);
// Pikachu attacks Bulbasaur with Thunderbolt. Pikachu's magic is now at 80 and Bulbasaur's health at 70.

bulbasaur.attack(razorLeaf, pikachu);
// Bulbasaur attacks Pikachu with Razor Leaf. Bulbasaur's magic is now at 85 and Pikachu's health at 75.

pikachu.attack(quickAttack, bulbasaur);
// Pikachu attacks Bulbasaur with Quick Attack. Pikachu's magic is now at 70 and Bulbasaur's health at 55.

bulbasaur.attack(solarBeam, pikachu);
// Bulbasaur attacks Pikachu with Solar Beam. Bulbasaur's magic is now at 50 and Pikachu's health is at 25.

pikachu.attack(ironTail, bulbasaur);
// Pikachu attacks Bulbasaur with Iron Tail. Pikachu's magic is now 40 and Bulbasaur's health is 15.

// Pikachu has won the battle!
