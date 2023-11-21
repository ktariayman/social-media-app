import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import './style.css'

function NotFoundPage() {
 return (
  <div className='not_found_page'>
   <Header />
   <h1 >404 - Page Not Found</h1>
   <p>Sorry, the page you are looking for does not exist.</p>
   <Link to="/">
    <button className='blue_btn'>
     Go to Home
    </button>
   </Link>
  </div>
 );
}

export default NotFoundPage;
