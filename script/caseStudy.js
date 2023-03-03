var work;

$.ajax({
    url: "../../work.json",
    async: false,
    success: function(data){
        for (i=0; i<data.length; i++) {
            let entry = data[i]
            let match = (entry["for"].toLowerCase().replace(" ","-"))
            
            if (match == caseStudy) {
                work = entry
                document.title = `Connor Jarrett @${entry["for"]}`
            }
        }
    }
})

$(document).ready(function(){
    $(".title").each(function(){
        this.innerHTML = work["for"]
    })

    $(".role").each(function(){
        this.innerHTML = work["role"]
    })

    $(".period").each(function(){
        this.innerHTML = `${work["startYear"]}-${work["endYear"]}`
    })

    $("section.hero .title").html(`@<a target="_BLANK" aria-label="${work["for"]}" href="${work["url"]}">${work["for"]}</a>`)
})