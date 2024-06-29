import React from 'react'
import { useState } from 'react';
import $ from 'jquery';

const InputField = ({setResult}) => {

  const [search, setSearch] = useState("");
  // const [result, setResult] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data) {
        setResult(data);
      },
    })

  }

  return (
    <div className='d-flex vh-50 vw-auto justify-center align-item-center'>
    <div className='shadow rounded p-3 w-100'>
      <form 
      action="http://localhost:1313/server.php"
      method='POST' 
      onSubmit={(event) => handleSubmit(event)}>
        <div className='d-flex gasp-2'>
          <div>
            <input 
            className='form-control'
            id="search"
            name='search'
            value={search}
            onChange={(event) => handleChange(event)}
            placeholder="Search Location"
            />
          </div>
          <div>
            <button 
            className='btn btn-primary' 
            type='submit'>
              Search
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
  )
}

export default InputField;