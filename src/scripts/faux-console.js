;(function() {
  // Based on example from: https://scotch.io/tutorials/building-your-own-javascript-modal-plugin


  // Define our constructor
  this.FauxConsole = function() {

    // Create global element references
    this.dom = {
        root: undefined,
        title: undefined,
        prompt: undefined,
        stdout: undefined,
        cursor: undefined
    };

    // Define option defaults
    var defaults = {
      title: "Faux Console",
      prompt: "$ ",
      typeWriterSpeed: 100,
      typeWriterDelayedPrompt: true,
      typeWriterDelayedNewline: true,
      typeWriterDelay: 1000
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

    this.delay = this.options.typeWriterSpeed;
    this.typeWriterActive = false;

    this.init();
  };

  // Public Methods
  FauxConsole.prototype.setTitle = function(string) {
    if(this.dom.title && string) {
        this.options.title = string;
        this.dom.title.innerHTML = this.options.title;
    }
  };

  FauxConsole.prototype.setPrompt = function(string) {
    var that = this;
    function changePrompt() {
        if(that.dom.prompt && string) {
            that.options.prompt = string;
            that.dom.prompt.innerHTML = that.options.prompt;
        }
    }
    if(this.typeWriterActive) {
        this.delay = this.delay + this.options.typeWriterSpeed;
        setTimeout(function(){
            changePrompt();
        }, this.delay);
    } else {
        changePrompt();
    }
  };

  FauxConsole.prototype.write = function(string) {
    if(this.dom.stdout && string) {
        for(var i = 0; i < string.length; i++) {
            var el = document.createElement("span");
            if(string[i] == "\n") {
                el.className = "newline";
            } else {
                el.className = "char";
                if (el.textContent !== undefined)
                  el.textContent = string[i];
                else
                  el.innerText = string[i];
            }
            this.dom.stdout.appendChild(el);
        }
    }
  };

  FauxConsole.prototype.typeWriter = function(string) {
    this.typeWriterActive = true;
    var that = this;
    function delayedWrite(string, delay) {
        setTimeout(function(){
            that.write(string);
        }, delay);
    }
    if(this.dom.stdout && string) {
        var speed = this.options.typeWriterSpeed;
        for(var i = 0; i < string.length; i++) {
            if(string[i] == "\n" && this.options.typeWriterDelayedNewline) {
                speed = this.options.typeWriterDelay;
            } else {
                speed = this.options.typeWriterSpeed;
            }
            this.delay = this.delay + speed;
            delayedWrite(string[i], this.delay);
        }
    }
  };

  FauxConsole.prototype.backspace = function() {
    if(this.dom.stdout && this.dom.stdout.children.length > 0) {
        this.dom.stdout.removeChild(this.dom.stdout.querySelector(":last-child"));
    }
  };

  FauxConsole.prototype.newPrompt = function(prompt, forceNow) {
    if(prompt) {
        this.options.prompt = prompt;
    }
    var that = this;
    function createNewPrompt() {
        if(that.dom.prompt) {
            var newPrompt = that.dom.prompt.cloneNode(true);
            that.dom.prompt = newPrompt;
            that.dom.stream.insertBefore(that.dom.prompt, that.dom.cursor);
            that.dom.stdout.className = "stdout-stale";
            that.dom.stdout = document.createElement("span");
            that.dom.stdout.className = "stdout";
            that.dom.stream.insertBefore(that.dom.stdout, that.dom.cursor);
        }
    }
    if(this.typeWriterActive && !forceNow) {
        var speed = this.options.typeWriterSpeed;
        if(this.options.typeWriterDelayedPrompt) {
            speed = this.options.typeWriterDelay;
        } else {
            speed = this.options.typeWriterSpeed;
        }
        this.delay = this.delay + speed;
        setTimeout(function(){
            createNewPrompt();
        }, this.delay);
    } else {
        createNewPrompt();
    }
  };

  FauxConsole.prototype.clear = function() {
    var that = this;
    function clearConsole() {
        if(that.dom.stdout) {
            that.dom.stdout.innerHTML = "";
        }
    }
    if(this.typeWriterActive) {
        this.delay = this.delay + this.options.typeWriterSpeed;
        setTimeout(function(){
            clearConsole();
        }, this.delay);
    } else {
        clearConsole();
    }
  };

  FauxConsole.prototype.sleep = function(d) {
    this.delay = this.delay + d;
  };

  FauxConsole.prototype.init = function() {
    if(this.dom.root === undefined) {
        return;
    }
    this.dom.title = document.createElement("div");
    this.dom.title.className = "title";
    this.dom.title.innerHTML = this.options.title;
    this.dom.root.appendChild(this.dom.title);
    this.dom.stream = document.createElement("div");
    this.dom.stream.className = "stream";
    this.dom.prompt = document.createElement("span");
    this.dom.prompt.className = "prompt";
    this.dom.prompt.innerHTML = this.options.prompt;
    this.dom.stream.appendChild(this.dom.prompt);
    this.dom.stdout = document.createElement("span");
    this.dom.stdout.className = "stdout";
    this.dom.stream.appendChild(this.dom.stdout);
    this.dom.cursor = document.createElement("span");
    this.dom.cursor.className = "cursor";
    this.dom.stream.appendChild(this.dom.cursor);
    this.dom.root.appendChild(this.dom.stream);
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