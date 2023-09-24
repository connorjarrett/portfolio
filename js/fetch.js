/*
fetch.js
Fetch blog and GitHub
*/

// Blog
$.ajax({
    url: "https://labnotebook.connorjarrett.com/post/index.json",
    success: function(postData) {
        var slice = postData.slice(0,3)

        document.querySelectorAll(".home--blog #blog .card:not(.card--cap)").forEach((card, i) => {
            let post = slice[i]

            card.innerHTML = `
            <img src="${post.image}" alt=${post.SEOdescription}>
            <p>${post.title}</p>
            <a class="btn btn--halfround btn--underline btn--pad" href="${post.share.url}cjrt" target="_BLANK"><button>Read</button></a>
            `
        })
    }
})

// GitHub
$.ajax({
    url: "https://api.github.com/users/conjardev/repos",
    success: function(repoData) {
        // Reduced Array
        const blacklist = [
            "conjardev",
            "portfolio"
        ]

        const reduced = repoData.filter((r) => {
            return !blacklist.find((e) => e == r.name)
        })

        // Sort Array
        var sorted = reduced.sort((a, b) => {
            return new Date(b["updated_at"]).valueOf() - new Date(a["updated_at"]).valueOf()
        })

        var slice = sorted.slice(0,3).sort((a, b) => {
            if (b.homepage) {
                return 1
            } else {
                return -1
            }
        })

        document.querySelectorAll(".home--blog #github .card:not(.card--cap)").forEach((card, i) => {
            let repo = slice[i]

            console.log(repo)

            if (repo.homepage) {
                card.innerHTML = `
                <p id="title">/${repo.name}</p>
                <p id="description">${/*repo.description*/""}</p>
                <a class="btn btn--halfround btn--underline btn--pad" href="${repo["html_url"]}" target="_BLANK"><button aria-label="Read the code for ${repo.name}">Code</button></a>
                <a class="btn btn--halfround btn--cta-newtab btn--pad" id="web" href="${repo.homepage}" target="_BLANK"><button aria-label="Check out the website for ${repo.name}">&nbsp;</button></a>
                `
            } else {
                card.innerHTML = `
                <p id="title">/${repo.name}</p>
                <p id="description">${/*repo.description*/""}</p>
                <a class="btn btn--halfround btn--underline btn--pad" href="${repo["html_url"]}" target="_BLANK"><button aria-label="Read the code for ${repo.name}" class="expanded">Code</button></a>
                `
            }
        })
    }
})