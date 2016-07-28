;(function() {
    // Based on example from: https://scotch.io/tutorials/building-your-own-javascript-modal-plugin


    // Define our constructor
    this.PortfolioShowcase = function() {

        // Define option defaults
        var defaults = {
            slideSpeed: 500,
            menuId: 'portfolio-showcase-menu',
            menuClassName: 'menu',
            menuLocation: 'before', // Can be before, after, append, prepend
            inheritsProjectData: undefined,
            autoSelectFirst: true
        };

        // Create global element references
        this.dom = {
            root: undefined,
            projects: undefined,
            menu: undefined,
            inheritsProjectData: undefined
        };

        if (arguments[0]) {
          this.dom.root = arguments[0];
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[1] && typeof arguments[1] === "object") {
            this.options = extendDefaults(defaults, arguments[1]);
        } else {
            this.options = defaults;
        }

        this.init();
    };



    PortfolioShowcase.prototype.init = function() {
        if(this.dom.root === undefined) {
            return;
        }
        this.dom.projects = this.dom.root.querySelectorAll(".project");
        if(this.dom.projects.length === 0) {
            return;
        }
        if(this.options.inheritsProjectData === undefined) {
            this.options.inheritsProjectData = this.dom.root;
        } else {
            this.dom.inheritsProjectData = this.options.inheritsProjectData;
        }
        this.deactivateAll();
        this.buildMenu();
        if(this.options.autoSelectFirst) {
            this.setActiveProject(this.dom.projects[0]);
        }
    };



    PortfolioShowcase.prototype.deactivateAll = function() {
        for(var i = 0; i < this.dom.projects.length; i++) {
            this.dom.projects[i].setAttribute("data-hidden", true);
        }
    };



    PortfolioShowcase.prototype.getActiveProject = function() {
        this.dom.root.querySelector(".project:not([data-hidden])");
    };



    PortfolioShowcase.prototype.setActiveProject = function(elem) {
        for(var i = 0; i < this.dom.projects.length; i++) {
            var video = this.dom.projects[i].querySelector("video");
            if (this.dom.projects[i] === elem) {
                this.dom.projects[i].removeAttribute("data-hidden");
                this.dom.inheritsProjectData.dataset.background = this.dom.projects[i].dataset.background;
                this.dom.inheritsProjectData.dataset.category = this.dom.projects[i].dataset.category;
                document.getElementById("menu-" + this.dom.projects[i].getAttribute("id")).className = "active";
                if(video) video.play();
            } else {
                this.dom.projects[i].setAttribute("data-hidden", true);
                document.getElementById("menu-" + this.dom.projects[i].getAttribute("id")).className = "inactive";
                if(video) video.pause();
            }
        }
    };



    PortfolioShowcase.prototype.buildMenu = function() {
        var that = this;
        if(this.dom.projects.length === 0) {
            return;
        }
        this.dom.menu = document.createElement("div");
        this.dom.menu.setAttribute("id", this.options.menuId);
        this.dom.menu.className = this.options.menuClassName;
        var ul = document.createElement("ul");
        for(var i = 0; i < this.dom.projects.length; i++) {
            var li = document.createElement("li");
            li.className = "inactive";
            if(this.dom.projects[i].id) {
                li.setAttribute("id", "menu-" + this.dom.projects[i].id);
                li.setAttribute("data-target", this.dom.projects[i].id);
            }
            var label = this.dom.projects[i].getAttribute("aria-labelledby"),
                fig = document.createElement("figure"),
                icon,
                firstImg = this.dom.projects[i].querySelector("img"),
                iconAttr = this.dom.projects[i].getAttribute("data-icon");
            if(firstImg) {
                icon = firstImg.getAttribute("src");
            }
            if(iconAttr) {
                icon = iconAttr;
            }
            if(icon) {
                var img = document.createElement("img");
                img.setAttribute("src", icon);
                fig.appendChild(img);
            }
            if(label) {
                var figcap = document.createElement("figcaption");
                figcap.innerHTML = document.getElementById(label).innerHTML;
                fig.appendChild(figcap);
            }
            li.appendChild(fig);
            li.addEventListener("click", function(e){
                var t = e.target;
                while(t.tagName != "LI") {
                    t = t.parentNode;
                }
                var p = document.getElementById(t.getAttribute("data-target"));
                that.setActiveProject(p);
            }, true);
            ul.appendChild(li);
        }
        this.dom.menu.appendChild(ul);
        switch(this.options.menuLocation) {
            case 'after':
                this.dom.root.parentNode.appendChild(this.dom.menu);
                break;
            case 'append':
                this.dom.root.appendChild(this.dom.menu);
                break;
            case 'prepend':
                this.dom.root.insertBefore(this.dom.menu, this.dom.root.firstChild);
                break;
            default:
                this.dom.root.parentNode.insertBefore(this.dom.menu, this.dom.root);
                break;
        }
    };



    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

}());