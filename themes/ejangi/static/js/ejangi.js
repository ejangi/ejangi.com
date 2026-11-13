function initialiseProjectDeck() {
    const deck = document.querySelector('.project-deck');
    if (!deck) return;
    const cards = Array.from(deck.querySelectorAll('.project-card'));
    if (cards.length < 2) return;
    const stage = deck.querySelector('.project-deck__stage');
    const count = deck.querySelector('.project-deck__count');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 720px)');
    const selectors = cards.map(card => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'project-card__select';
        button.setAttribute('aria-label', `Show project: ${card.querySelector('h4').textContent.trim()}`);
        button.addEventListener('click', () => move(Number(card.dataset.position)));
        card.appendChild(button);
        return button;
    });
    let current = 0;
    let busy = false;
    let gesture = null;

    function render() {
        cards.forEach((card, i) => {
            const distance = (i - current + cards.length) % cards.length;
            const position = distance === cards.length - 1 ? -1 : distance;
            const selectable = desktop.matches && Math.abs(position) === 1;
            card.dataset.position = position;
            card.inert = distance !== 0 && !selectable;
            card.setAttribute('aria-hidden', String(distance !== 0 && !selectable));
            Array.from(card.children).forEach(child => {
                if (child !== selectors[i]) child.inert = distance !== 0;
            });
            selectors[i].hidden = !selectable;
        });
        if (!busy) count.textContent = `${current + 1} / ${cards.length}`;
    }

    function move(step) {
        if (busy) return;
        busy = true;
        const outgoing = cards[current];
        if (outgoing.contains(document.activeElement) || selectors.includes(document.activeElement)) {
            deck.focus({ preventScroll: true });
        }
        const animation = reducedMotion.matches ? null : outgoing.animate([
            { transform: getComputedStyle(outgoing).transform, opacity: 1, zIndex: 4, visibility: 'visible' },
            { transform: `translateX(${step > 0 ? '-135%' : '35%'}) rotate(${step > 0 ? -16 : 16}deg)`, opacity: 0, zIndex: 4, visibility: 'visible' }
        ], { duration: 220, easing: 'ease-in', fill: 'forwards' });
        // Advance the stack now so the incoming card rises during the exit.
        current = (current + step + cards.length) % cards.length;
        render();
        const finish = () => {
            if (animation) animation.cancel();
            busy = false;
            count.textContent = `${current + 1} / ${cards.length}`;
        };
        if (animation) animation.finished.then(finish, finish);
        else finish();
    }

    deck.classList.add('is-enhanced');
    render();
    desktop.addEventListener('change', render);
    deck.querySelector('.project-deck__controls').hidden = false;
    deck.querySelector('.project-deck__hint').hidden = false;
    deck.querySelectorAll('[data-step]').forEach(button => {
        button.addEventListener('click', () => move(Number(button.dataset.step)));
    });
    deck.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
    });
    stage.addEventListener('pointerdown', event => {
        if (!event.isPrimary || event.button !== 0 || event.target.closest('a, button')) return;
        gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
        stage.setPointerCapture(event.pointerId);
    });
    stage.addEventListener('pointerup', event => {
        if (!gesture || gesture.id !== event.pointerId) return;
        const dx = event.clientX - gesture.x;
        const dy = event.clientY - gesture.y;
        gesture = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1);
    });
    stage.addEventListener('pointercancel', () => { gesture = null; });
}

// Optimisers can load this script after DOMContentLoaded has already fired.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseProjectDeck, { once: true });
} else {
    initialiseProjectDeck();
}
