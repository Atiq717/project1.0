import React from 'react';

function CountryInfo({ countryInfo }) {
  if (!countryInfo || countryInfo.length === 0) {
    return null;
  }
  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Geoname Information</h2>
      {countryInfo && (
        <div className="card">
          <div className="card-body">
            <p className="card-text">Country Code: {countryInfo.countryCode}</p>
            <p className="card-text">Country Name: {countryInfo.countryName}</p>
            <p className="card-text">Country Language: {countryInfo.languages}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryInfo;
