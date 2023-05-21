const gameSpace=document.getElementById("gamespace");
const scoreValue=document.getElementById("svalue");
const highScoreElement=document.getElementById("hvalue");
const timeValue=document.getElementById("tvalue");
const controls = document.querySelectorAll("#controls i");
const sequence=document.getElementById("sequence");
let timeLeft=60,startTime,endTime;
let time=60;
let play=0;
let foodX,foodY;
let foodX2,foodY2,foodX3,foodY3;
//let html2,html="";
let food=[[foodX,foodY],[foodX2,foodY2],[foodX3,foodY3]];
let gameOver=false;
let snakeX=3,snakeY=1;
let velocityX=0,velocityY=0 ;
let snake=[
    {x:3,y:1},
    {x:2,y:1},
    {x:1,y:1}
];
let element=[1,2,3];
let running=false;
let score=0;
const leaderBoard=document.getElementById("leaderboard");
let leaderList=JSON.parse(localStorage.getItem("leaderboard"));
if(leaderList===null||leaderList == []){
    leaderList=[];
    for(i<0;i<5;i++){
        leaderList.push([0,"Guest"]);
    }
    localStorage.setItem("leaderboard", JSON.stringify(leaderList));
}
let username = prompt("Please enter your username","Guest");
window.alert("If you eat the food according to sequence you will gain time and extra points!!!")
let highscore=localStorage.getItem("hvalue") || 0;
highScoreElement.textContent = `${highscore}`;
/*const ifAlreadyPresent = (a, arr) => {
    for (let i = 0; i < arr.length; i++){
        if (a[0] == arr[i][0] && a[1] == arr[i][1]){
            return true;
        }
    }
    return false;
}*/
function createfood(){
    function randcreate(){
        let randNUm = Math.floor(Math.random()*25)+1;
        return randNUm;
    }
    /*while(food.length<3){
        foodX=randcreate();
        foodY=randcreate();
        if (ifAlreadyPresent([foodX, foodY], food2) || ifAlreadyPresent([foodX, foodY], snake) || (foodX == snakeX && foodY == snakeY)){
            continue;
        }
        else{
            food.push([foodX, foodY]);
            food2.push([foodX, foodY]);
        }
    }
    food.forEach((element, index) => {
        //alert(element, element.push(index));
        element.push(index);
        food.splice(index,1,element);
    
    });*/
    foodX=randcreate();
    foodY=randcreate();
    foodX2=randcreate();
    foodY2=randcreate();
    foodX3=randcreate();
    foodY3=randcreate();
    food=[[foodX,foodY],[foodX2,foodY2],[foodX3,foodY3]];
    
    element=[1,2,3];
}
function changeDirection(event){  
    play=1
    if (timeLeft == 60){
        startTime = new Date();
        timeLeft = 59.99;
    } //another method
   if(event.key==="ArrowUp" && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(event.key==="ArrowDown" && velocityY!=-1){
       velocityX = 0;
       velocityY = 1;
    }
    else if(event.key==="ArrowLeft" && velocityX!=1){
       velocityX=-1;
       velocityY=0;
    }
    else if(event.key==="ArrowRight" && velocityX!=-1){
       velocityX=1;
       velocityY=0;
    }
    
};
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));
/*function moveSnake(){
    const head={x:snake[0].x+velocityX,y:snake[0].y+velocityY};
    snake.unshift(head);
    snake.pop();
}*/
/*const updatefood =()=>{
    /*for( let i=0;i<food.length;i++){
        html+=`<div class="food" style="grid-area: ${food[i].y}/${food[i].x}"></div>`;
    }*/
    /*for(let i=0;i<3;i++){
        foodX=Math.floor(Math.random()*30+1);
        foodY=Math.floor(Math.random()*30+1);
        food2={x:foodX,y:foodY};
        food.push(food2);
    }
    //console.log(food);
}*/

const gameLoop = ()=>{
    if (timeLeft != 60){
        endTime = new Date();
        duration = (endTime - startTime)/1000;
        startTime = new Date();
        timeLeft -= duration;
        let time=Math.round(timeLeft);
        timeValue.innerText = `${time}`;
        if (time<0){
            gameOver = true;
        }
    };
    if(gameOver)return GameOver(); 
    let html="";
    
    
    for(i=0;i<food.length;i++){
         html+=`<div class="food${element[i]}" style="grid-area: ${food[i][1]}/${food[i][0]}"></div>`; 
    }
    
    /*for(let i=0;i<food.length;i++){
        createfood();
        food[i].x=foodX;
        food[i].y=foodY;
    }*/
    //let html=`<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    /*for (let i = 0; food< food.length; i++) {
        html+=`<div class="food[${i+1}]" style="grid-area: ${food[i][1]}/${food[i][0]}"></div>`
    }*/
    
    for( let i=0;i<snake.length;i++){
        html+=`<div class="snake" style="grid-area: ${snake[i].y}/${snake[i].x}"></div>`;
    }
    if(play){
        for (let i = snake.length-2; i>=0; i--){
            snake[i+1]={...snake[i]};
        }
        snake[0].x+=velocityX;
        snake[0].y+=velocityY;  
    }
    for (let i = 0; i < food.length; i++){
        if (snake[0].x == food[i][0] && snake[0].y == food[i][1]){
            //console.log((i+ 1), foodNumber);
            if (i != 0){
                //gameOver=true //for ending game if it eats wrong sequence
                score+=1;
                food.splice(i,1);
                element.splice(i,1);
                break;
            }
            else{
                score++; //increment score by 1 for eating a block
                food.splice(i,1);
                element.splice(i,1);
                if (food.length == 0){
                    score += 2;
                    timeLeft += 5;
                    createfood();            
                }
                break;
        }
        /*if("score>=highscore"){
            highscore=score;
        }
        else{
            highscore=highscore
        }*/
    }
        if(score>=highscore){
        highscore=score;
        }
        else{
        highscore=highscore
        }
        scoreValue.textContent=`${score}`;
        localStorage.setItem("hvalue",highscore);
        highScoreElement.textContent=`${highscore}`;
    }
    
    /*if (foodX==snake[0].x && foodY==snake[0].y) {
        if(foodX2==snake[0].x&&foodY==snake[0].y){
            if (foodX3==snake[0].x&&foodY3==snake[0].y) {
                createfood();
                score+=3;
                timeLeft+=3;        
                ;              
            }
            else{
                score+=1;
            }
        }
        else{
            score+=1
        }
        if("score>=highscore"){
            highscore=score;
        }
        else{
            highscore=highscore
        }
        scoreValue.textContent=`${score}`
        localStorage.setItem("hvalue",highscore);
        highScoreElement.textContent=`${highscore}`;
    }*/
    
    
    if(snake[0].x<=0||snake[0].x>30||snake[0].y<=0||snake[0].y>30){
        gameOver=true;
    }
    let html2="";
    leaderList.forEach((element, index)=>{
        html2+=`<div class="leader grid-row-start =${index+1} grid-column-start =1">${element[1]} - ${element[0]}</div>`;
    })
    leaderBoard.innerHTML=html2;
    gameSpace.innerHTML=html;

}
function GameOver(){
    leaderList.push([score, username]);
    leaderList.sort((a,b) => {return a[0]-b[0]});
    leaderList.reverse();
    leaderList.pop();
    localStorage.setItem("leaderboard", JSON.stringify(leaderList));
    clearInterval(setIntervalId);
    window.alert("GameOver!!!");
    location.reload();
};
createfood();
setIntervalId=setInterval(gameLoop, 100);
document.addEventListener("keydown",changeDirection);
/*document.addEventListener("keydown",timer=>{
        var sec=0;
        timer=setInterval(()=>{
            time=59-sec;
            timeValue.innerHTML=time;
            sec++
            if(time<0){
                gameOver=true;
            }
        },1000)
},{once : true});    //method main
document.addEventListener("click",timer=>{
    var sec=0;
    timer=setInterval(()=>{
        time=59-sec;
        timeValue.innerHTML=time;
        sec++
        if(time<0){
            gameOver=true;
        }
    },1000)
},{once : true});*/
const box=document.getElementById("box");
const button=document.getElementById("LeaderBoard");
/*function showdiv(){
    document.getElementById("box").style.display="block";
}
function hidediv(){
    document.getElementById("box").style.display="none;";
}*/
button.onclick = function(){
    if(box.style.display!=="none"){
        box.style.display="none"
    }
    else{
        box.style.display="block";
    }
}