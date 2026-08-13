// ===============================
// PORTFOLIO JAVASCRIPT
// ===============================


// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// ===============================
// PROJECT CLICK
// ===============================

const projects = document.querySelectorAll(".project");

projects.forEach(project => {

    project.addEventListener("click", function () {

        const title = this.querySelector("h4");

        if (title) {
            alert("Project: " + title.textContent);
        }

    });

});


// ===============================
// SCROLL ANIMATION
// ===============================

const sections = document.querySelectorAll(
    ".left, .right, .contact, .projects, .bottom"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});


// ===============================
// CURRENT YEAR
// ===============================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ===============================
// DARK PORTFOLIO MESSAGE
// ===============================

console.log("Portfolio loaded successfully!");


// ===============================
// NO COPY/PASTE + HIGHLIGHT
// ===============================

(function () {

    const message = "Copying and pasting are disabled on this site.";

    function blockEvent(e) {
        e.preventDefault();
        highlightElement(e.target);
        showToast(message);
    }

    document.addEventListener('copy', blockEvent);
    document.addEventListener('cut', blockEvent);
    document.addEventListener('paste', blockEvent);

    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        showToast(message);
        highlightElement(e.target);
    });

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.metaKey) {
            const key = (e.key || '').toLowerCase();
            if (["c", "x", "v", "a"].includes(key)) {
                e.preventDefault();
                showToast(message);
                highlightElement(document.activeElement || document.body);
            }
        }
    });

    // Prevent text selection (helps stop copy via mouse)
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    // Inject minimal styles for highlight and toast
    const style = document.createElement('style');
    style.textContent = `
    .copied-highlight{outline:3px solid rgba(255,0,0,0.85);box-shadow:0 0 12px rgba(255,0,0,0.15);transition:outline .18s ease,box-shadow .18s ease}
    .nocopy-toast{position:fixed;left:50%;transform:translateX(-50%);bottom:20px;background:#222;color:#fff;padding:8px 12px;border-radius:6px;font-size:13px;opacity:0;pointer-events:none;transition:opacity .18s ease}
    .nocopy-toast.show{opacity:1;pointer-events:auto}
    `;
    document.head.appendChild(style);

    let toast;

    function showToast(text) {
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'nocopy-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = text;
        toast.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(function () {
            toast.classList.remove('show');
        }, 1400);
    }

    function highlightElement(el) {
        if (!el || !el.classList) return;
        el.classList.add('copied-highlight');
        setTimeout(function () {
            el.classList.remove('copied-highlight');
        }, 700);
    }

})();