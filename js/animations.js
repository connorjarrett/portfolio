/*
animations.js
Handles animations - typically scroll based
*/

function isElementInViewport (el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

HTMLElement.prototype.onViewportEnter = function(f) {
    const el = this

    async function check() {
        if (isElementInViewport(el) && !el.dataset.viewportChecked) {
            el.dataset.viewportChecked = "true"

            f(el)
        }
        
    }

    check()

    window.addEventListener('scroll', () => check());
}

document.querySelectorAll(".text--animate-chars").forEach(item => {
    const completedText = item.innerHTML
    const split = completedText.split("")

    const interval = item.dataset.interval ? parseFloat(item.dataset.interval) : 100

    item.innerHTML = ""

    var spans = []

    split.forEach(char => {
        let span = document.createElement("span")
        span.innerHTML = char

        span.style.opacity = "0"
        span.style.transition = `opacity ${interval*2}ms`

        spans.push(span)
        item.appendChild(span)
    })

    spans.reverse()

    item.onViewportEnter(() => {
        spans.forEach((span, i) => {
            setTimeout(() => {
                span.style.opacity = "1"
            }, i * interval)
        })
    })
})

document.querySelectorAll(".text--animate-chunks").forEach(item => {
    const completedText = item.innerHTML
    const split = completedText.split(" ")

    item.innerHTML = ""

    var spans = []

    const interval = item.dataset.interval ? parseFloat(item.dataset.interval) : 100

    split.forEach(word => {
        let span = document.createElement("span")
        span.innerHTML = `${word} `

        span.style.opacity = "0"
        span.style.translate = "0 -10px"
        span.style.transition = `translate ${interval*5}ms, opacity ${interval*10}ms`

        spans.push(span)
        item.appendChild(span)
    })

    
    item.onViewportEnter(() => {
        spans.forEach((span, i) => {
            setTimeout(() => {
                span.style.translate = "0 0" 
                span.style.opacity = "1"
            }, i * interval)
        })
    })
})