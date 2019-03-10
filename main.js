const holes = document.querySelectorAll( '.hole' );
const scoreBoard = document.querySelector( '.gameScore' );
const moles = document.querySelectorAll( '.mole' );
const startGameBtn = document.querySelector( '#startGameBtn' );
let lastHole;
let timeUp = false;
let score = 0;
let currentyPlaying = false;

// Mängu loogika
function randomTime( min, max ) {
    return Math.round( Math.random() * ( max - min ) + min );
}

function randomHole( holes ) {
    const index = Math.floor( Math.random() * holes.length );
    const hole = holes[index];
    if ( hole == lastHole ) {
        return randomHole( holes );
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime( 200, 1000 );
    const hole = randomHole( holes );
    hole.classList.add( 'up' );
    setTimeout( () => {
        hole.classList.remove( 'up' );
        if ( !timeUp ) peep();
    }, time );
}

function startGame() {
    if ( !currentyPlaying ) {
        currentyPlaying = true;
        scoreBoard.textContent = 0;
        timeUp = false;
        score = 0;
        peep();
        setTimeout( () => timeUp = true, 10000 );
        setTimeout( () => currentyPlaying = false, 10000 );
    }
}
startGameBtn.addEventListener( 'click', startGame );

function bonk( e ) {
    if ( !e.isTrusted ) return;
    score++;
    this.classList.remove( 'up' );
    scoreBoard.textContent = score;

}

moles.forEach( mole => mole.addEventListener( 'click', bonk ) );

// Stopperi loogika
const countDown = document.getElementById( "timeLeft" );
var timeleft = 10;
function startTimer() {

    countDown.innerHTML = timeleft + " Aega jäänud";
    timeleft -= 1;
    if ( timeleft <= 0 ) {
        clearInterval( downloadTimer );
        document.getElementById( "countdown" ).innerHTML = "Lõppenud"
    }
}


// Edetabeli loogika.
