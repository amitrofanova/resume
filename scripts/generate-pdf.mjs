import { spawnSync } from 'node:child_process'
import {
  createReadStream,
  existsSync,
  statSync,
} from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import http from 'node:http'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const publicDir = join(root, 'public')
const outputDir = join(root, '.output/public')
const basePath = '/resume'
const fromOutput = process.argv.includes('--from-output')

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

const locales = [
  { code: 'ru', path: '/', check: 'Алёна Митрофанова' },
  { code: 'en', path: '/en/', check: 'Alena Mitrofanova' },
]

async function main() {
  const hosted = await resolveOrigin()
  const browser = await launchBrowser()

  try {
    const page = await browser.newPage()
    await page.emulateMedia({ media: 'print', colorScheme: 'light' })

    for (const locale of locales) {
      const url = new URL(`${basePath}${locale.path}`, hosted.origin).href
      await page.goto(url, { waitUntil: 'load' })
      await page.waitForSelector('h1')
      await page.evaluate(() => document.fonts.ready)

      const heading = (await page.textContent('h1'))?.trim() ?? ''
      if (!heading.includes(locale.check)) {
        throw new Error(`Unexpected heading at ${url}: ${heading}`)
      }

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
      })

      const name = `alena-mitrofanova-${locale.code}.pdf`
      await writePdf(join(publicDir, name), pdf)
      if (existsSync(outputDir)) {
        await writePdf(join(outputDir, name), pdf)
      }
      console.log(`wrote ${name}`)
    }
  }
  finally {
    await browser.close()
    await hosted.close()
  }
}

async function resolveOrigin() {
  if (!fromOutput) {
    const live = await findLiveSite()
    if (live) {
      console.log(`using ${live}`)
      return { origin: live, close: async () => {} }
    }
  }

  if (!existsSync(join(outputDir, 'index.html'))) {
    throw new Error(
      'No resume server found. Run `pnpm dev` and `pnpm pdf`, or `pnpm generate`.',
    )
  }

  return serveOutput()
}

async function findLiveSite() {
  const candidates = [
    process.env.PDF_BASE_URL,
    'http://127.0.0.1:3000/resume/',
    'http://127.0.0.1:3001/resume/',
    'http://127.0.0.1:3002/resume/',
  ].filter(Boolean)

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, { redirect: 'follow' })
      const html = await response.text()
      if (html.includes('Алёна Митрофанова') || html.includes('Alena Mitrofanova')) {
        return new URL(basePath + '/', candidate).origin
      }
    }
    catch {
      // Try the next local port.
    }
  }

  return null
}

function serveOutput() {
  const rootResolved = resolve(outputDir)

  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://127.0.0.1')
    let pathname = decodeURIComponent(url.pathname)

    if (pathname === basePath || pathname === `${basePath}/`) {
      pathname = '/index.html'
    }
    else if (pathname.startsWith(`${basePath}/`)) {
      pathname = pathname.slice(basePath.length)
    }

    let file = resolve(join(rootResolved, pathname))
    if (!file.startsWith(rootResolved)) {
      res.writeHead(403).end()
      return
    }

    if (existsSync(file) && statSync(file).isDirectory()) {
      file = join(file, 'index.html')
    }

    if (!existsSync(file) || !statSync(file).isFile()) {
      res.writeHead(404).end('not found')
      return
    }

    res.writeHead(200, {
      'content-type': mimeTypes[extname(file)] ?? 'application/octet-stream',
    })
    createReadStream(file).pipe(res)
  })

  return new Promise((resolvePromise) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (!address || typeof address === 'string') {
        throw new Error('Could not start the static PDF server')
      }

      console.log(`serving ${outputDir} at http://127.0.0.1:${address.port}${basePath}/`)
      resolvePromise({
        origin: `http://127.0.0.1:${address.port}`,
        close: () => new Promise((done) => server.close(done)),
      })
    })
  })
}

async function launchBrowser() {
  try {
    return await chromium.launch()
  }
  catch (error) {
    if (!String(error).includes("Executable doesn't exist")) {
      throw error
    }

    console.log('Installing Playwright Chromium…')
    const result = spawnSync(
      'pnpm',
      ['exec', 'playwright', 'install', 'chromium'],
      { cwd: root, stdio: 'inherit' },
    )
    if (result.status !== 0) {
      throw new Error('Failed to install Playwright Chromium')
    }

    return await chromium.launch()
  }
}

async function writePdf(path, bytes) {
  await mkdir(resolve(path, '..'), { recursive: true })
  await writeFile(path, bytes)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
