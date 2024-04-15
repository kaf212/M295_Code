fs = require("fs")

fs.readdir(process.argv[2], (err, arr)=>{
    arr.forEach(elem =>{
        if (elem.endsWith(process.argv[3]) && elem !== process.argv[3]) {
            console.log(elem)
        }
    })
})