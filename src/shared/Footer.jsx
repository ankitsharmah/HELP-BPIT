import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex justify-between items-center mt-4 p-4 bg-gray-800 h-9 md:h-16 md:text-base text-xs text-white">
      {/* Left Side */}
      <div>
        <p>Contact us on</p>
        <div className="flex gap-4 mt-1">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className="text-right">
        <p>2024 All rights reserved</p>
        <p className="mt-1">
          <a href="/privacy-policy" className="underline hover:text-gray-300">Privacy Policy</a> |{' '}
          <a href="/terms-of-service" className="underline hover:text-gray-300">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
