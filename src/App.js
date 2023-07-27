import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './app.css'
import new2Bg from './Images/new2.jpg'
import new3Bg from './Images/new3.png'
import Descriptions from './components/Descriptions'
import {getFormattedWeatherData} from './components/WeatherService'

const App = () => {
  const [city,setCity] =useState("Nagpur")
  const [weather,setweather]=useState(null);
  const [units,setUnits]=useState("metric");
  const [bg,setBg]=useState(new3Bg)

  useEffect (()=>{
    const fetchWeatherData =async ()=>{
      const data= await getFormattedWeatherData(city, units);
      console.log(data);
      setweather(data);

      // dynamic background
      const changeBg = units === "metric" ? 20 : 60;
      if (data.temp <= changeBg) setBg(new2Bg)
      else setBg(new3Bg)
    };
    fetchWeatherData();
  },[units, city])

  const handleUnitsClick =(e) =>{
    const button= e.currentTarget;
    const currentUnit=button.innerText.slice(1)
    console.log(currentUnit);
    const isCelsius=currentUnit === "C";
    button.innerText= isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? 'metric' : "imperial");
  }
  const enterPressedKey =(e)=>{
    if(e.keyCode ===13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }


  return (
    <div className='app' style={{backgroundImage:`url(${bg})`}}>
      <div className='overlay'>
        {
          weather && (
            <div className='container'>

            <div className='section section__input'>
                 <input onKeyDown={enterPressedKey} type='text' name='city' placeholder='Enter City....'></input>
                 <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
  
            <div className='section section__temperature'>
              <div className='icon'>
                <h4>{`${weather.name}, ${weather.country}`}</h4>
                <img src={weather.iconURL}  alt='weatherIcon'></img>
                <h4>{weather.description}</h4>
              </div>
              <div className='temperature'>
                <h1>{`${weather.temp.toFixed()} °${ units === 'metric' ? "C" : "F"}`}</h1>
              </div>
            </div>
            
            {/* Botton description */}
            <Descriptions weather={weather} units={units}></Descriptions>
          </div>
            
          )
        }

      

      </div>
    </div>
  )
}

export default App
