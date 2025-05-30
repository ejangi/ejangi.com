function optimiseProjectReadMore() {
    const projectList = document.querySelectorAll('#projects .article-list .list-item');
    const isMobileView = window.innerWidth < 720;

    if (projectList != null && projectList.length > 0) {
        for (let i = 0; i < projectList.length; i++) {
            const project = projectList[i];
            const actions = project.querySelector('.actions');
            const contribs = project.querySelector('.key-contributions .container .involvement-content');

            if (actions != null && contribs != null) {
                if (isMobileView) {
                    if (actions.parentNode === contribs) {
                        project.appendChild(actions); // Move actions back to its original parent
                    }
                } else {
                    if (actions.parentNode !== contribs) {
                        contribs.appendChild(actions);
                    }
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    optimiseProjectReadMore();

    // Re-evaluate on window resize and orientation change
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(optimiseProjectReadMore, 100); // Debounce for performance
    });

    // For mobile orientation changes (though resize often covers this)
    window.addEventListener('orientationchange', function() {
        optimiseProjectReadMore();
    });
});