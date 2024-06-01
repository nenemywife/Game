let boardWidth=360;
let boardHeight=640;

let backX=0;
let backY=0;
let backImg;

let back={
    x:backX,
    y:backY,
    width:boardWidth,
    height:boardHeight
}

let back2Img;
let back3Img;

let changeBack1=false;
let changeBack2=false;
let changeBack3=false;

let context;

let ballWidth=40;
let ballHeight=40;
let ballX=boardWidth/2-20;
let ballY=boardHeight/2;
let ballImg;
let ball2Img;
let ball3Img;
let ball4Img;

let ball={
    x:ballX,
    y:ballY,
    width:ballWidth,
    height:ballHeight
}

let changeB1=false;
let changeB2=false;
let changeB3=false;
let changeB4=true;

let collisionleft=false;
let collisionright=false;
let collisionup=false;
let collisionb=false;
let detectCollisionb=false;
let vY=0;
let vX=0;
let moveX=6;
let moveY=-6;

let bWidth=100;
let bHeight=40;
let bX=boardWidth/2-50;
let bY=boardHeight-70; //570
let bImg;

let b={
    x:bX,
    y:bY,
    width:bWidth,
    height:bHeight
}

let goWidth=200;
let goHeight=120;
let goX=80;
let goY=260;
let goImg;

let go={
    x:goX,
    y:goY,
    width:goWidth,
    height:goHeight
}

let move=0;

let score=0;
let best=0;
let gameover=false;

let start=false;

let textColor="black";

window.onload=function(){
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context=board.getContext("2d");

    backImg=new Image();
    backImg.src="../background1.png";
    backImg.onload=function(){
        context.drawImage(backImg, back.x, back.y, back.width,  back.height);
    }

    back2Img=new Image();
    back2Img.src="../background2.png";
    back2Img.onload=function(){
        context.drawImage(back2Img, back.x, back.y, back.width,  back.height);
    }

    back3Img=new Image();
    back3Img.src="../background3.png";
    back3Img.onload=function(){
        context.drawImage(back3Img, back.x, back.y, back.width,  back.height);
    }

    bImg=new Image();
    bImg.src="./b.png";
    bImg.onload=function(){
        context.drawImage(bImg, b.x, b.y, b.width,  b.height);
    }

    ballImg=new Image();
    ballImg.src="../soccer.png";
    ballImg.onload=function(){
        context.drawImage(ballImg, ball.x, ball.y, ball.width,  ball.height);
    }

    ball2Img=new Image();
    ball2Img.src="../basketball.png";
    ball2Img.onload=function(){
        context.drawImage(ball2Img, ball.x, ball.y, ball.width,  ball.height);
    }

    ball3Img=new Image();
    ball3Img.src="../poolball.png";
    ball3Img.onload=function(){
        context.drawImage(ball3Img, ball.x, ball.y, ball.width,  ball.height);
    }

    ball4Img=new Image();
    ball4Img.src="./ball.png";
    ball4Img.onload=function(){
        context.drawImage(ball4Img, ball.x, ball.y, ball.width,  ball.height);
    }

    goImg=new Image();
    goImg.src="./gameover.png";
    goImg.onload=function(){
        context.drawImage(goImg, go.x, go.y, go.width,  go.height);
    }

    requestAnimationFrame(update);
    setInterval(detectCollision,500);
    document.addEventListener("keydown", moveb);
}

function update(){
    requestAnimationFrame(update);
    if(gameover){
        return;
    }

    context.clearRect(0,0,board.width,board.height);

    if (changeBack1){
        context.drawImage(backImg, back.x, back.y, back.width,  back.height);
    }

    if (changeBack2){
        context.drawImage(back2Img, back.x, back.y, back.width,  back.height);
    }

    if (changeBack3){
        context.drawImage(back3Img, back.x, back.y, back.width,  back.height);
    }

    if(!start){
        return;
    }

    if (changeBack3) {
        textColor="white";
    }

    context.fillStyle=textColor;
    context.font="35px monospace";
    context.fillText("BEST:"+best, 15, 45)

    context.drawImage(bImg, b.x, b.y, b.width,  b.height);

    if(!collisionleft && !collisionright){
        ball.x+=moveX;
        
    }
    if (!collisionup){
        ball.y+=moveY;
    }
    
    if(score>=10){
        moveX=8*parseInt(score/10);
        moveY=-8*parseInt(score/10);
    }

    if (ball.x<=0){
        collisionleft=true;
        collisionright=false;
    }

    if (ball.x>=boardWidth-ballWidth){
        collisionright=true;
        collisionleft=false;
    }

    if(collisionleft){
        vX=moveX;
        ball.x=Math.max(ball.x+vX,0);
    }

    if(collisionright){
        vX=-moveX;
        ball.x=Math.min(ball.x+vX,boardWidth-ballWidth);
    }
    
    if(ball.y<=0){
        collisionup=true;
        collisionb=false;
    }

    if(collisionup){
        vY=-moveY;
        ball.y=Math.max(ball.y+vY,0);
    }

    collisionb=ballCollision(ball,b);
    if(collisionb){
        detectCollisionb=true;
        collisionup=false;
        //score+=1;
        vY=moveY;
        ball.y=Math.min(ball.y+vY,boardHeight);
    }

    if (ball.y>=boardHeight-50){
        gameover=true;
    }

    if(gameover){
        playAudio();
        context.drawImage(goImg, go.x, go.y, go.width,  go.height);
    }

    if (!gameover){
        drawScore();
        if (changeB1){
            drawBall();
        }
        else if (changeB2){
            drawBall2();
        }
        else if(changeB3){
            drawBall3();
        }
        else{
            drawBall4();
        }
    }
    
}

function moveb(e){
    if(e.code=="ArrowLeft" && b.x>=5){
        b.x-=10;
    } 
    else if(e.code=="ArrowRight" && b.x<=boardWidth-bWidth-5){
        b.x+=10;
    }

    if(gameover){
        ball.y=ballY;
        ball.x=ballX;
        b.y=bY;
        b.x=bX;

        if(score>best){
            best=score;
        }

        score=0;
        vX=6;
        vY=-6;
        move=0;
        moveX=6;
        moveY=-6;
        collisionleft=false;
        collisionright=false;
        collisionup=false;
        collisionb=false;
        gameover=false;
    }
}

function ballCollision(a,b){   //ball,b
    return a.x<b.x+b.width&&
                a.x+a.width>b.x&&
                a.y<b.y+b.height&&   //a.y<b.y+b.height
                a.y+a.height>b.y;   // a.y+a.height>b.y;
}

function startGame(){
    start=true;
    let sp=document.getElementById("sp");
    let sv=document.getElementById("svg");
    let st=document.getElementById("sta");
    sp.style.display="none";
    sv.style.display="none";
    st.style.display="none";
}

function drawScore(){
    context.fillStyle="black";
    context.font="45px fantasy";
    context.fillText(score, 160, 320);
}

function playAudio(){
    let audio=document.createElement('audio');
    audio.src='./gameoverAudio.mp3';
    audio.play();
}

function detectCollision(){
    if (detectCollisionb){
        score++;
        detectCollisionb=false;
    }
}

function drawBall(){
    context.drawImage(ballImg, ball.x, ball.y, ball.width,  ball.height);
}

function drawBall2(){
    context.drawImage(ball2Img, ball.x, ball.y, ball.width,  ball.height);
}

function drawBall3(){
    context.drawImage(ball3Img, ball.x, ball.y, ball.width,  ball.height);
}

function drawBall4(){
    context.drawImage(ball4Img, ball.x, ball.y, ball.width,  ball.height);
}

function changeColor(){
    changeBack1=false;
    changeBack2=false;
    changeBack3=false;
    let color = document.getElementById("color").value;
    document.getElementById("board").style.backgroundColor = color;
    document.getElementById("liColor").style.backgroundColor = color;
    spanBackDisplayBlock();
}

function changeBackground1(){
    changeBack1=true;
    changeBack2=false;
    changeBack3=false;
    spanBackDisplayBlock();
}

function changeBackground2(){
    changeBack2=true;
    changeBack1=false;
    changeBack3=false;
    spanBackDisplayBlock();
}

function changeBackground3(){
    changeBack3=true;
    changeBack1=false;
    changeBack2=false;
    spanBackDisplayBlock();
}

function changeBall1(){
    changeB1=true;
    changeB2=false;
    changeB3=false;
    changeB4=false;
    spanBallDisplayBlock();
}

function changeBall2(){
    changeB2=true;
    changeB1=false;
    changeB3=false;
    changeB4=false;
    spanBallDisplayBlock();
}

function changeBall3(){
    changeB3=true;
    changeB1=false;
    changeB2=false;
    changeB4=false;
    spanBallDisplayBlock();
}

function changeBall4(){
    changeB4=true;
    changeB1=false;
    changeB2=false;
    changeB3=false;
    spanBallDisplayBlock();
}

function spanBackDisplayBlock() {
    let span=document.getElementById("changeBack");
    span.style.display="block";
    setTimeout(spanBackDisplayNone, 1000);
}

function spanBackDisplayNone() {
    let span=document.getElementById("changeBack");
    span.style.display="none";
}

function spanBallDisplayBlock() {
    let span=document.getElementById("changeBall");
    span.style.display="block";
    setTimeout(spanBallDisplayNone, 1000);
}

function spanBallDisplayNone() {
    let span=document.getElementById("changeBall");
    span.style.display="none";
}