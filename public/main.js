// Element du dom
let inputJ1 = document.querySelector("#j1");
let inputJ2 = document.querySelector("#j2");
let formulaire = document.querySelector("#formulaireNoms");
let containerFormulaire = document.querySelector(".containerFormulaire");
let container_jeu = document.querySelector(".container_jeu");
let table = document.querySelector(".container_jeu");

// Etat par défaut 
container_jeu.style.display = "none";

// Variables
let nomJ1, nomJ2;


// Fonctions

function playerStart(){
    return (Math.floor(Math.random()*2) == 0?nomJ1:nomJ2);
}

function styleInputEmpty(input, color) {
    input.style.borderColor = color;
}




// Event

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
        nomJ1 = inputJ1.value;
        nomJ2 = inputJ2.value;
        containerFormulaire.style.display = "none";
        let p = document.createElement("p");
        p.innerText = "Le player " + playerStart() + " commence";
        container_jeu.prepend(p);
        container_jeu.style.display = "flex";
    }
    
});

