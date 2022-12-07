const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\r\n")

let Element = class Element { 
    constructor(name, parentDir, size=0, depth){
        this.name = name
        this.parentDir = parentDir
        this.size = size,
        this.depth = depth
    }

    updateSize(){
        for(let m=maxDepth; m>=0; m--){
            let k = Object.keys(elements)
            k.forEach(key => {
                if(elements[key].parentDir == this.name 
                    && elements[key].depth == m){
                    this.size += elements[key].size
                }
            })
        }
           
    }
}

let elements = {}
let currentFolder = "start"
let depth = 0
let maxDepth = 0

for(let i=0;i<data.length;i++){
    let line = data[i].split(' ')
    if(line[0] == "$"){
        if(line[1] == "cd"){
            if(line[2] !== "..") {
                let name = `${line[2]}-${currentFolder}-${depth}`
                depth++
                maxDepth = depth > maxDepth ? depth : maxDepth

                if(!elements[name]){
                    let newDir = new Element(name, currentFolder)
                    elements[name] = newDir
                    elements[name].depth = depth
                }
                currentFolder = name
               
            }else{
               depth--
               currentFolder = elements[currentFolder].parentDir
            }
        }
    }else{
      if(line[0] == "dir"){
        let name = `${line[1]}-${currentFolder}-${depth}`
        if(!elements[name]){
            let newDir = new Element(name, currentFolder)
            elements[name] = newDir
            elements[name].depth = depth
        }
      }else{
        let size = parseInt(line[0])
        elements[currentFolder].size += size
      }

    }
    elements['/-start-0'].depth = 0
}

let partOne = 0
let order = []

for(let m=maxDepth; m>=0; m--){
    for(elem in elements){
        if(elements[elem].depth==m)  order.push(elem)
    }
}

for(let i=0;i<order.length;i++){
    elements[order[i]].updateSize()
    if(elements[order[i]].size <= 100000)  partOne+=elements[order[i]].size 
}

const DISK_SPACE = 70000000
const MIN_NEEDED = 30000000
let unusedSpace = DISK_SPACE - elements['/-start-0'].size
let spaceNeeded = MIN_NEEDED - unusedSpace
let partTwo = Infinity
for(elem in elements){
    if(elements[elem].size >= spaceNeeded){
        partTwo = elements[elem].size < partTwo ? elements[elem].size : partTwo
    }
}
console.log(`Part one = ${partOne}`)
console.log(`Part two = ${partTwo}`)
