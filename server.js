import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { geoHandler } from './geo.js'

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist')
const port = Number(process.env.PORT) || 4173
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
}

const serve = (req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0])
  let file = path.join(dist, path.normalize(urlPath))
  if (!file.startsWith(dist)) { res.statusCode = 403; return res.end() }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    const indexInDir = path.join(file, 'index.html')
    file = fs.existsSync(indexInDir) && urlPath !== '/' ? indexInDir : path.join(dist, 'index.html')
  }
  res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream')
  fs.createReadStream(file).pipe(res)
}

http.createServer((req, res) => geoHandler(req, res, () => serve(req, res)))
  .listen(port, '0.0.0.0', () => console.log(`sershop on :${port}`))
