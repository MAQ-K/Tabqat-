(function () {
    // Local dev servers with live-reload (e.g. VS Code "Live Server") inject their own
    // reload <script> into every .html response — including this XHR fetch — and can
    // truncate the body in the process, silently dropping everything after their
    // injection point. Never happens on a real static host. Guard against it by
    // requiring the response to end with the fragment's known closing comment before
    // trusting it; a few quick retries usually get a clean response anyway. If it never
    // does, leave the page's own pre-baked fallback markup (already in the DOM) alone
    // instead of overwriting it with a broken fragment.
    function fetchComplete(url, endMarker, attemptsLeft) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false); // synchronous — header/footer are in DOM before jQuery/main.js run
        xhr.send(null);
        if (xhr.status !== 200) return null;
        var html = xhr.responseText;
        if (html.trim().slice(-endMarker.length) === endMarker) return html;
        if (attemptsLeft > 0) return fetchComplete(url, endMarker, attemptsLeft - 1);
        return null;
    }

    function inject(id, url, endMarker) {
        var el = document.getElementById(id);
        if (!el) return;
        var html = fetchComplete(url, endMarker, 3);
        if (html !== null) el.innerHTML = html;
    }

    var headerType = document.body.getAttribute('data-header') || 'inner';
    inject('site-header',    'components/header-' + headerType + '.html', '<!-- Header area end -->');
    inject('site-offcanvas', 'components/offcanvas.html', '<!-- Offcanvas area end -->');
    inject('site-footer',    'components/footer.html', '<!-- footer area end -->');

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
