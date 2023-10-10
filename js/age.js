const birthday = new Date(1190073600000)

// Set all age texts to current age
function calculateAge() {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function update() {
    const age = calculateAge()

    document.querySelectorAll("span.age").forEach((el) => {
        el.innerHTML = age
    })
}

update()

// Automatically update on the off chance someone's browsing between Sept 17th and 18th
var currentAge = calculateAge()

setInterval(()=>{
    if (calculateAge() != currentAge) {
        update()
    }
}, 60000) // Only every 60 seconds to avoid intensive resource use