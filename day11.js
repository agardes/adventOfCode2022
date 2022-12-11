const fs = require('fs');
const read = fs.readFileSync("input.txt");
let data = read.toString().split("\r\n")


let monkeys = {}
class Monkey{
    constructor(id, items, operation, condition, ifTrue, ifFalse){
        this.id = id 
        this.items = items 
        this.operation = operation
        this.condition = condition 
        this.ifTrue = ifTrue 
        this.ifFalse = ifFalse
        this.indexItem = 0
        this.inspectTimes = 0
    }

    addItems(items){
        this.items.push(items)
    }

    removeItem(){
        this.items.splice(this.indexItem, 1)
        this.indexItem--
    }

    getCurrentItem(){
        if(this.indexItem < this.items.length){
            let item = this.items[this.indexItem]
            return item
        }else{
            this.indexItem = 0
            return false
        }
    }

    getWorryLevel(item){
        let [old, op, amount]= this.operation.split(' ')
        amount = parseInt(amount)
        let res
        
        switch(op){
            case "*":
                !isNaN(amount) ? res = item * amount : res = item * item
                break
            case "+":
                !isNaN(amount) ? res = item + amount : res = item + item
                break
        }

        return res
    }




}
let currentMonkey = new Monkey()
data.forEach(el =>{
    let cmd = el.split(' ')
    if(cmd.length==2) currentMonkey.id = parseInt(cmd[1].replace(':',''))
    else if(cmd[2]=="Starting") currentMonkey.items = cmd.filter(el=>!isNaN(parseInt(el))).map(el=> el.replace(',','')).map(Number)
    else if(cmd[2]=="Operation:") currentMonkey.operation =  el.split('=')[1].trim()
    else if(cmd[2]=="Test:") currentMonkey.condition = parseInt(cmd[5])
    else if(cmd[5]=="true:") currentMonkey.ifTrue = parseInt(cmd[9])
    else if(cmd[5]=="false:") currentMonkey.ifFalse = parseInt(cmd[9])
    else if(cmd.length==1) (monkeys[currentMonkey.id] = currentMonkey, currentMonkey = new Monkey())
})

monkeys[currentMonkey.id] = currentMonkey
let partOne = []
let partTwo = []
function day11(part){
    let round = part=="one" ? 20 : 10000
    while(round > 0){
        for(monkeyId in monkeys){
            while(monkeys[monkeyId].getCurrentItem()){
                let item = monkeys[monkeyId].getCurrentItem()
                monkeys[monkeyId].inspectTimes++
                let worryLevel = monkeys[monkeyId].getWorryLevel(item)
                worryLevel = part=="one" ? Math.floor(worryLevel/3) : BigInt(worryLevel)
                // console.log(worryLevel)
                let condition = worryLevel%monkeys[monkeyId].condition==0
                if(condition){
                    monkeys[monkeys[monkeyId].ifTrue].addItems(worryLevel)
                    monkeys[monkeyId].removeItem()
                }else{
                    monkeys[monkeys[monkeyId].ifFalse].addItems(worryLevel)
                    monkeys[monkeyId].removeItem()
                }
                monkeys[monkeyId].indexItem++
            }
            
            if(round==1){
                part=="one" ? partOne.push(monkeys[monkeyId].inspectTimes) : partTwo.push(monkeys[monkeyId].inspectTimes)
            } 
        }

        // if(round==9981){
        //     console.log(monkeys)
        // }
        round--

    }
}

day11("one")
partOne = partOne.sort((a,b) => b-a)
console.log("Part one = " + partOne[0]*partOne[1])
// day11('two')
// partTwo =  partTwo.sort((a,b) => b-a)
// console.log(partTwo)
// console.log("Part two = " + partTwo[0]*partTwo[1])