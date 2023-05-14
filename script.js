let game=document.getElementById('game');
let ctx=game.getContext('2d');
// to give idea about this is for 2d game


//game size variable
const row=15;
const column=15;
const blocksize=25;


game.height=row*blocksize;
game.width=column*blocksize;

//snake head

let snakeX=4*blocksize;
let snakeY=4*blocksize;

//snake food

var foodX=3*blocksize;
var foodY=9*blocksize;


//snake move;
var moveX=0;
var moveY=0;

//snake body

var snakeBody=[ ];

// game over status
var gamestate="live";


//gameover menu display

let gameovermenu= document.getElementById('gameovermenu')

// restart button
let btn= document.getElementById('btn');


//interval variable
var myinterval;

//////////////////////////////////////////////////////

// first function called by the browser/window

window.onload=function(){
    placeFood();
    document.addEventListener("keydown",moveSnake);
    myinterval=setInterval(drawGame,230);

}


function drawGame(){
    //playground draw
  ctx.fillStyle='#222';
  ctx.fillRect(0,0,game.height,game.width);

  if(gamestate==="live"){
// food draw

  ctx.fillStyle="yellow";
  ctx.fillRect(foodX,foodY,blocksize,blocksize);
  // snake body draw

  if(foodX==snakeX && foodY==snakeY){
    
    snakeBody.push([foodX,foodY]);
    placeFood();

    var eatsound= new Audio("eat.mp3");
    eatsound.play();
  }
  for(let i=snakeBody.length-1;i>0;i--){
    snakeBody[i]=snakeBody[i-1];
  }

  if(snakeBody.length!=0){
    snakeBody[0]=[snakeX,snakeY];
  }

  ctx.fillStyle='red';
  snakeX+=moveX*blocksize;
  snakeY+=moveY*blocksize;
  ctx.fillRect(snakeX,snakeY,blocksize,blocksize);
  
  

  for(let i=0;i<snakeBody.length;i++){
    ctx.fillStyle='green';
    ctx.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize);
  }












  


  /*  
  
 sankeBody=[[1,2],[5,3],[5,6]]
 
 chnage into matrix form
 =[

    [1,2]  =>[0 row,0 col],[0 row, 1 col]
    [5,3]
    [5,6]


 ]
  snakeBody[i,0],snakeBody[i,1]
 
 */
}

// gameover consitions

if(snakeX<0 || snakeX>column*blocksize || snakeY<0 || snakeY>row*blocksize){
  gamestate="gameOver";
  gameovermenu.style.visibility="visible";
  btn.addEventListener("click",restartgame);

  //gameover sound
   let wallhit=new Audio("over.mp3");
   wallhit.play();
   clearInterval(myinterval);
   ctx.fillStyle='#222';
  ctx.fillRect(0,0,game.height,game.width);

}

for(i=0;i<snakeBody.length;i++){
if(snakeX===snakeBody[i][0] && snakeY===snakeBody[i][1]){
  gamestate="gameOver";
  gameovermenu.style.visibility="visible";
  btn.addEventListener("click",restartgame);

  //gameover sound
  let wallhit=new Audio("over.mp3");
  wallhit.play();
  clearInterval(myinterval);
  ctx.fillStyle='#222';
 ctx.fillRect(0,0,game.height,game.width);

}
}


  
 

 
}




function placeFood(){

    foodX=Math.floor(Math.random()*column)*blocksize;
    foodY=Math.floor(Math.random()*row)*blocksize;
  
}


// to move snake
function moveSnake(e){
    if(e.code==="ArrowUp" && moveY!=1){

        moveX=0;
        moveY=-1;
    }
    else if(e.code==="ArrowDown" && moveY!=-1){

        moveX=0;
        moveY=1;
    }
    else if(e.code==="ArrowLeft" && moveX!=1){

        moveX=-1;
        moveY=0;
    }
   else if(e.code==="ArrowRight" && moveX!=-1){

        moveX=1;
        moveY=0;
    }
    
    var move;
    move =new Audio("move.mp3");
    move.play();

}

// function for reload or restart
function restartgame(){
  location.reload();     // it will just reload our page
}

