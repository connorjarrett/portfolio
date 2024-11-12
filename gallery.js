const images = [
    {
        path: "gallery/bfi.webp",
        alt: "The BFI IMAX in London",
        geo: {
            lat: 51.50442207433304,
            long: -0.11413300475342586
        }
    },
    {
        path: "gallery/bigben.webp",
        alt: "Big Ben in the evening",
        geo: {
            lat: 51.500863300989266,
            long: -0.12630153119095058
        }
    },
    {
        path: "gallery/cablecar.webp",
        alt: "A San Francisco Cable Car",
        geo: {
            lat: 37.78472216801049,
            long: -122.40776355965818
        }
    },
    {
        path: "gallery/golden_gate_bridge.webp",
        alt: "The Golden Gate Bridge from Fort Baker",
        geo: {
            lat: 37.83387360557684,
            long: -122.47708259469437
        }
    },
    {
        path: "gallery/levis.webp",
        alt: "1255 Battery Street in Levi's Plaza",
        geo: {
            lat: 37.80221432210142,
            long: -122.40232905034911
        }
    },
    {
        path: "gallery/picadilly.webp",
        alt: "Picadilly Circus in London",
        geo: {
            lat: 51.50994623425053,
            long: -0.13428739684250132
        }
    },
    {
        path: "gallery/salesforce.webp",
        alt: "Salesforce Tower at night",
        geo: {
            lat: 37.788988227624934,
            long: -122.39725953987666
        }
    },
    {
        path: "gallery/southbank_place.webp",
        alt: "Southbank Place in London, from Strand",
        geo: {
            lat: 51.51007582579332,
            long: -0.1226563474300477
        }
    },
    {
        path: "gallery/181freemont.webp",
        alt: "181 Freemont from Salesforce Park, San Francisco",
        geo: {
            lat: 37.78881841408536,
            long: -122.39697652071325
        }
    },
    {
        path: "gallery/560mission.webp",
        alt: "560 Mission Street in San Francisco",
        geo: {
            lat: 37.78875692550084,
            long: -122.3990320265763
        }
    },
    {
        path: "gallery/bank.webp",
        alt: "Outside Bank Station in the City of London, empty",
        geo: {
            lat: 51.5140139,
            long: -0.0868917
        }
    },
    {
        path: "gallery/goldengate2.webp",
        alt: "The Golden Gate Bridge from Hawk Hill",
        geo: {
            lat: 37.8269694,
            long: -122.499925
        }
    },
    {
        path: "gallery/onecassonsq.webp",
        alt: "One Casson Square in London",
        geo: {
            lat: 51.504095975821706,
            long: -0.11459121463639162
        }
    },
    {
        path: "gallery/shard.webp",
        alt: "The Shard from Borough Market",
        geo: {
            lat: 51.50594843486887,
            long: -0.09023246299904947
        }
    },
    {
        path: "gallery/time_square_day.jpeg",
        alt: "Times Square billboards in the daylight",
        geo: {
            lat: 40.756928,
            long: -73.985863
        }
    },
    {
        path: "gallery/highline.jpeg",
        alt: "View down W 14 St from the High Line",
        geo: {
            lat: 40.742105,
            long: -74.007583
        }
    },
    {
        path: "gallery/nycskyline.jpeg",
        alt: "The skyline of Lower Manhattan, from the Statue of Liberty",
        geo: {
            lat: 40.689167,
            long: -74.044472

        }
    },
    {
        path: "gallery/bryantpark.jpeg",
        alt: "Bryant Park at night",
        geo: {
            lat: 40.753272,
            long: -73.983283

        }
    },
    {
        path: "gallery/towerfountain.jpeg",
        alt: "The North Tower pool in WTC Plaza",
        geo: {
            lat: 40.712500,
            long: -74.013323
        }
    },
    {
        path: "gallery/belvedere_castle.jpeg",
        alt: "The view from the top of Belvedere Castle in Times Square",
        geo: {
            lat: 40.779287, 
            long: -73.968895
        }
    },
    {
        path: "gallery/brooklyn_bridge_crossing.jpeg",
        alt: "Crossing the Brooklyn Bridge",
        geo: {
            lat: 40.708808,
            long: -74.000306

        }
    },
    {
        path: "gallery/subway.jpeg",
        alt: "A 6 train approaching at 51 St Subway Station in NYC",
        geo: {
            lat: 40.757139,
            long: -73.971806

        }
    },
    {
        path: "gallery/70_vestry.jpeg",
        alt: "The 70 Vestry building from Hudson River Park",
        geo: {
            lat: 40.724112,
            long: -74.011544
        }
    },
    {
        path: "gallery/brooklyn_bridge_below.jpeg",
        alt: "The Brooklyn Bridge photographed from Roosovelt Island",
        geo: {
            lat: 40.704020,
            long: -73.993233

        }
    },
    {
        path: "gallery/wallst.jpeg",
        alt: "The Wall Street sign",
        geo: {
            lat: 40.707522,
            long: -74.011772

        }
    },
    {
        path: "gallery/reservoir.jpeg",
        alt: "The Jacqueline Kennedy Onassis Reservoir in Central Park",
        geo: {
            lat: 40.707522,
            long: -74.011772

        }
    },
    {
        path: "gallery/time_square_night.jpeg",
        alt: "People gathering at a performance in Times Square at night",
        geo: {
            lat: 40.75805533236614,
            long: -73.98557584853572

        }
    },
    {
        path: "gallery/flags.jpeg",
        alt: "Flags outside the Trafalgar Tavern in Greenwich",
        geo: {
            lat: 51.484405,
            long: -0.004408

        }
    },
    {
        path: "gallery/ubs.jpeg",
        alt: "The UBS building in Broadgate, London",
        geo: {
            lat: 51.519058,
            long: -0.083481

        }
    },
    {
        path: "gallery/58m.jpeg",
        alt: "An emergency stairwell on floor 58 Mezanine in Horizon 22, London",
        geo: {
            lat: 51.51448344549633,
            long: -0.082818519911794
        }
    },
    {
        path: "gallery/battersea.jpeg",
        alt: "Battersea Power Station in London",
        geo: {
            lat: 51.483322,
            long: -0.145844

        }
    },
    {
        path: "gallery/one_bank_st.jpeg",
        alt: "One Bank Street in Canary Wharf",
        geo: {
            lat: 51.503883,
            long: -0.025703
        }
    }
];

const interval = 250

images.sort((a, b) => {
    let aLoc = a.geo.lat * a.geo.long
    let bLoc = b.geo.lat * b.geo.long

    return aLoc - bLoc
})

document.querySelectorAll(".photo-grid").forEach((container) => {
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

            im.src = image.pathMin ? image.pathMin : image.path
        }))
    })

    var loadingMain = document.createElement("div")
    loadingMain.classList = "loading"
    container.appendChild(loadingMain)

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

            bestLayout.forEach((row, i) => {
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
                    el.alt = image.img.alt
                    el.style.aspectRatio = image.aspect
                    el.src = image.img.pathMin ? image.img.pathMin : image.img.path
                    el.classList = "loading"

                    el.onload = ()=>{
                        el.classList = ""

                        if (image.pathMin) {
                            image.src = image.img.path
                        }
                    }

                    rowDiv.appendChild(el)
                })

                container.appendChild(rowDiv)

                if (i + 1 < bestLayout.length) {
                    container.appendChild(loadingMain)
                } else {
                    loadingMain.remove()
                }
                
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