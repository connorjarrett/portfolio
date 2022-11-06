// Skills
$.getJSON("./info/skills.json", function(skills) {
    for (i=0; i<skills.length; i++) {
        let chip = document.createElement("div")
        chip.classList = "chip"

        let skillName = document.createElement("h3")
        skillName.innerHTML = skills[i]["name"]
        
        chip.appendChild(skillName)
        $(".skills-subsection")[0].appendChild(chip)
    }
});

// Tools
$.getJSON("./info/programs.json", function(programs) {
    for (i=0; i<programs.length; i++) {
        let chip = document.createElement("div")
        chip.setAttribute("onclick", "window.open('"+programs[i]["link"]+"');")
        chip.classList = "chip"

        let logo = document.createElement("img")
        logo.src = "media/program-logos/"+programs[i]["logo"]
        logo.alt = "The "+programs[i]["name"]+" logo"
        logo.title = programs[i]["name"]

        chip.appendChild(logo)
        $(".tools-subsection")[0].appendChild(chip)
    }
});