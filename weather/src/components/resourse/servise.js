import axios from 'axios'
import {Sunny, Rainy, Cloudy, Snowy, Stormy} from "../resourse/image";
import {NightMoon, NightRainy, NightRainyBig, NightCloudy} from "../resourse/image";

const objDate = {
    1: {day :'Понедельник',},
    2: {day :'Вторник',},
    3: {day :'Среда',},
    4: {day :'Четверг',},
    5: {day :'Пятница',},
    6: {day :'Суббота',},
    0: {day :'Воскресенье',}
}

async function getCoordinate(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=ru&format=json`
    const data = await (await axios.get(url)).data
    return getWeather(data)
}

async function getWeather(data){
    const latitude = data.results[0].latitude
    const longitude = data.results[0].longitude
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,weathercode`
    const weatherData = await axios.get(url)
    return weatherData
}

async function setWeather(setDays, setDayData, city,){

    const weather = await getCoordinate(city || 'Moscow')


    const arrWeatherCode = weather.data.hourly.weathercode
    const WeatherTemputer = await weather.data.hourly.temperature_2m
    const WeatherDate = await weather.data.hourly.time.map((item, index) =>item.includes(`12:00`)
        ? [new Date(item).getDate(), WeatherTemputer[index], arrWeatherCode[index]] : undefined).filter(item => item)
    const WeatherNigthDate = await weather.data.hourly.time.map((item, index) =>item.includes(`00:00`)
        ? [new Date(item).getDate(), WeatherTemputer[index], arrWeatherCode[index]] : undefined).filter(item => item)    
    const WeatherDay =  Array.from(new Set(weather.data.hourly.time.map(item => new Date(item).getDay())))
    WeatherDay.forEach((item, index) => {
        objDate[item].date = WeatherDate[index][0]
        objDate[item].temputerDay = WeatherDate[index][1] 
        objDate[item].weathercodeDay = WeatherDate[index][2]
        objDate[item].temputerNigth = WeatherNigthDate[index][1]
        objDate[item].weathercodeNigth = WeatherNigthDate[index][2]
    })
    
    setDayData({city_day : city, parag_day : weather.data.hourly.temperature_2m[12], img_day: WeatherDate[0][1] })
    const arrDate = Object.entries(objDate)
    arrDate.forEach(item => item.splice(0, 1))
    const newArrDate = arrDate.flat()
    newArrDate.sort((min, max) => min.date - max.date)
    newArrDate.length = 4

    setDays(newArrDate)
}

const weatherNightCode = [
    {
        name : 'Чистое небо',
        img : NightMoon,
        code : [0, 1, 2, 3, 4]
    },
    {
        name : 'Дождь',
        img : NightRainy,
        code : [95, 96, 99, 51, 53, 55, 61, 63, 65]
    },
    {
        name : 'Ливень',
        img : NightRainyBig,
        code : [80, 81, 82, 66, 67]
    },
    {
        name : 'Облачно',
        img : NightCloudy,
        code : [45, 48] 
    }
]

const weatherCode = [
    {
        name : 'Солнечно',
        img : Sunny,
        code : [0, 1, 2, 3, 4]
    },
    {
        name : 'Дождь',
        img : Rainy,
        code : [80, 81, 82, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67]
    },
    {
        name : 'Гроза',
        img : Stormy,
        code : [95, 96, 99]
    },
    {
        name : 'Облачно',
        img : Cloudy,
        code : [45, 48] 
    },
    {
        name : 'Снег',
        img : Snowy,
        code : [71, 73, 75, 77, 85, 86] 
    }
]

const GetWeatherImg = (setWeatherImg, codeDay) => {
    console.log(setWeatherImg)
    weatherCode.forEach(item => {
      
        return item.code.includes(codeDay) 
            ? setWeatherImg(item.img) : false
    })
    
}

const GetWeatherNightImg = (setWeatherImg, codeDay) => {
    weatherNightCode.forEach(item => { 
        return item.code.includes(codeDay) 
            ? setWeatherImg(item.img) : false
    })
}




export {getCoordinate, getWeather, setWeather, weatherCode, objDate, GetWeatherImg, GetWeatherNightImg}