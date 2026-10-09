import { isAbsolute, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))
const library = resolve(root, '..')
const output = process.env.GHCP_FRONTEND_BUILD_DIR
const fromLibrary = output ? relative(library, output) : ''
// outside = the relative path climbs out ('..' segment) or is on another root; a child named '..x' is inside
const outside = fromLibrary === '..' || fromLibrary.startsWith(`..${sep}`) || isAbsolute(fromLibrary)
if (!output || !isAbsolute(output) || !outside) {
  throw new Error('GHCP_FRONTEND_BUILD_DIR must be an absolute output directory outside the library')
}

export default defineConfig({ root, build: { outDir: output, emptyOutDir: false } })