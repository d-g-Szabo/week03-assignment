// global variable to store the value of the cookies
let cookieCounter = 0;
let cps = 0;

// DOM manipulation:
// cookie counter
// cps (cookies per second)
// image to click on
// select these elements from the DOM or create these elements with JS

// a way to store the shop items that we get from the API
let shopItems = [];

// fetch the shop items from the API
// a way to store the shop items that we get from the API (async, await)
function getShopItems() {
  // fetch the shop items from the API
  // turn the data into json
  // push the items in the shopItems array
}

// an event listener for clicking on the cookie
// select the cookie img or button
// write an event listener
addEventListener("click", function () {
  // when I click on the cookie, increment the cookie counter by 1
  // increment operator(one idea)
});

// have all the game information in one function(object?)
// you need to check if there are any cookies in the local storage(cookieCounter, cps)
// load the game information from the local storage
// load the game --> loadGame() calls the game function
// fetch the shop items from the API
// render(display) the shop items on the page

// we need a timer to increase the cookies we get every second (cps)
setInterval(function () {
  // increase the cookie counter by one every second
  // update the value displayed on the page (or could have this in a separate function to call inside the interv, for example updateCookieCounter())
  // update the value in the local storage (or could have this in a separate function to call inside the interv, for example saveGame())
}, 1000);

// extra tools, if you want to use them to separate different tasks into functions

function updateDisplay() {
  // update the DOM element containing the value of cookie counter
  // update the content value of the cookies from the local storage(current total)
}

function saveGames() {
  // a method to turn your data into strings
  // a method to set the items using key and value in the local storage
}

function renderShop() {
  // create DOM elements to display the shop items
  // can use for loop or array method to iterate over the shopItems array
  shopItems.forEach(() => {});
}
