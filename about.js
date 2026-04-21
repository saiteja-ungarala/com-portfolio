/* about.js - About Page Specific Logic */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener("DOMContentLoaded", () => {
    initHeaderAnim()
    initManifestoReveal()
    initTeamReveal()
})

function initHeaderAnim() {
    const tl = gsap.timeline()

    // Quick reveal of headers
    tl.fromTo('.split-lines.huge-text',
        { y: 150 },
        { y: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out', delay: 0.2 }
    )

    // Make subtitle visible
    setTimeout(() => {
        const subtitle = document.querySelector('.delay-show');
        if (subtitle) subtitle.classList.add('visible');
    }, 500)

    // Parallax the background gradient
    gsap.to('.about-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '#about-header',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    })
}

function initManifestoReveal() {
    const manifesto = document.querySelector('.manifesto-text')
    if (!manifesto) return;

    const words = manifesto.innerText.split(' ')
    manifesto.innerHTML = ''
    words.forEach(word => {
        const span = document.createElement('span')
        span.innerText = word + ' '
        span.style.opacity = '0.1'
        manifesto.appendChild(span)
    })

    gsap.to('.manifesto-text span', {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.manifesto-scroll',
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1
        }
    })
}

function initTeamReveal() {
    const cards = document.querySelectorAll('.team-card')

    cards.forEach(card => {
        const mask = card.querySelector('.mask-down')
        const img = card.querySelector('.prx-up')
        const info = card.querySelector('.team-info')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        })

        // Wipe down reveal
        tl.to(mask, {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.5,
            ease: 'power4.inOut'
        })

        // Slight text fade up
        tl.from(info, {
            y: 30, opacity: 0, duration: 1, ease: 'power3.out'
        }, "-=1")

        // Parallax inside team image
        gsap.to(img, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        })
    })
}
