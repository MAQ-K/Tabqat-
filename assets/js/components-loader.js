(function () {
    function inject(id, url) {
        var el = document.getElementById(id);
        if (!el) return;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false); // synchronous — header/footer are in DOM before jQuery/main.js run
        xhr.send(null);
        if (xhr.status === 200) {
            // Local dev servers with live-reload (e.g. VS Code "Live Server") inject their
            // own <script> into every .html response, including this XHR fetch — and it can
            // land mid-markup (e.g. inside an inline <svg>), corrupting the fragment when set
            // via innerHTML. Strip any such injected block before using the response. This is
            // a no-op in production, where responses never contain it.
            var html = xhr.responseText.replace(
                /<!--\s*Code injected by live-server\s*-->[\s\S]*?<\/script>/gi,
                ''
            );
            el.innerHTML = html;
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
