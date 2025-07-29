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
const pole = ["dropHtml", "dropCss", "dropJs", "dropBug"];


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
function startHry() {
  srdce1.style.display = "flex";
  srdce2.style.display = "flex";
  srdce3.style.display = "flex";
  life = 3;
  defeatDiv.style.display="none";
  score = 0;
  scoreSpan.innerText = score;
  // TODO vymyslet získání středu... a upravit okraje
  player.style.left = "300px";
  playerMovement = parseInt(
    window.getComputedStyle(player).getPropertyValue("left")
  );
  // pro testování
  //spawn();
  interval = setInterval(spawn, 2000);

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
  console.log(playerMovement);
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
  
  // pro určení dropu
  const randomPole = pole[Math.floor(Math.random() * pole.length)];
  const vzor = document.getElementById(randomPole);
  console.log(vzor);
  // vytvoření clonu
  const clone = vzor.cloneNode(true);
  clone.removeAttribute("id");
  clone.setAttribute("data-type", randomPole);
  console.log("Typ klonu:", clone.getAttribute("data-type"));
  clone.classList.add("dropItem");
  console.log("clone je " + randomPole);

  document.querySelector(".gameWindow").appendChild(clone);
  // určení random pozice na ose x
  clone.style.position = "absolute";
  clone.style.left = Math.floor(Math.random() * 500) + "px";
  clone.style.top = "0px";

  

  let top = 0;
  // funkce pro pohyb dolu
  function pohybdolu() {
    top += 5;
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
    console.log(hitBoxClone.top + "clone");
    console.log(windowBox.bottom + "window");
    //podmínka pro odstranění clonu, když vypadne z obrazovky
    if (hitBoxClone.top > windowBox.bottom) {
      console.log("Mažu clone");
      clearInterval(fallingInterval);
      clone.remove();
      
      if (type !== "dropBug")
      // funkce pro ukončení hry
      defeat();

    } // podmínka klonu, když se střetne s hráčem
    else if (kolize){
      if (type == "dropBug") {defeat();
        clearInterval(fallingInterval);
      clone.remove();
      } else {console.log("Přičítám skore");
      clearInterval(fallingInterval);
      clone.remove();
      score++;
      scoreSpan.innerText = score;}
      

    } 
  }

  const fallingInterval = setInterval(pohybdolu, 30);
}
//když člověk prohraje 
function defeat(){
  if (life == 3) {
    life--;
    srdce3.style.display="none";
  } else if(life == 2) {
    life--;
    srdce2.style.display="none";
  } else if(life == 1) {
    life--;
    srdce1.style.display = "none";
    clearInterval(interval);
  // připravit tlačítko pro restart
  console.log("Konec hry");
  defeatDiv.style.display = "block";
    document.querySelectorAll(".dropItem").forEach(el => el.remove());
  const scoreVypis = document.getElementById("scoreOdstavec");
  scoreVypis.innerHTML = `Tvé skóre bylo: <strong>${score}</strong>`;
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
