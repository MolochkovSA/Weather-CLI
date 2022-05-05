// import https from 'https'
import axios from 'axios'
import { getKeyValue, tokenDictionary } from './storage.service.js'

const getWeather = async (city) => {
  const token = await getKeyValue(tokenDictionary.token)
  if (!token) {
    throw new Error('Не задан ключ API')
  }
  // const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  // url.searchParams.append('q', city)
  // url.searchParams.append('appid', token)
  // url.searchParams.append('lang', 'ru')
  // url.searchParams.append('units', 'metric')
  // https.get(url, (respons) => {
  //   let res = ''
  //   respons.on('data', (chunk) => {
  //     res += chunk
  //   })
  //   respons.on('end', () => {
  //     return JSON.parse(res)
  //   })
  // })
  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: 'ru',
        units: 'metric',
      },
    }
  )
  // console.log(data)
  return data
}

export { getWeather }
