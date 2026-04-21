/* main.js - Global App Logic */
import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

// Initialize Smooth Scroll (Lenis) globally scoped
window.lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  window.lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Sync Lenis with GSAP ScrollTrigger
window.lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  window.lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

document.addEventListener("DOMContentLoaded", () => {
  initCustomCursor()
  initMenu()
})

// ----- Fullscreen Menu -----
function initMenu() {
  const menuBtn = document.querySelector('.menu-btn')
  const menuText = document.querySelector('.menu-text')
  const menuWrapper = document.querySelector('.fullscreen-menu')

  if (!menuBtn || !menuWrapper) return;

  let isMenuOpen = false
  const tl = gsap.timeline({ paused: true })

  // Animate Background
  tl.to('.menu-bg', {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    duration: 1,
    ease: 'power4.inOut'
  })

  // Stagger Links
  tl.to('.menu-link', {
    y: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out'
  }, "-=0.5")

  // Fade Info
  tl.to('.menu-info', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, "-=0.8")

  menuBtn.addEventListener('click', () => {
    if (!isMenuOpen) {
      menuWrapper.classList.add('is-open')
      menuWrapper.style.pointerEvents = 'all'
      tl.play()
      if (menuText) menuText.innerText = 'CLOSE'
      window.lenis.stop()
    } else {
      menuWrapper.style.pointerEvents = 'none'
      tl.reverse()
      if (menuText) menuText.innerText = 'MENU'
      window.lenis.start()
      // Remove is-open after reverse animation finishes
      setTimeout(() => {
        if (!isMenuOpen) menuWrapper.classList.remove('is-open')
      }, 1200)
    }
    isMenuOpen = !isMenuOpen
  })
}

// ----- Custom Cursor -----
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot')
  const outline = document.querySelector('.cursor-outline')

  if (!dot || !outline) return;

  window.addEventListener('mousemove', (e) => {
    // Quick move for dot
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
    // Slower trailing move for outline
    gsap.to(outline, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out' })
  })

  // Add hover states for links/buttons
  const bindHovers = () => {
    const hoverElements = document.querySelectorAll('a, .menu-btn, .horizontal-panel, button')
    hoverElements.forEach(el => {
      // Prevent mapping multiple times
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = "true";

      el.addEventListener('mouseenter', () => {
        gsap.to(outline, { scale: 1.5, backgroundColor: 'rgba(212, 175, 55, 0.1)', duration: 0.3 })
        gsap.to(dot, { scale: 0, duration: 0.3 })
      })
      el.addEventListener('mouseleave', () => {
        gsap.to(outline, { scale: 1, backgroundColor: 'transparent', duration: 0.3 })
        gsap.to(dot, { scale: 1, duration: 0.3 })
      })
    })
  }

  bindHovers();
  // Call again after a short delay in case dom changes
  setTimeout(bindHovers, 1000);
}
