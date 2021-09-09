/*
Først laver vi nogle variable til at lave en appelsin:
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Appelsinen
let x = 0; 
let y = 725;
const rad = 20;
let xspeed = 4;
let yspeed = -10;
let newspeed;
const grav = 0.1; // acceleration i nedadgående retning, lige som tyngde
const col = [220,110,0];
const sound = new Audio();
sound.src = "assets/lyyd.mp3";
const willSound = new Audio();
willSound.src ="assets/aye.mp3";

// Turbanen
let turban;
let imgTurban;

// Øvrige
let tid = 150;
let scorePlayerone = 0;
let scorePlayertwo = 0;
let missed = 0;
let liv = 10;
let img;
let spilIgang = true;   //flag
let ranNum;

/* 
 * 
 */
function preload() {
    img = loadImage('assets/ship.png');
    imgTurban = loadImage('assets/pirate.png');
    dirt = loadImage('assets/virb.png');
    will = loadImage('assets/will.png');
    rum = loadImage('assets/rum.png');
    coom = loadImage('assets/coom.png');
    cirtus = loadImage('assets/cirtus.png')
}

function setup() {  // kører kun en gang, når programmet startes
    createCanvas(1440, 789);

    textAlign(CENTER, CENTER);

    newspeed = yspeed;
    x = rad;
    // parametrene til Kurv-konstruktøren er (x, y, bredde, dybde, speed)
    turban = new Kurv(670, 150, 150, 50, 15, imgTurban);
    umom = new Kurv(670, 150, 150, 50, 15, will);
}

function draw() {
    background(img);
    
    if (spilIgang) {
        move();
        checkScore();
        display();
        if (keyIsDown(87)) {
            turban.moveY(-8);
        }
        if (keyIsDown(83)) {
            turban.moveY(8);
        }    
        if (keyIsDown(65)) {
            turban.moveX(-8);
        }
        if (keyIsDown(68)) {
            turban.moveX(8);
        } 
        if (keyIsDown(UP_ARROW)) {
            umom.moveY(-8);
        }
        if (keyIsDown(DOWN_ARROW)) {
            umom.moveY(8);
        }    
        if (keyIsDown(LEFT_ARROW)) {
            umom.moveX(-8);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            umom.moveX(8);
        } 
    }
    else {  // så er Game Over det der skal vises
        fill(0);
        textSize(46);
        text("Game Over",width/2 + random(-5,5), height/2 + random(3 ));
        //text("Score: "+score, width/2, height/2 + 50);
    }
}

function display() {
    fill(0);
    textSize(20);
    //text("Score: "+score, width-80, 30);
    //text("Liv: " + liv, width-160, 30);
    text("score player one:"+scorePlayerone, width-1000,30);
    
    text("score player two:"+scorePlayertwo, width-500,30);
    
    //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises
    //Switchen er for at fåforskellige appelsiner til at blive kastet. 
    if(tid > 0) {
        tid -= 1;
    }
    if (tid < 300) {
        switch (ranNum) {
            case 1:
                image(dirt, x, y, 70, 60);
                break;
            case 2:
                image(rum, x,  y, 80, 70);
                break;
            case 3:
                image(coom, x, y, 70, 60);
                break;
        
            default:
                image(cirtus, x, y, 70, 60);
                break;
        }
        
    }
 
    // Her vises turbanen 
    turban.tegn();
    umom.tegn();
}
    
function move() {
    //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet
    if (tid <= 0) {
        x += xspeed;
        y += yspeed;
        yspeed += grav;
    }
    if (x > width || y > height) {
        missed += 1;
        liv -= 1;
        if (liv < 1) {
            spilIgang = false;
        }
        shootNew();
    }
}

function checkScore() {
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
    if (yspeed > 0) {
        if (turban.grebet(x, y, rad)) {
            scorePlayerone += 1;
            sound.play();
            shootNew(); 
        } else if(umom.grebet(x,y,rad)){
            scorePlayertwo += 1;
            willSound.play();
            shootNew();
            

    }
}
}
function shootNew() {
    //Her skal vi sørge for at en ny appelsin skydes afsted 
    //Det meste af koden herunder er for at hvis appelsinen starter længere oppe på skærmen så vil den starte med mindre fart
    //bare så den ikke ryger op over toppen af skærmen.
    x = rad;
    y = random(0, 725);
 if (y < 100) {
        yspeed = 0;
        xspeed = random(5,11);
    }else if (y < 300 && y > 101) {
        yspeed = -5;
        xspeed = random (3,8);
    } else if (y < 500 && y > 301) {
        yspeed = -7.5;
        xspeed = random (8,10);
    } else {
        yspeed = -10;
        xspeed = random(1,8);
    
    }
    ranNum = int(random(1,4));
    tid = random(200);
}


function keyPressed() {
    // Funktionen gør ingenting lige nu
    return false;  // Forebygger evt. browser default behaviour
}

/*
OPGAVER
 Opgave 1 - undersøg hvad variablerne  grav  og  tid  bruges til, og hvor.
            Skriv det i kommentarer, prøv at se hvad der sker, når
            I laver dem om. 

    Grav tyngedekraft, det er den hastighed som appelsinen falder ned med. 
    Tid er det som bestemmer tiden mellem kast. 

 Opgave 2 - lav programmet om så det er tilfældigt hvor højt oppe 
            på venstre kan appelsinerne starter. Overvej om man kan 
            sikre, at appelsinen ikke ryger ud af skærmens top men 
            stadig har en "pæn" bane.

    Jeg har lavet om på y angående hvor højt oppe den bliver kastet fra, 
    har gjordt så den er random og kan blive kastet mellem to steder.

 Opgave 3 - ret programmet til, så det også angives hvor mange 
            appelsiner man IKKE greb med turbanen

 Opgave 4 - Undersøg hvad scriptet  kurv.js  er og gør, og forklar 
            lidt mere detaljeret end det er gjort nu hvad sammenhængen 
            mellem dette script og turbanen i  sketch.js  er. 
            Skriv det som kommentarer i toppen af  kurv.js
            Prøv jer frem med forskellige løsninger for hvor hurtigt 
            turbanen skal rykke. 

 Opgave 5 - Find et billede af en turban og sæt det ind i stedet 
            for firkanten. Find eventuelt også en lyd, der kan afspilles, 
            når appelsinen gribes. Se gerne i "p5 Reference" hvordan, 
            hvis ikke I kan huske det:   https://p5js.org/reference/
            
 Opgave 6 - Lav en Appelsin-klasse, lige som der er en Kurv-klasse. 
            Flyt koden til appelsinen ud i et selvstændigt script.
            Overvej hvad det skal hedde, og hvilke variabler og funktioner, 
            der skal lægges over i det nye script, herunder hvordan det 
            kommer til at berøre turbanen. Skriv jeres overvejelser i 
            kommentarerne

 Opgave 7 - Ret programmet til, så der kan være flere appelsiner i 
            luften på en gang, dvs. at der kan skydes en ny appelsin
            afsted før den foregående er forsvundet. Overvej hvordan 
            og hvor hurtigt de skal skydes af, for at det kan gøre spillet
            sjovere og mere udfordrende, og forklar jeres tanker
            i kommentarerne

 Opgave 8 - Ret programmet til, så det kan vindes og/eller tabes ved
            at man griber eller misser et antal appelsiner. Sørg for 
            at der vises en "Game Over"-skærm, som fortæller om man 
            vandt eller tabte, og som giver mulighed for at starte et
            nyt spil. Se evt. om I kan lave en løsning så turbanens
            bevægelseshastighed, skydetempoet med appelsinerne og andre
            ting kan justeres mens man spiller. Lav evt. programmet om, 
            så man kan flytte turbanen med musen


*/
