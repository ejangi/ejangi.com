!function(){this.FauxConsole=function(){this.dom={root:void 0,title:void 0,prompt:void 0,stdout:void 0,cursor:void 0};var t={title:"Faux Console",prompt:"$ ",typeWriterSpeed:100,typeWriterDelayedPrompt:!0,typeWriterDelayedNewline:!0,typeWriterDelay:1e3};arguments[0]&&(this.dom.root=arguments[0]),arguments[1]&&"object"==typeof arguments[1]?this.options=function(t,e){var o;for(o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);return t}(t,arguments[1]):this.options=t,this.delay=this.options.typeWriterSpeed,this.typeWriterActive=!1,this.init()},FauxConsole.prototype.setTitle=function(t){this.dom.title&&t&&(this.options.title=t,this.dom.title.innerHTML=this.options.title)},FauxConsole.prototype.setPrompt=function(t){var e=this;function o(){e.dom.prompt&&t&&(e.options.prompt=t,e.dom.prompt.innerHTML=e.options.prompt)}this.typeWriterActive?(this.delay=this.delay+this.options.typeWriterSpeed,setTimeout(function(){o()},this.delay)):o()},FauxConsole.prototype.write=function(t){if(this.dom.stdout&&t)for(var e=0;e<t.length;e++){var o=document.createElement("span");"\n"==t[e]?o.className="newline":(o.className="char",void 0!==o.textContent?o.textContent=t[e]:o.innerText=t[e]),this.dom.stdout.appendChild(o)}},FauxConsole.prototype.typeWriter=function(t){this.typeWriterActive=!0;var o=this;function e(t,e){setTimeout(function(){o.write(t)},e)}if(this.dom.stdout&&t)for(var i=this.options.typeWriterSpeed,s=0;s<t.length;s++)i="\n"==t[s]&&this.options.typeWriterDelayedNewline?this.options.typeWriterDelay:this.options.typeWriterSpeed,this.delay=this.delay+i,e(t[s],this.delay)},FauxConsole.prototype.backspace=function(){this.dom.stdout&&0<this.dom.stdout.children.length&&this.dom.stdout.removeChild(this.dom.stdout.querySelector(":last-child"))},FauxConsole.prototype.newPrompt=function(t,e){t&&(this.options.prompt=t);var o=this;function i(){if(o.dom.prompt){var t=o.dom.prompt.cloneNode(!0);o.dom.prompt=t,o.dom.stream.insertBefore(o.dom.prompt,o.dom.cursor),o.dom.stdout.className="stdout-stale",o.dom.stdout=document.createElement("span"),o.dom.stdout.className="stdout",o.dom.stream.insertBefore(o.dom.stdout,o.dom.cursor)}}if(this.typeWriterActive&&!e){var s=this.options.typeWriterSpeed;s=this.options.typeWriterDelayedPrompt?this.options.typeWriterDelay:this.options.typeWriterSpeed,this.delay=this.delay+s,setTimeout(function(){i()},this.delay)}else i()},FauxConsole.prototype.clear=function(){var t=this;function e(){t.dom.stdout&&(t.dom.stdout.innerHTML="")}this.typeWriterActive?(this.delay=this.delay+this.options.typeWriterSpeed,setTimeout(function(){e()},this.delay)):e()},FauxConsole.prototype.sleep=function(t){this.delay=this.delay+t},FauxConsole.prototype.init=function(){void 0!==this.dom.root&&(this.dom.title=document.createElement("div"),this.dom.title.className="title",this.dom.title.innerHTML=this.options.title,this.dom.root.appendChild(this.dom.title),this.dom.stream=document.createElement("div"),this.dom.stream.className="stream",this.dom.prompt=document.createElement("span"),this.dom.prompt.className="prompt",this.dom.prompt.innerHTML=this.options.prompt,this.dom.stream.appendChild(this.dom.prompt),this.dom.stdout=document.createElement("span"),this.dom.stdout.className="stdout",this.dom.stream.appendChild(this.dom.stdout),this.dom.cursor=document.createElement("span"),this.dom.cursor.className="cursor",this.dom.stream.appendChild(this.dom.cursor),this.dom.root.appendChild(this.dom.stream))}}(),function(){this.PortfolioShowcase=function(){var t={slideSpeed:500,menuId:"portfolio-showcase-menu",menuClassName:"menu",menuLocation:"before",inheritsProjectData:void 0,autoSelectFirst:!0};this.dom={root:void 0,projects:void 0,menu:void 0,inheritsProjectData:void 0},arguments[0]&&(this.dom.root=arguments[0]),arguments[1]&&"object"==typeof arguments[1]?this.options=function(t,e){var o;for(o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);return t}(t,arguments[1]):this.options=t,this.init()},PortfolioShowcase.prototype.init=function(){void 0!==this.dom.root&&(this.dom.projects=this.dom.root.querySelectorAll(".project"),0!==this.dom.projects.length&&(void 0===this.options.inheritsProjectData?this.options.inheritsProjectData=this.dom.root:this.dom.inheritsProjectData=this.options.inheritsProjectData,this.deactivateAll(),this.buildMenu(),this.options.autoSelectFirst&&this.setActiveProject(this.dom.projects[0])))},PortfolioShowcase.prototype.deactivateAll=function(){for(var t=0;t<this.dom.projects.length;t++)this.dom.projects[t].setAttribute("data-hidden",!0)},PortfolioShowcase.prototype.getActiveProject=function(){this.dom.root.querySelector(".project:not([data-hidden])")},PortfolioShowcase.prototype.setActiveProject=function(t){for(var e=0;e<this.dom.projects.length;e++){var o=this.dom.projects[e].querySelector("video");this.dom.projects[e]===t?(this.dom.projects[e].removeAttribute("data-hidden"),this.dom.inheritsProjectData.dataset.background=this.dom.projects[e].dataset.background,this.dom.inheritsProjectData.dataset.category=this.dom.projects[e].dataset.category,document.getElementById("menu-"+this.dom.projects[e].getAttribute("id")).className="active",o&&o.play()):(this.dom.projects[e].setAttribute("data-hidden",!0),document.getElementById("menu-"+this.dom.projects[e].getAttribute("id")).className="inactive",o&&o.pause())}},PortfolioShowcase.prototype.buildMenu=function(){var i=this;if(0!==this.dom.projects.length){this.dom.menu=document.createElement("div"),this.dom.menu.setAttribute("id",this.options.menuId),this.dom.menu.className=this.options.menuClassName;for(var t=document.createElement("ul"),e=0;e<this.dom.projects.length;e++){var o=document.createElement("li");o.className="inactive",this.dom.projects[e].id&&(o.setAttribute("id","menu-"+this.dom.projects[e].id),o.setAttribute("data-target",this.dom.projects[e].id));var s,r=this.dom.projects[e].getAttribute("aria-labelledby"),n=document.createElement("figure"),a=this.dom.projects[e].querySelector("img"),d=this.dom.projects[e].getAttribute("data-icon");if(a&&(s=a.getAttribute("src")),d&&(s=d),s){var p=document.createElement("img");p.setAttribute("src",s),n.appendChild(p)}if(r){var m=document.createElement("figcaption");m.innerHTML=document.getElementById(r).innerHTML,n.appendChild(m)}o.appendChild(n),o.addEventListener("click",function(t){for(var e=t.target;"LI"!=e.tagName;)e=e.parentNode;var o=document.getElementById(e.getAttribute("data-target"));i.setActiveProject(o)},!0),t.appendChild(o)}switch(this.dom.menu.appendChild(t),this.options.menuLocation){case"after":this.dom.root.parentNode.appendChild(this.dom.menu);break;case"append":this.dom.root.appendChild(this.dom.menu);break;case"prepend":this.dom.root.insertBefore(this.dom.menu,this.dom.root.firstChild);break;default:this.dom.root.parentNode.insertBefore(this.dom.menu,this.dom.root)}}}}(),function(t,e,o){"use strict";t.DeferSources=function(t){if(DeferSources.prototype._singletonInstance)return DeferSources.prototype._singletonInstance;(DeferSources.prototype._singletonInstance=this).applyToElements=function(t){for(var e=0;e<t.length;e++)t[e].hasAttribute("data-src")&&(t[e].setAttribute("src",t[e].getAttribute("data-src")),(t[e].hasAttribute("autoplay")||t[e].hasAttribute("data-autoload"))&&t[e].load(),t[e].hasAttribute("autoplay")&&t[e].play())},t?this.applyToElements(t):this.applyToElements(e.querySelectorAll("video"))}}(window,document),function(o,i,t){"ontouchstart"in o||o.DocumentTouch&&i instanceof DocumentTouch?i.querySelector("html").className="js touch":i.querySelector("html").className="js";for(var e=i.querySelectorAll(".container p a, .container #email a"),s=0;s<e.length;s++){var r=e[s].innerText||e[s].textContent;e[s].innerHTML='<span class="txt">'+r+"</span>"}for(var n=i.querySelectorAll("html.touch .click-tap"),a=0;a<n.length;a++)n[a].textContent="Tap";var d,p=i.querySelector("#console"),m=!1;p&&(d=new FauxConsole(p,{title:"Auto Console"}),o.addEventListener("scroll",function(){var t,e;m||(t=p.getBoundingClientRect(),e=Math.max(i.documentElement.clientHeight,o.innerHeight),t.bottom<0||0<=t.top-e)||(m=!0,d.typeWriter("whoami"),d.typeWriter("\nJames Angus"),d.newPrompt(),d.sleep(2e3),d.typeWriter("ls skills"),d.sleep(1e3),d.typeWriter("\nCreative,\tDeveloper,\tExperience Designer,\tMarketer,\tProject Manager,\tCustomer-centric,\tLeader of people"),d.sleep(5e3))}));var c=i.querySelector(".projects"),h=i.getElementById("portfolio");c&&new PortfolioShowcase(c,{inheritsProjectData:h}),new DeferSources}(window,document);