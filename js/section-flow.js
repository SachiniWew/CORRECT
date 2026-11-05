/* =====================================================
   EGX — SMOOTH SECTION FLOW
===================================================== */

(function initSectionFlow() {

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    // Sections to animate
    const elements = document.querySelectorAll(`
        #services-section .wheel-detail,
        #services-section .wheel-wrap,
        #about-snippet .about-split,
        #counters .counters-grid,
        .ab-scene--exco .ab-directors-header,
        .ab-scene--exco .ab-directors-grid,
        #serve-values .egx-values-container,
        #pulse-section .pulse-inner,
        #parallax-banner .parallax-content
    `);

    // Staggered elements
    const staggerElements = document.querySelectorAll(`
        #counters .counters-grid,
        .ab-scene--exco .ab-directors-grid
    `);

    if (reduceMotion) return;

    elements.forEach(element => {
        element.classList.add('flow-reveal');
    });

    staggerElements.forEach(element => {
        element.classList.add('flow-stagger');
    });

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('flow-visible');

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: '0px 0px -70px 0px'
        }

    );

    elements.forEach(element => {
        observer.observe(element);
    });

})();