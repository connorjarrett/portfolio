const lenisOriginalOptions = lenis.options

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
const isMobile = window.mobileCheck()

function showCard(card) {
    const container = card.querySelector(".container")
    const screen = document.querySelector(".cardScreen")

    if (window.scrollY == 0) {
        const trigger = document.querySelector(`*[data-card="${card.id}"]`)

        document.body.style.top = `${(trigger.getBoundingClientRect().top)* -1}px`
    } else {
        document.body.style.top = `${window.scrollY * -1}px`
    }

    document.body.style.overflowY = "hidden"
    document.body.style.position = "fixed"

    card.dataset.shown = ""

    lenis.dimensions.content = card
    lenis.options.content = card
    lenis.options.wrapper = card

    let savedDuration = lenis.duration
    lenis.duration = 0

    lenis.dimensions.resize()
    lenis.targetScroll = 0
    lenis.animatedScroll = 0

    lenis.scrollTo(0)

    lenis.duration = savedDuration

    setTimeout(()=>{
        card.classList.add("lenis-scrolling")

        if (!iOS) {
            // Only show box-shadow if not iOS because elastic scroll makes it look terrible when scrolled down
            container.style.boxShadow = "0 0 35px -11px rgb(40, 40, 40)"
        }

        if (isMobile || iOS) {
            // Add padding to the bottom of cards on mobile
            card.querySelector("article").style.marginBottom = "60px"
        }

        screen.style.backgroundColor = "#f7f7f773"
        screen.style.backdropFilter = "blur(15px)"
        screen.style.webkitBackdropFilter = "blur(15px)"

        card.style.display = "flex"
        setCardOpenPosition(card)
    }, 25)
}

function setCardOpenPosition(card) {
    const container = card.querySelector(".container")

    if (container.scrollHeight < window.innerHeight * 0.8) {
        container.style.translate = "0 calc(-100% + var(--radiusSmall))"
    } else {
        container.style.translate = ""
        container.style.top = "25%"
    }
}

function hideCard() {
    const screen = document.querySelector(".cardScreen")

    lenis.dimensions.content = document.documentElement
    lenis.options.wrapper = window
    lenis.options.content = document.documentElement

    history.pushState("", document.title, window.location.pathname + window.location.search);

    const card = document.querySelector(".card[data-shown]")
    
    if (card) {
        delete card.dataset.shown

        const container = card.querySelector(".container")
        
        screen.style.backgroundColor = ""

        container.style.top = `calc(100% + ${card.scrollTop + 1}px)`
        container.style.translate = ""
        screen.style.backdropFilter = ""
        screen.style.webkitBackdropFilter = ""

        const duration = (parseFloat(getComputedStyle(container).getPropertyValue("transition-duration").slice(0, -1)))

        setTimeout(() => {
            container.style.boxShadow = ""
        }, duration * 1000)

        setTimeout(() => {
            
            const top = document.body.style.top
            const scrollTo = parseInt(top.slice(0, -2)) * -1

            document.body.style.top = ""
            document.body.style.overflowY = ""
            document.body.style.position = ""

            lenis.dimensions.resize()

            lenis.animatedScroll = scrollTo
            lenis.targetScroll = scrollTo
            lenis.scrollTo(scrollTo)

            card.style.display = ""
        }, duration * 1200)
    }
}

function setCard(trigger) {
    if (trigger.dataset.card) {
        const cardID = trigger.dataset.card
        window.location.hash = `card-${cardID}`
        
        const card = document.querySelector(`.card#${cardID}`) 
        // showCard(card)
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


$('document').ready(()=>{
    // Create screen
    const screen = document.createElement("div")
    screen.classList = "cardScreen"
    document.body.appendChild(screen)

    // Code for all cards
    document.querySelectorAll(".card").forEach((card) => {
        const container = card.querySelector(".container")
        const article = container.querySelector("article")

        container.addEventListener('swiped-down', (event) => {
            const cardTop = container.getBoundingClientRect().top

            if (cardTop > 1) { // Only if top of card is in view
                if (!container.style.translate) {
                    //  If the card is positioned near the top of the screen 

                    if (event.detail.yStart < window.innerHeight / 2) { // Only if swipe starts less than halfway down the page
                        hideCard()
                    }
                } else {
                    // Card is positioned near bottom of screen

                    hideCard()
                }
            }
        });

        new ResizeObserver(() => {
            if (lenis.dimensions.content == card) {
                lenis.dimensions.resize()

                setCardOpenPosition(card)
            }
        }).observe(article)
    })

    openByHash()
})
$(window).on('hashchange', openByHash)