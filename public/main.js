//-------------- Element du dom
let inputJ1 = document.querySelector("#j1");
let inputJ2 = document.querySelector("#j2");
let inputs = [inputJ1, inputJ2];
let formulaire = document.querySelector("#formulaireNoms");
let containerFormulaire = document.querySelector(".containerFormulaire");
let container_jeu = document.querySelector(".container_jeu");
let cases = document.querySelectorAll("td");
let modal = document.querySelector(".modal");


// -------------- Etat par défaut 
container_jeu.style.display = "none";

//  ----------------- Variables

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
const LENGTHTAB = 3;
let EtatJeu = new Array(LENGTHTAB);

// ------------------------ Fonctions

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

    for (let x = 0; x < EtatJeu.length; x++) {
        for(let y = 0; y < EtatJeu.length; y++){
            EtatJeu[x][y] = null;
        }
    }
}

function initGrillePion(){
    for(let i = 0; i < cases.length; i++){
        if(cases[i].firstChild)
            cases[i].innerHTML = "";
    }
}

function posX(pos){
    return (pos!= 0)?~~(pos/LENGTHTAB):0;;
}

function posY(pos){
    return (pos!= 0)?pos%LENGTHTAB:0;
}

function ajoutEtatJeu(pos, obj){
    
    let x = posX(pos);
    let y = posY(pos);
    EtatJeu[x][y] = obj;
    // A modif 
    if(verifWin(x,y) || morpionRempli()){
        if(modal.childElementCount == 0){
            let title = document.createElement("h2");
            let button = document.createElement("button")
            title.innerText = "Gagnée ou morpion rempli";
            button.innerText = "Rejouer";
            modal.append(title);
            modal.append(button);
            
        }
        modal.style.top = "300px";
        document.querySelector("button").addEventListener("click", () =>{
            console.log("entre");
            modal.style.top = "-300px";
            initgame();
            console.log(cases);
        });
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

function vertical(x,y){
    let newX = x;
    let alignement = 1;
    for(let i = 1; i < LENGTHTAB; i++){
        // Pion posé au centre de la ligne
        if(x != 1){
            newX = (x + i < LENGTHTAB)?x+i:x-i;
        }
        // Pion posé au extrémités
        else{
            newX = (newX + i < LENGTHTAB)?newX+i:newX-i;
        }
        // Si le pion posé et le pion à coté sont egaux incrémente l'alignement
        if(EtatJeu[x][y] == EtatJeu[newX][y]){
            alignement++;
        }
        else{
            break;
        }
    }
    return alignement;
}

function diagonal(x,y){
    let alignement = 0;
    let newX;
    let newY;
    if(x != y && !((x == 2 && y == 0) || (x == 0 && y == 2))){
        return alignement;
    }

    newX = x;
    newY = y;
    while(EtatJeu[x][y] == EtatJeu[newX][newY] && alignement < 3){
        alignement++;
        if(newX == newY){
            if(newX == 1){
                if(EtatJeu[newX][newY] == EtatJeu[newX-1][newY+1]){
                    newX--;
                    newY++;
                }
                else{
                   newX--;
                   newY--;
                }
            }
            else if(newX == 0){
                newX = 2;
                newY = 2;
            }
            else{
                newX--;
                newY--;
            }
        }
        else if(newX == 0 && newY == 2){
            newX = 2;
            newY = 0;
        }
        else{
            newX--;
            newY++;
        }
        
    }  
    return alignement;
    
}


    

function verifWin(x,y){
    if(horizontal(x,y) == 3 || vertical(x,y) == 3 || diagonal(x,y) ==3){
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
// ----------------------------------------- Event

function addEventCasePion(){
    for(let i = 0; i < cases.length; i++){
        cases[i].addEventListener("click",() => {
            let x = posX(i);
            let y = posY(i);
            if(EtatJeu[x][y] == null){
                cases[i].innerHTML = "<img src=\" " + tour.adressePion + "\">";
                ajoutEtatJeu(i,tour);
                chgtour();
                this.removeEventListener("click",arguments.callee);
            }
            else{
                document.querySelector(".instructions").innerHTML = "Posez votre piece dans un emplacement vide, "+tour.nom;
            }
            
        });
    }
}





function startGame(){
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
            //Gestion formulaire
            styleInputEmpty(inputJ1,"silver");
            styleInputEmpty(inputJ2,"silver");
            joueur1.nom = inputJ1.value;
            joueur2.nom = inputJ2.value;
            initgame();
            addEventCasePion();
        }
        
    });
}

function initgame(){
    containerFormulaire.style.display = "none";
    initEtatJeu();
    initGrillePion();
    tour = playerStart();
    let p = document.querySelector(".instructions");
    p.innerHTML = "<strong>" + tour.nom + "</strong> commence...";
    container_jeu.prepend(p);
    container_jeu.style.display = "flex";
}

// MAIN
startGame();



