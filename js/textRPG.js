var statusText = document.getElementById("statusText");

var environments = ["in a forest", "in a desert", "in a town", "in a jungle", "in a city", "on a boat"];
var encounters = ["baddies", "peacefuls", "givers", "needies", "mythicals", "hazards"];
var baddies = ["Creepy bats", "Spooky ghosts", "Ravenous wolves", "Giant ogres", "Hideous zombies", "Shady looking thieves"];
var peacefuls = ["birds", "bunnies", "fireflies", "fairies", "floating apparitions", "elves"];
var givers = ["kind inn keeper", "traveling salesman", "happy gnome", "dying adventurer", "mysterious spirit", "dwarven mechanic"];
var needies = ["beggar", "old witch", "lost orphan", "wounded animal", "drunk bard", "young adventurer"];
var mythicals = ["Unicorn", "Silver Dragon", "Merlin", "Great Fairy Queen", "Druid King", "Majestic Gryphon"];
var hazards = ["large patch of quicksand", "furious tornado", "towering tidal wave", "powerful earthquake", "unrelenting hail storm", "quickly spreading fire"];

//for future use
// var ignoreHostileReactions = [];
// var ignorePassiveReactions = [];

var gamePhase = "initial";
//potential gamePhases = ["initial", "action", "evaluate", "result", "end"];

// player stats
var playerHealth = 3;
var playerHealthEmpty = 0;
var playerHealthEmptyGauge = 17;

var playerAttack = 1;
var playerAttackEmpty = 0;
var playerAttackEmptyGauge = 9;

var playerDefense = 1;
var playerDefenseEmpty = 0;
var playerDefenseEmptyGauge = 9;

var playerMagic = 0;
var playerMagicEmpty = 0;
var playerMagicEmptyGauge = 10;
// /player stats

// baddie stats
var baddieHealth = 3;
var baddieHealthEmpty = 0;
var baddieHealthEmptyGauge = 17;

var baddieAttack = 1;
var baddieAttackEmpty = 0;
var baddieAttackEmptyGauge = 9;

var baddieDefense = 1;
var baddieDefenseEmpty = 0;
var baddieDefenseEmptyGauge = 9;

var baddieMagic = 0;
var baddieMagicEmpty = 0;
var baddieMagicEmptyGauge = 10;
// /baddie stats

var gameBG = document.getElementById("gameBG");

// buttons
var onwardButton = document.getElementById("onwardButton");
var fleeButton = document.getElementById("fleeButton");
var attackButton = document.getElementById("attackButton");
var ignoreButton = document.getElementById("ignoreButton");
var talkButton = document.getElementById("talkButton");
var panicButton = document.getElementById("panicButton");
var takeCoverButton = document.getElementById("takeCoverButton");
var restartButton = document.getElementById("restartButton");
var actionButtons = [onwardButton, fleeButton, attackButton, ignoreButton, talkButton, panicButton, takeCoverButton, restartButton];
// /buttons

var message;
var currentEncounter;

var dice = {
  sides: 6,
  roll: function(){
    var randomNumber = Math.floor(Math.random() * this.sides);
    return randomNumber;
  }
}

function updateStatus(newStatus){
  statusText.innerHTML = newStatus;
}

function vitalityCheck(){
  return playerHealth >=1 ? true : false;
}

function resolve(message){
  if (vitalityCheck() == true){
    updateStatus(message);
  } else {
    actionButtons.forEach(hideActionButtons);
    updateStatus('Your life flashes before you and the heavens open. Seems this is where your journey ends.');
    toggleDisplay(restartButton);
  }
}

function generate(genArray){
  var genNumber = dice.roll();
  var genPluck = genArray[genNumber];
  return genPluck;
}

function hideActionButtons(actionButton){
  actionButton.style.display = "none";
}

function toggleDisplay(toToggle, toToggleToo){
  actionButtons.forEach(hideActionButtons);
  toToggle.style.display = "inline-block";
  toToggleToo.style.display = "inline-block";
}

function adjustStat(statToAdjust, statAdjustmentNumber){
  statToAdjust += statAdjustmentNumber;
  return statToAdjust;
}

function replaceStatVisual( statName, newStat){
  var statCharacter;
  switch (statName) {
    case 'playerHealth':
      statCharacter = "&#9829; ";
      break;
    case 'playerAttack':
      statCharacter = "&#9876; ";
      break;
    case 'playerDefense':
      statCharacter = "&#9960; ";
      break;
    case 'playerMagic':
      statCharacter = "&#9733;";
      break;
  }
  var statChanging = document.getElementById(statName);
  statChanging.innerHTML = "";
  for (i = 0; i < newStat; i++) {
    statChanging.innerHTML += statCharacter;
  } 
}

function updatePlayerStats(newHealth, newAttack, newDefense, newMagic){
  replaceStatVisual("playerHealth", adjustStat(playerHealth, newHealth));
  replaceStatVisual("playerAttack", adjustStat(playerAttack, newAttack));
  replaceStatVisual("playerDefense", adjustStat(playerDefense, newDefense));
  replaceStatVisual("playerMagic", adjustStat(playerMagic, newMagic));
}

function dealDamage(){
  var dealDamageChanceBase = dice.roll();
  var dealDamageChance = dealDamageChanceBase;
}

function takeDamage(){
  console.log("took damage");
}

function fight(){
  var attackOrder = dice.roll();
  if(attackOrder >= 3){
    dealDamage();
  }else{
    takeDamage();
  }
  
  updatePlayerStats(healthStat, attackStat, defenseStat, magicStat);
}

function fleeSuccess(message){
  resolve(message);
  toggleDisplay(onwardButton);
}

function takeDamageEscape(message){
  takeDamage();
  fleeSuccess(message);
}

function applyCurse(curseType){
  resolve("You barely escaped but you have been cursed with " + curseType + "!");
  toggleDisplay(onwardButton);
}

function almostCursed(){
  resolve("You were almost cursed! Luckily you have gotten away, intact.");
  toggleDisplay(onwardButton);
}

function cursedEscape(){
  var curseTypeDecide = dice.roll();
  if(curseTypeDecide > 3){
    almostCursed();
  }else if(fleeChance = 3){
    var defenseStat = defenseStat - 1;
    applyCurse("Defendo Floppo");
  }else if(fleeChance <= 2){
    var magicStat = magicStat - 1;
    applyCurse("Ex Derp Magi");
  }else{
    var attackStat = attackStat - 1;
    applyCurse("Nexo Tacko");
  }
}

function flee(){
  var fleeChance = dice.roll();
  if(fleeChance > 3){
    fleeSuccess();
    resolve("You have gotten away, unscathed.");
  }else if(fleeChance = 3){
    takeDamageEscape();
    resolve("You managed to get away but you were injured in the process.");
  }else if(fleeChance = 2){
    cursedEscape();
    resolve("You barely escaped but you have been cursed!");
  }else{
    takeDamage();
    resolve("Yikes! You tried to get away but you've been hit.");
  }
  
  updatePlayerStats(healthStat, attackStat, defenseStat, magicStat);
}

function ignore(){
  actionButtons.forEach(hideActionButtons);
  updateStatus('You are rude. You move along.');
  toggleDisplay(onwardButton);
}

function talk(){
  actionButtons.forEach(hideActionButtons);
  updateStatus('You had hoped for some useful information but this buffoon just continues to yammer on about trivial gossip.');
  toggleDisplay(onwardButton);
}

function whichEncounter(encounter, encountered){
  var genFlavorText;

  switch (encounter) {
    case 'baddies':
      genFlavorText = "WATCH OUT!<br/>" + encountered + " are approaching and they seem hostile.";
      toggleDisplay(fleeButton, attackButton);
      return genFlavorText;
      break;
    case 'peacefuls':
      genFlavorText = "You notice " + encountered + " near by.";
      toggleDisplay(talkButton, ignoreButton);
      return genFlavorText;
      break;
    case 'givers':
      genFlavorText = "A " + encountered + " approaches you.";
      toggleDisplay(talkButton, ignoreButton);
      return genFlavorText;
      break;
    case 'needies':
      genFlavorText = "A " + encountered + " is running toward you.";
      toggleDisplay(talkButton, ignoreButton);
      return genFlavorText;
      break;
    case 'mythicals':
      genFlavorText = "How lucky can you be?! Before you is the elusive " + encountered + ". You are in absolute awe of such a majestic presence.";
      toggleDisplay(talkButton, ignoreButton);
      return genFlavorText;
      break;
    default:
      genFlavorText = "Yikes! You are dangerously close to " + encountered + ".";
      toggleDisplay(panicButton, takeCoverButton);
      return genFlavorText;
  }
}

function addClassTo(classToAdd, addTo){
  addTo.className = classToAdd;
}

function generateStatus(){
  var environment = generate(environments);
  addClassTo(environment, gameBG);
  let where = "You find yourself " + environment + ".";
  
  var encounter = generate(encounters);
  var encountered = generate(this[encounter]);
  
  var flavorText = whichEncounter(encounter, encountered);

  currentEncounter = encountered;
  
  updateStatus(where + '<br/>' + flavorText);
}
