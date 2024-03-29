// There are two version of the site (narrow and wide)
const n = 2

// Declare lab list to loop through
const labList = [
    'hekstra',
    'delfino',
    'loria',
    'merck',
    'crews'
]

/**
 * Helper function to iterate through and add event listeners to each lab
 */
function listen(lab, index) {
    var thisLab = document.getElementsByClassName(lab + ' exp') // experiences also have class "exp" to differentiate from skills
    for (i = 0; i < n; i++) {
        thisLab[i].addEventListener('click', function () {
            updateActive(lab) // updateActive function handles formatting
        })
        thisLab[i].classList.add('clickable')
    }
}
labList.forEach(listen)

toTopButtons = document.getElementsByClassName('to-top')

for (i = 0; i < n; i++) {
    toTopButtons[i].classList.remove('hidden')
}

/**
 * The issue here is that the event listener doesn't excecute code, just sets it aside for later. When the code
 * does then get executed, the value of "i" is now something unrelated / unreliable. 
 * 
 * I'm just going to hard code in two scrolling functions and asign them to the two buttons
 */

toTopButtons[0].addEventListener('click', function () {
    scrollUp(0)
})

toTopButtons[1].addEventListener('click', function () {
    scrollUp(1)
})

function scrollUp(x) {
    document.querySelectorAll('#experience')[x].scrollIntoView({ behavior: "smooth" })
}


/**
 * Update formatting of skills and papers
 * Scroll down to skills, or papers if there is a paper from this lab
 */
function updateActive(lab) {

    var paper = false // control logic to see if there's a paper from this lab

    skills = document.getElementsByClassName('skill') // papers are also tagged with the skills class, such that this works
    experiences = document.getElementsByClassName('exp')

    elements = [skills, experiences]

    function makeActive(list, index) {
        for (i = 0; i < list.length; i++) {

            // wipe previous formatting
            list[i].classList.remove('active')
            list[i].classList.remove('inactive')

            // format for the current lab
            if (list[i].classList.contains(lab)) {
                list[i].classList.add('active')

                if (list[i].classList.contains('paper')) {
                    paper = true
                }

            } else {
                list[i].classList.add('inactive')
            }
        }
    }
    elements.forEach(makeActive)

    // Is the screen currently wide or narrow?
    // Note that this code relies on the wide layout appearing first in flexcolumns.html
    var narrow = window.matchMedia("(max-width: 992px)")
    var activeLayout = 0
    if (narrow.matches) {
        activeLayout = 1
    }

    // if there's a paper from this lab, scroll to publications instead of skills
    if (paper) {
        pubHeading = document.querySelectorAll('#publications')
        pubHeading[activeLayout].scrollIntoView({ behavior: "smooth" });
    } else {
        skillHeading = document.querySelectorAll('#skills')
        skillHeading[activeLayout].scrollIntoView({ behavior: "smooth" });
    }
}