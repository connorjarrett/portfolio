$(document).ready(function() {
    $.getJSON("work.json",function(work) {
        for (i=0; i<work.length; i++) {
            let experience = work[i]
            let block = document.createElement("div")
            block.classList = "job unplayed"
            
            var companyName;
            $.ajax({
                url: "case-studies/index.json",
                async: false,
                success: function(data){
                    if (data.includes(experience["for"].toLowerCase().replace(" ","-"))) {
                        companyName = document.createElement("a")
                        companyName.ariaLabel = `${experience["for"]} Case Study`
                        companyName.href = `case-studies/${experience["for"].toLowerCase().replace(" ","-")}`
                    } else {
                        companyName = document.createElement("span")
                    }
                }
            })

            companyName.innerHTML = experience["for"]

            let nameContain = document.createElement("h3")
            nameContain.classList = "company"

            nameContain.appendChild(companyName)
            block.appendChild(nameContain)

            let time = document.createElement("h4")
            time.innerHTML = `${experience["startYear"]} - ${experience["endYear"]}`
            time.classList = "period"
            block.appendChild(time)
        
            if (experience["role"]) {
                let role = document.createElement("h5")
                role.innerHTML = experience["role"]
                role.classList = "role"
                block.appendChild(role)
            }    

            $("section.work .content")[0].appendChild(block)
        }
    })
});