const images = [
    {
        path: "./public/images/gallery/webp/bfi.webp",
        alt: "The BFI IMAX in London",
        geo: {
            lat: 51.50442207433304,
            long: -0.11413300475342586
        }
    },
    {
        path: "./public/images/gallery/webp/bigben.webp",
        alt: "Big Ben in the evening",
        geo: {
            lat: 51.500863300989266,
            long: -0.12630153119095058
        }
    },
    {
        path: "./public/images/gallery/webp/cablecar.webp",
        alt: "A San Francisco Cable Car",
        geo: {
            lat: 37.78472216801049,
            long: -122.40776355965818
        }
    },
    {
        path: "./public/images/gallery/webp/golden_gate_bridge.webp",
        alt: "The Golden Gate Bridge from Fort Baker",
        geo: {
            lat: 37.83387360557684,
            long: -122.47708259469437
        }
    },
    {
        path: "./public/images/gallery/webp/levis.webp",
        alt: "1255 Battery Street in Levi's Plaza",
        geo: {
            lat: 37.80221432210142,
            long: -122.40232905034911
        }
    },
    {
        path: "./public/images/gallery/webp/picadilly.webp",
        alt: "Picadilly Circus in London",
        geo: {
            lat: 51.50994623425053,
            long: -0.13428739684250132
        }
    },
    {
        path: "./public/images/gallery/webp/salesforce.webp",
        alt: "Salesforce Tower at night",
        geo: {
            lat: 37.788988227624934,
            long: -122.39725953987666
        }
    },
    {
        path: "./public/images/gallery/webp/southbank_place.webp",
        alt: "Southbank Place in London, from Strand",
        geo: {
            lat: 51.51007582579332,
            long: -0.1226563474300477
        }
    },
    {
        path: "./public/images/gallery/webp/181freemont.webp",
        alt: "181 Freemont from Salesforce Park, San Francisco",
        geo: {
            lat: 37.78881841408536,
            long: -122.39697652071325
        }
    },
    {
        path: "./public/images/gallery/webp/560mission.webp",
        alt: "560 Mission Street in San Francisco",
        geo: {
            lat: 37.78875692550084,
            long: -122.3990320265763
        }
    },
    {
        path: "./public/images/gallery/webp/bank.webp",
        alt: "Outside Bank Station in the City of London, empty",
        geo: {
            lat: 51.5140139,
            long: -0.0868917
        }
    },
    {
        path: "./public/images/gallery/webp/goldengate2.webp",
        alt: "The Golen Gate Bridge from Hawk Hill",
        geo: {
            lat: 37.8269694,
            long: -122.499925
        }
    },
    {
        path: "./public/images/gallery/webp/onecassonsq.webp",
        alt: "One Casson Square in London",
        geo: {
            lat: 51.504095975821706,
            long: -0.11459121463639162
        }
    },
    {
        path: "./public/images/gallery/webp/shard.webp",
        alt: "The Shard from Borough Market",
        geo: {
            lat: 51.50594843486887,
            long: -0.09023246299904947
        }
    }
]

const interval = 250

images.sort((a,b) => {
    let aLoc = a.geo.lat + a.geo.long
    let bLoc = b.geo.lat + b.geo.long

    return aLoc - bLoc
})

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

                // img.loading = "lazy"
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
        })

        // Once all images are loaded, sort
        Promise.all(promises).then(data => {
            function sortIntoLayout(options) {
                // container.querySelectorAll("img").forEach((image) => container.appendChild(image))
                container.querySelectorAll(".row").forEach((e) => e.remove())

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
                        const el = document.createElement("img")

                        el.loading = "lazy"
                        el.src = image.img.path
                        el.alt = image.img.alt

                        rowDiv.appendChild(el)
                    })

                    container.appendChild(rowDiv)
                })
            }

            const options = {
                big: [
                    ["portrait", "landscape"],
                    ["portrait", "portrait"],
                    ["portrait", "portrait", "landscape"],
                    ["landscape", "landscape"]
                ],

                small: [
                    ["portrait", "landscape"],
                    ["portrait", "portrait"],
                    ["landscape", "landscape"]
                ]
            }


            var lastSize = "big"
            new ResizeObserver(() => {
                const size = (container.clientWidth < 700 ? "small" : "big")

                if (size != lastSize) {
                    sortIntoLayout(options[size])
                    lastSize = size
                }

            }).observe(container)

            
            sortIntoLayout(options[(container.clientWidth < 700 ? "small" : "big")])
            
        })
    })
})