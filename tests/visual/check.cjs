const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');

(async () => {
    await fs.mkdir('test-results', { recursive: true });
    const browser = await chromium.launch();
    try {
        for (const width of [320, 390, 768, 1280]) {
            const page = await browser.newPage({ viewport: { width, height: 1000 } });
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            // Hugo's development asset URLs use localhost; reach them through Compose.
            await page.route('http://localhost:1313/**', route => route.continue({
                url: route.request().url().replace('http://localhost:1313', process.env.SITE_URL || 'http://hugo.test:1313')
            }));
            await page.goto(process.env.SITE_URL || 'http://hugo.test:1313', { waitUntil: 'networkidle' });
            const deck = page.locator('.project-deck');
            await deck.scrollIntoViewIfNeeded();
            const cards = page.locator('.project-card');
            const total = await cards.count();
            if (width >= 720) {
                const side = position => page.locator(`.project-card[data-position="${position}"] .project-card__select`);
                await side(1).click();
                await page.waitForFunction(() => document.querySelector('.project-deck__count').textContent.startsWith('2 /'));
                await side(-1).click();
                await page.waitForFunction(() => document.querySelector('.project-deck__count').textContent.startsWith('1 /'));
                assert.ok(page.url().endsWith('/'), 'Side card selects rather than opens the article');
            }
            for (let i = 0; i < total; i++) {
                const active = page.locator('.project-card[data-position="0"]');
                assert.equal(await active.locator('.project-card__summary').count(), 1);
                await active.locator('.project-card__image').scrollIntoViewIfNeeded();
                await active.locator('.project-card__image').evaluate(image => image.decode());
                assert.ok(await active.evaluate(card => card.scrollHeight <= card.clientHeight + 1), `Card overflow at ${width}, card ${i}`);
                await page.getByRole('button', { name: 'Next project' }).click();
                await page.waitForFunction(expected => document.querySelector('.project-deck__count').textContent.startsWith(`${expected} /`), (i + 1) % total + 1);
            }
            assert.equal(await page.locator('.project-deck__count').textContent(), `1 / ${total}`);
            await page.getByRole('button', { name: 'Previous project' }).click();
            await page.waitForFunction(total => document.querySelector('.project-deck__count').textContent === `${total} / ${total}`, total);
            await deck.focus();
            await page.keyboard.press('ArrowRight');
            await page.waitForFunction(() => document.querySelector('.project-deck__count').textContent.startsWith('1 /'));
            const chart = await page.locator('.project-card[data-position="0"] .project-card__summary').boundingBox();
            await page.mouse.move(chart.x + chart.width / 2, chart.y + chart.height / 2);
            await page.mouse.down();
            await page.mouse.move(chart.x + chart.width / 2 - 65, chart.y + chart.height / 2, { steps: 5 });
            await page.mouse.up();
            await page.waitForFunction(() => document.querySelector('.project-deck__count').textContent.startsWith('2 /'));
            await page.emulateMedia({ reducedMotion: 'reduce' });
            await page.getByRole('button', { name: 'Previous project' }).click();
            await page.waitForFunction(() => document.querySelector('.project-deck__count').textContent.startsWith('1 /'));
            await page.screenshot({ path: `test-results/projects-${width}.png`, fullPage: true });
            assert.deepEqual(errors, []);
            console.log(`PASS ${width}px: ${total} cards, forward/backward wrap, keyboard, swipe, reduced motion, no card overflow`);
            await page.close();
        }
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
