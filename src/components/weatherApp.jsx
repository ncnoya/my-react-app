import e, { response } from "express";
import {useState, useEffect} from "react";
import React from "react";
// hot bolon tsag agaar bolon achaalal(loading) bolon aldaa useState

const WeatherApp = ()=>{
    const [city, setCity] = useState("")
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

// tsag agaariin medeelliig tatah func
const fetchWeather = async ()=>{
    // ajillaj ehlesen vyd true bolgono
    setLoading(true);
    setError(null);
    setWeather(null);
    try{
        const response = fetch(`https://api.openweathermap.org/data/2.5/weather?q={city}&appid={d7858b6f58df746bf2ce6029cc97ba16}`)
        //herew hot oldohgvi bol aldaa butsaana
        if(!response.ok){
            throw new Error("hot oldsongvi")
        }
        //json formattai ogogdoliig unshina
        const data = await response.json()
        // tsag agaariin medeelliig state hadgalah
        setWeather(data)
    }catch(error){
        setError(error.message)
    }
}

useState(()=>{
    if(city){
        fetchWeather(city)
    }
},[city])
// hotiin neriig oorchloh vildel
const HandleInputChange = (e)=>{
    setCity(e.target.value)
}
//hailtiin towch deer darah vildel
const HandleSearch = ()=>{
    fetchWeather(city)
} 

return (
    <>
        <div>
            <h1>Weather App</h1>
            <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Hotiin neriig oruulna uu"
            />
            <button onClick={fetchWeather}>Tsag agaar shalgah</button>
            {loading && <p>Achaallaj baina...</p>}
            {error && <p>(error)</p>}
            {weather && (
            <div>
                <h2>{weather.name} Hotiin tsag agaar</h2>
                <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
                <p>Tailbar: {weather.weather[0].description}</p>
            </div>
            )}
        </div>
    </>
  )
}
export default WeatherApp