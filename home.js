/* home.js - Home Page Specific Immersive Scroll Logic */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener("DOMContentLoaded", () => {
    initHeroAnimations()
    initPhilosophyPin()
    initHorizontalScroll()
    initPortfolioReveal()
})

// ----- Hero Intro & Parallax -----
function initHeroAnimations() {
    const tl = gsap.timeline()

    // Intro Text Reveal
    tl.to('.hero-title .line-inner', {
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2
    })
        .to('.hero-subtitle .line-inner', {
            y: 0,
            duration: 1,
            ease: 'power4.out'
        }, "-=0.8")
        .to('.scroll-down', {
            opacity: 1,
            duration: 1
        }, "-=0.5")

    // Parallax Scale on Scroll
    gsap.to('.hero-bg', {
        scale: 1,
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    })

    // Hero Text fades out on scroll
    gsap.to('.hero-text-container', {
        yPercent: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    })
}

// ----- Philosophy Pin & Text Reveal -----
function initPhilosophyPin() {
    const triggerElement = document.getElementById('philosophy');
    if (!triggerElement) return;

    // Pin the philosophy section while reading
    ScrollTrigger.create({
        trigger: '#philosophy',
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true
    })

    // Scrub through the text opacity
    const manifesto = document.querySelector('.philosophy-manifesto')

    const words = manifesto.innerText.split(' ')
    manifesto.innerHTML = ''
    words.forEach(word => {
        const span = document.createElement('span')
        span.innerText = word + ' '
        span.style.opacity = '0.1' // initial state
        manifesto.appendChild(span)
    })

    gsap.to('.philosophy-manifesto span', {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
            trigger: '#philosophy',
            start: 'top 20%', // starts when pinned
            end: '+=80%',
            scrub: 1
        }
    })
}

// ----- Capabilities Horizontal Scroll -----
function initHorizontalScroll() {
    const horizontalSection = document.querySelector('.horizontal-scroll')
    const container = document.querySelector('.horizontal-container')
    if (!horizontalSection || !container) return;

    const scrollAmount = container.offsetWidth - window.innerWidth + (window.innerWidth * 0.2)

    gsap.to(container, {
        x: -scrollAmount,
        ease: 'none',
        scrollTrigger: {
            trigger: horizontalSection,
            start: 'top top',
            end: () => `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
        }
    })

    const images = document.querySelectorAll('.img-inner')
    images.forEach(img => {
        gsap.to(img, {
            xPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: horizontalSection,
                start: 'top top',
                end: () => `+=${scrollAmount}`,
                scrub: 1
            }
        })
    })
}

// ----- Portfolio Image Masks & Parallax -----
function initPortfolioReveal() {
    const projects = document.querySelectorAll('.project-wrapper')

    projects.forEach(project => {
        const mask = project.querySelector('.reveal-mask')
        const img = project.querySelector('.prx-img')
        const info = project.querySelector('.project-info')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: project,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        })

        // Mask wipe up
        tl.to(mask, {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.5,
            ease: 'power4.inOut'
        })

        // Slight scale down of image inside mask
        tl.from(img, {
            scale: 1.2,
            duration: 1.5,
            ease: 'power4.inOut'
        }, "-=1.5")

        // Info text fade up
        tl.from(info, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, "-=1")

        // Image Parallax Effect while scrolling past
        gsap.to(img, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: project,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        })
    })
}
