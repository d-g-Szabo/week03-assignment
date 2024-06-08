// have all the game information in one object
// game information: cookie counter, cps, shop items
let gamedata = {
  cookieCounter: 0,
  cps: 0,
  shopItems: [],
};

// fetch the shop items from the API
async function getShopItems() {
  // fetch the shop items from the API
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );

  // turn the data into json
  const data = await response.json();

  // push the items in the shopItems array
  // ! for some reason the data is pushed into the array on the 0 index rather then populate the array, still can use it but need to use two indexes to get the data (shopItems[0][0])
  await shopItems.push(data);
}

// game function
async function game() {
  await getShopItems();
  // if there are cookies in the local storage, load the game information
  if (localStorage.getItem("savedGame")) {
    // load the game information
    loadGame();
  }
  // if there are no cookies in the local storage, start a new game
  else {
    resetGame();
  }
  // render the shop items
  renderShop();
  // update the display
  updateDisplay();
}

// load the game information from the local storage
function loadGame() {
  // load the game information from the local storage
  const saveData = localStorage.getItem("savedGame");
  // parse the data from a string to the gamedata object
  gamedata = JSON.parse(saveData);
}

// reset the game
function resetGame() {
  // set everything to 0
  gamedata.cookieCounter = 0;
  gamedata.cps = 0;
  gamedata.shopItems = [];
  updateDisplay();
}

// save the game information in the local storage
function saveGames() {
  // turn the gamedata object into a string
  const saveData = JSON.stringify(gamedata);
  // save the string in the local storage
  localStorage.setItem("savedGame", saveData);
}

// update the display
function updateDisplay() {
  // update the DOM element containing the value of cookie counter
  cookieCountertext.textContent = gamedata.cookieCounter;
  // update the DOM element containing the value of cps
  cpsText.textContent = gamedata.cps;

  // if there are shop items bought
  if (gamedata.shopItems.length > 0) {
    // update the content value of the cookies from the local storage(current total)
    for (let index = 0; index < shopItems[0].length; index++) {
      // get the element that displays the ammount of the shop item bought
      const shopItemAmmount = document.getElementById(index + 1);
      // update the ammount of the shop item bought ? if true : if false
      shopItemAmmount.textContent = gamedata.shopItems[index]
        ? gamedata.shopItems[index].ammount
        : 0;
    }
  } else if (document.getElementById(1)) {
    // if there are no shop items bought but there are already rendered ammounts, set the ammount of the shop items to 0
    for (let index = 0; index < shopItems[0].length; index++) {
      // get the element that displays the ammount of the shop item bought
      const shopItemAmmount = document.getElementById(index + 1);
      // update the ammount of the shop item bought ? if true : if false
      shopItemAmmount.textContent = 0;
    }
  }
}

// render the shop items
function renderShop() {
  // loop through the shop items
  for (let index = 0; index < shopItems[0].length; index++) {
    // create DOM elements to display the shop items
    let shopItem = document.createElement("tr");
    let shopItemName = document.createElement("td");
    let shopItemCps = document.createElement("td");
    let shopItemAmmount = document.createElement("td");
    let shopItemPrice = document.createElement("td");
    let shopItemButtonBox = document.createElement("td");
    let shopItemButton = document.createElement("button");

    // set the text content of the elements
    shopItemName.textContent = shopItems[0][index].name;
    shopItemCps.textContent = shopItems[0][index].increase;
    shopItemAmmount.textContent = 0;
    shopItemAmmount.id = shopItems[0][index].id;
    shopItemPrice.textContent = shopItems[0][index].cost;
    shopItemButton.textContent = "Buy";

    // append the elements to the shopItem
    shopItemButtonBox.append(shopItemButton);
    shopItem.append(
      shopItemName,
      shopItemCps,
      shopItemAmmount,
      shopItemPrice,
      shopItemButtonBox
    );
    shopTable.append(shopItem);
  }
}

// select elements from the DOM and store them in variables
let cookieCountertext = document.querySelector(".cookie-ammount");
let cpsText = document.querySelector(".cookie-per-second");
let cookieImg = document.getElementById("cookie-image");
const resetButton = document.getElementById("reset");
const cheatButton = document.getElementById("cheat");

// add an event listener to the reset button
resetButton.addEventListener("click", function () {
  resetGame();
});

// add an event listener to the cheat button
cheatButton.addEventListener("click", function () {
  // set the cookie counter to 5000000 so I can test the shop items
  gamedata.cookieCounter = 5000000;
  updateDisplay();
});

// create an array to store the shop items
let shopItems = [];

// call the function to fetch the shop items
game();

// create a table to display the shop items
// has to be called after the shopItems array is populated
const shopTable = document.querySelector("table");

// an event listener for clicking on the cookie
cookieImg.addEventListener("click", function () {
  // increment the cookie counter by 1
  gamedata.cookieCounter++;
  // update the cookie counter text
  updateDisplay();
});

// create an interval to increase the cookie counter by the cps every second
setInterval(function () {
  // increase the cookie counter by the cps every second
  gamedata.cookieCounter += gamedata.cps;
  // update the value displayed on the page
  updateDisplay();
  // update the value in the local storage
  saveGames();
}, 1000);

// event listener for buying the shop items
shopTable.addEventListener("click", function (e) {
  // check if the target of the event is a button
  if (e.target.tagName === "BUTTON") {
    // get the index of the shop item that was clicked
    let index = e.target.parentElement.parentElement.rowIndex - 1;
    // get the price of the shop item
    let price = shopItems[0][index].cost;
    // check if the player has enough cookies to buy the shop item
    if (gamedata.cookieCounter >= price) {
      // decrease the cookie counter by the price of the shop item
      gamedata.cookieCounter -= price;
      // increase the cps by the value of the shop item
      gamedata.cps += shopItems[0][index].increase;
      // increase the amount of the shop item bought

      // if the shop item is already in the array, increase the amount
      if (gamedata.shopItems[index]) {
        gamedata.shopItems[index].ammount++;
      } else {
        // if the shop item is not in the array, add it with an amount of 1
        gamedata.shopItems[index] = {
          id: shopItems[0][index].id,
          ammount: 1,
        };
      }
      // ! this is the same as above but with Object.assign and it adds the full object to the array I will leave it here, maybe will be usefull in the future
      // const shopItemToAdd = Object.assign({}, shopItems[0][index], {
      //   id: shopItems[0][index].id,
      //   ammount: 1,
      // });
      // gamedata.shopItems.push(shopItemToAdd);

      // update the display
      updateDisplay();
      // save the game
      saveGames();
    }
  }
});
