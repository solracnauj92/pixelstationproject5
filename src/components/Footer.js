import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="Footer bg-light text-center py-3 mt-auto">
            <div className="social-media mb-2">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="bi bi-facebook mx-2"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="bi bi-instagram mx-2"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="bi bi-twitter mx-2"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="bi bi-linkedin mx-2"></i>
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <i className="bi bi-youtube mx-2"></i>
                </a>
            </div>
            <div className="newsletter-link mb-2">
                <Link to="/newsletter/">Subscribe to our Newsletter</Link> 
            </div>
            &copy; {new Date().getFullYear()} Pixel Station. All rights reserved.
        </footer>
    );
}

export default Footer;
