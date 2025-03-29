import React, { useState } from 'react'

function Teachermain() {
    const [classes,setClasses]=useState([]);

    const getclass=async()=>{
        try {
            
        } catch (error) {
            console.log("error in teacher main");
        }
    }
  return (
    <div className='teachermain'>
      <div className='header'>
            <h1>Faculty</h1>
      </div>
      <div className='data'>
        <div className='sidebar'>
            <div className='option'>Create class</div>
            <div className='option'>Assignments</div>
            <div className='option'>Attendence</div>
        </div>
        <div className='class'>
            
        </div>
      </div>
    </div>
  )
}

export default Teachermain
