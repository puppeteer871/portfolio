document.addEventListener("DOMContentLoaded", (event) => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target && target !== '#') {
                lenis.scrollTo(target, { offset: -100 });
            }
        });
    });

    // 2. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Reveal Text Animation for Hero
    gsap.to(".reveal-text", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
    });



    // Project Items Fade In
    const projects = gsap.utils.toArray('.project-item');
    projects.forEach(project => {
        gsap.from(project, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: project,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 3. Custom Carousel Logic
    const carousels = document.querySelectorAll('.carousel-track');
    
    carousels.forEach(track => {
        let isScrolling = false;
        
        // Clone slides for infinite scroll
        const originalSlides = Array.from(track.children);
        
        // Append clones to end
        originalSlides.forEach(slide => track.appendChild(slide.cloneNode(true)));
        
        // Prepend clones to start
        for (let i = originalSlides.length - 1; i >= 0; i--) {
            track.insertBefore(originalSlides[i].cloneNode(true), track.firstChild);
        }

        // Set initial scroll to the middle original set so user can scroll left or right
        setTimeout(() => {
            track.scrollLeft = originalSlides.length * track.clientWidth;
        }, 100);

        // Hijack mouse wheel for horizontal scrolling
        track.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                e.stopPropagation(); // Arrest Lenis page scrolling
                
                if (isScrolling) return;
                isScrolling = true;
                
                const direction = Math.sign(e.deltaY);
                track.scrollBy({
                    left: direction * track.clientWidth,
                    behavior: 'smooth'
                });
                
                // Unlock scroll after animation finishes
                setTimeout(() => {
                    isScrolling = false;
                }, 500);
            }
        });

        // Handle infinite scroll loop seamlessly when resting
        let snapTimeout;
        track.addEventListener('scroll', () => {
            clearTimeout(snapTimeout);
            snapTimeout = setTimeout(() => {
                const setWidth = originalSlides.length * track.clientWidth;
                
                // If rested in the cloned third set, jump back to middle set
                if (track.scrollLeft >= setWidth * 2 - 10) {
                    track.scrollLeft -= setWidth;
                } 
                // If rested in the cloned first set, jump forward to middle set
                else if (track.scrollLeft < setWidth - 10) {
                    track.scrollLeft += setWidth;
                }
            }, 100);
        });
    });
});
