const express = require("express");
const app = express();
const port = 3000;
const multer = require("multer")
const upload = multer()

app.use(express.json())

let names = ["Nico", "Luca", "Raul", "Flo"]
let me = {
    "fname": "Jan",
    "lname": "Atzgerstorfer",
    "address": "Irgendwo 69",
    "age": 17
}


app.get("/now", (req, res) => {
    const tz = req.query.tz
    res.send(new Date().toLocaleTimeString('de-CH', {timeZone: tz}))
})

app.post("/names", upload.none(), (req, res) => {
    console.log(req.body.name)
    names.push(req.body.name)
    res.send(names)
})

app.delete("/names", (req, res) => {
    const name = req.query.name
    names = names.filter(item => item !== name);
    res.status(204)
})


app.get("/secret2", (req, res) => {
    const auth = req.get("Authorization")
    if (auth === "Basic aGFja2VyOjEyMzQ=") {res.status(200)}
    else {res.status(401)}
    res.send(auth)
})


app.get("/chuck", async (req, res) =>  {
    const name = req.query.name
    let data = await fetch("https://api.chucknorris.io/jokes/random")
    let joke = await data.json()
    res.send(joke.value.replace("Chuck Norris", name))

})

app.patch("/me", (req, res) => {
    const patch = req.body
    console.log(patch)
    for (const key in me) {
        if (me[key] !== patch[key]) {
            console.log(`replace ${me[key]} with ${patch[key]}`)
            me[key] = patch[key]
        }
    }

    res.json(me)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})