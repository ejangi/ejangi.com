
;(function(window, document, undefined){

    var anchors = document.querySelectorAll(".container p a, .container #email a");
    for(var i = 0; i < anchors.length; i++) {
        var text = anchors[i].innerText || anchors[i].textContent;
        anchors[i].innerHTML = '<span class="txt">' + text + '</span>';
    }

    function fcAnimate() {
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
        fcDiv = document.querySelector("#console");
    if(fcDiv) {
        fc = new FauxConsole(fcDiv, {
            title: "Auto Console"
        });
        
        if(!window.requestAnimationFrame) {
            fcAnimate();
        } else {
            window.requestAnimationFrame(function(){        
                fcAnimate();
            });
        }
    }

    var ps, 
        psDiv = document.querySelector(".projects"),
        iPD = document.getElementById("portfolio");
    if(psDiv) {
        ps = new PortfolioShowcase(psDiv, { 
            inheritsProjectData: iPD
        });
    }

})(window, document);