const augud = document.querySelectorAll( ".auk" ); // Augud, mis on väljakul
const edetabel = document.querySelector( ".skoor" ); // Skoor
const mutid = document.querySelectorAll( ".mutt" ); // Mutimehed.
let viimaneAuk; // Viimane auk, kust mutimees välja piilus.
let aegTäis = false; // Ütleb, kas mäng saab läbi või mitte.
let skoor = 0; // Mängija skoor
let äraVajutaMituKorda = false;
const AEG = 20000;
const secondsElement = document.querySelector( '.sekundit' );
function suvalineAeg( min, max ) {
    // See funktsioon annab meile juhusliku aja.
    return Math.round( Math.random() * ( max - min ) + min );
}

function suvalineAuk( augud ) {
    // See funktsioon annab meile suvalise augu, kust mutimees välja hüppab.
    const indeks = Math.floor( Math.random() * augud.length );
    const auk = augud[indeks];
    if ( auk === viimaneAuk ) {
        // Meil võib tekkida olukord, kus meil mutionu piilub uuesti august välja, mida me ei soovi.
        return suvalineAuk( augud );
    }
    viimaneAuk = auk;
    return auk;
}

function mutiOnuPiilub() {
    const aeg = suvalineAeg( 200, 1000 ); // Kutsume välja eelnevalt tehtud funktsiooni
    const auk = suvalineAuk( augud ); // Kutsume välja eelnevalt tehtud funktsiooni
    auk.classList.add( "piilub" ); // Teeme cssi abiga mutionu nähtavaks

    setTimeout( function () {
        auk.classList.remove( "piilub" );

        if ( !aegTäis ) {
            mutiOnuPiilub();
        }
    }, aeg );
}

function stardiMänguga() {
    if ( !äraVajutaMituKorda ) {
        äraVajutaMituKorda = true;
        edetabel.textContent = 0;
        aegTäis = false;
        skoor = 0;
        mutiOnuPiilub();


        // Timer
        let timeleft = 20;
        let downloadTimer = setInterval( function () {
            document.querySelector( ".countdown" ).innerHTML = timeleft + " sekundit jäänud.";
            timeleft--;
            if ( timeleft <= 0 ) {
                clearInterval( downloadTimer );
                document.querySelector( ".countdown" ).innerHTML = "Aeg Läbi"
            }
        }, 1000 );


        setTimeout( function () {
            aegTäis = true;
            äraVajutaMituKorda = false;
        }, AEG );
    }
}

function pihtas( e ) {
    skoor += 1;

    this.parentNode.classList.remove( "piilub" );

    edetabel.textContent = skoor;
}
const proxyurl = "https://salty-headland-41998.herokuapp.com/";

const baseUrl = 'https://whac-a-mole-677b1.firebaseio.com/usernam';
( function () {
    var cors_api_host = proxyurl;
    var cors_api_url = cors_api_host;
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
        var args = slice.call( arguments );
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec( args[1] );
        if ( targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host ) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply( this, args );
    };
} )();
fetch( baseUrl )
    .then( response => response.text() )
    .then( contents => console.log( contents ) )
    .catch( () => console.log( "Can’t access " + baseUrl + " response. Blocked by browser?" ) )

mutid.forEach( mutt => mutt.addEventListener( "click", pihtas ) );
