let board;
let boardWidth=360;
let boardHeight=640;
let context;

window.onload=function(){
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context=board.getContext("2d");

    requestAnimationFrame(update);
   // document.addEventListener("keydown", moveb);
}

function update(){
    requestAnimationFrame(update);
}