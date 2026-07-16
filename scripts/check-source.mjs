import { readdir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const sourceRoot = join(root, 'src')

async function findJavaScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (let i = 0; i < entries.length; i++) {
    const path = join(directory, entries[i].name)
    if (entries[i].isDirectory()) {
      files.push(...await findJavaScriptFiles(path))
    } else if (extname(entries[i].name) === '.js') {
      files.push(path)
    }
  }
  return files
}

const files = await findJavaScriptFiles(sourceRoot)
for (let i = 0; i < files.length; i++) {
  const result = spawnSync(process.execPath, ['--check', files[i]], {
    encoding: 'utf8',
  })
  if (result.status !== 0) {
    process.stderr.write(`Syntax error in ${relative(root, files[i])}\n`)
    process.stderr.write(result.stderr || result.stdout)
    process.exit(result.status || 1)
  }
}

console.log(`Checked ${files.length} JavaScript modules.`)
