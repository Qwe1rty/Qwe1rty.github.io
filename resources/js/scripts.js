function init()
{
    // Initialize variables representing navbar elements
    let navSplash = document.getElementById("nav-splash");
    let navAbout = document.getElementById("nav-about");
    let navPortfolio = document.getElementById("nav-portfolio");
    let navContact = document.getElementById("nav-contact");

    // Add event listeners to the navbar elements so they go to the specified part of the page
    navSplash.addEventListener("click", function() {scroll("splash")}, false);
    navAbout.addEventListener("click", function() {scroll("about")}, false);
    navPortfolio.addEventListener("click", function() {scroll("portfolio")}, false);
    navContact.addEventListener("click", function() {scroll("contact")}, false);

    console.log("init() has finished");
}


// Smooth scroll function
//
// So I don't forget later, formula for the amount to move at any given time is:
//        distance * PI      ( time_elapsed * PI )
// g(x) = ------------- * sin( ----------------- )
//        2 * duration       (      duration     )
//
// Taking the integral of this function w/ respect to time_elapsed from 0 to duration = duration
//    /\ duration
//   |           g(x) dx = duration
// \/ 0
function scroll(elementId)
{
    // Adjustment object for easier tracking of everything
    function Adjustment(oldTime, newTime)
    {
        this.oldTime = oldTime;
        this.newTime = newTime;
    }
    Adjustment.prototype.getA = function() {
        return (Math.PI * Adjustment.distance) / (2 * Adjustment.duration);
    }
    Adjustment.prototype.getX = function() {
        return (Math.PI * (((this.oldTime + this.newTime) / 2) - Adjustment.initialTime)) / Adjustment.duration;
    }
    Adjustment.prototype.findAdjustment = function() {
        return (this.newTime - this.oldTime) * (this.getA() * Math.sin(this.getX()));
    }

    Adjustment.duration = 500;
    Adjustment.destination = document.getElementById(elementId).offsetTop;
    Adjustment.distance = Adjustment.destination - window.pageYOffset;
    Adjustment.initialTime = performance.now();

    // Initialize variables
    let oldTime = performance.now();
    let scrollCount = 0;

    // Scroll function
    function step(newTime)
    {
        let adjustment = new Adjustment(oldTime, newTime);

        // Determine location on page to jump to, and keep track of total distance travelled
        window.scrollTo(0, adjustment.findAdjustment() + window.pageYOffset);
        scrollCount += Math.PI / (Adjustment.duration / (newTime - oldTime));
        oldTime = newTime;

        // DEBUGGING STUFF
        console.log("oldTime: " + oldTime + ", newTime: " + newTime + ", scrollAdjustment: " + adjustment.findAdjustment());
        console.log("getX: " + adjustment.getX() + ", getA: " + adjustment.getA() + ", scrollCount: " + scrollCount);

        // Stop if destination is reached
        if (scrollCount >= Math.PI)
        {
            // TODO: make this not so sudden near the end
            window.scrollTo(0, Adjustment.destination);
            return;
        }
        window.requestAnimationFrame(step);
    }

    // Call smooth scroll function
    window.requestAnimationFrame(step);
}