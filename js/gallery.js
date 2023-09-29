const images = [
    {
        path: "./public/images/inspiration/bfi.jpeg",
        alt: ""
    },
    {
        path: "./public/images/inspiration/bigben.jpeg",
        alt: ""
    },
    {
        path: "./public/images/inspiration/cablecar.jpeg",
        alt: ""
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
                            div.children[0].style.scale = 0.99
                        }

                        if (div.children.length > 2) {
                            // Remove last child once covered
                            div.removeChild(div.children[0])
                        }
                    }, duration)
                }, interval * i)
            }
        }

        setInterval(loop, loopTime)
        loop()
    })
})