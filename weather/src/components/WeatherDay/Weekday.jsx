import React, { useEffect, useState } from "react";
import './Weekday.css';
import {Sunny, NightMoon} from "../resourse/image";
import { GetWeatherImg, GetWeatherNightImg} from "../resourse/servise";

export function Weekday({data, days}){
    const [weatherImg, setWeatherImg] = useState(Sunny)
    const [weatherNightImg, setWeatherNightImg] = useState(NightMoon)
    const codeDay = data.weathercodeDay
    const codeNigth = data.weathercodeNigth
    useEffect(() => {
        GetWeatherImg(setWeatherImg, codeDay)
        GetWeatherNightImg(setWeatherNightImg, codeNigth)
    }, )

    console.log(data.weathercodeDay)
    return  <div className="container_weekday">
                <p className="weekday">{data.day}</p>
                <div className="cell_day">
                    <img className="week_img" src={weatherImg} alt="img"/>
                    <p className="degrees">{data.temputerDay} C</p>
                </div>
                <div className="cell_day">
                    <img className="week_img" src={weatherNightImg} alt="img"/>
                    <p className="degrees">{data.temputerNigth} C</p>
                </div>
            </div>
}