const mainLine = document.querySelector(".line .main")
const beforeLine = document.querySelector(".line .before")
const afterLine = document.querySelector(".line .after")

const workAfter = mainLine.hasAttribute("data-jobAfter")
const workBefore = mainLine.hasAttribute("data-jobBefore")

const start = mainLine.dataset.start
const end = mainLine.dataset.end

console.log(start,end)

if (!end) {
    afterLine.classList.add("nomarker")
} else if (workAfter) {
    afterLine.classList.add("highlight")
}

if (!start) {
    beforeLine.classList.add("nomarker")
} else if (workBefore) {
    beforeLine.classList.add("highlight")
}