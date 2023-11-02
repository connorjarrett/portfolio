const banner = document.querySelector(".banner")
const container = banner.querySelector(".container")

const offsetMultiplier = 1.5

const distMin = (container.scrollHeight / 2 )* -1.5

function resize() {
    banner.style.marginBottom = `${container.scrollHeight / 2}px`
}

function scroll() {
    let dist = (document.documentElement.scrollTop - container.scrollHeight / 2) * offsetMultiplier
    let distOffset = (container.scrollHeight / 2 + dist / offsetMultiplier) * offsetMultiplier

    let opacity = dist / distMin * 0.5

    container.style.boxShadow = `0 25px 26px rgba(90, 90, 90, ${opacity >= 0 ? opacity : 0})`
    container.style.translate = `0 calc(50% - ${distOffset}px)`
}

document.body.onresize = resize
document.body.onscroll = scroll
resize()
scroll()