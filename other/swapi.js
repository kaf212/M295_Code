const express = require("express")
const app = express()
const port = 3000

async function getCharacterOverview(id) {
    console.log(id)
    let character = await fetch(`https://swapi.dev/api/people/${id}/`);
    console.log(character)
    return `Name:\t\t${character.name}\nBirth year:\t${character.birth_year}`

}


app.use("/character", async (req, res)=>{
    const id = req.query.id
    const data = await getCharacterOverview(id)
    res.send(data)
})


app.listen(port, ()=>{
    console.log("Star Wars server running on port 1138")
})