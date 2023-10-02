const lenisOriginalOptions = lenis.options


function showCard(card) {
    const container = card.querySelector(".container")
    
    card.dataset.shown = ""
    card.style.display = "flex"

    lenis.dimensions.content = card
    lenis.options.content = card
    lenis.options.wrapper = card


    for (let i=0; i<10; i++) {
        setTimeout(()=>{
            lenis.dimensions.resize()
            lenis.targetScroll = 0
            lenis.animatedScroll = 0

            lenis.scrollTo(0)
        }, 50 * i)
    }

    setTimeout(()=>{

        card.classList.add("lenis-scrolling")

        container.style.boxShadow = "0 0 95px -7px rgba(0, 0, 0, 0.58)"
        card.style.backgroundColor = "#f7f7f773"
        card.style.backdropFilter = "blur(15px)"
        card.style.webkitBackdropFilter = "blur(15px)"

        if (container.scrollHeight < window.innerHeight * 0.8) {

            container.style.top = "50%"
            container.style.translate = "0 -50%"
            card.style.overflow = "hidden"

        } else {

            container.style.top = "25%"

        }
    }, 25)
}

function hideCard() {
    lenis.dimensions.content = document.documentElement
    lenis.options.wrapper = window
    lenis.options.content = document.documentElement
    
    for (let i=0; i<10; i++) {
        setTimeout(()=>{
            lenis.animatedScroll = window.scrollY
            lenis.targetScroll = window.scrollY
            lenis.scrollTo(window.scrollY)
        }, i * 25)
    }

    lenis.dimensions.resize()

    window.location.hash = "_"

    const card = document.querySelector(".card[data-shown]")
    
    if (card) {
        delete card.dataset.shown

        const container = card.querySelector(".container")
        
        card.style.backgroundColor = ""

        container.style.top = `calc(100% + ${card.scrollTop + 1}px)`
        container.style.translate = ""
        card.style.backdropFilter = ""
        card.style.webkitBackdropFilter = ""

        const duration = (parseFloat(getComputedStyle(container).getPropertyValue("transition-duration").slice(0, -1)))

        setTimeout(() => {
            container.style.boxShadow = ""
        }, duration * 1000)

        setTimeout(() => {
            card.style.display = ""
        }, duration * 1200)
    }
}

function setCard(trigger) {
    if (trigger.dataset.card) {
        const cardID = trigger.dataset.card
        window.location.hash = `card-${cardID}`
        
        const card = document.querySelector(`.card#${cardID}`) 
        showCard(card)
    }
}

function openByHash() {
    const hash = window.location.hash
    const cardID = hash.split("card-")[1]

    const card = document.querySelector(`.card#${cardID}`)

    if (card) {
        showCard(card)
    }
}

// Code for all cards
document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener('swiped-down', (e) => {
        console.log(e.target); // element that was swiped
        console.log(e.detail); // see event data below
        hideCard()
    });

    card.addEventListener("resize", (e) => {
        if (lenis.dimensions.content == card) {
            lenis.dimensions.resize()
        }
    })
})

$('document').ready(openByHash)
$(window).on('hashchange', openByHash)