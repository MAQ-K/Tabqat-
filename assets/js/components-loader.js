(function () {
    function inject(id, url) {
        var el = document.getElementById(id);
        if (!el) return;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false); // synchronous — header/footer are in DOM before jQuery/main.js run
        xhr.send(null);
        if (xhr.status === 200) {
            el.innerHTML = xhr.responseText;
        }
    }

    var headerType = document.body.getAttribute('data-header') || 'inner';
    inject('site-header',    'components/header-' + headerType + '.html');
    inject('site-offcanvas', 'components/offcanvas.html');
    inject('site-footer',    'components/footer.html');

    // Auto-highlight the current page's nav link
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('#mobile-menu .multipage-menu > li > a');
    navLinks.forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.parentElement.classList.add('active');
        }
    });

    // Set copyright year
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
