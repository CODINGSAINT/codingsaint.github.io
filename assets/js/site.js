/* DigitalYogi — header, mobile menu, reveals, and the lazy Three.js hero. */
const header = document.querySelector('.site-header')
const menuButton = document.querySelector('.menu-button')
const mobileMenu = document.querySelector('#mobile-menu')

/* ---------- header ---------- */
const setHeader = () => header?.classList.toggle('is-solid', window.scrollY > 24)
setHeader()
window.addEventListener('scroll', setHeader, { passive: true })

/* ---------- mobile menu ---------- */
if (menuButton && mobileMenu) {
  const close = () => {
    menuButton.setAttribute('aria-expanded', 'false')
    menuButton.setAttribute('aria-label', 'Open menu')
    mobileMenu.hidden = true
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true'
    menuButton.setAttribute('aria-expanded', String(!open))
    menuButton.setAttribute('aria-label', open ? 'Open menu' : 'Close menu')
    mobileMenu.hidden = open
  })
  mobileMenu.addEventListener('click', (e) => e.target.closest('a') && close())
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.hidden) {
      close()
      menuButton.focus()
    }
  })
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => e.matches && close())
}

/* ---------- scroll reveals (never leaves content hidden) ---------- */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const targets = document.querySelectorAll('[data-reveal], [data-reveal-children] > *')
if (!reduceMotion && 'IntersectionObserver' in window && targets.length) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        io.unobserve(entry.target)
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )
  targets.forEach((el, i) => {
    el.classList.add('will-reveal')
    el.style.transitionDelay = `${(i % 4) * 70}ms`
    io.observe(el)
  })
  setTimeout(() => targets.forEach((el) => el.classList.add('is-in')), 5000)
}

/* ---------- spotlight cards follow the pointer ---------- */
document.querySelectorAll('.glow-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  })
})

/* ---------- Three.js hero, after first paint ---------- */
const canvas = document.querySelector('#hero-scene')
const hero = document.querySelector('.hero')
const saveData = navigator.connection?.saveData
if (canvas && hero && !saveData) {
  const load = async () => {
    try {
      const { initHero } = await import('/assets/js/hero.js')
      const api = initHero({
        canvas,
        hero,
        labelsRoot: document.querySelector('.scene-labels'),
        onReady: () => hero.classList.add('scene-ready'),
      })
      if (!api) canvas.remove()
    } catch (err) {
      canvas.remove()
      console.warn('[digitalyogi] hero scene unavailable', err)
    }
  }
  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 1200 })
  else window.addEventListener('load', () => setTimeout(load, 200), { once: true })
}
