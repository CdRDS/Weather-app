import { useState } from 'react'
import './App.css'
import { UilSearch } from "@iconscout/react-unicons";
import { useStateContext } from './Context'
import { BackgroundLayout, WeatherCard, MiniCard } from './Components'



function App() {

  const [input, setInput] = useState('');
  const { weather, thisLocation, values, setPlace } = useStateContext();


  const [selectedCity, setSelectedCity] = useState('');

  const handleCityButtonClick = (cityName) => {
    setSelectedCity(cityName);
    setPlace(cityName);
  };

  const submitCity = () => {
    setPlace(input)
    setInput('')
  }

  return (
    <div className='w-full h-screen text-white p-8'>
      <div className='w-full p-3 flex items-center justify-center my-6'>
        <div className='flex gap-2'>
          <button className='text-white text-lg font-medium px-10 transition ease-out hover:scale-105' onClick={() => handleCityButtonClick('Warsaw')}>Warsaw</button>
          <button className='text-white text-lg font-medium px-10 transition ease-out hover:scale-105'  onClick={() => handleCityButtonClick('Berlin')}>Berlin</button>
          <button className='text-white text-lg font-medium px-10 transition ease-out hover:scale-105'  onClick={() => handleCityButtonClick('Madrid')}>Madrid</button>
          <button className='text-white text-lg font-medium px-10 transition ease-out hover:scale-105'  onClick={() => handleCityButtonClick('Tokyo')}>Tokyo</button>
          <button className='text-white text-lg font-medium px-10 transition ease-out hover:scale-105'  onClick={() => handleCityButtonClick('New York')}>New York</button>
        </div>
      </div>
      <nav className='w-full p-3 flex items-center justify-center my-6'>
        <div className='bg-white overflow-hidden shadow-2xl w-[50%] rounded-xl flex flex-row items-center justify-center p-2 gap-2 space-x-4'>
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') { submitCity() }
            }}
            type="text" placeholder='wyszukaj...'
            className='text-xl font-light w-full focus:outline-none capitalize placeholder:lowercase text-gray-600'
            value={input}
            onChange={e => setInput(e.target.value)} />
          <UilSearch
            size={25}
            className="text-gray-600 cursor-pointer transition ease-out hover:scale-125"
            onClick={submitCity}
          />
        </div>
      </nav>
      <BackgroundLayout />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          pressure={weather.sealevelpressure}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />
        <div className='flex justify-center gap-12 flex-wrap'>
          {
            values.slice(1, 4).map(curr => {
              return (
                <MiniCard
                  key={curr.datetime}
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                />
              )
            })
          }
        </div>
      </main>
    </div>
  )
}

export default App
