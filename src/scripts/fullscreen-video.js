;(function(window, document, undefined){
    "use strict";

    window.FullscreenVideo = function (videos) {
        // Enforce singlton:
        if (FullscreenVideo.prototype._singletonInstance) {
            return FullscreenVideo.prototype._singletonInstance;
        }
        FullscreenVideo.prototype._singletonInstance = this;

        this._fullscreen = false;

        this.enter = function(el) {
            if (!this._fullscreen && !document.fullscreenElement &&    // alternative standard method
                !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
                this._fullscreen = true;
                el.style.position = "fixed";
                el.style.top = "0";
                el.style.bottom = "0";
                el.style.left = "0";
                el.style.right = "0";
                el.style.width = "100%";
                el.style.height = "100%";
                el.style.zIndex = "9999";
                el.style.backgroundColor = "black";
            }
        };

        this.exit = function(el) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            this._fullscreen = false;
            el.style.position = "";
            el.style.top = "";
            el.style.bottom = "";
            el.style.left = "";
            el.style.right = "";
            el.style.width = "";
            el.style.height = "";
            el.style.zIndex = "";
            el.style.backgroundColor = "";
        };

        this.toggle = function(el) {
            if(this._fullscreen) {
                this.exit(el);
            } else {
                this.enter(el);
            }
        };

        this.applyToElements = function(videos) {
            var that = this;
            for(var v = 0; v < videos.length; v++) {
                videos[v].addEventListener("click", function(e) {
                    var t = e.target;
                    while(t.tagName != "VIDEO") {
                        t = t.parentNode;
                    }
                    that.toggle(t);
                }, true);
            }
        };

        // If elements supplied on calling the singleton, applyToElements:
        if (videos) {
            this.applyToElements(videos);
        } else {
            // Apply to all video elements:
            this.applyToElements(document.querySelectorAll("video"));
        }

        var notices = document.querySelectorAll(".fullscreen-notice");
        for(var n = 0; n < notices.length; n++) {
            notices[n].removeAttribute("hidden");
        }
    };
})(window, document);