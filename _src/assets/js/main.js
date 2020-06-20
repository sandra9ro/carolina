'use strict';
console.log('>> Ready :)');

const cards = document.querySelector('.js-cards');
const button = document.querySelector('.js-button');
const numberOfCards = document.querySelectorAll('.js-numberOfCards');
const card = document.querySelector('.js-card');


//Variables para crear el tablero
// let cardsList = [];
let tableSize = [];
let newClass = "";

//Variables para jugar
let playingCards = [];
let winningCards = 0;



//   I N I C I O   /   P R E P A R A C I Ó N    D E L    J U E G O


// Función para ordenar las tarjetas aleatoriamente
// Función obtenida de: https://www.etnassoft.com/2011/02/15/manipulacion-de-arrays-en-javascript/ 

Array.prototype.shuffle = function(){
  for (var i = this.length-1; i>0;i--){
    var j = Math.floor(i * Math.random());
    var x = this[j];
    this [j] = this[i];
    this[i] = x;
  }
  return this;
}

function shuffleCards(){
  tableSize.shuffle();
}

// Painting the cards
// Bucle que pinta la lista de imágenes que se haya seleccionado


function paintCards() {
  let cardsPainting = "";

  cardsPainting += `<ul class="cards ${newClass}">`;
  for (let i = 0; i < tableSize.length; i++) {
    cardsPainting += `<li class="card"><div class="img-container js-card">
    <img src="${tableSize[i].foto}" alt="${tableSize[i].nombre}" class="card-img">
    </div></li>`;
  }
  cardsPainting += '</ul>';

  cards.innerHTML = cardsPainting; 
  listenToCard()
}


//Functions related to listening

function handleButton() {
  winningCards = 0;
  DetectCheckedOption();
  // getServerData();
}


function DetectCheckedOption(){
  for(let i=0; i< numberOfCards.length; i++){
    if (numberOfCards[i].checked === true){
      tableSize = eval(numberOfCards[i].value);
      newClass = numberOfCards[i].value;
    }    
  }
  shuffleCards();
  paintCards();
}

function listenToButtton() {
  button.addEventListener("click",handleButton);
}





//   D U R A N T E       E L       J U E G O



function openCards(ev) {
  ev.target.classList.add("open");
  if (playingCards.length < 2){
    playingCards.push(ev.target)
  }  
}


function compareCards(){   
  if (playingCards.length == 2 && playingCards[0].alt == playingCards[1].alt){
    playingCards =[];
    winningCards += 2;
  }else if(playingCards.length == 2 && playingCards[0].alt !== playingCards[1].alt)
  {
    setTimeout(()=>{for(let i=0;i<playingCards.length;i++){
      playingCards[i].classList.remove("open");
      };
      playingCards = [];
    }, 500);
  }
  listenToCard();
}


function alertWin(){
  if (winningCards === tableSize.length){
    // alert(`¡¡¡ Felicidades, has ganado :D !!!`);
    winningCards = 0;
  }
}


//Función para que las cartas sólo sean escuchadas cuando están cerradas
function isClosed(ev){
  if(ev.target.classList.contains("open") === false){
    openCards(ev);
    compareCards(ev);
  }
}


function play(ev){
  isClosed(ev);
  alertWin();
}

function listenToCard(){
 cards.addEventListener("click", play);
}

listenToButtton();
