
function verdoppeln(zahl, callback) {
    callback(zahl * 2)
}

verdoppeln(4, (i)=> {
    console.log(`Zahl = ${i}`)
})