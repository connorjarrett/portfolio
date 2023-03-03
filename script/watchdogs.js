/*
watchdog.js
Unusded watchdogs-like text animation
*/


function watchdogs(text, el) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lower = "abcdefghijklmnopqrstuvwxyz"

    const delay = 18
    const startClearing = 6
    var out = ""

    text = text.split("")
    for (let i=0;i<text.length+startClearing;i++) {
        setTimeout(function(){
            if (i <= text.length) {
                let letter = text[i]

                if (upper.includes(letter)) {
                    out = out + upper[Math.floor(Math.random()*upper.length)]
                } else if (lower.includes(letter)) {
                    out = out + lower[Math.floor(Math.random()*lower.length)]
                } else {
                    // It is a space
                    out = out + " "
                }
            }

            if (i>startClearing-1) {
                out = out.split("")
                out[i-startClearing] = text[i-startClearing]
                out = out.join("")
            }


            el.innerHTML = out
            
        },i*delay)     
    }

    setTimeout(function(){
        var counts = 0
        var toggle = false

        var cursor = setInterval(function(){
            counts = counts + 1
            if (!toggle) {
                el.innerHTML = out + "<span>_<span>"
                toggle = true
            } else {
                el.innerHTML = out
                toggle = false
            }

            if (counts > 7) {
                clearInterval(cursor)
                el.innerHTML = out
            }
        },700)
    },delay*text.length)
}