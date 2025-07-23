// tlačítko úvodní (Kouzelné tlačítko)
const magicButton = document.getElementById("start"); 
// text na úvodní stránce (Jmenuji se...)
const textHlavniStranky = document.getElementById("textHlavniStranky");
// pravidla hry
const pravidla = document.getElementById("vysvetleni");
// tlačítko pro navrácení se
const endButton = document.getElementById("endButton");

// funkce pro zobrazení pravidel hry
function tabulka () {
    textHlavniStranky.style.display ="none";
    magicButton.innerText="Hrát?";
    pravidla.style.display = "block";
}

// funkce pro ukončení pravidel hry
function konec (){
    textHlavniStranky.style.display ="block";
    magicButton.innerText="Kouzelné tlačítko";
    pravidla.style.display = "none";
}

// Po kliknutí na Kouzelné tlačítko
magicButton.addEventListener("click", tabulka);
// Po kliknutí na křížek
endButton.addEventListener("click", konec);
