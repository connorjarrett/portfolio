// calc(100% + (100%/3) * 2);

$(document).ready( function() {
    $.ajax({
        async: false,
        url: "./info/projects.json"
    }).done(function(data){
        for (i=0; i<data.length; i++) {
            let project = data[i];
            let div = document.createElement("div")
            div.classList = "project"
    
            let description = document.createElement("div")
            description.classList = "description"
            
            let title = document.createElement("h3")
            title.innerHTML = project["name"]
    
            let link = document.createElement("a")
            link.innerHTML = project["url"]
            link.href = "https://"+project["url"]
    
            let descriptionText = document.createElement("p")
            descriptionText.innerHTML = project["description"]

            let thumbnail = document.createElement("img")
            thumbnail.classList = "thumb"
            thumbnail.src = project["image"]

            div.appendChild(description)
            description.appendChild(title)
            description.appendChild(link)
            description.appendChild(descriptionText)
            description.appendChild(thumbnail)

            let detail = document.createElement("div")
            detail.classList = "detail"
            
            let detailContent = document.createElement("article")
            detailContent.innerHTML = marked.parse(project["detail"])

            div.appendChild(detail)
            detail.appendChild(detailContent)

            $(".section.work .scroll")[0].appendChild(div)
        }
    })

    const step = 0.1
    if ($(".section.work .scroll")[0].children.length > 3) {
        setInterval(function(){
            for (i=0; i<$(".section.work .scroll")[0].children.length; i++) {
                let div = $(".section.work .scroll")[0].children[i]
                if (!div.style.left) {
                    div.style.left = (step + i*(100/3))*1 + "%"
                } else {
                    let newPercent = parseFloat(parseFloat((div.style.left).split("%")[0]) + step)
                    if (newPercent <= 100) {
                        div.style.transition = ""
                        div.style.left = newPercent + "%"
                    } else {
                        div.style.transition = "all 0s"
                        div.style.left = (100/3)*-1 +"%"
                    }
                }
            }
        },20)
    } else {
        for (i=0; i<$(".section.work .scroll")[0].children.length; i++) {
            let div = $(".section.work .scroll")[0].children[i]
            if (!div.style.left) {
                div.style.left = step + i*(100/3) + "%"
            }
        }
    }
})