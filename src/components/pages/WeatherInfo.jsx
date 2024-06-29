import React from 'react';

function WeatherInfo({ weather }) {
  if (!weather || weather.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Weather Information</h2>
      {weather && (
        <div className="card">
          <div className="card-body">
            <p className="card-text">Location: {weather.name}</p>
            <p className="card-text">Temperature: {weather.main.temp} K</p>
            <p className="card-text">Feels Like: {weather.main.feels_like} K</p>
            <p className="card-text">Minimum Temperature: {weather.main.temp_min} K</p>
            <p className="card-text">Maximum Temperature: {weather.main.temp_max} K</p>
            <p className="card-text">Pressure: {weather.main.pressure} hPa</p>
            <p className="card-text">Humidity: {weather.main.humidity}%</p>
            <p className="card-text">Visibility: {weather.visibility} meters</p>
            <p className="card-text">Wind Speed: {weather.wind.speed} m/s</p>
            <p className="card-text">Wind Direction: {weather.wind.deg}°</p>
            <p className="card-text">Cloudiness: {weather.clouds.all}%</p>
            <p className="card-text">Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p className="card-text">Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherInfo;
