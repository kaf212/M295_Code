const express = require("express")
const session = require("express-session")
const app = express()
const PORT = 3000;

const secret = 'yourGeneratedSecretKey';

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));


app.post("/set/:userValue", (req, res)=>{
    req.session.userValue = req.params.userValue
    res.send(`Set value '${req.params.userValue}' in session`)
})

app.get("/get", (req, res)=>{
    const val = req.session.userValue
    if (val === undefined) {
        return res.status(404).send("No value saved in session")
    }
    else {
        res.send(val)
    }
})

app.delete("/delete", (req, res)=>{
    if (req.session.userValue) {
        delete req.session.userValue
        return res.status(204).send("Value deleted successfully")
    }
    else {
        return res.status(404).send("No session value was found")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});