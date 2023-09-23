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
            <img src="${post.image}">
            <p>${post.title}</p>
            <a class="btn btn--halfround btn--underline btn--pad" href="${post.url}" target="_BLANK"><button>Read</button></a>
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

        const reduced = repoData.filter((r)=>{
            return blacklist.find((e) => e == r.name)
        })

        // Shuffle Array
        const shuffled = repoData.sort(() => 0.5 - Math.random());

        var slice = shuffled.slice(0,3)

        document.querySelectorAll(".home--blog #github .card:not(.card--cap)").forEach((card, i) => {
            let repo = slice[i]

            console.log(repo)

            if (repo.homepage) {
                card.innerHTML = `
                <p id="title">/${repo.name}</p>
                <p id="description">${repo.description}</p>
                <a class="btn btn--halfround btn--underline btn--pad" href="${repo["html_url"]}" target="_BLANK"><button>Code</button></a>
                <a class="btn btn--halfround btn--pad" id="web" href="${repo.homepage}" target="_BLANK"><button>&#8599;</button></a>
                `
            } else {
                card.innerHTML = `
                <p id="title">/${repo.name}</p>
                <p id="description">${repo.description}</p>
                <a class="btn btn--halfround btn--underline btn--pad" href="${repo["html_url"]}" target="_BLANK"><button>Code</button></a>
                `
            }
        })
    }
})