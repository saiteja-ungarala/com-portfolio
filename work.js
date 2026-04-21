/* work.js - Work Page Specific Logic */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener("DOMContentLoaded", () => {
    initHeaderAnim()
    initWorkGridReveals()
})

function initHeaderAnim() {
    const tl = gsap.timeline()

    tl.fromTo('.split-lines.huge-text',
        { y: 150 },
        { y: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out', delay: 0.2 }
    )
}

function initWorkGridReveals() {
    const items = document.querySelectorAll('.work-item')

    items.forEach(item => {
        const img = item.querySelector('.prx-img-slow')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        })

        // Fade up wrapper
        tl.to(item, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out'
        })

        // Parallax inside image
        if (img) {
            gsap.fromTo(img,
                { yPercent: -15 },
                {
                    yPercent: 15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            )
        }
    })
}
