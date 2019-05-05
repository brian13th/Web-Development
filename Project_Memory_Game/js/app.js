/*
 * Create a list that holds all of your cards
 */
const list = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb","diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
const listCard = [],
      open = [],
      matchedList = [];
var moves = 0;
var starWinner;
var winTime;


// Create Cards Html
function loop (array) {
    list.forEach(function(element){
    let temp = "<li class=card>" + "<i class=fa-" + element + ">" + "</i>" + "</li>";
    array.push(temp);
  });
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//Add Cards to body
function additionCard(array) {
  loop(listCard);
  shuffle(array);
  listCard.forEach(function(element){
    $(".deck").append(element);
    $("i").addClass("fa");
  })
}
//Modal - Many thanks to this video https://www.youtube.com/watch?v=6ophW7Ask_0
var modal = $("#simpleModal");
var closeBtn = $(".closeBtn");

// window.on("click", clickOutside());
function openModal() {
  modal.css("display","block");
  modalOpen = true;
}
function closeModal() {
  modal.css("display","none");
  modalOpen = false;
}
// Event listaner to close Modal Dialog
$(".closeBtn").on("click", function() {
  closeModal();
})
// Display Card on board
function display(that) {
  that.addClass("show open");
}
// Add Card to open Cards list
function addOpen(that) {
  open.push(that.html());
}
// Add Card to matched items
function matched(that) {
  that.find(".open").addClass("match");
}
// Empty the open list
function empty() {
  open.length = 0;
}
// Hide Card that not match
function notMatched(that) {
  that.find(".open").removeClass("show open");
}
//Display the moves
function movesFun(x) {
  let words = "<span class=moves> Moves: " + x + "</span>"
  $("span.moves").html(words);
}
// Display's the final score
function finalScore() {
  openModal();
}
// Initialize the game
function init() {
  additionCard(listCard);
  movesFun(moves);
}
// Restart Game
function restartGame(array) {
  $('div.restart').click(function() {
    location.reload();
});

}
// Rating Performance
function rating() {
  if ((moves >= 16) && (moves <=21)) {
    starWinner = 3;
  } else if((moves >= 22) && (moves <=32)) {
    $(".fa-star").eq(2).remove(".fa");
    starWinner = 2;
  } else if (moves >= 36) {
    $(".fa-star").eq(1).remove(".fa");
    starWinner = 1;
  }

}
// Count the time during Game
function timer(x) {
  if ((moves === 1) && (x < 8)) {
    var initialDate = new Date();
    setInterval(function() {
        var currentDate = new Date();
        $("#downtime").html( Math.round((currentDate - initialDate)/1000));
        winTime = Math.round((currentDate - initialDate)/1000);
    }, 1000);

  } else {
    return winTime;

  }

}

// Game starts!
init();
// Game restarts!
restartGame();

// The main event listener for the game interaction
$(".deck").find(".card").on("click", function() {
  if ($(this).hasClass("match") || $(this).hasClass("show open")) { return true;}
  display($(this));
  addOpen($(this));
  moves++;
  timer(matchedList.length);
  movesFun(moves);
  if (open[0] === open[1] && open.length > 1) {
    matched($(".deck"));
    matchedList.push($(this).html());
    empty();
  } else if (open.length === 1) {
    return true;
  } else {
    setTimeout( function() {
      notMatched($(".deck"));
  }, 800);
  empty();
}

rating();

// Here's  the main if statement where it executes whene a winner is found
  if (matchedList.length === 8) {
    setTimeout( function() {
    finalScore();
  }, 200);
    if (starWinner === 3) {
      $(".modalContent").append("Your rating is: <span> 3 stars!!! </span>");
    } else if (starWinner === 2) {
      $(".modalContent").append("Your rating is: <span> 2 stars!! </span>");
    } else if (starWinner === 1){
      $(".modalContent").append("Your rating is: <span> ...kinda poor... \nBut there you go 1 star! </span>");
    }
    $(".modalContent").append("Your time was: " + winTime + "secs");
    $(".modalContent").append("<button id=\"modalBtn\" class=\"button\">Sure!</button>");
    $("#downtime").remove();
    $("#modalBtn").on("click", function() {
      location.reload();
    })

  }

});



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
