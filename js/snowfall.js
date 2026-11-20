document.addEventListener("DOMContentLoaded", function () {

    // Avoid duplicate snow layers
    if (document.getElementById("egx-snow-layer")) return;

    // Respect accessibility settings
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const snowLayer = document.createElement("div");
    snowLayer.id = "egx-snow-layer";

    document.body.appendChild(snowLayer);

    // Snowflake quantity
    const isMobile = window.innerWidth <= 768;
    const snowCount = isMobile ? 22 : 40;

    for (let i = 0; i < snowCount; i++) {

        const snowflake = document.createElement("span");
        snowflake.className = "egx-snowflake";

        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 8 + 8;
        const delay = Math.random() * -15;
        const opacity = Math.random() * 0.5 + 0.25;

        snowflake.style.left = Math.random() * 100 + "%";
        snowflake.style.setProperty("--snow-size", size + "px");
        snowflake.style.setProperty("--snow-duration", duration + "s");
        snowflake.style.setProperty("--snow-delay", delay + "s");
        snowflake.style.setProperty("--snow-opacity", opacity);

        snowLayer.appendChild(snowflake);
    }

});