const http = require("http")

let responses = [undefined, undefined, undefined]

for (let i=2;i<=4;i++) {
    http.get(process.argv[i], (response)=>{
        let str = ""
        response.on("data", (data)=>{
            str += data
        })
        response.on("end", ()=>{
            responses[i-2] = str
        })
    })
}

while (true) {
    if (!(responses.includes(undefined))) {
        responses.forEach(r=>{
            console.log(r)
        })
        break
    }
}

