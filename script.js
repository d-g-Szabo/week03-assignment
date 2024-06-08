// global variable to store the value of the cookies

// DOM manipulation:
// cookie counter
// cps (cookies per second)
// image to click on
// select these elements from the DOM and store them in variables
let cookieCountertext = document.querySelector(".cookie-ammount");
let cpsText = document.querySelector(".cookie-per-second");
let cookieImg = document.getElementById("cookie-image");
const resetButton = document.getElementById("reset");
const cheatButton = document.getElementById("cheat");

resetButton.addEventListener("click", function () {
  resetGame();
});

cheatButton.addEventListener("click", function () {
  gamedata.cookieCounter = 5000000;
  updateDisplay();
});

// a way to store the shop items that we get from the API
let shopItems = [];

// fetch the shop items from the API
// a way to store the shop items that we get from the API (async, await)
async function getShopItems() {
  // fetch the shop items from the API
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );

  // turn the data into json
  const data = await response.json();

  // push the items in the shopItems array
  // ! for some reason the data is pushed into the array on the 0 index rather then populate the array, still can use it but need to use two indexes to get the data (shopItems[0][0])
  shopItems.push(data);

  game();
}

getShopItems();

// an event listener for clicking on the cookie
cookieImg.addEventListener("click", function () {
  // increment the cookie counter by 1
  gamedata.cookieCounter++;
  // update the cookie counter text
  updateDisplay();
});

// have all the game information in one function(object?)
// game information: cookie counter, cps, shop items
let gamedata = {
  cookieCounter: 0,
  cps: 0,
  shopItems: [],
};

// game function
function game() {
  // you need to check if there are any cookies in the local storage(cookieCounter, cps)

  // if there are cookies in the local storage, load the game information
  if (localStorage.getItem("savedGame")) {
    // load the game information
    // load the shop items
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
// load the game --> loadGame() calls the game function
// fetch the shop items from the API
// render(display) the shop items on the page
function loadGame() {
  // load the game information from the local storage
  const saveData = localStorage.getItem("savedGame");
  gamedata = JSON.parse(saveData);
  // load the shop items
}

function resetGame() {
  gamedata.cookieCounter = 0;
  gamedata.cps = 0;
  gamedata.shopItems = [];
  updateDisplay();
}

// we need a timer to increase the cookies we get every second (cps)
setInterval(function () {
  // increase the cookie counter by one every second
  gamedata.cookieCounter += gamedata.cps;
  // update the value displayed on the page (or could have this in a separate function to call inside the interv, for example updateCookieCounter())
  updateDisplay();
  // update the value in the local storage (or could have this in a separate function to call inside the interv, for example saveGame())
  saveGames();
}, 1000);

// extra tools, if you want to use them to separate different tasks into functions

function updateDisplay() {
  // update the DOM element containing the value of cookie counter
  cookieCountertext.textContent = gamedata.cookieCounter;
  // update the DOM element containing the value of cps
  cpsText.textContent = gamedata.cps;
  // update the content value of the cookies from the local storage(current total)
  for (let index = 0; index < shopItems[0].length; index++) {
    const shopItemAmmount = document.getElementById(index + 1);
    // update the ammount of the shop item bought ? if true : if false
    shopItemAmmount.textContent = gamedata.shopItems[index]
      ? gamedata.shopItems[index].ammount
      : 0;
  }
}

function saveGames() {
  // a method to turn your data into strings
  const saveData = JSON.stringify(gamedata);
  localStorage.setItem("savedGame", saveData);
  // a method to set the items using key and value in the local storage
}

const shopTable = document.querySelector("table");

function renderShop() {
  for (let index = 0; index < shopItems[0].length; index++) {
    // can use for loop or array method to iterate over the shopItems array
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

// event listener for buying the shop items
// shop items should increase the cps
// shop items should decrease the cookie counter
// shop items should increase the price (optional) (or could have a fixed price for each item)
// shop items should increase the amount of items bought
// shop items should be saved in the local storage
// shop items should be displayed on the page
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

      if (gamedata.shopItems[index]) {
        gamedata.shopItems[index].ammount++;
      } else {
        gamedata.shopItems[index] = {
          id: shopItems[0][index].id,
          ammount: 1,
        };
      }
      // ! this is the same as above but with Object.assign and it adds the full object to the array
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
