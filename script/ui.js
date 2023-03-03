const taken = false;

function calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const age = calculateAge(new Date(1190073600000))

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

// Scroll Functions
function scrollBeyond(element) {
    scroll(0, (element.offsetTop + element.offsetHeight))
}

function scrollTo(element) {
    scroll(0, element.offsetTop)  
}

// Random Dynamic Texts
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

$(document).ready(function() {
    // Years
    $(".year").each(function(index){
        $(this).html((new Date).getFullYear())
    })

    // Hero Anim
    let heroText = {
        "top": $("section.hero .parallax .top")[0],
        "bottom": $("section.hero .parallax .bottom")[0]
    }
    let heroAnimOffset = 0

    function updateHeroBG() {
        heroText.top.style.backgroundPositionX =  heroAnimOffset + "%"
        heroText.bottom.style.backgroundPositionX = heroAnimOffset*-1 + "%"

        heroAnimOffset = heroAnimOffset + 0.5
    }

    setInterval(updateHeroBG,1000)
    updateHeroBG()

    // Animation Bounce
    var bounceAnimLoop = 3000
    var bounceAnimOffset = 170

    function arrowBounce() {
        $("#arrow")[0].style.transform = "translateY(10px)";
        setTimeout(function(){
            $("#arrow")[0].style.transform = "translateY(0px)";
        },bounceAnimOffset)

        setTimeout(function(){
            $("#arrow")[0].style.transform = "translateY(10px)";
        },bounceAnimOffset*3)

        setTimeout(function(){
            $("#arrow")[0].style.transform = "translateY(0px)";
        },bounceAnimOffset*4)
    }

    var bounceAnim = setInterval(function(){
        arrowBounce()

        if ($("#arrow")[0].classList.contains("done")) {
            $("#arrow")[0].style.opacity = 0
            clearInterval(bounceAnim)
        }
    },bounceAnimLoop)
    arrowBounce()

    // Dynamic text
    // if (taken) {
    //     $("#dynamic-hero").html(`Full Stack Web Developer,<br>Currently @${taken}`)
    //     $("#dynamic-hero")[0].id = ""
    // } else {
    //     $("#dynamic-hero").html(`Full Stack Web Developer<br>& Student`)
    //     $("#dynamic-hero")[0].id = ""
    // }

    $('*[id ^= "dynamic-"]').each(function(i,e){
        let name = e.id.substring(8);
        
        $.getJSON("dynamic.json",function(texts){
            if (texts[name]) {
                let selection = texts[name]
                let choice = selection.random()
                e.innerHTML = choice
            }
        })
    });

    // Create about text
    const about = `Connor Jarrett is a ${age} year old British full stack website
    developer and designer. His passion is fulfilling his full potential and solving
    problems with creative solutions.<br> %link%`

    $("section.about #about-seo").html(about.replace("<br> %link%",""))
    let aboutSplit = about.split(" ")

    for (i=0; i<aboutSplit.length; i++) {
        let span = document.createElement("span")
        span.style.opacity = 0
        span.style.transitionDelay = i/45 + "s"
        span.dataset.nosnippet = ""
        span.innerHTML = aboutSplit[i] + " "

        if (aboutSplit[i] == "%link%") {
            span.innerHTML = `<a href="about" aria-label="About Connor Jarrett">More About Me</a> `
        }

        $("section.about #about")[0].appendChild(span)
    }

    $(window).on("resize scroll load", function(){
        // Stop arrow bounce
        if (!$("section.hero").isInViewport()) {
            $("#arrow")[0].classList.add("done")
        }

        // Animate the tagline
        let top = $("section.tag")[0].offsetTop;
        let percent = ((top - window.scrollY)/top * 100)/5

        $(".tag #line1")[0].setAttribute("style",`transform: translate(${percent}%, -50%);`)
        $(".tag #line2")[0].setAttribute("style",`transform: translate(${percent * -1}%, -50%);`)
    
        // Mark Sections as Visible
        $("section .trigger").each(function(index){
            let div = $(this)[0].parentElement
            if ($(this).isInViewport()) {
                div.classList.add("visible")
            
                setTimeout(function(){
                    if (!div.classList.contains("played")) {
                        div.classList.add("played")
                    }
                },100)
            } else {
                if (!$(div).isInViewport()) {
                    div.classList.remove("visible")
                }
            }
           
        });

        // Work Animation
        if ($("section.work").isInViewport()) {
            $("section.work .job").each(function(index){
                let e = $(this)[0]
                if ($(this).isInViewport()) {
                    if (e.classList.contains("unplayed")) {
                        e.classList.remove("unplayed")
                    }
                } else {
                    e.classList.add("unplayed")
                }
            })
        }

        // Skill & Tool Animation
        $("section.skillsTools aside > div").each(function(i,e){
            let dist = ($("section.skillsTools")[0].offsetTop + this.offsetTop)-window.scrollY-window.innerHeight+(this.offsetHeight)
            let per = (dist / document.body.offsetWidth * 100)

            if (dist < 0) {
                dist = 0
            }

            if (per > 25) {
                return true;
            }

            if (this.parentElement.id == "skills") {
                this.style.transform = `translateX(${dist}px)`
            } else {
                this.style.transform = `translateX(${(dist)*-1}px)`
            }
        })
    }) 

    // Skills and Tools
    $.getJSON("./skillsTools.json",function(data){
        function box(name, descriptionText, url) {
            let div = document.createElement("div")
            let title = document.createElement("h3")
            title.innerHTML = name
            
            let description = document.createElement("h4")
            description.innerHTML = descriptionText

            if (url) {
                let link = document.createElement("a")
                link.target = "_BLANK"
                link.ariaLabel = name
                link.href = url

                div.appendChild(link)
            }

            div.appendChild(title)
            div.appendChild(description)

            return div
        }

        // Skills
        for (s=0; s<data["skills"].length;s++) {
            let skill = data["skills"][s]
            
            let div = box(skill["name"], skill["description"])

            div.style.transform = "translateX(50%)"
            $("section.skillsTools #skills")[0].appendChild(div)
        }

        // Tools
        for (t=0; t<data["tools"].length;t++) {
            let tool = data["tools"][t]
            
            let div = box(tool["name"], tool["description"], tool["url"])

            div.style.transform = "translateX(-50%)"
            $("section.skillsTools #tools")[0].appendChild(div)
        }
    })
});
