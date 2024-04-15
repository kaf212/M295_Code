const fs = require("fs")

fs.readFile(process.argv[2], (err, buffer)=>{
    const str = buffer.toString()
    const str_split = str.split("\n")
    console.log(str_split.length - 1)
})