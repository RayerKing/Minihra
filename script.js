// tlačítko úvodní (Kouzelné tlačítko)
const magicButton = document.getElementById("start");
// text na úvodní stránce (Jmenuji se...)
const textHlavniStranky = document.getElementById("textHlavniStranky");
// pravidla hry
const pravidla = document.getElementById("vysvetleni");
// tlačítko pro navrácení se
const endButton = document.getElementById("endButton");
// navbar
const navbar = document.getElementById("navbar");
// sekce hry
const game = document.getElementById("game");
// div pro komentář
const komentar = document.querySelector(".komentar");
//  komentář ke hře, co se stalo
const komentarText = document.getElementById("komentarText");
// mraky
const mraky = document.querySelector(".mraky");
// tlačítko pro konec hry
const finalButton = document.getElementById("finalButton");
// button po prohře
const restart = document.getElementById("restart");
// welcome section
const welcome = document.getElementById("welcome-section");
// načtení hráče
let player = document.querySelector(".gamePlayer");
// pro pohyb z CSS
let playerMovement = parseInt(
  window.getComputedStyle(player).getPropertyValue("left")
);
// div pro konecHry
const defeatDiv = document.querySelector(".defeatGame");
// score
let score = 0;
let scoreSpan = document.getElementById("score");
// život
let life = 3;
const srdce1 = document.getElementById("srdce1");
const srdce2 = document.getElementById("srdce2");
const srdce3 = document.getElementById("srdce3");
//drop věcí v poli
const pole = [
  "dropHtml",
  "dropCss",
  "dropJs",
  "dropBug",
  "dropHeart",
  "dropRandom",
];
//const pole = ["dropRandom"];

// načtení chytaných věcí
const dropHtml = document.getElementById("dropHtml");
const dropJs = document.getElementById("dropJs");
const dropCss = document.getElementById("dropCss");
const dropBug = document.getElementById("dropBug");
const dropHeart = document.getElementById("dropHeart");
const dropRandom = document.getElementById("dropRandom");
// interval
let interval;
let vypocetOkna;

// proměnné, které se budou měnit
let pohybPlayer;
let dropSpeed;
let spawnTime;
let ovladani;

// funkce pro zobrazení pravidel hry
function tabulka() {
  textHlavniStranky.style.display = "none";
  navbar.style.display = "none";
  magicButton.innerText = "Hrát?";
  pravidla.style.display = "block";
  magicButton.removeEventListener("click", konec);
  magicButton.removeEventListener("click", tabulka);
  magicButton.addEventListener("click", startHry);
}

// funkce pro ukončení pravidel hry
function konec() {
  komentar.style.display = "none";
  magicButton.style.display = "block";
  textHlavniStranky.style.display = "block";
  magicButton.innerText = "Kouzelné tlačítko";
  pravidla.style.display = "none";
  navbar.style.display = "flex";
  game.style.display = "none";
  magicButton.removeEventListener("click", startHry);
  magicButton.addEventListener("click", tabulka);
  //console.log("Odebírám starthry, přidávám tabulku");
  welcome.style.display = "flex";
  //console.log("volám funkci konec");
  clearInterval(interval);
}

// funkce pro startHry
function startHry() {
  mraky.style.display ="flex";
  komentar.style.display = "block";
  komentarText.innerText = "";
  srdce1.style.display = "flex";
  srdce2.style.display = "flex";
  srdce3.style.display = "flex";
  life = 3;
  defeatDiv.style.display = "none";
  score = 0;
  scoreSpan.innerText = score;

  defaultOption();

  // pro testování
  //spawn();

  interval = setInterval(spawn, spawnTime);

  magicButton.style.display = "none";
  finalButton.style.display = "block";
  pravidla.style.display = "none";
  welcome.style.display = "none";

  game.style.display = "flex";

  magicButton.removeEventListener("click", startHry);
  magicButton.addEventListener("click", konec);
  //console.log("Odebírám starthry, přidávám tabulku");
  //console.log("volám funkci startHry");
  herniOknoSirka();
  playerMovement = vypocetOkna / 2 - 55;
  player.style.left = playerMovement + "px";
  //console.log("Hráčova poloha: " + playerMovement);
}

function herniOknoSirka() {
  const gameWindow = document.querySelector(".gameWindow");
  vypocetOkna = gameWindow.offsetWidth;
  //console.log("Okno je široké: " + vypocetOkna);
}

//Funkce pro pohyb hráče
function movement(e) {
  if (ovladani) {
    if (e.key == "ArrowLeft") {
      playerLeft();
    }

    if (e.key == "ArrowRight") {
      playerRight();
    }
  } else {
    if (e.key == "ArrowLeft") {
      playerRight();
    }

    if (e.key == "ArrowRight") {
      playerLeft();
    }
  }
}

// Funkce pro pohyb doleva
function playerLeft() {
  if (playerMovement > 0) {
    playerMovement -= pohybPlayer;
    player.style.left = playerMovement + "px";
  }
}

function playerRight() {
  if (playerMovement < vypocetOkna - 100) {
    // console.log("Vypocet okna v playerRight: " + vypocetOkna);
    playerMovement += pohybPlayer;
    player.style.left = playerMovement + "px";
  }
}

// funkce pro spawn
function spawn() {
  // pro určení dropu
  const randomPole = pole[Math.floor(Math.random() * pole.length)];
  const vzor = document.getElementById(randomPole);
  // console.log(vzor);
  // vytvoření clonu
  const clone = vzor.cloneNode(true);
  clone.removeAttribute("id");
  clone.setAttribute("data-type", randomPole);
  // console.log("Typ klonu:", clone.getAttribute("data-type"));
  clone.classList.add("dropItem");
  //  console.log("clone je " + randomPole);

  document.querySelector(".gameWindow").appendChild(clone);
  // určení random pozice na ose x
  clone.style.position = "absolute";
  clone.style.left = Math.floor(Math.random() * (vypocetOkna - 100)) + "px";
  clone.style.top = "0px";

  let top = 0;
  // funkce pro pohyb dolu
  function pohybdolu() {
    top += dropPixel;
    clone.style.top = top + "px";
    const type = clone.getAttribute("data-type");
    const hitBoxPlayer = player.getBoundingClientRect();
    const hitBoxClone = clone.getBoundingClientRect();
    const windowBox = document
      .querySelector(".gameWindow")
      .getBoundingClientRect();
    const kolize = !(
      hitBoxClone.bottom < hitBoxPlayer.top ||
      hitBoxClone.top > hitBoxPlayer.bottom ||
      hitBoxClone.right < hitBoxPlayer.left ||
      hitBoxClone.left > hitBoxPlayer.right
    );
    //   console.log(hitBoxClone.top + "clone");
    //   console.log(windowBox.bottom + "window");
    //podmínka pro odstranění clonu, když vypadne z obrazovky
    if (hitBoxClone.top > windowBox.bottom) {
      //   console.log("Mažu clone");
      clearInterval(fallingInterval);
      clone.remove();

      if (type !== "dropBug" && type !== "dropHeart" && type !== "dropRandom") {
        // funkce pro ukončení hry
        defeat();
      }
    } // podmínka klonu, když se střetne s hráčem
    else if (kolize) {
      if (type == "dropBug") {
        defeat();
        clearInterval(fallingInterval);
        clone.remove();
      }
      //podmínka, co se stane, když chytne srdce
      else if (type == "dropHeart") {
        clearInterval(fallingInterval);
        clone.remove();

        if (life == 3) {
          score++;
          scoreSpan.innerText = score;
        } else if (life == 2) {
          life++;
          srdce3.style.display = "flex";
        } else if (life == 1) {
          srdce2.style.display = "flex";
          life++;
        }
      } else if (type == "dropRandom") {
        clearInterval(fallingInterval);
        clone.remove();
        const upgradePole = [
          betraylKey,
          fasterPlayer,
          fasterDrop,
          fasterSpawn,
          slowerPlayer,

          slowerDrop
        ];
        const randomUpgrade =
          upgradePole[Math.floor(Math.random() * upgradePole.length)];

        randomUpgrade();
      } else {
        clearInterval(fallingInterval);
        clone.remove();
        score++;
        scoreSpan.innerText = score;
      }
    }
  }

  const fallingInterval = setInterval(pohybdolu, dropSpeed);
}
//když člověk prohraje
function defeat() {
  if (life == 3) {
    life--;
    srdce3.style.display = "none";
  } else if (life == 2) {
    life--;
    srdce2.style.display = "none";
  } else if (life == 1) {
    life--;
    srdce1.style.display = "none";
    clearInterval(interval);
    
    defeatDiv.style.display = "block";
    document.querySelectorAll(".dropItem").forEach((el) => el.remove());
    const scoreVypis = document.getElementById("scoreOdstavec");
    scoreVypis.innerHTML = `Tvé skóre bylo: <strong>${score}</strong>`;
  }
}

// default hodnoty
function defaultOption() {
  pohybPlayer = 15;
  spawnTime = 2600;
  dropSpeed = 34;
  dropPixel = 5;
  ovladani = true;
  console.log("Dávám základní hodnoty pro hru");
  console.log("Pohyb hráče: " + pohybPlayer);
  console.log("Spawn Time: " + spawnTime);
  console.log("DropSpeed: " + dropSpeed);
}
//definování random funkcí
// zvýšení rychlosti hráče
function fasterPlayer() {
  if (pohybPlayer > 35) {
    bonusScore();
  } else {
    pohybPlayer += 5;
    const hlaska = [
      "Někdo měl kafe navíc!",
      "Flash by záviděl.",
      "Zpomalení je pro slabochy.",
      "Překročil jsi rychlostní limit!",
      "Teď jsi nepolapitelný!"
    ];
    const vybranaHlaska = hlaska[Math.floor(Math.random() * hlaska.length)];
    if (vybranaHlaska === "Překročil jsi rychlostní limit!") {
  score--;
  scoreSpan.innerText = score;
}

    komentarText.innerText = vybranaHlaska;
  }
}
// rychlejší padání dropu
function fasterDrop() {
  if (dropSpeed < 26) {
    bonusScore();
  } else {
    dropSpeed -= 3;
    const hlaska = [
      "Není čas vysvětlovat - chytej!",
      "Aspoň to nebude nuda... chvíli.",
      "Tohle je speedrun... tak makej",
      "Padá to. Vážně. Rychle.",
      "Gravitace má svůj den!",
    ];
    const vybranaHlaska = hlaska[Math.floor(Math.random() * hlaska.length)];
    komentarText.innerText = vybranaHlaska;
  }
}
// rychlejší spawnování
function fasterSpawn() {
  if (spawnTime < 1500) {
    bonusScore();
  } else {
    spawnTime -= 500;
    const hlaska = [
      "Spawnfest začíná!",
      "Další? A další?!",
      "Mozek: přetížen. Palce: spocené.",
      "Doufám, že sis nechtěl odpočinout.",
      "Zatím žiješ? Well Done",
    ];
    const vybranaHlaska = hlaska[Math.floor(Math.random() * hlaska.length)];
    komentarText.innerText = vybranaHlaska;
  }
}
// zpomalení hráče
function slowerPlayer() {
  if (pohybPlayer < 15) {
    bonusScore();
  } else {
    pohybPlayer -= 5;
    const hlaska = [
      "A najednou je z tebe důchodce.",
      "Ztratil jsi chuť do života?",
      "Tvůj stín tě předběhl.",
      "Možná bys měl požádat šneka o pomoc.",
      "Želva pozdravuje z cíle!",
    ];
    const vybranaHlaska = hlaska[Math.floor(Math.random() * hlaska.length)];
    komentarText.innerText = vybranaHlaska;
  }
}
// přidání dvojnásobku bodů
function bonusScore() {
  console.log("Přidání bonusu");
  score += 10;
  scoreSpan.innerText = score;
  const hlaska = [
      "Jackpot! Desítka k dobru!",
      "Přesně do černého!",
      "Kdo neriskuje, nevyhraje!",
      "Série pokračuje! Body zdarma!",
      "Dáreček za snahu!",
    ];
    const vybranaHlaska = hlaska[Math.floor(Math.random() * hlaska.length)];
    komentarText.innerText = vybranaHlaska;
}
// pomalejší drop
function slowerDrop() {
  if (dropSpeed > 34) {
    bonusScore();
  } else {
    dropSpeed += 5;
    const hlaska = [
      "Teď to zvládne i babička!",
      "Režim pro batolata aktivován.",
      "Pomaleji už to nepůjde.",
      "Teď už to nejde nestihnout.",
      "Snad to spadne dřív než GTA 6",
    ];
    const vybranaHlaska = hlaska[Math.floor(Math.random() * hlaska.length)];
    komentarText.innerText = vybranaHlaska;
  }
}
// změna kláves TODO
function betraylKey() {
  if (ovladani) {
    ovladani = false;
    const hlaska = [
      "Ovládání přešlo na temnou stranu!",
      "Vlevo, vpravo? Zkus hádat.",
      "Hraní je přeci zábava.",
      "Autor: Hlava mi taky bouchla.",
      "Troll aktivován. Have fun!",
    ];
    const vybranaHlaska = hlaska[Math.floor(Math.random() * hlaska.length)];
    komentarText.innerText = vybranaHlaska;
  } else {
    ovladani = true;
    const hlaska = [
      "A je to zpět! Už zase víš, co děláš.",
      "Klid a mír... aspoň na chvíli.",
      "Už to není obrácený. Nebo jo? Ne... jo? Ne.",
      "Konečně to zase poslouchá!",
      "Pozor! Překvapení!",
    ];
    const vybranaHlaska = hlaska[Math.floor(Math.random() * hlaska.length)];
    komentarText.innerText = vybranaHlaska;
  }
}
// Po kliknutí na Kouzelné tlačítko
magicButton.addEventListener("click", tabulka);
// Po kliknutí na křížek
endButton.addEventListener("click", konec);
// FinalKonec button ve hře
finalButton.addEventListener("click", konec);
// Ovládání hráče
document.addEventListener("keydown", movement);
// Button pro restart
restart.addEventListener("click", startHry);
