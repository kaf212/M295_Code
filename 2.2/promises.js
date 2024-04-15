const fs = require('node:fs')

function  leseDateiInhalt(filepath) {
    return new Promise((resolve)=>{
        const data = fs.readFileSync(filepath)
        resolve(data)
    })
}

leseDateiInhalt("test.txt").then(inhalt => {
    console.log(inhalt.toString())
})