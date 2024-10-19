import React from 'react';
import '../styles/Footer.css'

function Footer() {
    return (
      <footer className="Footer">
        &copy; {new Date().getFullYear()} Pixel Station. All rights reserved.
      </footer>
    );
  }
  
  export default Footer;