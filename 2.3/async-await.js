
function simuliereVerzoegerung(ms) {
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve()}, ms)
    })
}

async function addiereNachVerzoegerung(a, b, ms) {
    await simuliereVerzoegerung(ms).then(()=>{
        console.log(a+b)
    })

}

addiereNachVerzoegerung(2,3,2000)