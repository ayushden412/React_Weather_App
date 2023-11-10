import React, {useState} from 'react';
import './App.css';
//import image from './img/weather.jpg';

function App(){
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(null);
    const [showError, setShowError] = useState(false);

    const API_KEY = '0fac761ea7506684409397c5455e2431';

    const fetchWeather = () =>{
        setLoading(true);
        setShowError(false);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
          .then((response) => response.json())
          .then((data) =>{
            console.log(data);
            if(data.cod === 200) {
                setWeather(data);
            } else if(data.cod === "404") {
                setWeather(null);
                setShowError(true);
            }
            setLoading(false);
          })
          .catch((error) =>{
            setLoading(false);
          });
    };

    return(
        <div>
            <div className="background"></div>
            <div className='App'>
                <h1>Weather App</h1>
                <input
                type='text'
                placeholder='Enter a City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(event) => event.keyCode === 13 ? fetchWeather() : ""}
                />
                <button onClick={fetchWeather} >Search</button>

                {loading && <p>Loading...</p>}

                {weather && (
                    <div>
                        <h2>{weather.name}, {weather.sys.country}</h2>
                        <p>Temperature: {(weather.main.temp-273.15).toFixed(1)} &deg;C</p>
                        <p>Weather: {weather.weather[0].main}</p>
                    </div>
                )}
                {showError && <p className="error">Please check your city name!</p>}
            </div>
        </div>
    );
};

export default App;