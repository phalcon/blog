// Opens and closes the mobile menu.
(() => {
    const burger = document.getElementById('nav-burger');
    const menu = document.getElementById('nav-mobile');

    if (!burger || !menu) {
        return;
    }

    burger.addEventListener('click', () => {
        const open = menu.hidden;

        menu.hidden = !open;
        burger.setAttribute('aria-expanded', String(open));
    });
})();
