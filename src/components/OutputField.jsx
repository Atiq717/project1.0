import React from 'react';

const OutputField = ({ result }) => {
  console.log(result)
  return (
    <div className="output-display">
      {result && (
        <div>
          <h2>Result:</h2>
          <p>Languages: {result.languages}</p>
          <p>Distance: {result.distance}</p>
          <p>Country Code: {result.countryCode}</p>
          <p>Country Name: {result.countryName}</p>
        </div>
      )}
    </div>
  );
};

export default OutputField;
