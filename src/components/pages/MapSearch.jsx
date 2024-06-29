import React, { useState, useEffect } from 'react';
import { OutlinedInput, Button, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import axios from 'axios';
import CountryInfo from './Countryinfo';
import WeatherInfo from './WeatherInfo';
import RestInfo from './RestInfo';
import CurrenciesInfo from './CurrenciesInfo';
import NewsComponent from './NewsComponent';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';
const GEONAMES_BASE_URL = 'http://api.geonames.org/countryCodeJSON';
const GEONAMES_USERNAME = 'atiq717';

function MapSearch(props) {
  const { setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [country, setCountry] = useState("");
  const [rest, setRest] = useState(null);
  const [currencyCode, setCurrencyCode] = useState({});
  const [currencyRate, setCurrencyRate] = useState(null);
  const [news, setNews] = useState(null)
  const [link, setLink] = useState('');

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchCountryInfo();
      weatherinfo();
      getCurrency();
      getRest();
      newsInfo();
    }
  }, [latitude, longitude]);

  const fetchCountryInfo = () => {
    setLoading(true);
    setError(null);

    const url = `${GEONAMES_BASE_URL}?lat=${latitude}&lng=${longitude}&username=${GEONAMES_USERNAME}`;

    axios.get(url)
      .then((response) => {
        setCountryInfo(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const newsInfo = () => {
    setLoading(true);
    setError(null);

    axios.get('http://localhost/project1.0/PHP/newsApi.php', {
      // https://localhost/project1.0/PHP/newsApi.php
      params: {
        country: country
      },
      headers: {
        'User-Agent': 'MyApp/1.0'  // Add your User-Agent header here
      }
    })
      .then((response) => {
        setNews(response.data);
        console.log('news' + response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  // const weatherinfo = () => {
  //   setLoading(true);
  //   setError(null);

  //   axios.get('openWeather.php', {
  //     params: {
  //       latitude: latitude,
  //       longitude: longitude
  //     }
  //   })
  //     .then((response) => {
  //       setWeather(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const weatherinfo = () => {
    setLoading(true);
    setError(null);
  
    const openWeatherMapBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'ba25737d28fb44864b28d72afdc6adef';
  
    axios.get(openWeatherMapBaseUrl, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: apiKey
      }
    })
      .then((response) => {
        setWeather(response.data);
        console.log(weather);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCurrency = () => {
    setLoading(true);
    setError(null);
  
    const openExchangeUrl = 'https://openexchangerates.org/api/latest.json?';
    const exApiKey = 'a37ab710bf124bce8c2cfaabc4c3b706';
  
    axios.get(openExchangeUrl, {
      params: {
        app_id: exApiKey,
      }
    })
      .then((response) => {
        setCurrency(response.data);
        console.log(currency);
        const rates = response.data.rates;

        if (currencyCode in rates) {
          setCurrencyRate(rates[currencyCode]);
          console.log('currencyRate' + currencyRate);
        } else {
          console.error("Currency code not found.")
        }
        
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getRest = () => {
    setLoading(true);
    setError(null);
  
    // const restUrl = 'https://restcountries.com/v3.1/name';
  
    axios.get(`https://restcountries.com/v3.1/name/${country}`)

    .then((response) => {
      setRest(response.data);
      console.log(response.data);
      const firstCurrencyCode = Object.keys(response.data[0]?.currencies)[0];
      setCurrencyCode(firstCurrencyCode);
      console.log('currencycode:' + currencyCode);
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };
  

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    const params = {
      q: searchText,
      format: 'json',
      addressdetails: 1,
      polygon_geojson: 0
    };
    const queryString = new URLSearchParams(params).toString();

    axios.get(`${NOMINATIM_BASE_URL}${queryString}`)
      .then((response) => {
        setListPlace(response.data);
        console.log(listPlace)
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // console.log('currencycode:' + currencyCode);
  const generateWikipediaLink = (countryName) => {
    const trimmedCountry = countryName.trim();
    const joinedCountry = trimmedCountry.split(" ").join("_");
    return `https://en.wikipedia.org/wiki/${joinedCountry}`;
  };
  // countryName(country);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        <div className="flex-grow-1">
          <OutlinedInput
            placeholder = "Search Location"
            className="w-100"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              console.log('searchText' + searchText)
            }}
          />
        </div>
        <div className="d-flex align-items-center px-3">
          <Button
            variant='contained'
            color='primary'
            onClick={handleSearch}
            disabled={loading || searchText.trim() === ""}
          >
            {loading ? 'Searching...' : 'Map Search'}
          </Button>
        </div>
      </div>
      {error && <div>Error: {error}</div>}
      <div>
        <List component="div" aria-label="main mailbox folders">
          {listPlace.map((item) => (
            <div key={item?.osm_id}>
              <ListItem
                button
                onClick={() => {
                  setSelectPosition(item);
                  setLatitude(item?.lat);
                  setLongitude(item?.lon);
                  setCountry(item?.address.country)
                  console.log('setCountry' + country)
                }}
              >
                <ListItemIcon>
                  {/* <img
                    src='src/components/image/marker.png'
                    alt='Marker'
                    style={{ width: 39, height: 39 }}
                  /> */}
                </ListItemIcon>
                <ListItemText primary={item?.display_name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
      <div>
      <CountryInfo countryInfo={countryInfo} />
      <WeatherInfo weather={weather} />
      <RestInfo rest={rest} />
      <CurrenciesInfo rest={rest} currencyCode={currencyCode} currencyRate={currencyRate} />
      <NewsComponent news={news} />
    
      {country && (
      <div className="card-body ms-5 pb-5"  >
      <a href={generateWikipediaLink(country)}>{generateWikipediaLink(country)}</a>    
      </div>)}
      </div>
    </div>
  )
}

export default MapSearch;

