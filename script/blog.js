$(document).ready(function() {
    const container = $("section.blog .postings")[0]

    $.getJSON("https://labnotebook.connorjarrett.com/post/index.json", function(articles){
        articles = articles.splice(0,4)
        console.log(articles)

        for (let i=0; i<articles.length; i++) {
            let currentArticle = articles[i]
            let link = document.createElement("a")
            link.href = `${currentArticle.share.url}cjrt`

            let articleContainer = document.createElement("article")

            let title = document.createElement("h3")
            title.innerHTML = currentArticle.title

            let image = document.createElement("img")
            image.src = currentArticle.image

            link.appendChild(articleContainer)
            articleContainer.appendChild(title)
            articleContainer.appendChild(image)

            container.appendChild(link)
        }
    })

});