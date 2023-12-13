let result;
let computerMove
const winnerText  = document.querySelector('.js-winner'); 
const scoreText = document.querySelector('.js-score');
const announceText = document.querySelector('.js-announce'); 

let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    losses : 0,
    Tie : 0
}



function pickMove()
{
    const randomNumber = Math.random();
    
    if (randomNumber >=0 && randomNumber < 1/3){
        computerMove = 'Rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3 ){
        computerMove = 'Paper';
    } else if (randomNumber >= 2/3 && randomNumber <= 1 ){
        computerMove = 'Scissors';
    }
    return computerMove;

}

function playGame(playerMove= '',computerMove = ''){
  if (playerMove === 'Rock'){  
        if (computerMove ==='Rock') { result = 'Tie';}
        else if (computerMove === 'Paper'){ result = 'Win';}
        else if (computerMove === 'Scissors'){ result = 'Win';}
    }
    else if (playerMove === 'Scissor' ){
        if (computerMove ==='Rock'){result = 'Lose';}
        else if (computerMove === 'Paper'){ result = 'Win';}
        else if (computerMove === 'Scissors'){result = 'Tie';}
    } 
    else if (playerMove === 'Paper'){
        if (computerMove ==='Rock'){result = 'Win';}
        else if (computerMove === 'Paper'){ result = 'Tie';}
        else if (computerMove === 'Scissors'){result = 'Lose';}
    }
    if (result === 'Win'){score.wins += 1;}
        else if (result === 'Lose'){score.losses += 1;}
        else if (result === 'Tie') {score.Tie += 1} 
        localStorage.setItem('score',JSON.stringify(score))
        scoreText.innerHTML = `you chose ${playerMove} and computer chose ${computerMove}`;
        winnerText.innerHTML = `${result}`
        announceText.innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.Tie}`;   

     }

    function reset(){
        localStorage.removeItem('score');
        score = JSON.parse(localStorage.getItem('score')) || {
            wins : 0,
            losses : 0,
            Tie : 0
        }
       
        announceText.innerHTML = 'Lets see who can play better &#128527;  ';
        winnerText.innerHTML = 'Lets Play again!!!';
        scoreText.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.Tie} `
    } 
    let isAutoPlay=false;
    let intervalId;
    function autoplay(){
        if(!isAutoPlay) {
            intervalId = setInterval(function(){
                const playerM = pickMove();
                const computerM = pickMove();
                console.log(`Player-Move: ${playerM} and Computer-Move ${computerM}`)
                playGame(playerM,computerM);
    
            },5000)
    
            const stopButton = document.querySelector('.js-autoPlay')
            console.log(stopButton.innerHTML = 'Stop Auto Play');
            isAutoPlay=true;
        } else {
            clearInterval(intervalId);
            isAutoPlay = false;
            const stopButton = document.querySelector('.js-autoPlay')
            console.log(stopButton.innerHTML = 'Auto Play');
            reset()
        } 
    }

    