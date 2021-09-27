/**
 *
 * @param {HTMLElement} element
 */
function unhidden(element) {
    if (element.style.overflow === 'hidden') {
        element.style.overflow = null;
    }
}

/**
 *
 * @param {MutationRecord[]} mutations
 * @param {MutationObserver} observer
 */
function bodyObserverCallback(mutations, observer) {
    for (const mutation of mutations) {
        unhidden(mutation.target);
    }
}

/**
 *
 * @param {HTMLElement} element
 */
function rebut(element) {
    if (element.classList.contains('overlay-enter-done')) {
        element.style.display = null;
    }
}

/**
 *
 * @param {MutationRecord[]} mutations
 * @param {MutationObserver} observer
 */
function adObserverCallback(mutations, observer) {
    for (const mutation of mutations) {
        rebut(mutation.target);
    }
}

/**
 *
 * @param {HTMLElement} element
 */
function block(element) {
    element.style.display = 'none';
    rebut(element);
    const observer = new MutationObserver(adObserverCallback);
    observer.observe(element, { attributeFilter: ['class'] });
}

/**
 *
 * @param {MutationRecord[]} mutations
 * @param {MutationObserver} observer
 */
function portalObserverCallback(mutations, observer) {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement) {
                block(node);
            }
        }
    }
}

unhidden(document.body);
const bodyObserver = new MutationObserver(bodyObserverCallback);
bodyObserver.observe(document.body, { attributeFilter: ['style'] });

const portals = document.getElementsByClassName('__portal');
for (const portal of portals) {
    for (const element of portal.children) {
        if (element instanceof HTMLElement) {
            block(element);
        }
    }
    const observer = new MutationObserver(portalObserverCallback);
    observer.observe(portal, { childList: true });
}
