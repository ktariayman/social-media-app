import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';

function NotFoundPage() {
 return (
  <div style={{ textAlign: 'center', height: '90vh', gap: "10px", alignItems: "center", marginTop: '100px', display: "flex", flexDirection: "column", justifyContent: "center" }}>
   <Header page='home' />
   <h1>404 - Page Not Found</h1>
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
