let apple = "apple"
let running =  true;
let bombs=[]
function checkDead(playerAt, bombAt){
    return(
        //top left corner
        playerAt.top>bombAt.top&&           
        playerAt.top < bombAt.bottom &&
        playerAt.left > bombAt.left&&
        playerAt.left < bombAt.right 

        // playerAt.top > bombAt.top&&
        // playerAt.top < bombAt.bottom&&
        // playerAt.right > bombAt.right &&
        // playerAt.right < bombAt.left
    )                   
        
}

function createBomb(){
    document.getElementById('root').appendChild(stringToNode(`<bomb style="width:50px; height:50px; position:absolute; right:${randomLocation(0, 800)}px;bottom:${randomLocation(0, 800)}px; background-image:url(bomb.jpg);background-size: 50px 50px"></bomb>`))
    bombs.push(root.getElementsByClassName('bomb'))
    console.log(bombs)

}
function stringToNode(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild; 
}

function checkAllDead(playerPos, bombArray){
        for(let i=0; i<100; i++){
            checkDead(playerPos, bombs[i])
            console.log('inside checkAllDead for loop')
        }
}

function checkCornerInside(x, y, box) {
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
    document.getElementById('root').innerHTML += '<bomb id="bomb" style="width:50px; height:50px; position:absolute; right: 400px;bottom: 50px; background-image:url(bomb.jpg);background-size: 50px 50px"></bomb>'

}
initialize();

//movement 
document.onkeypress = function(e) {//onkeydown has interval ms, onkeyup you delete that interval
    const player = document.getElementById('player')
    const bomb = document.getElementById('bomb')
    const playerPos = player.getBoundingClientRect();
    const bombPos = bomb.getBoundingClientRect();
    if (e.key== "w") {
        player.style.top = (playerPos.top - 20) + "px" 
    } else if (e.key == "a") {
        player.style.left = (playerPos.left - 20) + "px"
    } else if (e.key == "d") {
        player.style.left = (playerPos.left + 20) + "px"
    } else if (e.key == "s") {
        player.style.top = (playerPos.top + 20) + "px"
        
    }
    if(checkDead(playerPos, bombPos)){
        document.getElementById('root').innerHTML = '<div id="banner" ><h1>Game Over!</h1><button id="restart">Restart</button></div>'
        document.getElementById('restart').onclick=initialize
        checkAllDead(playerPos, bombPos)
        console.log('inside if in onkeypress...dead')
    }
    //use an array to apply checkDead to all bombs
    if (playerPos.top<100  &&
     playerPos.left< 100
    ) {
        document.getElementById('root').innerHTML = '<div id="banner" ><h1>Welcome Home!</h1><button id="restart">Restart</button></div>'
        document.getElementById('restart').onclick=initialize        
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