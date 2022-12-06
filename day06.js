const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString()

function day06(length, part){
    let res 
    for(let i=length;i<data.length;i++){
        let el = data.slice(i-length,i+1)
        if(!/(.).*\1/.test(el)){
            res = i+1
            i = data.length
        }
    }
    console.log(`Part ${part} = ${res} `)
}


day06(3,'one')
day06(13, 'two')

