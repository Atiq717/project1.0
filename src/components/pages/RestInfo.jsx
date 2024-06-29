import React from 'react';

function RestInfo({ rest }) {
  if (!rest || rest.length === 0) {
    return null;
  }

  const country = rest[0]; 

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Country Information</h2>
      <div className="card">
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Common Name: {country.name.common}</li>
            <li className="list-group-item">Official Name: {country.name.official}</li>
            <li className="list-group-item">Capital: {country.capital[0]}</li>
            <li className="list-group-item">Current Population: {country.population}</li>
            <li className="list-group-item">Area: {country.area} square kilometers</li>
            <li className="list-group-item">Region: {country.region}</li>
            <li className="list-group-item">Subregion: {country.subregion}</li>
            <li className="list-group-item">Timezones: {country.timezones.join(', ')}</li>
            <li className="list-group-item">Languages: {Object.values(country.languages).join(', ')}</li>
            <li className="list-group-item">Currencies: {Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</li>
            <li className="list-group-item">Calling Codes: {country.idd.root + country.idd.suffixes[0]}</li>
          </ul>
        </div>
      </div>
      <div>
        <h3 className="mt-4 mb-3">Flags</h3>
        <img className="img-fluid" src={country.flags.png} alt="Flag" />
      </div>
    </div>
  );
}

export default RestInfo;
