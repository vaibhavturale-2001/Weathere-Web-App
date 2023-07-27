const API_KEY='ae0c80054d5f12cceaa031e4304679a8'

const makeIconURL = (iconId) =>`https://openweathermap.org/img/wn/${iconId}@2x.png`

const getFormattedWeatherData = async(city, unit =" metric") =>{
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=${unit}`;

    const data= await fetch(URL)
    .then((resp) => resp.json())
    .then((data) =>data);
    
    const {weather,main:{temp, feels_like, temp_min, temp_max, pressure, humidity},
    wind:{speed},
    sys:{country},
    name,
    }=data;
    const {description, icon}= weather[0];
    return{
        description,
        iconURL:makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    }
    
    };
    export {getFormattedWeatherData};