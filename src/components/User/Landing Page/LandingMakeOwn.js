import React from 'react'
import { Link } from 'react-router-dom'

function LandingMakeOwn() {
  return (
    <div className="landing-center bg-gray-300 h-36 relative" id='define'>
      <img
        src="assets/landingsitting.png"
        alt="landing sitting pic"
        className="w-80 object-cover absolute top-[-25%] left-0"
      />
      <div className="center-content flex flex-col items-center justify-center h-full">
        <h3 className="font-bold text-lg">Define your own Event</h3>
        <small className="text-gray-500 w-64 py-2">
          Once Logged in as Admin, you now have the ability to create your dream event.
          Give it a try 🙂
        </small>
        <Link to='adminlogin'>
          <button
            type="button"
            className="border bg-[#F5167E] rounded-full w-max py-2 px-4 text-white"
          >
            Create Events
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingMakeOwn