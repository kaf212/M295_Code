const express = require("express");
const app = express();
const port = 3000;


app.use("/now", (req, res) => {
    res.send(`${new Date().toLocaleTimeString()}`)
})

app.use("/zli", (req, res) => {
    res.redirect("https://www.zli.ch/")
})


app.use("/name", (req, res) => {
    const random = Math.floor(Math.random() * (19 - 0))
    const names = [
        "Isabelle",
        "Nico",
        "Raul",
        "Luca",
        "Jan",
        "Flo",
        "Luis",
        "Lukas",
        "Adrian",
        "Fabian",
        "Julien",
        "Marc",
        "Philippe",
        "Stefan",
        "Nicolas",
        "Anna",
        "Sophie",
        "Laura",
        "Caroline",
        "Elena"
    ]
    res.send(names[random])
})

app.use("/html", (req, res) => {
    res.sendFile(`${__dirname}/html.html`)
})

app.use("/image", (req, res) => {
    res.sendFile(`${__dirname}/pz87.jpg`)
})

app.use("/teapot", (req, res) => {
    res.send(418)
})

app.use("/user-agent", (req, res) => {
    res.send(req.rawHeaders[15])
})


app.use("/secret", (req, res) => {
    res.send(403)
})

app.use("/xml", (req, res) => {
    res.sendFile(`${__dirname}/xml.xml`)
})

app.use("/me", (req, res) => {
    res.send({
        "Vorname": "Jan",
        "Nachname": "Atzgerstorfer",
        "Alter": 17,
        "Wohnort": "Zürich",
        "Augenfarbe": "N/A"
    })
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})