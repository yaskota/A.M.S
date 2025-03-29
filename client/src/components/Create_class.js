import React from 'react'

function Create_class() {
  return (
    <div className='createClass'>
      <div className='box'>
        <h2>CLASS</h2>
        <label>
            <input type='text' placeholder='Subject'/>
        </label>
        <label>
            <input type='text' placeholder='Academic_year'/>
        </label>
        <label>
            <input type="number" placeholder='Hour'/>
        </label>
        <label>
            <input type='text' placeholder='Branch'/>
        </label>
        <button>Create_class</button>
      </div>
    </div>
  )
}

export default Create_class
