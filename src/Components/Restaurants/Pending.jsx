import React from 'react';
import { Link} from 'react-router-dom';

function Pending() {
  return (
    <div>
    <div className="pending-approval text-center h-screen flex items-center justify-center text-4xl font-bold">
      <h1>Wait for Admin Approval...</h1>
      <p>Your registration is under process.</p>

      <p className='text-color-red'>  <Link to="/login">
    <button>Signin</button>
  </Link></p>
      
    </div>
  
  </div>


  );
}

export default Pending;
