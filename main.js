let bombCount = 0;
let alive = true;
let bombsCollection=[]
let bombsArray = []

function checkDead(playerRect, bombRect){
    return checkOverlap(playerRect, bombRect)       
}
//change bottom right to top left
//dont hardcode pixel values(width/height of screen at start of game, and set valiues relative to that )
//player cant move past this position, or move them to opposite end
function createBomb(){
    document.getElementById('root').appendChild(stringToNode(`<bomb id="bomb${bombCount}" class="explosives" style="width:50px; height:50px; position:absolute; right:${randomLocation(50, 1600)}px;bottom:${randomLocation(0, 800)}px; background-image:url(bomb.jpg);background-size: 50px 50px"></bomb>`))
    //bombsCollection.push(document.getElementsByTagName("bomb").namedItem(`bomb${bombCount}`))//returns HTMLCollections
    bombsCollection.push(document.getElementsByClassName("explosives")[`${bombCount}`])
    bombCount++; 
    //bombsArray = Array.from(bombsCollection) 
    //bombsArray = [...bombsCollection]
    bombsArray = bombsCollection;
    console.log(bombsArray)
    console.log(`bomb${bombCount}`)//returns string bomb123etc
    //console.log(document.getElementById(`bomb${bombCount}`))//null
    //console.log(document.getElementById("bomb1"))//returns bomb1
    console.log(document.getElementsByClassName("explosives"))
    console.log(bombsArray[0].getBoundingClientRect().top)
}

function stringToNode(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild; 
}

function randomLocation(max, min){
    let rn = Math.random()*(max-min) + min;
    return(Math.floor(rn))
}

function checkAllDead(playerPos){
    for(let i=0; i<bombsArray.length; i++){
        console.log('inside checkAllDead for loop')
        if(checkDead(playerPos, bombsArray[i].getBoundingClientRect())){
            alive=false
        }
        
    }
}

function checkCornerInside(x, y, boxRect) {
    return (
        y > boxRect.top &&
        y < boxRect.bottom &&
        x > boxRect.left && 
        x < boxRect.right
    ) 
}

function checkOverlap(over, under) {
    return (
        checkCornerInside(over.left, over.top, under) ||
        checkCornerInside(over.left, over.bottom, under) ||
        checkCornerInside(over.right, over.bottom, under)||
        checkCornerInside(over.right, over.top, under)
        
    )
}

function checkInside(innerBox, outerBox) {
    return (
        checkCornerInside(innerBox.left, innerBox.top, outerBox) &&
        checkCornerInside(innerBox.left, innerBox.bottom, outerBox) &&
        checkCornerInside(innerBox.right, innerBox.top, outerBox) &&
        checkCornerInside(innerBox.right, innerBox.bottom, outerBox)
    )
}

export function initialize(){
    bombCount = 0;
    document.getElementById('root').innerHTML = '<div id="home" style="width:100px; height:100px; position:absolute; top:0px; left:0px; background-image:url(houseicon.jpg);background-size: 100px 100px";></div>'
    //player div
    document.getElementById('root').innerHTML += '<div id="player" style="width:50px; height:50px; position:absolute; top:720px;left:720px; background-color:green;background-image:url(player.jpg);background-size: 50px 50px"></div>'
    //bombs
    createBomb()
}

function reset(){
    location.reload();
    initialize();
}

initialize();

//movement 
document.onkeypress = function(e) {//onkeydown has interval ms, onkeyup you delete that interval     
    const player = document.getElementById('player')
    const playerPos = player.getBoundingClientRect();
    checkAllDead(playerPos)
    //checkDead(playerPos, bombPos) hoped this would fix bomb-1 not killing
    if (e.key== "w") {
        player.style.top = (playerPos.top - 20) + "px" 
    } else if (e.key == "a") {
        player.style.left = (playerPos.left - 20) + "px"
    } else if (e.key == "d") {
        player.style.left = (playerPos.left + 20) + "px"
    } else if (e.key == "s") {
        player.style.top = (playerPos.top + 20) + "px"
        
    }
    if(!alive){//doesnt get called until player dies
        document.getElementById('root').innerHTML = '<div id="banner" text-align: center><h1>Game Over!</h1><button id="restart">Restart</button></div>'
        document.getElementById('restart').onclick=reset
        clearInterval(bombInits);
        
        console.log('inside if in onkeypress...dead')
    }
    //use an array to apply checkDead to all bombs
    if (checkInside(playerPos, document.getElementById("home").getBoundingClientRect())
    ) {
        document.getElementById('root').innerHTML = '<div id="banner" text-align: center ><h1>Welcome Home!</h1><button id="restart">Restart</button></div>'
        document.getElementById('restart').onclick=reset
    }
    //if(checkOverlap(playerPos, original root pos))
}

//cannot assign multiple bombs to same variable
let bombInits = setInterval(createBomb, 5000);

/*mini tbd's
get bomb-1 to work
style end screens
brainstorm bomb follow player logic
perhaps stages? so stage1 is just randombombs, stage2: bombs follow you, stage3: bombs explode and have range of explosion

all bombs work and kill
then deploy

success screen
dont create bombs on success/over screens(maybe a boolean?)
return from keypress once game is done(same boolean)

//pause function(in setInterval..if(pause))
*/
//I am still alive Ryan! I am going to be doing some more work soon!