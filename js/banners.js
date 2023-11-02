const banner = document.querySelector(".banner")
const container = banner.querySelector(".container")

const offsetMultiplier = 1.5

// The top position for the banner
const distMin = (container.scrollHeight / 2 ) * offsetMultiplier

// For reszing
function resize() {
    banner.style.marginBottom = `${container.scrollHeight / 2}px`
}

// Handle scroll to make it swipe away quicker
function scroll() {
    // Calculate distance to scroll up
    let dist = (document.documentElement.scrollTop - container.scrollHeight / 2) * offsetMultiplier

    // Calculate a modified version for faster scroll
    let distOffset = (container.scrollHeight / 2 + dist / offsetMultiplier) * offsetMultiplier

    // Calculate opacity of shadow
    let opacity = dist / distMin * 0.5

    container.style.boxShadow = `0 25px 26px rgba(90, 90, 90, ${opacity >= 0 ? opacity : 0})`
    container.style.translate = `0 calc(50% - ${distOffset}px)`
}


// Listen to and activate events
document.body.onresize = resize
document.body.onscroll = scroll
resize()
scroll()