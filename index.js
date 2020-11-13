let cards = ['2','3','4','5','6','7','8','9','10','A','J','K','Q'];
let notStanded = true;

document.querySelector('#hit').onclick = () => {
    if(notStanded){
        hit();
    }
}

document.querySelector('#stand').onclick = () => {
        stand();
}

document.querySelector('#deal').onclick = () => {
    reset();
}


function giveRandomCardValue(randomCard){
    switch(randomCard){
        case 'A':
            if(parseInt(document.querySelector('.player h1 span').innerHTML) < 11){
                return {value: 11, src: 'A'};
            }else{
                   return {value: 1, src: 'A'};
                }
        case 'J':
            return {value: 10, src: 'J'}
        case 'K':
            return {value: 10, src: 'K'}
        case 'Q':
            return {value: 10, src: 'Q'}
        default:
            return {value: parseInt(randomCard), src: randomCard};
    }
}

function calculateWinner(){
    let winner;
    if(parseInt(document.querySelector('.player h1 span').innerHTML) <= 21){
        if(parseInt(document.querySelector('.player h1 span').innerHTML) > parseInt(document.querySelector('.bot h1 span').innerHTML)){
            document.querySelector('#win').textContent++;
                win();
        }else if(parseInt(document.querySelector('.player h1 span').innerHTML) < parseInt(document.querySelector('.bot h1 span').innerHTML)){
            document.querySelector('#loss').textContent++;
            lose();
        }else if(document.querySelector('.bot h1 span').innerHTML == 'BUST!'){
            document.querySelector('#win').textContent++;
            win();
        }else if(parseInt(document.querySelector('.player h1 span').innerHTML) == parseInt(document.querySelector('.bot h1 span').innerHTML)){
            document.querySelector('#tie').textContent++;
        }
    }else{
        if(parseInt(document.querySelector('.bot h1 span').innerHTML) <= 21){
            document.querySelector('#loss').textContent++;
            lose();
        }else if(document.querySelector('.bot h1 span').innerHTML == 'BUST!'){
            document.querySelector('#tie').textContent++;
        }
    }
}

function win(){
    let winAudio = new Audio('./blackjack_assets/sounds/cash.mp3');
    winAudio.play();
    document.querySelector('#shketit').innerHTML = "You Win!";
    document.querySelector('#shketit').style.color = 'green';
}

function lose(){
    let loseAudio = new Audio('./blackjack_assets/sounds/aww.mp3');
    loseAudio.play();
    document.querySelector('#shketit').innerHTML = "You Lose!";
    document.querySelector('#shketit').style.color = 'red';
}

function addCard(randomCard,playerbot){
    let image = document.createElement('img');
    image.src = `./blackjack_assets/images/${randomCard.src}.png`;
    document.querySelector(`.${playerbot}-images-container`).append(image);
    document.querySelector(`.${playerbot} h1 span`).innerHTML = parseInt(document.querySelector(`.${playerbot} h1 span`).innerHTML) + randomCard.value;
}

function bust(playerbot){
    document.querySelector(`.${playerbot} h1 span`).innerHTML = `BUST!`;
    document.querySelector(`.${playerbot} h1 span`).style.color = `red`;
}

function reset(){
    notStanded = true;
    document.querySelector('.player h1 span').innerHTML = 0;
    document.querySelector('.player h1 span').style.color = 'white';
    document.querySelector('.bot h1 span').innerHTML = 0;
    document.querySelector('.bot h1 span').style.color = 'white';
    document.querySelector('#shketit').innerHTML = "Let's Play!";
    document.querySelector('#shketit').style.color = 'black';
    for(let i of Array.from(document.querySelector('.player-images-container').children)){
        i.remove();
    }
    for(let i of Array.from(document.querySelector('.bot-images-container').children)){
        i.remove();
    }
}

function hit(){
    let randomCard = giveRandomCardValue(cards[Math.floor(Math.random() * 12)]);
    if(parseInt(document.querySelector('.player h1 span').innerHTML) + randomCard.value <= 21){
        new Audio('./blackjack_assets/sounds/swish.m4a').play();
        addCard(randomCard,'player');
    }else if(document.querySelector('.player h1 span').innerHTML + randomCard.value > 21){
      notStanded = null;
      bust('player');
      calculateWinner();
    }
}

function stand(){
    if(notStanded){
        notStanded = false;
        let standInterval = setInterval(() => {
            let randomCard = giveRandomCardValue(cards[Math.floor(Math.random() * 12)]);
            if(parseInt(document.querySelector('.bot h1 span').innerHTML) <= 15  && parseInt(document.querySelector('.bot h1 span').innerHTML) + randomCard.value <= 21){
                new Audio('./blackjack_assets/sounds/swish.m4a').play();
                addCard(randomCard,'bot');
            }else if(parseInt(document.querySelector('.bot h1 span').innerHTML) >= 15 && parseInt(document.querySelector('.bot h1 span').innerHTML) <= 21){
              calculateWinner();
              clearInterval(standInterval);
            }else{
                calculateWinner();
                bust('bot'); 
                clearInterval(standInterval);
            }
        },1000);
    }
}