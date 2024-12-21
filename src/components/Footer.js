import React from 'react';
import '../styles/Footer.css'; // تأكد من أن ملف CSS موجود ويتم تحميله بشكل صحيح

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-bottom">
        <p className="footer-text">&copy; 2024 OD Store. All rights reserved.</p>
        <div className="separator"></div> {/* شريط الفاصل بين الجملتين */}
        <p className="footer-text">Powered by <a href="https://www.instagram.com/omar_eldalil/profilecard/?igsh=MWwxN3FycjFlOXJ1Zw==" target="_blank" rel="noopener noreferrer" className="footer-link">OD Development</a></p>
      </div>
    </div>
  );
};

export default Footer;
