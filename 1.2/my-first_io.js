const fs = require("fs")

const buffer = fs.readFileSync(process.argv[2])

const str = buffer.toString()

const str_split = str.split("\n")

console.log(str_split.length - 1)
