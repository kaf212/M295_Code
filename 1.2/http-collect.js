const http = require("http")

http.get(process.argv[2], response=>{
    let str = ""
    response.on("data", chunk => {
        str += chunk.toString()
    })
    response.on("end", ()=>{
        console.log(str.length)
        console.log(str)
    })

})



