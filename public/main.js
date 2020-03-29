const augud = document.querySelectorAll(".auk"); // Augud, mis on väljakul
const edetabel = document.querySelector(".skoor"); // Skoor
const mutid = document.querySelectorAll(".mutt"); // Mutimehed.
let viimaneAuk; // Viimane auk, kust mutimees välja piilus.
let aegTäis = false; // Ütleb, kas mäng saab läbi või mitte.
let skoor = 0; // Mängija skoor
let äraVajutaMituKorda = false;

const easyLevelBtn = document.querySelector(".js-easy-speed");
const mediumLevelBtn = document.querySelector(".js-normal-speed");
const hardLevelBtn = document.querySelector(".js-high-speed");
const stopGamebtn = document.querySelector(".js-stop-game");

const AEG = 20000;
const secondsElement = document.querySelector('.sekundit');
let downloadTimer;

let timer;

function suvalineAeg(min, max) {
    // See funktsioon annab meile juhusliku aja.
    return Math.round(Math.random() * (max - min) + min);
}

let gameSettings = {
    minSpeed: 1000,
    maxSpeed: 2000,
    time: 20,
    currentGame: null
}

easyLevelBtn.addEventListener("click", function () {
    gameSettings.minSpeed = 1000;
    gameSettings.maxSpeed = 2000;
})

mediumLevelBtn.addEventListener("click", function () {
    gameSettings.minSpeed = 300;
    gameSettings.maxSpeed = 1400;
})

hardLevelBtn.addEventListener("click", function () {
    gameSettings.minSpeed = 200;
    gameSettings.maxSpeed = 500;

})

stopGamebtn.addEventListener("click", function () {
    document.querySelector(".countdown").innerHTML = "Aeg Läbi";
    clearInterval(downloadTimer);
    window.clearTimeout(timer);    
    aegTäis = false;
})


function suvalineAuk(augud) {
    // See funktsioon annab meile suvalise augu, kust mutimees välja hüppab.
    const indeks = Math.floor(Math.random() * augud.length);
    const auk = augud[indeks];
    if (auk === viimaneAuk) {
        // Meil võib tekkida olukord, kus meil mutionu piilub uuesti august välja, mida me ei soovi.
        return suvalineAuk(augud);
    }
    viimaneAuk = auk;
    return auk;
}

function mutiOnuPiilub() {

    const aeg = suvalineAeg(gameSettings.minSpeed, gameSettings.maxSpeed); // Kutsume välja eelnevalt tehtud funktsiooni
    const auk = suvalineAuk(augud); // Kutsume välja eelnevalt tehtud funktsiooni

    auk.classList.add("piilub"); // Teeme cssi abiga mutionu nähtavaks

    setTimeout(function () {
        auk.classList.remove("piilub");

        if (!aegTäis) {
            mutiOnuPiilub();
        }
        
    }, aeg);

}

function stardiMänguga(endgame = false) {
    if (endgame) {
        console.log(downloadTimer);
    }

    if (!äraVajutaMituKorda) {
        äraVajutaMituKorda = true;
        edetabel.textContent = 0;
        aegTäis = false;
        skoor = 0;
        mutiOnuPiilub();

        let timeleft = 20;
        downloadTimer = setInterval(function () {
            document.querySelector(".countdown").innerHTML = timeleft + " sekundit jäänud.";
            timeleft--;
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                document.querySelector(".countdown").innerHTML = "Aeg Läbi"
            }
        }, 1000);

        window.timer = setTimeout(function () {
            aegTäis = true;
            äraVajutaMituKorda = false;
        }, gameSettings.time * 1000);
    }
}

function pihtas(e) {
    skoor += 1;
    this.parentNode.classList.remove("piilub");
    edetabel.textContent = skoor;
}

mutid.forEach(mutt => mutt.addEventListener("click", pihtas));
