/* capabilities.js - Capabilities Specific Logic */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener("DOMContentLoaded", () => {
    initHeaderAnim()
    initServiceReveals()
})

function initHeaderAnim() {
    const tl = gsap.timeline()

    tl.fromTo('.split-lines.huge-text',
        { y: 150 },
        { y: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out', delay: 0.2 }
    )
}

function initServiceReveals() {
    const rows = document.querySelectorAll('.service-row')

    rows.forEach(row => {
        const mask = row.querySelector('.clip-trigger')
        const img = row.querySelector('.prx-img')
        const textGroup = row.querySelector('.service-sticky')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        })

        // Mask wipe up
        if (mask) {
            tl.to(mask, {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                duration: 1.5,
                ease: 'power4.inOut'
            })
        }

        // Text fade up
        if (textGroup) {
            tl.from(textGroup.children, {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out'
            }, "-=1.2")
        }

        // Parallax inside image
        if (img) {
            gsap.fromTo(img,
                { yPercent: -10 },
                {
                    yPercent: 10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: row,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            )
        }
    })
}
