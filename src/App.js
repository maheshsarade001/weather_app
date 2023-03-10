import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { API } from './config';
import { convertBlankIntoDash } from './utils';

function App() {

  const [city, setCity] = useState("")
  const [data, setData] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    if (city) {


      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`)
        .then((response) => {
          setData(response.data)
          console.log(data)
        })
    } else {
      alert("Please enter a city name")
    }
  }





  return (
    <>
      <div className="App">
        <div className='inputBox'>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter your city...' value={city} onChange={(e) => { setCity(e.target.value) }} />
            <input type="submit" />
          </form>
        </div>
        <div className='outputBox'>
          <div className='row_one'>
            <h1>{convertBlankIntoDash(data.name)}</h1>
          </div>
          <div className='row_two'>
            <div className='box'>
              <h2>Current Temp</h2>
              <span>{convertBlankIntoDash(data.main && ((data.main?.temp - 275)).toFixed(2))}&#8451;</span>
            </div>
            <div className='box'>
              <h2>Humidity</h2>
              <span>{convertBlankIntoDash(data.main?.humidity)}%</span>
            </div>
            <div className='box'>
              <h2>Pressure</h2>
              <span>{convertBlankIntoDash(data.main?.pressure)} hPA </span>
            </div>
          </div>
          <div className='row_three'>
            <h2>Weather</h2>
            <div className='weather_details'>
              <div className='box'>
                <span>{convertBlankIntoDash(data.weather && data.weather[0]?.main)}</span>
              </div>
              <div className='weather_img'>
                <img src={`https://openweathermap.org/img/wn/${data.weather && data.weather[0].icon}.png`} alt="" />
              </div>
              <div className='box'>
                <span>{convertBlankIntoDash(data.weather && data.weather[0]?.description)}</span>
              </div>
            </div>
          </div>
          <div className='row_five'>
            <div className='sun-moon'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
              <span>{convertBlankIntoDash(data.sys?.sunrise && new Date(data.sys?.sunrise * 1000).toLocaleString())}</span>
            </div>
            <div className='sun-moon'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
              <span>{convertBlankIntoDash(data.sys?.sunset && new Date(data.sys?.sunset * 1000).toLocaleString())}</span>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default App;
