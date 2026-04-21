/* contact.js - Contact Page Specific Logic */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener("DOMContentLoaded", () => {
    initFormInteractions()
    initPageReveals()
})

function initFormInteractions() {
    const inputs = document.querySelectorAll('.form-input')

    inputs.forEach(input => {
        // Check initial state (e.g., browser autocomplete)
        if (input.value.trim() !== '') {
            input.classList.add('has-value')
        }

        // Input events for floating labels
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-value')
            } else {
                input.classList.remove('has-value')
            }
        })

        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.add('has-value')
            } else {
                input.classList.remove('has-value')
            }
        })
    })
}

function initPageReveals() {
    const tl = gsap.timeline()

    // Quick reveal of headers
    tl.fromTo('.split-lines.huge-text',
        { y: 150 },
        { y: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out', delay: 0.2 }
    )

    // Fade up details and form
    tl.fromTo('.delay-show',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: 'power3.out' },
        "-=0.5"
    )
}
