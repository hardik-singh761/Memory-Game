const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let tries = 0;
let time = 0;

const timer = document.querySelector(".time");
setInterval("Timer()", 1000);
function Timer() {
  time++;
  if (time > 59) {
    return (timer.innerHTML = `${Math.floor(time / 60)} m ${
      time - Math.floor(time / 60) * 60
    } s`);
  }
  timer.innerHTML = `${time} s`;
}

const flips = document.querySelector(".tries");
flips.innerHTML = `Flips: ${tries}`;

const refresh = document.querySelector(".refresh");
refresh.addEventListener("click", () => shuffleCard());

function flipCard(e) {
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCard(cardOneImg, cardTwoImg);
  }
}

function matchCard(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard === 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = "";
  disableDeck = false;
  tries = 0;
  flips.innerHTML = `Flips: ${tries}`;
  time = -1;
  Timer();
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  card.addEventListener("click", () => {
    tries++;
    flips.innerHTML = `Flips: ${tries}`;
    flipCard;
  });
});
