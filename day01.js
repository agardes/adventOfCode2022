
const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\r\n").map(Number)

let calories = 0
let res = []

for(let i=0;i<data.length;i++){
    if(data[i]!==0){
        calories+=data[i]
        i==data.length-1 ? res.push(calories) : undefined
    }else{
        res.push(calories)
        calories = 0
    }
}

console.log(`Part One = ${Math.max(...res)}`)
console.log(`Part Two = ${res.sort((a,b) => a-b).slice(-3).reduce((a,b) => a+b)}`)
