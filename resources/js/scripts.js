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
// Taking the integral of this function w/ respect to time_elapsed from 0 to duration = distance
//    /\ duration
//   |           g(x) dx = distance
// \/ 0
function scroll(elementId)
{
    // Adjustment object for easier tracking of everything
    function Adjustment(oldTime, newTime)
    {
        this.a = determineA();
        this.x = determineX();
        this.adjustment = determineAdjustment(this.a, this.x);

        function determineA() {
            return (Math.PI * Adjustment.distance) / (2 * Adjustment.duration);
        }
        function determineX() {
            return (Math.PI * (((oldTime + newTime) / 2) - Adjustment.initialTime)) / Adjustment.duration;
        }
        function determineAdjustment(a, x) {
            return Math.round((newTime - oldTime) * (a * Math.sin(x)));
        }
    }

    // Get the next adjustment
    Adjustment.prototype.getAdjustment = function() {
        return this.adjustment;
    }

    Adjustment.duration = 500;
    Adjustment.destination = document.getElementById(elementId).offsetTop;
    Adjustment.distance = Adjustment.destination - window.pageYOffset;
    Adjustment.initialTime = performance.now();

    
    // Initialize variables
    let scrollCountAngle = 0;       // Keeps track of the amount travelled relative to the sine function
    let scrollCountDistance = 0;    // Keeps track of the absolute distance travelled
    let oldTime = Adjustment.initialTime;

    // Scroll function
    function step(newTime)
    {
        let adjustment = new Adjustment(oldTime, newTime);

        // Determine location on page to jump to, and keep track of total distance travelled
        scrollCountAngle += Math.PI / (Adjustment.duration / (newTime - oldTime));
        scrollCountDistance += adjustment.getAdjustment();

        // Stop if destination is reached.
        // Or, if the next jump will go over the destination, go to the destination directly
        if (scrollCountAngle >= Math.PI ||
            Math.abs(scrollCountDistance) >= Math.abs(Adjustment.distance))
        {
            window.scrollTo(0, Adjustment.destination);
            return;
        }

        // Scroll to the next determined location, and establish the new "old time"
        window.scrollTo(0, adjustment.getAdjustment() + window.pageYOffset);
        oldTime = newTime;

        // DEBUGGING STUFF
        // console.log("oldTime: " + oldTime + ", newTime: " + newTime + ", scrollAdjustment: " + adjustment.getAdjustment());
        // console.log("getX: " + adjustment.x + ", getA: " + adjustment.a + ", scrollCountAngle: " + scrollCountAngle);

        window.requestAnimationFrame(step);
    }

    // Call smooth scroll function
    window.requestAnimationFrame(step);
}