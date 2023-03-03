function calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const age = calculateAge(new Date(1190073600000))

function typeWriter(str,el,delay=1) {
    str = str.split("")

    for (let i=0; i<str.length; i++) {
        setTimeout(function(){
            el.innerHTML = el.innerHTML + str[i]
            
        },i*delay)
    }
}

let platform = navigator?.userAgentData?.platform || navigator?.platform
var appleDevicesArr = ['MacIntel', 'MacPPC', 'Mac68K', 'Macintosh', 'iPhone', 'iPod', 'iPad', 'iPhone Simulator', 'iPod Simulator', 'iPad Simulator', 'Pike v7.6 release 92', 'Pike v7.8 release 517'];

let isMac = appleDevicesArr.includes(platform)

$(document).ready(function() {
    var heroAnimPath = (document.body.offsetWidth / $("#dpi")[0].offsetWidth < 7) ? "mobile" : "desktop"

    // Ascii Text
    // Need to use double backslash because javascript will be javascript
    const ascii = [
    "     ___    ____  ____  __  ________        ",
    "    /   |  / __ )/ __ \\/ / / /_  __/        ",
    "   / /| | / __  / / / / / / / / /           ",
    "  / ___ |/ /_/ / /_/ / /_/ / / /            ",
    " /_/  |_/_____/\\____/\\____/ /_/             ",
    "        __________  _   ___   ______  ____  ",
    "       / ____/ __ \\/ | / / | / / __ \\/ __ \\ ",
    "      / /   / / / /  |/ /  |/ / / / / /_/ / ",
    "     / /___/ /_/ / /|  / /|  / /_/ / _, _/  ",
    "     \\____/\\____/_/ |_/_/ |_/\\____/_/ |_|   "
    ]

    for (let i=0; i<ascii.length; i++) {
        setTimeout(function(){
            let span = document.createElement("span")
            span.dataset.nosnippet = ""

            $("section.hero #hero-ascii")[0].appendChild(span)

            typeWriter(ascii[i], span, 2)
        },i*50)
    }

    // Please send help this smooth transition took too long to make
    // Hire me to make it worth it: connor@connorjarrett.com

    // Mobile handler
    function resize() {
        let newPath = (document.body.offsetWidth / $("#dpi")[0].offsetWidth < 7) ? "mobile" : "desktop"
        
        if (newPath != heroAnimPath) {
            heroAnimPath = newPath

            if (newPath == "desktop") {
                $("section.hero")[0].classList.remove("anim-mobi")
                $("section.hero")[0].classList.add("anim-desktop")
            } else {
                $("section.hero")[0].classList.add("anim-mobi")
                $("section.hero")[0].classList.remove("anim-desktop")
            }
        }

        if ($("section.hero.anim-mobi").length > 0) {
            let radius = `${($("section.hero.anim-mobi")[0].offsetWidth)/5}px`

            if ($("section.hero.anim-mobi")[0].offsetWidth / document.documentElement.clientWidth > 0.9) {
                radius = `${($("section.hero.anim-mobi")[0].offsetHeight) / 10}px`
                $("section.hero.anim-mobi")[0].style.width = "90vw"
                $("section.hero.anim-mobi")[0].style.height = "unset"
            }

            $("section.hero.anim-mobi")[0].style.borderRadius = radius
        }
    }

    if (heroAnimPath == "desktop") {
        $("section.hero")[0].classList.remove("anim-mobi")
        $("section.hero")[0].classList.add("anim-desktop")
    } else {
        $("section.hero")[0].classList.add("anim-mobi")
        $("section.hero")[0].classList.remove("anim-desktop")
    }
    $(window).on("resize scroll", resize)
    resize()

    // Mouse Icon Bounce
    function mouseBounce() {
        let image = $("body > main #scroll img")[0]

        if (heroAnimPath == "mobile") {
            image.src = "../media/misc/swipe.svg"
            $("body > main #scroll")[0].childNodes[2].nodeValue = "Swipe Slowly"
        } else {
            image.src = "../media/misc/mouse.svg"
            $("body > main #scroll")[0].childNodes[2].nodeValue = "Scroll Slowly"
        }

        image.style.transform = "translateY(5px)"
        setTimeout(function(){
            image.style.transform = "translateY(0px)"
        },200)

        setTimeout(function(){
            image.style.transform = "translateY(5px)"
            setTimeout(function(){
                image.style.transform = "translateY(0px)"
            },200)
        },400)
    }

    setInterval(function(){
        mouseBounce()
    },2500)
    mouseBounce()


    // Code import
    const startIndex = 0
    var arrayIndex = startIndex - 1;
    var codeTemplate; 

    $.ajax({
        url: "../script/about.js",
        dataType: "text",
        async: false,
        success: function(data){
            codeTemplate = data.split("\n")
        }
    })

    $(window).on("scroll resize",function(){
        if (document.documentElement.scrollTop == 0) {
            arrayIndex = startIndex
        }

        // Determine number of lines of code to write
        var codeLines;
        var changed = false;
        const codeLineHeight = 10

        let original = Math.ceil(document.documentElement.scrollTop / codeLineHeight)

        if (document.documentElement.scrollTop <= document.documentElement.clientHeight) {
            codeLines = Math.ceil(document.documentElement.scrollTop / codeLineHeight)
        } else {
            codeLines = Math.ceil(document.documentElement.clientHeight / codeLineHeight)
        }

        $("section.hero #hero-ascii")[0].style.opacity = (1 - (document.documentElement.scrollTop / document.documentElement.clientHeight)/2)

        changed = original != codeLines ? false : true

        // Set code lines to max if scrolled down
        if (!changed) {
            if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
                if ($("section.hero #code")[0].children.length != codeLines) {
                    changed = true;
                }
            }
        }

        if (changed) {
            // Make sure the screen fills max space
            $("section.hero")[0].style.scale = "100%"

            if ($("section.hero #code")[0].children.length != codeLines) {
                // Write lines of code
                if ($("section.hero #code")[0].children.length < codeLines) {
                    
                    // Add Lines of code
                    for (i=0; i<(codeLines - $("section.hero #code")[0].children.length); i++) {
                        let span = document.createElement("span")
                        span.style.width = "1px"
                        span.dataset.nosnippet = ""
                        span.innerHTML = `${arrayIndex+2}   `

                        arrayIndex++
                        if (arrayIndex >= codeTemplate.length) {
                            // If max lines reached, go back to start
                            arrayIndex = startIndex
                        }
                        

                        // Get line to write
                        let string = codeTemplate[arrayIndex]

                        if (string) {
                            // Style string if comment
                            string.includes("//") && !string.includes("https") ? span.style.color = "green" : null
                            
                            // Typewriter effect on string
                            typeWriter(string ,span, 10)
                            
                            $("section.hero #code")[0].appendChild(span)
                        }
                    }
                } else {

                    // Remove lines of code
                    let toDelete = $("section.hero #code")[0].children.length - codeLines

                    for (i=0; i<toDelete; i++) {
                        let elToRemove = $("section.hero #code")[0].lastElementChild
                        $("section.hero #code")[0].removeChild(elToRemove)
                        arrayIndex = arrayIndex - 1
                    }
                }
            }
        } else {
            // Fade in device frame
            if ($("section.hero .background")[0].style.opacity == 0) {
                $("section.hero .background")[0].style.opacity = 1
            }

            // Scale device frame
            if ((document.documentElement.scrollTop > document.documentElement.clientHeight) && document.documentElement.scrollTop < document.documentElement.clientHeight*1.5) {
                let overflow = document.documentElement.scrollTop - document.documentElement.clientHeight

                let scale = (100 - (overflow / document.documentElement.clientHeight) * 100) 
                $("section.hero")[0].style.scale = `${scale}%`

            } else if (document.documentElement.scrollTop > document.documentElement.clientHeight*1.5) {
                // If max scale reached, set to fiex value
                $("section.hero")[0].style.scale = "50%"
            }

            if ((document.documentElement.scrollTop > document.documentElement.clientHeight * 1.5) && document.documentElement.scrollTop < document.documentElement.clientHeight*2.5) {
                // Fade out code lines
                let overflow = document.documentElement.scrollTop - document.documentElement.clientHeight * 1.5
                
                let fade = (1 - (overflow / document.documentElement.clientHeight))
                $("section.hero #code")[0].style.opacity = fade
            } else if (document.documentElement.scrollTop > document.documentElement.clientHeight*3) {
                
                // Set scroll section to position relative, so we can scroll past it
                $("body > main")[0].style.position = "relative"
                $("body > main")[0].style.top = `300vh`
                $("section.hero #code")[0].style.opacity = 0

                $("body > article.content-main")[0].style.display = ""
                $("body > article.content-main")[0].style.top = `300vh`
                $("body > main #scroll")[0].style.opacity = 0
            }

            if (document.documentElement.scrollTop < document.documentElement.clientHeight*3) {
                
                // Set back to position fixed if scrolled up
                $("body > article.content-main")[0].style.display = "none"
                $("body > main")[0].style.position = ""
                $("body > main")[0].style.top = ""
                $("body > main #scroll")[0].style.opacity = 1
            }
        }

        // Handle background colour change
        if (document.documentElement.scrollTop < document.documentElement.clientHeight/2) {
            if ($("body > main")[0].style.backgroundColor != "black") {
                $("body > main")[0].style.backgroundColor = "black"
                $("body > main #scroll")[0].style.filter = "invert(1)"

                $("section.hero .background")[0].style.opacity = 0
            }
        } else {
            $("section.hero .background")[0].style.opacity = 1

            setTimeout(function(){
                if (document.documentElement.scrollTop > document.documentElement.clientHeight/2) {
                    $("body > main")[0].style.backgroundColor = "white"
                    $("body > main #scroll")[0].style.filter = "invert(0)"
                }
            },300)
        }
    })

    // Work Experience
    $.getJSON("../work.json", function(data){
        for (i=0; i<data.length; i++) {
            let work = data[i]
            let div = document.createElement("div")

            let position = document.createElement("h3")
            position.innerHTML = work["role"]

            let company = document.createElement("h4")
            company.innerHTML = `@${work["for"]}`

            let period = document.createElement("h5")
            period.innerHTML = `${work["startYear"]}-${work["endYear"]}`

            div.appendChild(position)
            div.appendChild(company)
            div.appendChild(period)
            $("article#work")[0].appendChild(div)
        }
    })

    // Skills
    $.getJSON("../skillsTools.json", function(data){
        let full = data["skills"].concat(data["tools"])
        for (i=0; i<full.length; i++) {
            let li = document.createElement("li")
            li.innerHTML = full[i]["name"]

            $("section.skills #skills")[0].appendChild(li)
        }
    })

    // Lists
    $("ul#list").each(function(i,e){
        var listName = e.dataset.list
        
        $.ajax({
            url: "./lists.json",
            async: false,
            success: function(data){
                var entry = data[listName]

                if (entry) {
                    for (i=0;i<entry.length;i++) {
                        let list = entry[i]
                        let li = document.createElement("li")

                        let extraStyle = ""

                        if (list["icon"] == "desktop_mac" && isMac) {
                            list["icon"] = "&#63743;"
                            list["name"] = ""
                            list["value"] = "Mac Mini M2"

                            extraStyle = 'style="font-family: unset; font-size: 28px"'
                        }

                        li.innerHTML = `<span class="icon noselect" ${extraStyle} data-nosnippet title="${list["name"]}">${list["icon"]}</span> <b>${list["name"]}:  </b>${list["value"]}`

                        e.appendChild(li)
                    }
                }
            }
        })
    })

    // Add age
    $(".age").each(function(i,e) {
        e.innerHTML = age
    })
});