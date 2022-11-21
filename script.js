const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let resetBut = document.querySelector("button");
resetBut.addEventListener("click", function(){
  window.parent.location = window.parent.location.href;
})

// this is the countdown timer funtion
  let countDown = document.querySelector("#timer");
gameContainer.addEventListener("click", function(){
  let count = 19;
  let timer = setInterval(function() {
    countDown.innerHTML = count;
    count--;
    if(count < -1) {
      stopInterval()
      alert('SORRY TIME IS UP!');
      countDown.innerHTML = 0;
      window.parent.location = window.parent.location.href;
    }
  }, 1000);
  let  stopInterval = function() {
    clearInterval(timer);
  }
},{once : true})

// this is the code that runs the game
let beenClicked = []; 
let matchCount = 0; 
function handleCardClick(event) {
  const bgColor = event.target.className;
  event.target.setAttribute('id', 'clicked');
  beenClicked.push(event.target.className); 
   if(beenClicked.length <= 2){
    event.target.style.backgroundColor = bgColor;
   }
//   this checks for matches and executes code if the cards are matched
   if(beenClicked.length === 2) {
    if(beenClicked[0]=== beenClicked[1]){
      const divs = document.querySelectorAll("#clicked");
    for(let div of divs){
     div.setAttribute("id", "matched")
     beenClicked.splice(0,2);
     matchCount = matchCount + 1; 
    if (matchCount === 10){
         setTimeout(function(){
          alert("CONGRATS! YOU WON!!!")
          window.parent.location = window.parent.location.href; },500) 
         }
      }
    }  
    // this checks for matches and executes code if the cards are not matched
     else if(beenClicked[0] !== beenClicked[1]){
      setTimeout(function(){
      const divs = document.querySelectorAll("#clicked");
         for(let div of divs){
           div.setAttribute("id"," not matched");
           div.style = "none";
           beenClicked.splice(0,2);
           }
        },700,{once : true});    
    
       }       
    }
}


// when the DOM loads
createDivsForColors(shuffledColors);

/* */