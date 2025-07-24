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

// funkce pro zobrazení pravidel hry
function tabulka () {
    textHlavniStranky.style.display ="none";
    navbar.style.display = "none";
    magicButton.innerText="Hrát?";
    pravidla.style.display = "block";
    magicButton.removeEventListener("click", konec);
    magicButton.removeEventListener("click", tabulka);
    magicButton.addEventListener("click", startHry);
    console.log("Odebírám tabulku, přidávám startHry");
    
}

// funkce pro ukončení pravidel hry
function konec (){
    magicButton.style.display = "block";
    textHlavniStranky.style.display ="block";
    magicButton.innerText="Kouzelné tlačítko";
    pravidla.style.display = "none";
    navbar.style.display = "flex";
    game.style.display = "none";
    magicButton.removeEventListener("click", startHry);
    magicButton.addEventListener("click", tabulka);
    console.log("Odebírám starthry, přidávám tabulku");
    welcome.style.display = "flex";
    
}
// funkce pro startHry
function startHry(){
    magicButton.style.display = "none";
    finalButton.style.display = "block";
    pravidla.style.display = "none";
    welcome.style.display = "none";
    
    game.style.display = "flex";
    

    
    
    magicButton.removeEventListener("click", startHry);
    magicButton.addEventListener("click", konec);
    console.log("Odebírám starthry, přidávám tabulku");    

}

// Po kliknutí na Kouzelné tlačítko
magicButton.addEventListener("click", tabulka);
// Po kliknutí na křížek
endButton.addEventListener("click", konec);
// FinalKonec button ve hře
finalButton.addEventListener("click", konec);



