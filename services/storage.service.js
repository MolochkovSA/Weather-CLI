import { homedir } from 'os'
import {
  join,
  basename,
  dirname,
  extname,
  relative,
  isAbsolute,
  sep,
} from 'path'
import { promises } from 'fs'

// console.log(basename(filePath))
// console.log(dirname(filePath))
// console.log(extname(filePath))
// console.log(relative(filePath, dirname(filePath))) //относительный путь между путем1 и путем2
// console.log(isAbsolute(filePath)) //проверяет абсолютный путь "C:\Users\molochkov\weather-data.json" или отностительный "./weather-data.json"
// console.log(sep) //разделитель "\" в операционной системе
const filePath = join(homedir(), 'weather-data.json')

const tokenDictionary = {
  token: 'token',
  city: 'city',
}
const saveKeyValue = async (key, value) => {
  let data = {}
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    data = JSON.parse(file)
  }
  data[key] = value
  await promises.writeFile(filePath, JSON.stringify(data))
}
const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    const data = JSON.parse(file)
    return data[key]
  }
  return undefined
}
const isExist = async (path) => {
  try {
    await promises.stat(path)
    return true
  } catch {
    return false
  }
}
export { saveKeyValue, getKeyValue, tokenDictionary }
