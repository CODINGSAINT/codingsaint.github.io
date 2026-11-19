/**
 * DigitalYogi hero — "From noise to clarity".
 *
 * A swirling cloud of particles assembles itself into the architecture taught
 * in the free course: API → Retrieval → Model → Guardrails. A request pulse
 * travels along the path, nodes flash as it passes, particles part around the
 * pointer, and scrolling away lets the idea drift apart again.
 *
 * One Points draw call + four ring lines. No textures. Built to
 * /assets/js/hero.js by `_src/hero/build.mjs` (esbuild, tree-shaken three).
 */
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  Points,
  Group,
  LineLoop,
  LineBasicMaterial,
  AdditiveBlending,
  Color,
  Vector3,
} from 'three'

const TAU = Math.PI * 2

/* Node layout in group space: a gentle rising zig-zag with depth. */
const NODES = [
  { p: [-2.0, -1.2, 0.2], label: 'API', sub: 'time limits · retries' },
  { p: [-0.7, 0.75, -0.35], label: 'Retrieval', sub: 'RAG · your data' },
  { p: [0.7, -0.6, 0.3], label: 'Model', sub: 'LLM · tools' },
  { p: [2.0, 1.15, -0.2], label: 'Guardrails', sub: 'evaluate · fail safe' },
]

/** Quadratic bezier between node a and b, bowed toward the viewer. */
function edgePoint(a, b, t, out) {
  const cx = (a[0] + b[0]) / 2
  const cy = (a[1] + b[1]) / 2 + (b[1] > a[1] ? -0.25 : 0.25)
  const cz = (a[2] + b[2]) / 2 + 0.9
  const u = 1 - t
  out[0] = u * u * a[0] + 2 * u * t * cx + t * t * b[0]
  out[1] = u * u * a[1] + 2 * u * t * cy + t * t * b[1]
  out[2] = u * u * a[2] + 2 * u * t * cz + t * t * b[2]
  return out
}

const rand = (min, max) => min + Math.random() * (max - min)

export function initHero({ canvas, hero, labelsRoot, onReady }) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const compact = window.matchMedia('(max-width: 900px)').matches

  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' })
  } catch {
    return null
  }
  if (!renderer.getContext()) return null

  const scene = new Scene()
  const camera = new PerspectiveCamera(40, 1, 0.1, 60)
  camera.position.set(0, 0, 9)

  /* ---------- particle budget ---------- */
  const PER_NODE = compact ? 420 : 760
  const PER_EDGE = compact ? 300 : 560
  const DUST = compact ? 1300 : 2800
  const COUNT = PER_NODE * NODES.length + PER_EDGE * (NODES.length - 1) + DUST

  const chaos = new Float32Array(COUNT * 3)
  const order = new Float32Array(COUNT * 3)
  const rnd = new Float32Array(COUNT)
  const kind = new Float32Array(COUNT) // 0 node, 1 edge, 2 dust
  const path = new Float32Array(COUNT) // 0..1 along the request path, -1 = none

  const segs = NODES.length - 1
  const golden = Math.PI * (3 - Math.sqrt(5))
  const tmp = [0, 0, 0]
  let i = 0

  const putChaos = (k) => {
    // A wide, flattened nebula — denser toward the middle.
    const r = Math.pow(Math.random(), 0.6) * 5.2
    const a = Math.random() * TAU
    chaos[k * 3] = Math.cos(a) * r * 1.25
    chaos[k * 3 + 1] = (Math.random() - 0.5) * 3.6 * (1 - r / 9)
    chaos[k * 3 + 2] = Math.sin(a) * r * 0.7
  }

  // Nodes: a shell plus a bright core.
  NODES.forEach((node, n) => {
    const coreCount = Math.floor(PER_NODE * 0.26)
    const shellCount = PER_NODE - coreCount
    for (let j = 0; j < PER_NODE; j++, i++) {
      putChaos(i)
      let x, y, z
      if (j < coreCount) {
        // Bright core: random points inside a small ball.
        const u = Math.random() * 2 - 1
        const a = Math.random() * TAU
        const r = Math.cbrt(Math.random()) * 0.2
        const q = Math.sqrt(1 - u * u)
        x = Math.cos(a) * q * r
        y = u * r
        z = Math.sin(a) * q * r
      } else {
        // Even Fibonacci shell.
        const k = j - coreCount
        const fy = 1 - (k / (shellCount - 1)) * 2
        const rr = Math.sqrt(Math.max(0, 1 - fy * fy))
        const th = golden * k
        const radius = 0.44 + rand(-0.03, 0.04)
        x = Math.cos(th) * rr * radius
        y = fy * radius
        z = Math.sin(th) * rr * radius
      }
      order[i * 3] = node.p[0] + x
      order[i * 3 + 1] = node.p[1] + y
      order[i * 3 + 2] = node.p[2] + z
      rnd[i] = Math.random()
      kind[i] = 0
      path[i] = n / segs
    }
  })

  // Edges: thin luminous tubes along each bezier.
  for (let s = 0; s < segs; s++) {
    const a = NODES[s].p
    const b = NODES[s + 1].p
    for (let j = 0; j < PER_EDGE; j++, i++) {
      putChaos(i)
      const t = 0.1 + (j / PER_EDGE) * 0.8
      edgePoint(a, b, t, tmp)
      const spread = 0.045 + Math.random() * 0.03
      order[i * 3] = tmp[0] + rand(-1, 1) * spread
      order[i * 3 + 1] = tmp[1] + rand(-1, 1) * spread
      order[i * 3 + 2] = tmp[2] + rand(-1, 1) * spread
      rnd[i] = Math.random()
      kind[i] = 1
      path[i] = (s + t) / segs
    }
  }

  // Dust: stays as atmosphere, pulled into a calmer, wider halo.
  for (; i < COUNT; i++) {
    putChaos(i)
    const r = 3.2 + Math.pow(Math.random(), 1.6) * 4.5
    const a = Math.random() * TAU
    order[i * 3] = Math.cos(a) * r * 1.2
    order[i * 3 + 1] = (Math.random() - 0.5) * 4.2
    order[i * 3 + 2] = Math.sin(a) * r * 0.5 - 1.2
    rnd[i] = Math.random()
    kind[i] = 2
    path[i] = -1
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(chaos, 3))
  geometry.setAttribute('aOrder', new BufferAttribute(order, 3))
  geometry.setAttribute('aRand', new BufferAttribute(rnd, 1))
  geometry.setAttribute('aKind', new BufferAttribute(kind, 1))
  geometry.setAttribute('aPath', new BufferAttribute(path, 1))

  const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 1.75)

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uScatter: { value: 0 },
    uPulse: { value: -1 },
    uPointer: { value: new Vector3(99, 99, 0) },
    uPointerOn: { value: 0 },
    uSize: { value: compact ? 2.6 : 2.9 },
    uPR: { value: dpr },
    uNode: { value: new Color('#ffffff') },
    uEdge: { value: new Color('#b9b4e0') },
    uDust: { value: new Color('#7a72d8') },
    uHot: { value: new Color('#ffffff') },
  }

  const material = new ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexShader: /* glsl */ `
      uniform float uTime, uMorph, uScatter, uPulse, uPointerOn, uSize, uPR;
      uniform vec3 uPointer;
      attribute vec3 aOrder;
      attribute float aRand, aKind, aPath;
      varying float vGlow, vKind, vRand, vMix;

      mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

      void main() {
        // Chaos: a slow galaxy swirl with vertical drift.
        vec3 c = position;
        float r = length(c.xz);
        c.xz = rot(uTime * (0.05 + 0.09 * aRand) + r * 0.12) * c.xz;
        c.y += sin(uTime * 0.55 + aRand * 31.0) * 0.18;

        // Order: the diagram, softly breathing.
        vec3 o = aOrder;
        float wob = aKind > 1.5 ? 0.12 : 0.022;
        o += vec3(sin(uTime * 1.3 + aRand * 40.0), cos(uTime * 1.1 + aRand * 29.0), sin(uTime * 0.9 + aRand * 53.0)) * wob;

        // Staggered assembly: edges after nodes, dust last.
        float delay = aRand * 0.5 + aKind * 0.12;
        float m = smoothstep(delay, delay + 0.42, uMorph);
        m *= 1.0 - uScatter * (0.25 + 0.75 * aRand);
        vMix = m;

        vec3 pos = mix(c, o, m);

        // Particles part around the pointer.
        vec2 d = pos.xy - uPointer.xy;
        float dist = length(d);
        float push = uPointerOn * smoothstep(1.15, 0.0, dist) * (0.35 + 0.35 * aRand);
        pos.xy += normalize(d + 1e-4) * push;

        // The request pulse.
        float g = 0.0;
        if (aPath >= 0.0) g = exp(-abs(aPath - uPulse) * 26.0) * m;
        vGlow = g;
        vKind = aKind;
        vRand = aRand;

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;

        float k = aKind < 0.5 ? 1.0 : (aKind < 1.5 ? 0.92 : 0.62);
        float size = uSize * k * (0.45 + aRand * 1.05) * (1.0 + g * 2.2) * (8.0 / -mv.z);
        gl_PointSize = clamp(size * uPR, 0.6, 14.0 * uPR);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uNode, uEdge, uDust, uHot;
      varying float vGlow, vKind, vRand, vMix;

      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        a *= a;

        vec3 col = vKind < 0.5 ? mix(uNode, vec3(1.0), vRand * 0.5)
                 : vKind < 1.5 ? mix(uEdge, uNode, vRand * 0.35)
                 : uDust;
        // Before assembly everything shares the nebula's violet.
        col = mix(mix(uDust, uEdge, vRand), col, vMix);
        col = mix(col, uHot, clamp(vGlow * 1.4, 0.0, 1.0));

        float alpha = vKind > 1.5 ? 0.42 : 0.88;
        gl_FragColor = vec4(col, a * alpha * (1.0 + vGlow * 1.6));
      }
    `,
  })

  const group = new Group()
  group.add(new Points(geometry, material))

  /* ---------- node rings ---------- */
  const ringGeo = new BufferGeometry()
  {
    const pts = []
    for (let k = 0; k <= 96; k++) {
      const a = (k / 96) * TAU
      pts.push(Math.cos(a) * 0.66, Math.sin(a) * 0.66, 0)
    }
    ringGeo.setAttribute('position', new BufferAttribute(new Float32Array(pts), 3))
  }
  const rings = NODES.map((node) => {
    const mat = new LineBasicMaterial({ color: '#b3a8ff', transparent: true, opacity: 0, depthWrite: false, blending: AdditiveBlending })
    const ring = new LineLoop(ringGeo, mat)
    ring.position.set(...node.p)
    group.add(ring)
    return ring
  })

  scene.add(group)

  /* ---------- HTML labels (crisp text, projected each frame) ---------- */
  const labels = labelsRoot
    ? NODES.map((node) => {
        const el = document.createElement('span')
        el.className = 'node-label'
        el.innerHTML = `<b>${node.label}</b><small>${node.sub}</small>`
        labelsRoot.appendChild(el)
        return el
      })
    : []

  /* ---------- state ---------- */
  let width = 1
  let height = 1
  let visible = true
  let rafId = 0
  let morphTarget = 0
  let frames = 0
  const t0 = performance.now()
  const pointerNdc = { x: 0, y: 0, tx: 0, ty: 0, on: 0, ton: 0 }
  const v = new Vector3()
  const dir = new Vector3()

  function layout() {
    const rect = canvas.getBoundingClientRect()
    width = Math.max(1, rect.width)
    height = Math.max(1, rect.height)
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    // The scene lives in its own panel: fit the diagram to the panel width.
    const halfH = camera.position.z * Math.tan((camera.fov * Math.PI) / 360)
    const halfW = halfH * camera.aspect
    group.userData.scale = Math.min(1.15, (2 * halfW - 0.3) / 4.9, (2 * halfH - 1.3) / 3.2)
    group.position.set(0, 0.22, 0)
  }

  const heroProgress = () =>
    Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight * 0.9)))

  function render(now) {
    const t = (now - t0) / 1000
    uniforms.uTime.value = t

    // Assemble: ease toward the target.
    uniforms.uMorph.value += (morphTarget - uniforms.uMorph.value) * (reducedMotion ? 1 : 0.018)
    const morph = uniforms.uMorph.value
    uniforms.uScatter.value += (heroProgress() - uniforms.uScatter.value) * 0.1

    // Request pulse: travels the path every ~3.4 s once assembled.
    const cycle = (t % 3.4) / 2.6
    uniforms.uPulse.value = morph > 0.85 ? cycle * 1.12 - 0.06 : -1

    // Pointer, smoothed, projected onto the group's z = 0 plane.
    pointerNdc.x += (pointerNdc.tx - pointerNdc.x) * 0.08
    pointerNdc.y += (pointerNdc.ty - pointerNdc.y) * 0.08
    pointerNdc.on += (pointerNdc.ton - pointerNdc.on) * 0.06
    uniforms.uPointerOn.value = pointerNdc.on

    const s = group.userData.scale * (1 + Math.sin(t * 0.5) * 0.01)
    group.scale.setScalar(s)
    group.rotation.y = Math.sin(t * 0.16) * 0.16 + pointerNdc.x * 0.2 - uniforms.uScatter.value * 0.5
    group.rotation.x = -pointerNdc.y * 0.1 + uniforms.uScatter.value * 0.25
    group.updateMatrixWorld()

    v.set(pointerNdc.x, pointerNdc.y, 0.5).unproject(camera)
    dir.copy(v).sub(camera.position).normalize()
    const planeZ = group.position.z
    const dist = (planeZ - camera.position.z) / dir.z
    v.copy(camera.position).addScaledVector(dir, dist)
    group.worldToLocal(v)
    uniforms.uPointer.value.copy(v)

    // Rings and labels.
    const pulse = uniforms.uPulse.value
    const leaving = 1 - uniforms.uScatter.value
    NODES.forEach((node, n) => {
      const flash = Math.exp(-Math.abs(pulse - n / segs) * 22)
      const ring = rings[n]
      ring.material.opacity = (0.16 + flash * 0.55) * Math.max(0, morph * 1.4 - 0.4) * leaving
      ring.scale.setScalar(1 + flash * 0.22 + Math.sin(t * 1.4 + n) * 0.02)
      ring.quaternion.copy(camera.quaternion) // billboard
      if (labels[n]) {
        v.set(...node.p).applyMatrix4(group.matrixWorld).project(camera)
        const x = (v.x * 0.5 + 0.5) * width
        const y = (-v.y * 0.5 + 0.5) * height
        const o = Math.max(0, Math.min(1, (morph - 0.7) * 4)) * leaving
        labels[n].style.transform = `translate3d(${x.toFixed(1)}px, ${(y + 40 * s).toFixed(1)}px, 0) translate(-50%, 0)`
        labels[n].style.opacity = o.toFixed(3)
        labels[n].classList.toggle('is-hot', flash > 0.5)
      }
    })

    renderer.render(scene, camera)
    frames++
  }

  function loop(now) {
    if (!visible || document.hidden) {
      rafId = 0
      return
    }
    render(now)
    rafId = requestAnimationFrame(loop)
  }
  const start = () => {
    if (reducedMotion) {
      render(performance.now() + 4000)
      return
    }
    if (!rafId) rafId = requestAnimationFrame(loop)
  }
  const stop = () => {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = 0
  }

  /* ---------- listeners ---------- */
  const onPointer = (e) => {
    const r = canvas.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    const inside = x >= -0.1 && x <= 1.1 && y >= -0.1 && y <= 1.1
    pointerNdc.tx = Math.max(-1.2, Math.min(1.2, x * 2 - 1))
    pointerNdc.ty = Math.max(-1.2, Math.min(1.2, -(y * 2 - 1)))
    pointerNdc.ton = e.pointerType === 'touch' || !inside ? 0 : 1
  }
  const onLeave = () => (pointerNdc.ton = 0)
  let resizeTimer = 0
  const onResize = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      layout()
      if (reducedMotion) render(performance.now() + 4000)
    }, 120)
  }
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    visible ? start() : stop()
  })
  const onVisibility = () => (document.hidden ? stop() : start())

  if (!reducedMotion) {
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
  }
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)
  io.observe(hero)

  layout()
  if (reducedMotion) {
    morphTarget = 1
    uniforms.uMorph.value = 1
  } else {
    setTimeout(() => (morphTarget = 1), 650)
  }
  start()
  requestAnimationFrame(() => {
    canvas.classList.add('is-ready')
    onReady?.()
  })

  return {
    frames: () => frames,
    destroy() {
      stop()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      labels.forEach((l) => l.remove())
      geometry.dispose()
      material.dispose()
      ringGeo.dispose()
      rings.forEach((r) => r.material.dispose())
      renderer.dispose()
    },
  }
}
