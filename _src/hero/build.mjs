/**
 * Builds the hero scene into one minified ES module: /assets/js/hero.js
 * Jekyll ignores folders that start with "_", so this source never ships.
 *
 *   cd _src/hero && npm install && npm run build
 */
import { build } from 'esbuild'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))

const result = await build({
  entryPoints: [resolve(here, 'scene.js')],
  outfile: resolve(here, '../../assets/js/hero.js'),
  bundle: true,
  format: 'esm',
  minify: true,
  target: 'es2020',
  legalComments: 'none',
  metafile: true,
  banner: { js: '/* DigitalYogi hero — built from _src/hero/scene.js. Includes three.js (MIT). */' },
})

const out = Object.values(result.metafile.outputs)[0]
console.log(`assets/js/hero.js  ${(out.bytes / 1024).toFixed(1)} KB`)
