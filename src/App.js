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

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`)
      .then((response) => {
        setData(response.data)
        console.log(data)
      })
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
          <div>
            <h1>{convertBlankIntoDash(data.name)}</h1>
          </div>
          <div>
            <div>
              <h2>Current Temp</h2>
              <span>{convertBlankIntoDash(data.main && ((data.main?.temp - 275)).toFixed(2))}&#8451;</span>
            </div>
            <div>
              <h2>Humidity</h2>
              <span>{convertBlankIntoDash(data.main?.humidity)}%</span>
            </div>
            <div>
              <h2>Pressure</h2>
              <span>{convertBlankIntoDash(data.main?.pressure)} hPA </span>
            </div>
          </div>
          <div>
            <h2>Weather</h2>
            <span>{convertBlankIntoDash(data.weather && data.weather[0]?.main)}</span>
            <img src={`https://openweathermap.org/img/wn/${data.weather && data.weather[0].icon}.png`} alt="" />
            <span>{convertBlankIntoDash(data.weather && data.weather[0]?.description)}</span>
          </div>
          <div>
            <span>{convertBlankIntoDash(data.sys?.sunrise && new Date(data.sys?.sunrise * 1000).toLocaleString())}</span>
            {console.log(new Date(data.sys?.sunrise * 1000))}
          </div>
        </div>
      </div >
    </>
  );
}

export default App;
