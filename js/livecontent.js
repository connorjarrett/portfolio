const birthday = new Date(1190073600000)

function calculateAge() {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function update() {
    // Birthday
    const age = calculateAge()
    document.querySelectorAll("span.age").forEach((el) => {
        el.innerHTML = age
    })

    // Year
    document.querySelectorAll("span.year").forEach((el) => {
        el.innerHTML = new Date(Date.now()).getFullYear()
    })
}

update()

// Automatically update on the off chance it changes mid session
var currentAge = calculateAge()
var currentYear = new Date(Date.now()).getFullYear()

setInterval(()=>{
    if ((calculateAge() != currentAge) || (new Date(Date.now()).getFullYear() != currentYear)) {
        update()

        currentAge = calculateAge()
        currentYear = new Date(Date.now()).getFullYear()
    }
}, 60000) // Only every 60 seconds to avoid intensive resource use