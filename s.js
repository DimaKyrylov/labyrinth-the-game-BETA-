var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
let tries = 5;
ctx.font = "25px serif";
ctx.fillText(tries, 10, 20)
let gamer = {
    x:0,
    y:570,
    width:10,
    height:10
}
let speed = 5;
let walls = [];
let finish = {
    x:770,
    y:200,
    width:30,
    height:120
}
walls.push(insertWall(200,500,30,100))
walls.push(insertWall(200,0,2,450))
walls.push(insertWall(250,300,30,300))

function insertWall(x,y,w,h){
    return {
        x: x,
        y: y,
        width: w,
        height: h
    }
}
for(let i = 0; i < walls.length; i++){
    ctx.fillRect(walls[i].x,walls[i].y,walls[i].width,walls[i].height)
}
ctx.fillStyle = "gray";
ctx.fillRect(finish.x,finish.y,finish.width,finish.height);

function checkMove(arg){
    if(arg == 0){
        gamer.x-=speed;
    }else if(arg == 1){
        gamer.x+=speed;
    }else if(arg == 2){
        gamer.y-=speed;
    }else{
        gamer.y+=speed;
    }
}

function move(arg){
    let left = gamer.x;
    let top = gamer.y;
    checkMove(arg)

    if(gamer.x < 0){
        gamer.x = 0;
    }
    if(gamer.x > canvas.width - gamer.width){
        gamer.x = canvas.width - gamer.width;
    } 
    if(gamer.y < 0){
        gamer.y = 0;
    }
    if(gamer.y > canvas.height - gamer.height){
        gamer.y = canvas.height - gamer.height
    }

    if(gamer.x + gamer.width > finish.x && gamer.y + gamer.height > finish.y && gamer.y < finish.y + finish.height ){
        alert("You WIN")
       // ctx.clearRect(0,0,canvas.width,canvas.height)
    }

    for(let i = 0; i < walls.length; i++){
        if(gamer.x + gamer.width < (walls[i].x + walls[i].width + gamer.width) && gamer.x > (walls[i].x - gamer.width) && gamer.y > walls[i].y - gamer.height && gamer.y < walls[i].y + walls[i].height){
            gamer.x = left;
            gamer.y = top;
            tries--;
            ctx.clearRect(0,0,20,20)
            ctx.fillText(tries, 10, 20)
            if(tries == 0){
                alert("Ви програли")
                window.location.reload()
            }
        }
    }


    ctx.fillStyle = "red";
    ctx.fillRect(left, top, gamer.width, gamer.height);
   // ctx.clearRect(left, top, gamer.width, gamer.height)

    ctx.fillStyle = "green";
    ctx.fillRect(gamer.x, gamer.y, gamer.width, gamer.height);
}

document.addEventListener("keypress",(event)=>{
    switch (event.code){
        case "KeyA" : {
            move(0)
            break;
        }
        case "KeyD" : {
            move(1)
            break;
        }
        case "KeyW" : {
            move(2)
            break;
        }
        case "KeyS" : {
            move(3)
            break;
        }
    }
})

ctx.fillStyle = "green"
ctx.fillRect(gamer.x, gamer.y, gamer.width, gamer.height);