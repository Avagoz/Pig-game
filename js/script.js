'use strict';

const player0 = 0;
const player1 = 1;
const playerActive = () => {
  return player0Element.classList.contains('player--active')
    ? player0
    : player1;
};

const random = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

//Elements selection
const totalScore0Element = document.getElementById('score--0');
const totalScore1Element = document.getElementById('score--1');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const playerName0 = document.getElementById('name--0');
const playerName1 = document.getElementById('name--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

//Sounds
const audio = new Audio();

// Change player function
const switchPlayer = function () {
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//Game initial conditions
const startCondition = function () {
  totalScore0Element.textContent = 0;
  totalScore1Element.textContent = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;

  diceElement.classList.add('hidden');
  btnRoll.disabled = false;
  btnHold.disabled = false;
  playerName0.textContent = 'Игрок 1';
  playerName1.textContent = 'Игрок 2';

  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
  player0Element.classList.remove('player--winner', 'player--loser');
  player1Element.classList.remove('player--winner', 'player--loser');
};

startCondition();

//Button Roll
btnRoll.addEventListener('click', function () {
  const currentScoreElement = document.getElementById(
    `current--${playerActive()}`
  );
  let sum = Number(currentScoreElement.textContent);
  const roll = random();
  diceElement.classList.remove('hidden');
  diceElement.setAttribute('src', `img/dice${roll}.png`);
  if (roll !== 1) {
    sum += roll;
    currentScoreElement.textContent = sum;
  } else {
    audio.src = 'sounds/next.mp3';
    audio.play();
    currentScoreElement.textContent = 0;
    switchPlayer();
  }
});

//Button Hold
btnHold.addEventListener('click', function () {
  const currentScoreElement = document.getElementById(
    `current--${playerActive()}`
  );
  const totalScoreElement = document.getElementById(`score--${playerActive()}`);
  let totalScore = Number(totalScoreElement.textContent);
  totalScore += Number(currentScoreElement.textContent);
  totalScoreElement.textContent = totalScore;
  currentScoreElement.textContent = 0;
  if (totalScore > 99) {
    audio.src = 'sounds/endgame.mp3';
    audio.play();
    document
      .querySelector(`.player--${Number(!playerActive())}`)
      .classList.add('player--loser');
    document
      .querySelector(`.player--${playerActive()}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${playerActive()}`)
      .classList.remove('player--active');
    document.getElementById(`name--${playerActive()}`).textContent +=
      ' Победил';
    document.getElementById(`name--${Number(!playerActive())}`).textContent +=
      ' Проиграл';
    btnRoll.disabled = true;
    btnHold.disabled = true;
    diceElement.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

//Button New game
btnNew.addEventListener('click', startCondition);
