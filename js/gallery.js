const images = [
    {
        path: "./public/images/inspiration/bfi.jpeg",
        alt: "The BFI IMAX in London"
    },
    {
        path: "./public/images/inspiration/bigben.jpeg",
        alt: "Big Ben in the evening"
    },
    {
        path: "./public/images/inspiration/cablecar.jpeg",
        alt: "A San Francisco Cable Car"
    },
    {
        path: "./public/images/inspiration/golden_gate_bridge.jpeg",
        alt: "The Golden Gate Bridge from Hawk Hill"
    },
    {
        path: "./public/images/inspiration/levis.jpeg",
        alt: "1255 Battery Street in Levi's Plaza"
    },
    {
        path: "./public/images/inspiration/picadilly.jpeg",
        alt: "Picadilly Circus in London"
    },
    {
        path: "./public/images/inspiration/salesforce.jpeg",
        alt: "Salesforce Tower at night"
    },
    {
        path: "./public/images/inspiration/southbank_place.jpeg",
        alt: "Southbank Place in London, from Strand"
    }
]

const interval = 100

$('document').ready(() => {
    document.querySelectorAll(".imagegrid").forEach((container) => {
        // Get child nodes
        const nodes = container.querySelectorAll("div")
        const spaces = nodes.length

        const loopTime = (spaces * interval) * 5

        function loop() {
            // Start at a random index, then move on for the amount of images allowed in the grid
            const randomIndex =  Math.floor(Math.random() * (images.length - 0) ) + 0;

            // Loop through each 
            for (let i = randomIndex; i < randomIndex + spaces; i++) {
                let realIndex = i - randomIndex
                const image = images[(i % images.length + images.length) % images.length]

                const div = nodes[realIndex]
                const img = document.createElement("img")
                
                img.src = image.path
                img.alt = image.alt
                img.style.opacity = 0

                // Scale to avoid stacking
                img.style.scale = 0.99

                div.appendChild(img)

                // Calculate time it takes to fade
                const duration = parseFloat(getComputedStyle(img).getPropertyValue("transition-duration").slice(0, -1))

                setTimeout(() => {
                    img.style.opacity = ""
                    img.style.scale = 1

                    setTimeout(()=>{
                        if (div.children.length > 1) {
                            // Remove last child once covered
                            div.removeChild(div.children[0])
                        }
                    }, duration * 1000)
                }, interval * i)
            }
        }

        setInterval(loop, loopTime)
        loop()
    })
})