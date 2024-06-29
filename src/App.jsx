import { useState } from 'react';
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import SearchField from './components/SearchField.jsx';
// import OutputField from './components/OutputField';
import Navbar from './components/Navbar';
import Holidays from './components/pages/Holidays';
import RestInfo from './components/pages/RestInfo.jsx';
import Countryinfo from './components/pages/Countryinfo';
import CurrenciesInfo from './components/pages/CurrenciesInfo.jsx';
import WeatherInfo from './components/pages/WeatherInfo.jsx';
import MapB from './components/pages/MapB';
import BasicMap from './components/pages/BasicMap.jsx';
import MapSearch from './components/pages/MapSearch.jsx';
import NewsComponent from './components/pages/NewsComponent.jsx';

function App() {
  const [result, setResult] = useState("");
  const [selectPostion, setSelectPosition] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);

  
  console.log(selectPostion);
  return (
    <div>
      <Navbar />
      {/* <SearchField setResult={setResult} /> */}
      {/* <InputField setResult={setResult} />  */}
      {/* <OutputField result={result} /> */}
      <div style={{border: '2px solid blue', width: '100vw', height:'55vh'}}>
        <MapB selectPostion={selectPostion} />
      </div>
      <div>
        <MapSearch selectPostion={selectPostion} setSelectPosition={setSelectPosition} />
      </div>
      {/* <BasicMap /> */}
      {/* <Countryinfo countryInfo={countryInfo} /> */}
      {/* <RestInfo rest={rest} /> */}
      {/* <WeatherInfo /> */}
      {/* <CurrenciesInfo /> */}
    
      <Routes>
        {/* <Route path='/' element={<Holidays />} /> */}
        {/* <Route path='/restInfo' element={<RestInfo rest={rest} />} /> */}
        {/* <Route path='/countryinfo' element={<Countryinfo countryInfo={countryInfo} />} /> */}
        {/* <Route path='/currencies' element={<CurrenciesInfo rest={rest} currencyCode={currencyCode} currencyRate={currencyRate} />} /> */}
        {/* <Route path='/news' element={<NewsComponent news={news}/>} /> */}
        {/* <Route path='/weather' element={<WeatherInfo weather={weather} />} /> */}
      </Routes>
    </div>
  );
}

export default App;
