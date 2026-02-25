document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       MOBILE MENU
    =============================== */
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    /* ===============================
       SMOOTH SCROLL
    =============================== */
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: "smooth"
            });

            if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
            }
        });
    });

    /* ===============================
       NAVBAR + ACTIVE LINK (THROTTLED)
    =============================== */
    const navbar = document.querySelector("nav");
    const sections = document.querySelectorAll("section");

    let ticking = false;

    function handleScroll() {

        // Navbar background
        if (navbar) {
            navbar.style.background =
                window.scrollY > 100
                    ? "rgba(0, 0, 0, 0.95)"
                    : "rgba(0, 0, 0, 0.9)";
        }

        // Active nav link
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("text-[#cedbcd]");
            link.classList.add("text-white");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.remove("text-white");
                link.classList.add("text-[#cedbcd]");
            }
        });

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });

    /* ===============================
       PROGRESS BAR ANIMATION
    =============================== */
    const skillsSection = document.getElementById("skills");

    if (skillsSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    const bars = entry.target.querySelectorAll(".progress-bar");

                    bars.forEach(bar => {
                        const width = bar.getAttribute("data-width");

                        // Start from 0 instantly
                        bar.style.width = "0%";

                        // Force reflow for smooth animation
                        bar.offsetWidth;

                        // Animate to target width
                        bar.style.width = width;
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(skillsSection);
    }

    /* ===============================
       FORM VALIDATION (NO ALERTS)
    =============================== */
    const contactForm = document.querySelector("form");
    const messageBox = document.getElementById("form-message");

    if (contactForm && messageBox) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();

            const name = contactForm.querySelector('input[placeholder="Your Name"]').value.trim();
            const email = contactForm.querySelector('input[placeholder="Your Email"]').value.trim();
            const message = contactForm.querySelector("textarea").value.trim();

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                showMessage("Please fill in all fields.", "error");
                return;
            }

            if (!emailPattern.test(email)) {
                showMessage("Please enter a valid email address.", "error");
                return;
            }

            showMessage("Message sent successfully!", "success");
            contactForm.reset();
        });
    }

    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.classList.remove("hidden", "text-red-400", "text-green-400");

        if (type === "error") {
            messageBox.classList.add("text-red-400");
        } else {
            messageBox.classList.add("text-green-400");
        }

        setTimeout(() => {
            messageBox.classList.add("hidden");
        }, 3000);
    }

});


/* ===============================
   TYPING EFFECT
=============================== */
window.addEventListener("load", () => {
    const heroTitle = document.querySelector("h1 span");
    if (!heroTitle) return;

    const originalText = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;

    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    }

    typeWriter();
});