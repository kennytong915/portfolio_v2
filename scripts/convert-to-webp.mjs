import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')

const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png'])

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function* walk(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* walk(res)
    } else {
      yield res
    }
  }
}

async function convertFileToWebp(inputFile) {
  const ext = path.extname(inputFile).toLowerCase()
  if (!SOURCE_EXTENSIONS.has(ext)) return false

  const outputFile = inputFile.slice(0, -ext.length) + '.webp'

  try {
    // Skip if output already exists
    await fs.access(outputFile)
    return false
  } catch (_) {
    // continue
  }

  const outputDir = path.dirname(outputFile)
  await ensureDir(outputDir)

  // Convert with a balanced quality and effort
  await sharp(inputFile)
    .webp({ quality: 82 })
    .toFile(outputFile)

  return true
}

async function run() {
  try {
    let convertedCount = 0
    for await (const file of walk(PUBLIC_DIR)) {
      const did = await convertFileToWebp(file)
      if (did) convertedCount += 1
    }
    console.log(`WebP conversion complete. New files created: ${convertedCount}`)
  } catch (err) {
    console.error('WebP conversion failed:', err)
    process.exitCode = 1
  }
}

run()


