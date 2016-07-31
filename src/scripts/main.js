
;(function(window, document, undefined){

    if('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
        document.querySelector("html").className = "js touch";
    } else {
        document.querySelector("html").className = "js";
    }

    var anchors = document.querySelectorAll(".container p a, .container #email a");
    for(var i = 0; i < anchors.length; i++) {
        var text = anchors[i].innerText || anchors[i].textContent;
        anchors[i].innerHTML = '<span class="txt">' + text + '</span>';
    }

    var clickTouches = document.querySelectorAll("html.touch .click-tap");
    for(var ct = 0; ct < clickTouches.length; ct++) {
        clickTouches[ct].textContent = "Tap";
    }

    function isVisible(el) {
        var bounds = el.getBoundingClientRect(),
            height = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(bounds.bottom < 0 || bounds.top - height >= 0);
    }

    function fcAnimate() {
        fcTriggered = true;
        fc.typeWriter("whoami");
        fc.typeWriter("\nJames Angus");
        fc.newPrompt();
        fc.sleep(2000);
        fc.typeWriter('ls skills');
        fc.sleep(1000);
        fc.typeWriter('\nDeveloper,\tWeb Designer,\tHacker of PHP, MySQL and Ruby,\tEmail Marketer,\tVideo Producer,\tMusic Maker,\tPhotographer,\tFundraiser');
        fc.sleep(5000);
    }

    var fc, 
        fcDiv = document.querySelector("#console"),
        fcTriggered = false;
    if(fcDiv) {
        fc = new FauxConsole(fcDiv, {
            title: "Auto Console"
        });

        window.addEventListener("scroll", function() {
            if(!fcTriggered && isVisible(fcDiv)) {
                fcAnimate();    
            }
        });
    }

    var ps, 
        psDiv = document.querySelector(".projects"),
        iPD = document.getElementById("portfolio");
    if(psDiv) {
        ps = new PortfolioShowcase(psDiv, { 
            inheritsProjectData: iPD
        });
    }

    new FullscreenVideo();

})(window, document);