let ball = document.querySelector(".ball");
let winhole = document.querySelector(".winhole");
let position;
let start;
let winholepos;
let myinterval;


init(); //przygotowanie gry
function init(){
    start = Date.now();
    position = {
        top:290,
        left:290
    };
    winholepos = {
        top: Math.random()*580,
        left: Math.random()*580
    }
    winhole.style.top = winholepos.top + "px";
    winhole.style.left = winholepos.left + "px";
    myinterval = setInterval(move,30);
}


//orientacja
let x = 0;
let y = 0;
window.addEventListener('deviceorientation', (event)=> {
    x = event.beta;
    y = event.gamma;
});

//ruszanie pileczki
function move(){
    position.top += x/4;
    if(position.top>=580){
        position.top = 580;
        gameOver()
    }
    if(position.top<=0){
        position.top = 0;
        gameOver()
    }
    ball.style.top = position.top+"px";

    position.left += y/4;
    if(position.left>=580){
        position.left = 580;
        gameOver()
    }
    if(position.left<=0){
        position.left = 0;
        gameOver()
    }
    ball.style.left = position.left+"px";

    checkForWin();
}

//przegrana
function gameOver(){
    clearInterval(myinterval);
    let timenow = Date.now();
    let timeperiod = timenow - start;
    let timepassed = new Date(timeperiod);
    if(confirm("you lost\n"+ 
    (timepassed.getMinutes()<10?"0":"") + timepassed.getMinutes() + ":" + (timepassed.getSeconds()<10?"0":"") + timepassed.getSeconds() + "\n" +
    "Try again?"))
        init();
}

//sprawdzanie odleglosci pilki od wygranej
function checkForWin(){
    let a = position.top - winholepos.top;
    let b = position.left - winholepos.left;

    let c = Math.sqrt(a*a+b*b);

    if(c <= 15){
        win();
    }
}

//wygrana
function win(){
    clearInterval(myinterval);
    let timenow = Date.now();
    let timeperiod = timenow - start;
    let timepassed = new Date(timeperiod);
    if(confirm("you won\n"+ 
    (timepassed.getMinutes()<10?"0":"") + timepassed.getMinutes() + ":" + (timepassed.getSeconds()<10?"0":"") + timepassed.getSeconds() + "\n" +
    "Try again?"))
        init();
}