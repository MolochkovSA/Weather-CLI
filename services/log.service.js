import chalk from 'chalk'
import dedent from 'dedent-js'
const { bgRed, bgGreen, bgCyan, bgYellow } = chalk
const printError = (error) => {
  console.log(bgRed(' ERROR ') + ' ' + error)
}
const printSucces = (msg) => {
  console.log(bgGreen(' SUCCES ') + ' ' + msg)
}

const printHelp = () => {
  console.log(
    dedent(`${bgCyan('HELP')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `)
  )
}

const printWeather = (res) => {
  console.log(
    dedent(`${bgYellow('Weather')}
    Погода в городе ${res.name}
    ${res.weather[0].description}
    Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
    Влажность: ${res.main.humidity} %
    Скорость ветра: ${res.wind.speed}
    `)
  )
}
export { printError, printSucces, printHelp, printWeather }
