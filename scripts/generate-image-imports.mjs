import fs from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const srcDir = path.resolve(projectRoot, 'src')
const assetsDir = path.resolve(srcDir, 'assets')

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'])

async function collectFilesRecursively(startDirectory) {
  /** @type {string[]} */
  const collectedFilePaths = []

  async function walk(currentDirectory) {
    const directoryEntries = await fs.readdir(currentDirectory, { withFileTypes: true })
    for (const entry of directoryEntries) {
      const fullPath = path.join(currentDirectory, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
      } else if (entry.isFile()) {
        const extension = path.extname(entry.name).toLowerCase()
        if (imageExtensions.has(extension)) {
          collectedFilePaths.push(fullPath)
        }
      }
    }
  }

  await walk(startDirectory)
  return collectedFilePaths
}

function toSafeIdentifier(candidate) {
  // Convert path-like string to a JS identifier: camelCase, remove invalid chars, prefix if needed
  const withoutExtension = candidate.replace(/\.[^.]+$/, '')
  const normalized = withoutExtension
    .replace(/[^a-zA-Z0-9]+/g, ' ') // non-alphanumerics to spaces
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      const lower = word.toLowerCase()
      if (index === 0) return lower
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join('')

  const prefixed = /^[a-zA-Z_$]/.test(normalized) ? normalized : `img${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`
  return prefixed || 'img'
}

function buildAliasImportPath(absoluteFilePath) {
  const relativeToSrc = path.relative(srcDir, absoluteFilePath)
  return `~/${relativeToSrc.split(path.sep).join('/')}`
}

function generateVariableNames(absolutePaths) {
  // Prefer names derived from path under assets/; ensure uniqueness with numeric suffixes
  /** @type {Map<string, number>} */
  const usedNameCounts = new Map()
  /** @type {string[]} */
  const varNames = []

  for (const absolutePath of absolutePaths) {
    const relativeToAssets = path.relative(assetsDir, absolutePath)
    const baseCandidate = toSafeIdentifier(relativeToAssets)
    const count = usedNameCounts.get(baseCandidate) ?? 0
    usedNameCounts.set(baseCandidate, count + 1)
    const finalName = count === 0 ? baseCandidate : `${baseCandidate}${count + 1}`
    varNames.push(finalName)
  }
  return varNames
}

async function main() {
  // Allow overriding base directory via CLI arg, default to src/assets
  const baseDir = process.argv[2] ? path.resolve(projectRoot, process.argv[2]) : assetsDir

  const files = await collectFilesRecursively(baseDir)
  // Sort by path for deterministic output
  files.sort((a, b) => a.localeCompare(b))

  const varNames = generateVariableNames(files)

  const importLines = files.map((absolutePath, idx) => {
    const importPath = buildAliasImportPath(absolutePath)
    const variableName = varNames[idx]
    return `import ${variableName} from '${importPath}'`
  })

  // Print to stdout
  for (const line of importLines) {
    console.log(line)
  }
}

main().catch((error) => {
  console.error('Failed to generate import list:', error)
  process.exit(1)
})

