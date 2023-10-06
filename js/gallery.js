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
        alt: "The Golden Gate Bridge from Fort Baker"
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
            const randomIndex = Math.floor(Math.random() * (images.length - 0)) + 0;

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

                    setTimeout(() => {
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

    document.querySelectorAll(".allimages").forEach((container) => {
        var promises = []

        images.forEach((image) => {
            const el = document.createElement("img")

            el.src = image.path
            el.alt = image.alt

            promises.push(new Promise((res) => {
                const im = new Image()

                im.onload = () => {
                    // const aspect = Math.round((im.width / im.height) * 100) / 100
                    const aspect = im.width / im.height

                    res({
                        img: image,
                        width: im.width,
                        height: im.height,
                        aspect: aspect,
                        orientation: aspect < 1 ? "portrait" : "landscape"
                    })
                }

                im.src = image.path
            }))

            container.appendChild(el)
        })

        // Once all images are loaded, sort
        Promise.all(promises).then(data => {
            const options = [
                ["portrait", "landscape"],
                ["portrait", "portrait"],
                ["portrait", "portrait", "landscape"],
                ["landscape", "landscape"]
            ]

            const maxRow = options.sort((a, b) => { return b.length - a.length })[0].length
            const minRow = options.sort((a, b) => { return b.length - a.length }).slice(-1)[0].length

            const portrait = data.filter(e => e.orientation == "portrait")
            const landscape = data.filter(e => !portrait.includes(e))

            console.log(`Portrait: ${portrait.length}\nLandscape: ${landscape.length}`)

            // ChatGPT written code below because I didn't know where to start with this one,
            // surprisingly good but took loads of attempts

            function generateCombinations(template) {
                const combinations = [];
                const rowCount = Math.ceil(data.length / template.length);

                for (let i = 0; i < rowCount; i++) {
                    const row = [];
                    for (let j = 0; j < template.length; j++) {
                        const dataIndex = i * template.length + j;
                        if (dataIndex < data.length) {
                            row.push(data[dataIndex])

                            // if (template[j] === "portrait") {
                            //     row.push(data[dataIndex])
                            // } else if (template[j] === "landscape") {
                            //     row.push(data[dataIndex])
                            // }
                        }
                    }
                    combinations.push(row);
                }

                return combinations;
            }

            function findBestLayout() {
                let bestLayout = null;
                let bestOverflowCount = data.length;

                for (const template of options) {
                    const combinations = generateCombinations(template);
                    const overflowCount = combinations.reduce((total, row) => total + Math.max(0, row.length - maxRow), 0);

                    if (overflowCount < bestOverflowCount) {
                        bestOverflowCount = overflowCount;
                        bestLayout = combinations;
                    }
                }

                return bestLayout;
            }

            const bestLayout = findBestLayout();
            
            // Back to human written code

            bestLayout.forEach((row) => {
                const rowDiv = document.createElement("div")
                rowDiv.classList = "row"

                const combinedRowRatio = row.map(e => e.aspect).reduce((a, b) => a + b, 0)
                var height = container.getBoundingClientRect().width / combinedRowRatio

                rowDiv.style.height = `${height}px`

                new ResizeObserver(() => {
                    height = container.getBoundingClientRect().width / combinedRowRatio

                    rowDiv.style.height = `${height}px`
                }).observe(container)


                row.forEach((image) => {
                    const el = container.querySelector(`img[src="${image.img.path}"]`) 

                    rowDiv.appendChild(el)
                })

                container.appendChild(rowDiv)
            })
        })
    })
})