
const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\r\n")

let partOne = 0
let partTwo = 0
let values = {"X": {value:1, "A":3, "B":0, "C":6} , // Rock = X and A 
              "Y": {value:2, "A":6, "B":3, "C":0} , // Paper = Y and B
              "Z": {value:3, "A":0, "B":6, "C":3}}  // Scissors = Z and C        
                                                   
data.forEach( el => {
    partOne+=values[el[2]].value
    partOne+=values[el[2]][el[0]]

    switch(el[2]){
        case "X":
            partTwo += Object.values(values).find((elem) => elem[el[0]] == 0).value
            break
        case "Y":
            partTwo += Object.values(values).find((elem) => elem[el[0]] == 3).value
            partTwo += 3
            break
        case "Z":
            partTwo += Object.values(values).find((elem) => elem[el[0]] == 6).value
            partTwo += 6
            break
    } 
})

console.log(`Part One = ${partOne}`)
console.log(`Part Two = ${partTwo}`)
