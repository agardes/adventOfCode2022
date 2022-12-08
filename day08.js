const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\r\n")

let map = {}
let totalHeight = data.length
let totalWidth = data[0].length 

for(let y=0; y<totalHeight; y++){
     let row = data[y].split('').map(Number)
     for(let x=0;x<totalWidth; x++){
        let coords = `${y}-${x}`
        map[coords] = row[x]
     }
}

let partOne = 0
let partTwo = 0

function day08(part){
    for(coord in map){
        let [y, x] = coord.split('-').map(Number)
        let totalPartTwo = 0
        if(y == 0 || x == 0 || y == totalHeight-1 || x == totalWidth-1){
          partOne++
        }else{
            let [isVisibleFromTop, nb] = recursiveDig('top', map[coord], y, x, 0, part)
            totalPartTwo = nb
            if(isVisibleFromTop && part=="one"){
                partOne++
            }else{
                let [isVisibleFromBottom, nb]= recursiveDig('bottom', map[coord], y, x, 0, part)
                totalPartTwo *= nb
                if(isVisibleFromBottom && part=="one"){
                    partOne++
                }else{
                    let [isVisibleFromLeft, nb] = recursiveDig('left', map[coord], y, x, 0, part)
                    totalPartTwo *= nb
                    if(isVisibleFromLeft && part == "one"){
                        partOne++
                    }else{
                        let [isVisibleFromRight, nb] = recursiveDig('right', map[coord], y, x, 0, part)
                        totalPartTwo *= nb
                        if(isVisibleFromRight && part=="one"){
                            partOne++
                        }
                    }
                }
                
            }
            
        }
        partTwo = partTwo < totalPartTwo ?  totalPartTwo  : partTwo
    }
}


function recursiveDig(direction, treeHeight, y, x, nb , part){
    let nextTile 
    let condition
    let nextY
    let nextX
    switch(direction){
        case "top":
            nextTile = `${y-1}-${x}`
            condition = y >= 0
            nextY = y-1
            nextX = x 
            break
        case "bottom":
            nextTile = `${y+1}-${x}`
            condition = y < totalHeight
            nextY = y+1
            nextX = x
            break
        case "left":
            nextTile = `${y}-${x-1}`
            condition = x >= 0
            nextY = y
            nextX = x-1
            break
        case "right":
            nextTile = `${y}-${x+1}`
            condition = x < totalWidth
            nextY = y
            nextX = x+1
            break
    }

    while(condition && map[nextTile] !== undefined){
        if(treeHeight > map[nextTile]){
            nb++
            return recursiveDig(direction, treeHeight, nextY, nextX, nb, part)
        }else if(treeHeight <= map[nextTile] && part=="two"){
            nb++
            return [true, nb]
        }else{
            return [false, nb]
        }
    }

    return [true, nb]
}

day08('one')
console.log('Part one = ' + partOne)
day08('two')
console.log('Part two = ' + partTwo)