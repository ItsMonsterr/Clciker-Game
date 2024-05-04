// Define game data object to store gold, gems, and pickaxe information
var gameData = {
  gold: 0, // Initial amount of gold
  gems: 0, // Initial amount of gems
  goldPerClick: 1, // Amount of gold earned per click
  goldPerClickCost: 10, // Cost of upgrading gold per click
  level: 1 // Current level of the pickaxe
};

// Function to load game data from local storage
function loadGameData() {
  // Retrieve saved game data JSON string from local storage
  var jsonData = localStorage.getItem('gameData');
  
  // Check if there is any saved game data
  if (jsonData) {
    // Parse the JSON string to convert it back to a JavaScript object
    var savedGameData = JSON.parse(jsonData);
    
    // Update the game data object with the saved data
    gameData.gold = savedGameData.gold;
    gameData.gems = savedGameData.gems;
    gameData.goldPerClick = savedGameData.goldPerClick;
    gameData.goldPerClickCost = savedGameData.goldPerClickCost;
    gameData.level = savedGameData.level;
    
    // Update the displayed game data
    updateGoldDisplay();
    updateGemsDisplay();
    updateUpgradeButton(); // Update the upgrade button text
    updateGoldPerClickDisplay();
    updateGPSDisplay();
    
    // Update the displayed gem count immediately
    updateGemDisplay();
  }
}

// Function to save game data
function saveGameData() {
  // Convert game data object to JSON string
  var jsonData = JSON.stringify(gameData);
  
  // Save JSON string to local storage
  localStorage.setItem('gameData', jsonData);
}

// Function to save game data every 10 seconds
function autoSaveGameData() {
  setInterval(function() {
    saveGameData();
  }, 10000); // Save every 10 seconds
}

// Call the autoSaveGameData function to begin auto-saving
autoSaveGameData();

// Event listener for save button
document.getElementById("saveButton").addEventListener("click", saveGameData);

// Load game data when the page is loaded
window.addEventListener("load", loadGameData);

// Function to reset the game data to its initial state
function resetGameData() {
  // Set game data properties to their initial values
  gameData.gold = 0;
  gameData.gems = 0;
  gameData.goldPerClick = 1;
  gameData.goldPerClickCost = 10;
  gameData.level = 1;

  // Update the displayed game data
  updateGoldDisplay();
  updateGemsDisplay();
  updateUpgradeButton();
  updateGoldPerClickDisplay();
  updateGPSDisplay();
  updateGemDisplay();

  // Clear the saved game data from local storage
  localStorage.removeItem('gameData');
}

// Function to mine gold when the pickaxe is clicked
function mineGold() {
  gameData.gold += gameData.goldPerClick; // Increment gold by goldPerClick
  updateGoldDisplay(); // Update the displayed gold amount
}

// Function to handle the purchase of an upgrade to gold per click
function buyGoldPerClick() {
  // Check if player has enough gold to buy the upgrade
  if (gameData.gold >= gameData.goldPerClickCost) {
    gameData.gold -= gameData.goldPerClickCost; // Deduct cost from gold
    // Calculate the new cost based on the current level
    gameData.goldPerClickCost *= (gameData.level < 5) ? 3 : 2;
    gameData.goldPerClick += 1; // Increase the gold per click by 1
    gameData.level++; // Increase the level by 1
    updateGoldDisplay(); // Update the displayed gold amount
    updateUpgradeButton(); // Update the upgrade button text
    updateGoldPerClickDisplay(); // Update gold per click display
    updateGPSDisplay(); // Update the GPS display
  }
}

// Function to update the displayed gold amount
function updateGoldDisplay() {
  document.getElementById("gold").textContent = gameData.gold;      
}

// Function to update the displayed gems amount
function updateGemsDisplay() {
  // Find the gems element by its class and update its text content
  document.querySelector(".gems").textContent = "Gems: " + gameData.gems;
}



// Function to update the displayed gold per click value
function updateGoldPerClickDisplay() {
  document.getElementById("goldPerClick").innerHTML = "+ " + gameData.goldPerClick + " Gold per click";
}

// Function to update the upgrade button text
function updateUpgradeButton() {
  document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.level + ") Cost: " + gameData.goldPerClickCost + " Gold";
}

// Function to update the displayed gold earned per second
function updateGPSDisplay() {
  // Calculate gold earned per second based on the current level
  var gps = (gameData.level >= 10) ? 10 : 0; // Gold earned per second is 10 if level is 10 or greater, otherwise 0
  document.getElementById("goldPerSecond").innerHTML = "+ " + gps + " Gold per second";
}

// Function to start the game loop
function startGameLoop() {
  setInterval(function() {
    // Automatically get gold once level reaches 10
    if (gameData.level >= 10) {
      gameData.gold += 10; // Increment gold by 10 per loop iteration
      updateGoldDisplay(); // Update the displayed gold amount
    }
  }, 1000); // Run the loop every second (1000 milliseconds)
}

// Function to add a specified amount of gold
function addGold(amount) {
  gameData.gold += amount; // Add specified amount of gold
  updateGoldDisplay(); // Update the displayed gold amount
}

// Function to add a specified amount of gems
function addGems(amount) {
  gameData.gems += amount; // Add specified amount of gems
  updateGemsDisplay(); // Update the displayed gems amount
}

// Call the startGameLoop function to begin the game loop
startGameLoop();

// Define random message element
var randomMessageElement = document.querySelector(".random-message");

// Function to show the random message
function showRandomMessage() {
  randomMessageElement.classList.remove('hidden');
}

// Function to hide the random message
function hideRandomMessage() {
  randomMessageElement.classList.add('hidden');
}

// Function to generate a random message and display it every 10 seconds
function displayRandomMessage() {
  // Define an array of random messages
  var messages = ["Click here for 1 gem!", "Earn 1 gem now!", "Get 1 gem instantly!"];

  // Choose a random message from the array
  var randomIndex = Math.floor(Math.random() * messages.length);
  var message = messages[randomIndex];

  // Set the random message text
  randomMessageElement.textContent = message;

  // Show the random message
  showRandomMessage();

  // Get the dimensions of the viewport
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight;

  // Calculate random position for the message
  var randomX = Math.random() * (viewportWidth - randomMessageElement.offsetWidth); // Random x-coordinate
  var randomY = Math.random() * (viewportHeight - randomMessageElement.offsetHeight); // Random y-coordinate

  // Set the position of the random message
  randomMessageElement.style.left = randomX + "px";
  randomMessageElement.style.top = randomY + "px";

  // Hide the random message after 5 seconds
  setTimeout(hideRandomMessage, 5000);
}

// Function to handle the click on the random message
function handleRandomMessageClick() {
  // Add 1 gem when the random message is clicked
  addGem(1);

  // Hide the random message
  hideRandomMessage();
}

// Function to add gems
function addGem(amount) {
  // Increment the gem counter by the specified amount
  gameData.gems += amount;

  // Update the displayed gem count
  updateGemDisplay();
}

// Function to update the displayed gem count
function updateGemDisplay() {
  // Find the gems element by its class and update its text content
  document.querySelector(".gems").textContent = "Gems: " + gameData.gems;
}

// Call the function to display the random message initially
displayRandomMessage();

// Call the function to display the random message every 10 seconds
setInterval(displayRandomMessage, 10000);
