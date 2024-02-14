import React, { useEffect, useState } from "react";
import './WeatherDay.css';
import {Sunny, Rainy} from "../resourse/image";
import { Weekday } from "./Weekday";
import { setWeather, objDate } from "../resourse/servise";
import { weatherCode } from "../resourse/servise";
import { GetWeatherImg } from "../resourse/servise";


export function Day ({state}){
    const [days, setDays] = useState([])
    const [dayData, setDayData] = useState({
        city_day : '',
        parag_day : '',
        img_day : ''
    })
     
    const [imgDay, setImgDay] = useState('')

    state.weatherDays = setDays
    state.dayData = setDayData
    
    useEffect(() =>  {
        setWeather(setDays, setDayData, 'Москва')
        GetWeatherImg(setImgDay, dayData.img_day)
        console.log(dayData)
    }, [])
   
    return  <div className="container_info">
                <div className="weather_img">
                    <img src={imgDay} alt="img"></img>
                </div>
                <div className="weather_day">
                    <h3 className="header_day">Сегодня</h3>
                    <h2 className="city_day">{dayData.city_day ? dayData.city_day : ''}</h2>
                    <p className="parag_day">{dayData.parag_day ?  `Температура: ${dayData.parag_day}°С` : ''}</p>
                    {/* <p className="parag_day">Солнечно</p> */}
                </div>
                <div className="content_week">
                    {days.map((item, index) => <Weekday days={days} data={item} key={index}/>)}
                </div>
            </div>
}