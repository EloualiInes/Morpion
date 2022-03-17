// Element du dom
let inputJ1 = document.querySelector("#j1");
let inputJ2 = document.querySelector("#j2");
let inputs = [inputJ1, inputJ2];
let formulaire = document.querySelector("#formulaireNoms");
let containerFormulaire = document.querySelector(".containerFormulaire");
let container_jeu = document.querySelector(".container_jeu");
let table = document.querySelector(".container_jeu");
let cases = document.querySelectorAll("td");


// Etat par défaut 
container_jeu.style.display = "none";

// Variables

let tour;
let joueur1 = {
    nom: "",
    pion:"croix",
    adressePion : "./public/pictures/croix.png"
};

let joueur2 = {
    nom: "",
    pion:"rond",
    adressePion : "./public/pictures/rond.png"
};
let LENGTHTAB = 3;
let EtatJeu = new Array(LENGTHTAB);

// Fonctions

function playerStart(){
    return (Math.floor(Math.random()*2) == 0?joueur1:joueur2);
}

function chgtour(){

    if (tour === joueur1) {
        tour = joueur2
    } else {
        tour = joueur1;
    }
    let p = document.querySelector(".instructions");
    p.innerHTML = "Au tour de <strong>" + tour.nom + "</strong>";
}

function styleInputEmpty(input, color) {
    input.style.borderColor = color;
}

// Etat Jeu
function initEtatJeu(){
    for(let i = 0; i < EtatJeu.length; i++){
        EtatJeu[i] = new Array(3);
    }
}

function ajoutEtatJeu(pos, obj){
    
    let x = (pos!= 0)?~~(pos/LENGTHTAB):0;
    let y = (pos!= 0)?pos%LENGTHTAB:0;
    EtatJeu[x][y] = obj;
    if(verifWin(x,y) || morpionRempli()){
        console.log("gagné or morpion rempli");
        // OUVERTURE pop pour le gain
    }
    
}

// Verifie l'alignement de trois symboles à l'horizotal
function horizontal(x,y){
    let newY = y;
    let alignement = 1;
    for(let i = 1; i < LENGTHTAB; i++){
        // Pion posé au centre de la ligne
        if(y != 1){
            newY = (y + i < LENGTHTAB)?y+i:y-i;
        }
        // Pion posé au extrémités
        else{
            newY = (newY + i < LENGTHTAB)?newY+i:newY-i;
        }
        // Si le pion posé et le pion à coté sont egaux incrémente l'alignement
        if(EtatJeu[x][y] == EtatJeu[x][newY]){
            alignement++;
        }
        else{
            break;
        }
    }
    return alignement;
}
function verifWin(x,y){
    if(horizontal(x,y) == 3){
        return true;
    }
    return false;
}

function morpionRempli(){
    for(let x = 0; x < EtatJeu.length; x++){
        for(let y = 0; y < EtatJeu.length; y++){
            if(EtatJeu[x][y] == null)
                return false;
        }
    }
    return true;
}
// Event
for(let i = 0; i < cases.length; i++){
    cases[i].addEventListener("click",() => {
        cases[i].innerHTML = "<img src=\" " + tour.adressePion + "\">";
        ajoutEtatJeu(i,tour);

        chgtour();
    });
}

formulaire.addEventListener("submit", (event) =>{
    event.preventDefault();

    if(inputJ1.value == "" && inputJ2.value == ""){
        styleInputEmpty(inputJ1,"red");
        styleInputEmpty(inputJ2,"red");
    }

    else if(inputJ1.value == "")
        styleInputEmpty(inputJ1,"red");
    
    else if(inputJ2.value == "")
        styleInputEmpty(inputJ2,"red");
    
    else{
        styleInputEmpty(inputJ1,"silver");
        styleInputEmpty(inputJ2,"silver");
        joueur1.nom = inputJ1.value;
        joueur2.nom = inputJ2.value;
        containerFormulaire.style.display = "none";
        let p = document.createElement("p");
        p.classList.add("instructions");
        initEtatJeu();
        tour = playerStart();
        console.log(joueur1);
        p.innerHTML = "<strong>" + tour.nom + "</strong> commence...";
        container_jeu.prepend(p);
        container_jeu.style.display = "flex";
    }
    
});

