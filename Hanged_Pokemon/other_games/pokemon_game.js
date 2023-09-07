// POKEMON GAME 
class AttackSkill {
    constructor(attack, damage, magic) {
      this.attack = attack;
      this.damage = damage;
      this.magic = magic;
    }
  }
  
  class Pokemon {
    constructor(name, health, magic) {
      this.name = name;
      this.health = health;
      this.magic = magic;
      this.skills = [];
      this.counter = 0;
      this.won = false;
    }
  
    learnAttackSkill(newSkill) {
      this.skills.push(newSkill);
    }
  
    showStatus() {
      console.log(
        `${this.name} - Health: ${this.health}, Magic: ${this.magic}, ${
          this.won ? "Won the battle!" : ""
        }`
      );
    }
  
    getMagics() {
      const magicAmount = Math.floor(Math.random() * 21);
      this.magic += magicAmount;
      console.log(`${this.name} gained ${magicAmount} magic points.`);
    }
  
    hasEnoughMagic(skillName) {
      const skill = this.skills.find((s) => s.attack === skillName);
      return skill && this.magic >= skill.magic;
    }
  
    isAlive() {
      return this.health > 0;
    }
  
    attack(skillName, opponent) {
      if (!this.isAlive()) {
        console.log(`${this.name} is unable to attack. It has fainted.`);
        return;
      }
  
      if (!opponent.isAlive()) {
        console.log(`${opponent.name} is already defeated. Cannot attack.`);
        return;
      }
  
      const skill = this.skills.find((s) => s.attack === skillName);
  
      if (!skill) {
        console.log(`${this.name} doesn't know the attack skill ${skillName}.`);
        return;
      }
  
      if (!this.hasEnoughMagic(skillName)) {
        console.log(`${this.name} doesn't have enough magic to use ${skillName}.`);
        return;
      }
  
      console.log(
        `${this.name} uses ${skill.attack} on ${opponent.name} for ${skill.damage} damage.`
      );
  
      this.magic -= skill.magic;
      opponent.health -= skill.damage;
  
      this.counter++;
  
      if (!opponent.isAlive()) {
        console.log(`${opponent.name} has fainted.`);
        opponent.won = false;
      }
  
      this.showStatus();
      opponent.showStatus();
  
      if (this.counter > 3) {
        this.won = true;
        console.log(`${this.name} has won the battle!`);
      }
    }
  }
  
  // Create new Pokemons
  let pikachu = new Pokemon("Pikachu", 120, 80);
  let bulbasaur = new Pokemon("Bulbasaur", 95, 105);
  
  // Create new skills that Pokemons can learn
  let lightning = new AttackSkill("lightning", 40, 30);
  let bombing = new AttackSkill("poisonSeed", 20, 20);
  
  // Pikachu learning skills
  pikachu.learnAttackSkill(lightning);
  pikachu.learnAttackSkill(bombing);
  
  // Bulbasaur learning skills
  bulbasaur.learnAttackSkill(lightning);
  bulbasaur.learnAttackSkill(bombing);
  
  // Start the battle
  pikachu.attack("lightning", bulbasaur);
  bulbasaur.attack("poisonSeed", pikachu);
  pikachu.attack("poisonSeed", bulbasaur);
  bulbasaur.attack("lightning", pikachu);
  pikachu.attack("lightning", bulbasaur);
  pikachu.attack("poisonSeed", bulbasaur); // Bulbasaur is already defeated!
  