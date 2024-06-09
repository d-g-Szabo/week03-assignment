# week03-assignment

Project: Build a Cookie Clicker Game

# Requirements:

- User Stories
- Draw a wireframe
- The user should be able to click on a cookie image/button to increase their cookie counter.
- The cookie counter should go up by an amount (1 by default) per second.
- The users progress in the game (cookie count and upgrades purchased) should be stored in local storage.
- The user should be able to purchase upgrades. These upgrades should be fetched from the cookie API provided.
- The upgrades purchased should effect the cookies per second earned.

I met all the requirements for this assignment. I tried to achive a similar look to my wireframe but ended up adding more to the site afterwards.

# User Stories:

- As a user, I can visit the page and see my current number of cookies
- As a user, I can click the giant cookie and increase my number of cookies by 1
- As a user, I can spend cookies to buy upgrades for my cookie factory
- As a user, when I leave/reload the webpage, my game progress should not go away
- As a user, I expect when I open the game, I continue playing from where I left off
- As a user, when I click the reset button, I can start a new game from the beginning

# Wireframe:

![](https://d-g-szabo.github.io/week03-assignment/cookies_clicker_wireframe.jpg)

# Stretch Goals:

- Add a CSS animation of some kind when you click the button
- Add some more styling to the game to make it look more like the original, or your own design. Use CSS animations to make the cookie bounce when you click it, or add a background image.

# Reflections:

What went really well and what could have gone better?

With Manuel's help in his code, all of the JS went really well. I feel like the function planning improved a lot from the last assignment.

Useful external sources:

- https://www.atlassian.com/agile/project-management/user-stories
- https://codepen.io/nelledejones/pen/gOOPWrK
- https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator

Describing errors or bugs you encountered:

I encountered a bug when fetching the data from the API. It worked on my local server, but when I pushed and checked the page from GitHub, it all went wrong, and the fetching didn't happen. After a few trials and errors, I figured out that I needed to make the game() function async as well and await the getShopItems() function to make it work on the GitHub pages. For some reason, I did not need to do that on my local server.

Requesting feedback about a specific part of your submission:

Well, I would like to get some general feedback on the structure of my code. Does it make sense to put the functions on the top and have the "running code" below the functions and stuff like that?
