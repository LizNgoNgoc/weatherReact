import React, { useState } from "react";
import { setWeather } from "../resourse/servise";
import "./Search.css";

export function Search({state}){
    const [inp, setInp] = useState('')

    function changeInput(e){
        setInp(e.target.value)
    }
    async function handleClick(){
      setWeather(state.weatherDays, state.dayData ,inp)
    }
 
    return <div className="container_search">
            <input className="search_inp" value={inp} placeholder="Введите город..." type="search" onChange={changeInput}/>
            <button className="search_btn" onClick={handleClick}>Поиск</button>
        </div>
    
}