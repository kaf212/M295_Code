
function queryDatabase() {
    return new Promise((resolve) => {
        let counter = 0
        for (let i=0;i<10000000000;i++) {
            counter++
        }
        resolve(counter)
    })
}

async function callQueryFunction() {
    const result = await queryDatabase()
    console.log(result)
}

callQueryFunction()
console.log("doing other things...")