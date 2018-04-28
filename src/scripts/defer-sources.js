;(function(window, document, undefined){
    "use strict";

    window.DeferSources = function (videos) {
        // Enforce singlton:
        if (DeferSources.prototype._singletonInstance) {
            return DeferSources.prototype._singletonInstance;
        }
        DeferSources.prototype._singletonInstance = this;


        this.applyToElements = function(videos) {
            var that = this;
            for(var s = 0; s < videos.length; s++) {
                if (videos[s].hasAttribute("data-src")) {
                    videos[s].setAttribute("src", videos[s].getAttribute("data-src"));
                    if (videos[s].hasAttribute("autoplay") || videos[s].hasAttribute("data-autoload")) {
                        videos[s].load();
                    }
                    if (videos[s].hasAttribute("autoplay")) {
                        videos[s].play();
                    }
                }
            }
        };

        // If elements supplied on calling the singleton, applyToElements:
        if (videos) {
            this.applyToElements(videos);
        } else {
            // Apply to all video elements:
            this.applyToElements(document.querySelectorAll("video"));
        }
    };
})(window, document);