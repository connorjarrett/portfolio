window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

const isMobile = window.mobileCheck()

// Animate hero
function animHero() {
    let alwaysShowScroll = true
    let heroFillsScreen = document.getElementById("home").offsetHeight >= window.innerHeight-10

    setTimeout(function() {
        // Move "Hi all" up after 100ms
        $("#hero-intro")[0].style.setProperty("top","calc(50% - 9vw + 10px)")
    }, 100)
    
    // Uncover the name
    $("#hero-name .cover")[0].style.width = 0; 
    setTimeout(function() {
        // Increase name size after size
        $("#hero-name")[0].style.setProperty("font-size", "9vw")
    }, 500)

    // Fade in "scroll to discover"
    if ((heroFillsScreen && !alwaysShowScroll) || alwaysShowScroll) {
        // Only show if the hero fills the screen

        if (isMobile) {
            // Change message for mobile
            $(".scrollToDiscover .icon")[0].innerHTML = "swipe_up"
            $(".scrollToDiscover p")[0].innerHTML = "Learn More"
        }

        setTimeout(function() {
            $(".scrollToDiscover")[0].style.bottom = "5px"
            $(".scrollToDiscover")[0].style.opacity = 1
        }, 500)
    }
}

// Give all ".icon" elements the material icons class
function icons() {
    $(".icon").each(function() {
        $(this)[0].classList.add("material-symbols-rounded")
    })
}

function scrollBeyond(element) {
    // This function scrolls down the page just past the hero area
    let height = element.offsetHeight

    scroll(0, height)
}

function anchor(name) {
    // This function scrolls to a specific anchor
    let baseURL = (window.location.origin + window.location.pathname)
    window.location = baseURL + "#" + name
}

$.fn.isInViewport = function(half) {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    if (half) {
        elementTop = elementTop / 2
        elementBottom = elementBottom / 2

        viewportBottom = viewportBottom / 2
        viewportTop = viewportTop / 2
    }

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function underlines() {
    $(".underline:visible").each(function(index){
        if ($(this).isInViewport()) {
            $(this).delay(50*index).queue(function(next){
                $(this)[0].style.transition = ""
                $(this)[0].style.width = "100%"
                next();
            });
        } else {
            $(this)[0].style.transition = "all 0s"
            $(this)[0].style.width = "0%"
        }
       
    });
}

function videos() {
    $("video:visible").each(function(index){
        if ($(this).isInViewport()) {
            $(this)[0].play()
        } else {
            $(this)[0].currentTime = 0
            $(this)[0].pause()
        }
       
    });
}

function activateSection() {
    $(".trigger,.hero :visible").each(function(index){
        let div = $(this)[0].parentElement
        if ($(this).isInViewport()) {
            $(this).delay(5*index).queue(function(next){
                div.classList.add("visible")
                next();
            });
        } else {
            if (!$(div).isInViewport()) {
                div.classList.remove("visible")
            }
        }
       
    });
}

function scaleText() {
    $(".text").each(function() {
        let textHeight = $(this)[0].offsetHeight

        $(this)[0].parentElement.style.height = textHeight + 50 + "px"
    })
}

function fadeChildren() {
    $(".fadeInChildren").each(function(count){
        if ($(this).isInViewport()) {
            for(i=0; i<$(this)[0].children.length; i++) {
                let child = $(this)[0].children[i]
                setTimeout(function() {
                    child.style.opacity = 1
                }, 200 * i)
            }
        } else {
            for(i=0; i<$(this)[0].children.length; i++) {
                let child = $(this)[0].children[i]
                child.style.opacity = 0
            }
        }
    });
}

function reizeScroll() {
    underlines()
    activateSection()
    videos()
    fadeChildren()
    scaleText()

    if ($(".about .content img")[0].offsetHeight >= $(".about .text-content")[0].offsetHeight) {
        $(".about .content img")[0].style.setProperty("max-height", $(".about .text-content")[0].offsetHeight + "px")
        $(".about .content img")[0].style.setProperty("width", $(".about .text-content")[0].offsetHeight / 16 * 12 + "px")
    } else {
        $(".about .content img")[0].style.setProperty("max-height", "unset")
        $(".about .content img")[0].style.setProperty("width", "unset")
    }
}

// Apply Mobile
if (isMobile) {
    let change = [".about .content", "#hero-name"]
    $(change.toString()).each(function(index){
        // $(".about .content")[0].classList.add("mobile")
        $(this)[0].classList.add("mobile")
    });
}

// Add Socials
$(".socials").each(function() {
    let div = $(this)[0]

    $.getJSON("info/socials.json", function(socials){
        socials.forEach(function(social) {
            let socialDiv = document.createElement("img")
            socialDiv.src = "media/socials/" + social["icon"]
            socialDiv.title = social["name"]
            socialDiv.classList = "social " + social["name"]

            let button = document.createElement("a")
            button.href = social["url"]
            button.style = "width:100%; height:100%;margin-right:16px;"
            
            div.appendChild(button)
            button.appendChild(socialDiv)
        });
    });
})

// Set Years
$(".year").each(function() {
    let date = new Date
    date.setTime(Date.now())
    let year = date.getFullYear()

    $(this)[0].innerHTML = year
});

$(window).on('resize scroll', reizeScroll);
$(window).on('resize', scaleText);
$('.text').on('resize DOMSubtreeModified', scaleText);

setTimeout(reizeScroll, 10)

setTimeout(scaleText, 1000)
setTimeout(animHero, 10)

icons()