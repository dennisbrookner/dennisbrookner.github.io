// There are two version of the site (narrow and wide)
const n = 2

/**
 * Entry point to site functionality
 * Run on page load
 */
startButtons = document.getElementsByClassName('start')

for (i = 0; i < n; i++) {
    startButtons[i].addEventListener('click', activateSite)
}

function activateSite() {

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

    startButtons = document.getElementsByClassName('start')
    backButtons = document.getElementsByClassName('back')

    for (i = 0; i < n; i++) {

        // Deactivate start button and change to help message
        startButtons[i].classList.remove('clickable')
        startButtons[i].innerHTML = 'Click on an experience to see the associated skills'
        startButtons[i].removeEventListener('click', activateSite)

        // Activate back button
        backButtons[i].classList.add('clickable')
        backButtons[i].innerHTML = 'Back to static version of site'
        backButtons[i].addEventListener('click', deactivateSite)
    }
}

/**
 * Update formatting of skills and papers
 * Scroll down to skills, or papers if there is a paper from this lab
 * @param {*} lab : the lab that has been clicked on and will become active
 */
function updateActive(lab) {

    var paper = false // control logic to see if there's a paper from this lab

    skills = document.getElementsByClassName('skill') // papers are also tagged with the skills class, so that this works
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

// tiny helper function to reset site
function deactivateSite() {
    document.location.reload()
}