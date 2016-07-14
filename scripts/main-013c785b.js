!function(){function t(t,e){var o;for(o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);return t}this.FauxConsole=function(){this.dom={root:void 0,title:void 0,prompt:void 0,stdout:void 0,cursor:void 0};var e={title:"Faux Console",prompt:"$ ",typeWriterSpeed:100,typeWriterDelayedPrompt:!0,typeWriterDelayedNewline:!0,typeWriterDelay:1e3};arguments[0]&&(this.dom.root=arguments[0]),arguments[1]&&"object"==typeof arguments[1]?this.options=t(e,arguments[1]):this.options=e,this.delay=this.options.typeWriterSpeed,this.typeWriterActive=!1,this.init()},FauxConsole.prototype.setTitle=function(t){this.dom.title&&t&&(this.options.title=t,this.dom.title.innerHTML=this.options.title)},FauxConsole.prototype.setPrompt=function(t){function e(){o.dom.prompt&&t&&(o.options.prompt=t,o.dom.prompt.innerHTML=o.options.prompt)}var o=this;this.typeWriterActive?(this.delay=this.delay+this.options.typeWriterSpeed,setTimeout(function(){e()},this.delay)):e()},FauxConsole.prototype.write=function(t){if(this.dom.stdout&&t)for(var e=0;e<t.length;e++){var o=document.createElement("span");"\n"==t[e]?o.className="newline":(o.className="char",void 0!==o.textContent?o.textContent=t[e]:o.innerText=t[e]),this.dom.stdout.appendChild(o)}},FauxConsole.prototype.typeWriter=function(t){function e(t,e){setTimeout(function(){o.write(t)},e)}this.typeWriterActive=!0;var o=this;if(this.dom.stdout&&t)for(var i=this.options.typeWriterSpeed,s=0;s<t.length;s++)i="\n"==t[s]&&this.options.typeWriterDelayedNewline?this.options.typeWriterDelay:this.options.typeWriterSpeed,this.delay=this.delay+i,e(t[s],this.delay)},FauxConsole.prototype.backspace=function(){this.dom.stdout&&this.dom.stdout.children.length>0&&this.dom.stdout.removeChild(this.dom.stdout.querySelector(":last-child"))},FauxConsole.prototype.newPrompt=function(t,e){function o(){if(i.dom.prompt){var t=i.dom.prompt.cloneNode(!0);i.dom.prompt=t,i.dom.stream.insertBefore(i.dom.prompt,i.dom.cursor),i.dom.stdout.className="stdout-stale",i.dom.stdout=document.createElement("span"),i.dom.stdout.className="stdout",i.dom.stream.insertBefore(i.dom.stdout,i.dom.cursor)}}t&&(this.options.prompt=t);var i=this;if(this.typeWriterActive&&!e){var s=this.options.typeWriterSpeed;s=this.options.typeWriterDelayedPrompt?this.options.typeWriterDelay:this.options.typeWriterSpeed,this.delay=this.delay+s,setTimeout(function(){o()},this.delay)}else o()},FauxConsole.prototype.clear=function(){function t(){e.dom.stdout&&(e.dom.stdout.innerHTML="")}var e=this;this.typeWriterActive?(this.delay=this.delay+this.options.typeWriterSpeed,setTimeout(function(){t()},this.delay)):t()},FauxConsole.prototype.sleep=function(t){this.delay=this.delay+t},FauxConsole.prototype.init=function(){void 0!==this.dom.root&&(this.dom.title=document.createElement("div"),this.dom.title.className="title",this.dom.title.innerHTML=this.options.title,this.dom.root.appendChild(this.dom.title),this.dom.stream=document.createElement("div"),this.dom.stream.className="stream",this.dom.prompt=document.createElement("span"),this.dom.prompt.className="prompt",this.dom.prompt.innerHTML=this.options.prompt,this.dom.stream.appendChild(this.dom.prompt),this.dom.stdout=document.createElement("span"),this.dom.stdout.className="stdout",this.dom.stream.appendChild(this.dom.stdout),this.dom.cursor=document.createElement("span"),this.dom.cursor.className="cursor",this.dom.stream.appendChild(this.dom.cursor),this.dom.root.appendChild(this.dom.stream))}}(),function(){function t(t,e){var o;for(o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);return t}this.PortfolioShowcase=function(){var e={slideSpeed:500,menuId:"portfolio-showcase-menu",menuClassName:"menu",menuLocation:"before",inheritsProjectData:void 0,autoSelectFirst:!0};this.dom={root:void 0,projects:void 0,menu:void 0,inheritsProjectData:void 0},arguments[0]&&(this.dom.root=arguments[0]),arguments[1]&&"object"==typeof arguments[1]?this.options=t(e,arguments[1]):this.options=e,this.init()},PortfolioShowcase.prototype.init=function(){void 0!==this.dom.root&&(this.dom.projects=this.dom.root.querySelectorAll(".project"),0!==this.dom.projects.length&&(void 0===this.options.inheritsProjectData?this.options.inheritsProjectData=this.dom.root:this.dom.inheritsProjectData=this.options.inheritsProjectData,this.deactivateAll(),this.buildMenu(),this.options.autoSelectFirst&&this.setActiveProject(this.dom.projects[0])))},PortfolioShowcase.prototype.deactivateAll=function(){for(var t=0;t<this.dom.projects.length;t++)this.dom.projects[t].setAttribute("data-hidden",!0)},PortfolioShowcase.prototype.getActiveProject=function(){this.dom.root.querySelector(".project:not([data-hidden])")},PortfolioShowcase.prototype.setActiveProject=function(t){for(var e=0;e<this.dom.projects.length;e++)this.dom.projects[e]===t?(this.dom.projects[e].removeAttribute("data-hidden"),this.dom.inheritsProjectData.dataset.background=this.dom.projects[e].dataset.background,this.dom.inheritsProjectData.dataset.category=this.dom.projects[e].dataset.category,document.getElementById("menu-"+this.dom.projects[e].getAttribute("id")).className="active"):(this.dom.projects[e].setAttribute("data-hidden",!0),document.getElementById("menu-"+this.dom.projects[e].getAttribute("id")).className="inactive")},PortfolioShowcase.prototype.buildMenu=function(){var t=this;if(0!==this.dom.projects.length){this.dom.menu=document.createElement("div"),this.dom.menu.setAttribute("id",this.options.menuId),this.dom.menu.className=this.options.menuClassName;for(var e=document.createElement("ul"),o=0;o<this.dom.projects.length;o++){var i=document.createElement("li");i.className="inactive",this.dom.projects[o].id&&(i.setAttribute("id","menu-"+this.dom.projects[o].id),i.setAttribute("data-target",this.dom.projects[o].id));var s=this.dom.projects[o].getAttribute("aria-labelledby");if(s){var r=document.createElement("figure"),n=document.createElement("img"),d=this.dom.projects[o].querySelector("img").getAttribute("src"),a=this.dom.projects[o].getAttribute("data-icon");a&&(d=a),n.setAttribute("src",d),r.appendChild(n),i.appendChild(r);var m=document.createElement("figcaption");m.innerHTML=document.getElementById(s).innerHTML,r.appendChild(m)}i.addEventListener("click",function(e){for(var o=e.target;"LI"!=o.tagName;)o=o.parentNode;var i=document.getElementById(o.getAttribute("data-target"));t.setActiveProject(i)},!0),e.appendChild(i)}switch(this.dom.menu.appendChild(e),this.options.menuLocation){case"after":this.dom.root.parentNode.appendChild(this.dom.menu);break;case"append":this.dom.root.appendChild(this.dom.menu);break;case"prepend":this.dom.root.insertBefore(this.dom.menu,this.dom.root.firstChild);break;default:this.dom.root.parentNode.insertBefore(this.dom.menu,this.dom.root)}}}}(),function(t,e,o){function i(){d.typeWriter("whoami"),d.typeWriter("\nJames Angus"),d.newPrompt(),d.sleep(2e3),d.typeWriter("ls skills"),d.sleep(1e3),d.typeWriter("\nDeveloper,\tWeb Designer,\tHacker of PHP, MySQL and Ruby,\tEmail Marketer,\tVideo Producer,\tMusic Maker,\tPhotographer,\tFundraiser"),d.sleep(5e3)}for(var s=e.querySelectorAll(".container p a, .container #email a"),r=0;r<s.length;r++){var n=s[r].innerText||s[r].textContent;s[r].innerHTML='<span class="txt">'+n+"</span>"}var d,a=e.querySelector("#console");a&&(d=new FauxConsole(a,{title:"Auto Console"}),t.requestAnimationFrame?t.requestAnimationFrame(function(){i()}):i());var m,p=e.querySelector(".projects"),h=e.getElementById("portfolio");p&&(m=new PortfolioShowcase(p,{inheritsProjectData:h}))}(window,document);