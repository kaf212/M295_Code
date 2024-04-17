const express = require("express")
const app = express()
const port = 3000
const basicAuth = require('express-basic-auth');
app.get("/public", (req, res) => {
    res.send("Public access granted.")
})

app.get("/private", basicAuth({
        users: {"test": "testpw"},
        challenge: true,
        realm: "My Application",
        unauthorizedResponse: "You are not authorized"
    }),
    (req, res) => {
        console.log(req)
        res.send("You have been successfully authorized.")
    })


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
