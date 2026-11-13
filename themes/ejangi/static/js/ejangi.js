document.addEventListener('DOMContentLoaded', () => {
    const deck = document.querySelector('.project-deck');
    if (!deck) return;
    const cards = Array.from(deck.querySelectorAll('.project-card'));
    if (cards.length < 2) return;
    const stage = deck.querySelector('.project-deck__stage');
    const count = deck.querySelector('.project-deck__count');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0;
    let busy = false;
    let gesture = null;

    function render() {
        cards.forEach((card, i) => {
            const distance = (i - current + cards.length) % cards.length;
            card.dataset.position = distance === cards.length - 1 ? -1 : distance;
            card.inert = distance !== 0;
            card.setAttribute('aria-hidden', String(distance !== 0));
        });
        count.textContent = `${current + 1} / ${cards.length}`;
    }

    function move(step) {
        if (busy) return;
        busy = true;
        const outgoing = cards[current];
        if (outgoing.contains(document.activeElement)) deck.focus({ preventScroll: true });
        const animation = reducedMotion.matches ? null : outgoing.animate([
            { transform: 'translateX(-50%) rotate(0deg)', opacity: 1 },
            { transform: `translateX(${step > 0 ? '-135%' : '35%'}) rotate(${step > 0 ? -16 : 16}deg)`, opacity: 0 }
        ], { duration: 170, easing: 'ease-in', fill: 'forwards' });
        const finish = () => {
            current = (current + step + cards.length) % cards.length;
            render();
            if (animation) animation.cancel();
            busy = false;
        };
        if (animation) animation.finished.then(finish, finish);
        else finish();
    }

    deck.classList.add('is-enhanced');
    render();
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
        if (!event.isPrimary || event.button !== 0 || event.target.closest('a')) return;
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
});
