
const { group } = require('console');
const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\r\n")

const alphabet = {"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8,"i":9,"j":10,"k":11,"l":12,"m":13,"n":14,"o":15,"p":16,"q":17,"r":18,"s":19,"t":20,"u":21,"v":22,"w":23,"x":24,"y":25,"z":26}
let groupOfThree = []
let partOne = 0
let partTwo = 0

data.forEach((el,i) => {
    groupOfThree.push(el)
    if((i+1)%3 == 0){
        let item
        let min = groupOfThree.sort((a,b) => {
            return a.length - b.length
        })
        for(let i=0;i<min[0].length;i++){
            min[1].includes(min[0][i]) && min[2].includes(min[0][i]) ? (item = min[0][i], i = min[0].length) : undefined
        }
        partTwo+=getPriority(item)
        groupOfThree = []
    }
    let item = el.substring(0, el.length/2).split('').filter(e =>  el.substring(el.length/2).split('').includes(e))[0]
    partOne+= getPriority(item)
})

function getPriority(item){ 
    return item == item.toUpperCase() ? alphabet[item.toLowerCase()] + 26 : alphabet[item]
}

console.log(`Part one = ${partOne}`)
console.log(`Part two = ${partTwo}`)