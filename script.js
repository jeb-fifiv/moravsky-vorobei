document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const mainNav = document.getElementById("mainNav");

    if (menuButton && mainNav) {

        menuButton.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("is-open");

            menuButton.classList.toggle("is-active", isOpen);

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        // Закрываем мобильное меню после перехода
        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("is-open");
                menuButton.classList.remove("is-active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       HEADER ON SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            header.classList.add("header--scrolled");
        } else {
            header.classList.remove("header--scrolled");
        }

        lastScroll = currentScroll;

    }, { passive: true });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".intro__heading, .intro__text, " +
        ".cuisine__image, .cuisine__content, " +
        ".story__text, .story__gallery, " +
        ".decor__header, .decor__grid, " +
        ".heritage__content, .details__text, " +
        ".details__gallery, .contacts__grid"
    );


    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );


    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    const heroImage = document.querySelector(".hero__image img");

    if (heroImage) {

        window.addEventListener("scroll", () => {

            const scroll = window.scrollY;

            if (scroll < window.innerHeight) {

                heroImage.style.transform =
                    `translateY(${scroll * 0.12}px) scale(1.03)`;

            }

        }, { passive: true });

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});