import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Build main process
await esbuild.build({
  entryPoints: ['src/main/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/main/index.js',
  external: ['electron'],
})

// Build preload process
await esbuild.build({
  entryPoints: ['src/preload/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/preload/index.js',
  external: ['electron'],
})

console.log('✓ Built main and preload processes')
