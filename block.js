/**
 *
 * @param {HTMLBodyElement} body
 */
function block(body) {
    if (body.style.overflow === 'hidden') {
        body.style.overflow = null;
    }
}

/**
 *
 * @param {MutationRecord[]} mutations
 * @param {MutationObserver} observer
 */
function callback(mutations, observer) {
    for (const mutation of mutations) {
        block(mutation.target);
    }
}

const observer = new MutationObserver(callback);

observer.observe(document.body, {
    attributeFilter: ['style'],
});

const portals = document.getElementsByClassName('__portal');
for (const portal of portals) {
    if (portal instanceof HTMLElement) {
        portal.style.display = 'none';
    }
}
