// #!/usr/bin/env node
//----API_KEY----:8ddb2ae4d480545c1441bb2374c9ff6d

import { getArgs } from './helpers/args.js'
import {
  printHelp,
  printSucces,
  printError,
  printWeather,
} from './services/log.service.js'
import {
  saveKeyValue,
  getKeyValue,
  tokenDictionary,
} from './services/storage.service.js'
import { getWeather } from './services/api.service.js'
const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен')
    return
  }
  try {
    await saveKeyValue(tokenDictionary.token, token)
    printSucces('Токен сохранен')
  } catch (e) {
    printError(e.message)
  }
}
const saveCity = async (city) => {
  if (!city.length) {
    printError('Не передан город')
    return
  }
  try {
    await saveKeyValue(tokenDictionary.city, city)
    printSucces('Город сохранен')
  } catch (e) {
    printError(e.message)
  }
}
const gerForcast = async () => {
  try {
    const city = await getKeyValue(tokenDictionary.city)
    const weather = await getWeather(city)
    printWeather(weather)
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('Неверно указан город')
    } else if (e?.response?.status == 401) {
      printError('Неверно указан токен')
    } else {
      printError(e.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)
  // console.log(process.env)
  if (args.h) {
    return printHelp()
  }
  if (args.s) {
    return saveCity(args.s)
  }
  if (args.t) {
    return saveToken(args.t)
  }
  return gerForcast()
}
initCLI()
