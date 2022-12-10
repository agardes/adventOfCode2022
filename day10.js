const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\r\n")

let X = 1
let cycles = 0
let partOne = 0

let CRTx = -1
let CRT = []
let CRTLine = ""
data.forEach(el => {
    let [cmd, amount] = el.split(' ')
    cycles++
    CRTx++
    (X == CRTx || X == CRTx - 1 || X == CRTx + 1) ?  CRTLine += '#' :  CRTLine += ' '

    if(CRTx == 39){
        CRT.push(CRTLine)
        CRTLine = ""
        CRTx = -1
    }

    if(cycles == 20  || cycles == 60 || cycles == 100 || cycles == 140 || cycles == 180 || cycles == 220){
        partOne+=(X*cycles)
    }


    if(amount){
        amount = parseInt(amount)
        cycles++     
        CRTx++
        (X == CRTx || X == CRTx - 1 || X == CRTx + 1) ?  CRTLine += '#' :  CRTLine += ' '

        if(CRTx == 39){
            CRT.push(CRTLine)
            CRTLine = ""
            CRTx = -1
        }

        if(cycles == 20  || cycles == 60 || cycles == 100 || cycles == 140 || cycles == 180 || cycles == 220){
            partOne+=(X*cycles)
        }

        X+=amount
    }  
})

console.log("Part one = " + partOne)

CRT.forEach(el=>{
    console.log(el)
})