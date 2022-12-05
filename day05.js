const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\r\n")
let procedure = data.filter(el => el[0] == "m")
let crates = ["LNWTD", "CPH", "WPHNDGMJ", "CWSNTQL", "PHCN", "THNDMWQB", "MBRJGSL", "ZNWGVBRT", "WGDNPL"]
let reg = /\d+/g

function partOne(crates){
    crates = [...crates]
    procedure.forEach( el => {
        let [qty, from, to] = el.match(reg).map(Number)
        from -= 1 
        to -=1 
        for(let i=0;i<qty;i++){
            let char = crates[from][crates[from].length-1]
            crates[from] = crates[from].substring(0, crates[from].length - 1);
            crates[to]+=char
        }
    })
    console.log(`Part one = ${crates.map(el=> el[el.length-1]).join('')}`)
}

function partTwo(crates){
    procedure.forEach( el => {
        let [qty, from, to] = el.match(reg).map(Number)
        from -= 1 
        to -=1 
        
        let group = crates[from].slice(-qty)
        crates[from] = crates[from].slice(0, -qty)
        crates[to] += group
    })
    console.log(`Part two = ${crates.map(el=> el[el.length-1]).join('')}`)
}

partOne(crates)
partTwo(crates)
