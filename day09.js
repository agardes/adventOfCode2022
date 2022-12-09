const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\r\n")

let visitedMap = {"0|0":'visited'}
let tailX = 0
let tailY = 0
let headX = 0
let headY = 0
let partOne = 1

data.forEach(el => {
    let [dir, amount] = el.split(' ')
    amount = parseInt(amount)
    switch(dir){
        case 'R':
            for(let i=0; i<amount; i++){
                headX++
                if(Math.abs(headX - tailX) > 1 || Math.abs(tailY - headY) > 1){
                        tailX++
                        tailY = headY 
                }
                addCoords(`${tailY}|${tailX}`)           
            }
                     
            break
        case 'L':
            for(let i=0; i<amount; i++){
                headX--
                if(Math.abs(headX - tailX) > 1 || Math.abs(tailY - headY) > 1){
                    tailX--
                    tailY = headY
                }
                addCoords(`${tailY}|${tailX}`)   
                                               
            }
            break
        case 'U':
            for(let i=0; i<amount; i++){
                headY--
         
                if(Math.abs(headX - tailX) > 1 || Math.abs(tailY - headY) > 1){
                    tailY--
                    tailX = headX
                }
                addCoords(`${tailY}|${tailX}`)    

                         
                
            }
            break
        case 'D':
            for(let i=0; i<amount; i++){
                headY++

                if(Math.abs(headX - tailX) > 1 || Math.abs(tailY - headY) > 1){
                    tailY++
                    tailX = headX
                }
                addCoords(`${tailY}|${tailX}`)             

                         
            }
            break
    }



})

function addCoords(coord){
    if(!visitedMap[coord]){
        visitedMap[coord] = 'visited'
        partOne++
    }
}
console.log("Part One = " + partOne)