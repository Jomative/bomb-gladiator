let bombCount = -1;
let running =  true;
let alive = true;
let bombsCollection=[]
let bombsArray = []


function checkDead(playerRect, bombRect){
    //checkCornerInside();
    return(
        //top left corner
        playerRect.top>bombRect.top&&           
        playerRect.top < bombRect.bottom &&
        playerRect.left > bombRect.left&&
        playerRect.left < bombRect.right 

    )
            
        
}

function createBomb(){
    document.getElementById('root').appendChild(stringToNode(`<bomb id="bomb${bombCount}" class="explosives" style="width:50px; height:50px; position:absolute; right:${randomLocation(0, 800)}px;bottom:${randomLocation(0, 800)}px; background-image:url(bomb.jpg);background-size: 50px 50px"></bomb>`))
    bombCount++;
    //bombsCollection.push(document.getElementsByTagName("bomb").namedItem(`bomb${bombCount}`))//returns HTMLCollections
    bombsCollection.push(document.getElementsByClassName("explosives")[`${bombCount}`]) 
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

function checkAllDead(playerPos){
        for(let i=0; i<bombsArray.length; i++){
            console.log('inside checkAllDead for loop')
            if(checkDead(playerPos, bombsArray[i].getBoundingClientRect())){
                alive=false
            }
            
        }
}

function checkCornerInside(x, y, bombRect) {
    return (
        y > box.top &&
        y < box.bottom &&
        x > box.left && 
        x < box.right
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

function checkInside(inner, outer) {
    return (
        checkCornerInside(box1.left, box1.top, box2) &&
        checkCornerInside(box1.left, box1.bottom, box2) &&
        checkCornerInside()
        //bottom right &&
        //top right
    )
}

export function initialize(){
    document.getElementById('root').innerHTML = '<div id="home" style="width:100px; height:100px; position:absolute; top:0px; left:0px; background-image:url(houseicon.jpg);background-size: 100px 100px";></div>'
    //player div
    document.getElementById('root').innerHTML += '<div id="player" style="width:50px; height:50px; position:absolute; top:720px;left:720px; background-color:green;background-image:url(player.jpg);background-size: 50px 50px"></div>'
    //bombs
    document.getElementById('root').innerHTML += `<bomb id="bomb${bombCount}" class="explosives" style="width:50px; height:50px; position:absolute; right: 400px;bottom: 50px; background-image:url(bomb.jpg);background-size: 50px 50px"></bomb>`
    bombCount++;

}
initialize();

//movement 
document.onkeypress = function(e) {//onkeydown has interval ms, onkeyup you delete that interval     
    const player = document.getElementById('player')
    let bomb = document.getElementById('bomb1')//need to be fixed for all bombs to kill
    const playerPos = player.getBoundingClientRect();
    let bombPos = bomb.getBoundingClientRect();
    checkAllDead(playerPos)
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
        document.getElementById('root').innerHTML = '<div id="banner" ><h1>Game Over!</h1><button id="restart">Restart</button></div>'
        document.getElementById('restart').onclick=reload
        
        console.log('inside if in onkeypress...dead')
    }
    //use an array to apply checkDead to all bombs
    if (playerPos.top<100  &&
     playerPos.left< 100
    ) {
        document.getElementById('root').innerHTML = '<div id="banner" ><h1>Welcome Home!</h1><button id="restart">Restart</button></div>'
        document.getElementById('restart').onclick=window.location.reload   
    }
    
}

//cannot assign multiple bombs to same variable
setInterval(createBomb, 5000);
function randomLocation(max, min){
    let rn = Math.random()*(max-min) + min;
    return(Math.floor(rn))

}

//all bombs work and kill
//then deploy

//success screen
//dont create bombs on success/over screens(maybe a boolean?)
//return from keypress once game is done(same boolean)