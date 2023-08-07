import type { DefaultTheme } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainRoot = path.resolve(__dirname, '..')

function getSideItem(baseDir: string, fileName: string): DefaultTheme.SidebarItem {
  const fileFullPath = path.resolve(baseDir, fileName)
  const isDir = fs.lstatSync(fileFullPath).isDirectory()

  const numBeginReg = /^\d_/

  if (!isDir) {
    const beginReg = new RegExp(`^${mainRoot}`)
    const endMdReg = /\.md$/

    const link = `${baseDir}/${fileName}`
      .replace(beginReg, '')
      .replace(endMdReg, '')
    const text = fileName
      .replace(numBeginReg, '')
      .replace(endMdReg, '')

    return { text, link }
  }

  const files = fs.readdirSync(fileFullPath)
  const items: DefaultTheme.SidebarItem[] = []

  files.forEach(fName => {
    const item = getSideItem(fileFullPath, fName)
    items.push(item)
  })

  return {
    collapsed: false,
    text: fileName.replace(numBeginReg, ''),
    items
  }
}

export default function () {
  const side = getSideItem(mainRoot, 'docs')
  return side.items
}