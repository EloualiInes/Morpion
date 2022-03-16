// Element du dom
let inputJ1 = document.querySelector("#j1");
let inputJ2 = document.querySelector("#j2");
let inputs = [inputJ1, inputJ2];
let formulaire = document.querySelector("#formulaireNoms");
let containerFormulaire = document.querySelector(".containerFormulaire");
let container_jeu = document.querySelector(".container_jeu");
let table = document.querySelector(".container_jeu");
let cases = document.querySelectorAll("td");
let EtatJeu = [];

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
// function verifWin(pos){
//     let alignement = 0;
//     if(EtatJeu[pos] == EtatJeu[pos - 3] && EtatJeu[pos] == EtatJeu[pos + 3]){

//     }
//     return false;
// }
// function verifEndPartie(){
//     let cpt = 0;
//     for(let i = 0; i < cases.length;i++){
//         if(cases[i].innerHTML == ""){
//             cpt++;
//         }
        
//     }
//     console.log("il y a " + cpt + "cases vides");
// }


// Event
for(let i = 0; i < cases.length; i++){
    cases[i].addEventListener("click",() => {
        cases[i].innerHTML = "<img src=\" " + tour.adressePion + "\">";
        EtatJeu[i] = tour;
        // verifier si le symbole est répété plusieurs fois
        // verifWin(i);
        chgtour();
        // verifEndPartie();
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
        tour = playerStart();
        console.log(joueur1);
        p.innerHTML = "<strong>" + tour.nom + "</strong> commence...";
        container_jeu.prepend(p);
        container_jeu.style.display = "flex";
    }
    
});

