document.addEventListener('DOMContentLoaded', function() {
    const projectList = document.querySelectorAll('#projects .article-list .list-item');

    if (projectList != null && projectList.length > 0) {
        for (let i = 0; i < projectList.length; i++) {
            const project = projectList[i];
            const actions = project.querySelector('.actions');
            const contribs = project.querySelector('.key-contributions .container .involvement-content');

            if (actions != null && contribs != null) {
                contribs.appendChild(actions);
            }
        }
    }
});