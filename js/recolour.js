/*
recolour.js
Recolours sections to be appropriate colours
*/

document.querySelectorAll("section").forEach((section) => {
    var style = getComputedStyle(document.body)
    let colourNumber

    if (section.querySelector(".containergrid")) {
        for (let i=0; i<section.querySelectorAll(".containergrid .container").length; i++) {
            var colour = style.getPropertyValue(`--${section.className}${i}`)

            console.log(`--${section.className}${i}`)
            
            if (colour) {
                colourNumber = i
            }
        }
    } else {
        var colour = style.getPropertyValue(`--${section.className}`)
    }

    console.log(colour)


    if (colour) {
        if (section.querySelector(".containergrid")) {
            var container = section.querySelectorAll(".containergrid .container")[colourNumber]
            container.style.background = colour
        } else {
            var container = section.querySelector(".container:not(.transparent)")
            container.style.background = colour
        }
    }
})