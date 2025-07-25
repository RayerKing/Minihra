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
// tlačítko pro konec hry
const finalButton = document.getElementById("finalButton");
// welcome section
const welcome = document.getElementById("welcome-section");
// načtení hráče
let player = document.querySelector(".gamePlayer");
// pro pohyb z CSS
let playerMovement = parseInt(
  window.getComputedStyle(player).getPropertyValue("left")
);
// pro zjištění kolize = porovnání souřadnic
let collision = parseInt(
  window.getComputedStyle(player).getPropertyValue("bottom")
);
// načtení chytaných věcí
const dropHtml = document.getElementById("dropHtml");
const dropJs = document.getElementById("dropJs");
const dropCss = document.getElementById("dropCss");
const dropBug = document.getElementById("dropBug");
// interval
let interval;

// funkce pro zobrazení pravidel hry
function tabulka() {
  textHlavniStranky.style.display = "none";
  navbar.style.display = "none";
  magicButton.innerText = "Hrát?";
  pravidla.style.display = "block";
  magicButton.removeEventListener("click", konec);
  magicButton.removeEventListener("click", tabulka);
  magicButton.addEventListener("click", startHry);
  console.log("Odebírám tabulku, přidávám startHry");
  console.log("volám funkci tabulka");
}

// funkce pro ukončení pravidel hry
function konec() {
  magicButton.style.display = "block";
  textHlavniStranky.style.display = "block";
  magicButton.innerText = "Kouzelné tlačítko";
  pravidla.style.display = "none";
  navbar.style.display = "flex";
  game.style.display = "none";
  magicButton.removeEventListener("click", startHry);
  magicButton.addEventListener("click", tabulka);
  console.log("Odebírám starthry, přidávám tabulku");
  welcome.style.display = "flex";
  console.log("volám funkci konec");
  clearInterval(interval);
}

// funkce pro startHry
function startHry(e) {
  // TODO vymyslet získání středu... a upravit okraje
  player.style.left = "300px";
  playerMovement = parseInt(
    window.getComputedStyle(player).getPropertyValue("left")
  );

  interval = setInterval(spawn, 5000);

  magicButton.style.display = "none";
  finalButton.style.display = "block";
  pravidla.style.display = "none";
  welcome.style.display = "none";

  game.style.display = "flex";

  magicButton.removeEventListener("click", startHry);
  magicButton.addEventListener("click", konec);
  console.log("Odebírám starthry, přidávám tabulku");
  console.log("volám funkci startHry");
}

//Funkce pro pohyb hráče
function movement(e) {
  if (e.key == "ArrowLeft") {
    console.log("doleva");
    playerLeft();
  }

  if (e.key == "ArrowRight") {
    console.log("doprava");
    playerRight();
  }
}

// Funkce pro pohyb doleva
function playerLeft() {
  playerMovement -= 15;
  player.style.left = playerMovement + "px";
}

function playerRight() {
  playerMovement += 15;
  player.style.left = playerMovement + "px";
}

// funkce pro spawn
function spawn() {
  const pole = ["dropHtml", "dropCss", "dropJs"];
  const randomPole = pole[Math.floor(Math.random() * pole.length)];
  const vzor = document.getElementById(randomPole);
  console.log(vzor);

  const clone = vzor.cloneNode(true);
  clone.removeAttribute("id");
  clone.classList.add("dropItem");
  console.log("clone je " + randomPole);

  document.querySelector(".gameWindow").appendChild(clone);

  clone.style.position = "absolute";
  clone.style.left = Math.floor(Math.random() * 500) + "px";
  clone.style.top = "0px";

  let top = 0;
  // funkce pro pohyb dolu
  function pohybdolu (){
    top += 5;
    clone.style.top = top + "px";
  }
  
  const fallingInterval = setInterval(pohybdolu, 30);
  

}

// Po kliknutí na Kouzelné tlačítko
magicButton.addEventListener("click", tabulka);
// Po kliknutí na křížek
endButton.addEventListener("click", konec);
// FinalKonec button ve hře
finalButton.addEventListener("click", konec);
// Ovládání hráče
document.addEventListener("keydown", movement);
