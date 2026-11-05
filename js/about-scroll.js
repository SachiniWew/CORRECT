document.addEventListener("DOMContentLoaded", () => {

    // Elements that reveal individually
    const revealElements = [
        ".ab-scene--gold .ab-gold-inner",
        ".ab-tl-header",
        ".ab-mv-pane",
        ".ab-directors-header",
        ".people-section .ab-tl-header",
        ".ab-force-content",
        ".ab-scene--journey",
        ".reel-wrap"
    ];

    // Add reveal class to selected elements
    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add("ab-reveal");
        });
    });

    // Elements whose children should appear one after another
    const staggerElements = [
        ".ab-directors-grid",
        ".ab-mv-wrap",
        ".grid-container"
    ];

    staggerElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add("ab-reveal-stagger");
        });
    });

    // Scroll observer
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("ab-visible");

                // Animate only once
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    });

    // Observe all animated elements
    document.querySelectorAll(
        ".ab-reveal, .ab-reveal-stagger"
    ).forEach(element => {
        observer.observe(element);
    });

});