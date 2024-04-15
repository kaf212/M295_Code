const http = require("http")
let data = []

http.get(process.argv[2], response=>{
    response.on("data", (data)=>{
        console.log(data.toString())
    })

    response.on("error", response=>{
        console.log(response.toString())
    })
})