import React from 'react';

function CurrenciesInfo({ rest, currencyCode, currencyRate }) {
  if (!rest || rest.length === 0) {
    return null;
  }

  const countryData = rest[0]; 

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Currency Information</h2>
      <div className="card">
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Currencies: {Object.values(countryData.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</li>
            <li className="list-group-item">Currency Code: {currencyCode} </li>
            <li className="list-group-item">Live Exchange Rate based on US Dollars {currencyRate} </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CurrenciesInfo;
