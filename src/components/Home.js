// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import Products from './Products'; // استيراد مكون المنتجات.
import Footer from './Footer'; // استيراد مكون المنتجات.

const Home = () => {
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState('');
  const db = getFirestore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    '/assets/banner_home1.png',
    '/assets/banner_home2.png',
    '/assets/banner_box1.jpg',
    '/assets/banner_box2.jpg',
    '/assets/banner_box3.jpg',
    '/assets/slide1.jpg',
    '/assets/slide2.jpg',
    '/assets/slide3.jpg',
    '/assets/slide4.png',
    '/assets/slide5.jpg'
  ];

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().username);
        }
      }
    };

    fetchUserName();
  }, [user, db]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      <Navbar userName={userName} />

      {/* إضافة شريط الأخبار مع الأيقونات وتحريك الشريط */}
      <div
        style={{
          backgroundColor: '#4C1F7A',
          padding: '10px 0',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '30px',
            animation: 'marquee 15s linear infinite',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', borderRight: '2px solid #ffffff', paddingRight: '15px', paddingLeft: '15px' }}>
            <img src="/assets/features1.png" alt="Free Shipping" style={{ width: '30px', marginRight: '8px' }} />
            <div><strong>Free shipping</strong> Delivery from one to three days</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', borderRight: '2px solid #ffffff', paddingRight: '15px', paddingLeft: '15px' }}>
            <img src="/assets/features2.png" alt="Money Back Guarantee" style={{ width: '30px', marginRight: '8px' }} />
            <div><strong>Money Back Guarantee</strong> 14 Day Money Back Guarantee</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', borderRight: '2px solid #ffffff', paddingRight: '15px', paddingLeft: '15px' }}>
            <img src="/assets/features3.png" alt="Online Support" style={{ width: '30px', marginRight: '8px' }} />
            <div><strong>24/7 Online Support</strong> Technical support is on standby</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', borderRight: '2px solid #ffffff', paddingRight: '15px', paddingLeft: '15px' }}>
            <img src="/assets/features4.png" alt="Secure Payment" style={{ width: '30px', marginRight: '8px' }} />
            <div><strong>Secure Payment</strong> All payment methods are accepted</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/features5.png" alt="Daily Offers" style={{ width: '30px', marginRight: '8px' }} />
            <div><strong>Daily Offers</strong> Discounts up to 50%</div>
          </div>
        </div>
      </div>

      {/* عرض الصور المتغيرة */}
      <div style={{ textAlign: 'center', marginBottom: '0px' }}>
        <img
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={{
            width: '100%',
            borderRadius: '0px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      {/* عرض المنتجات بعد الإعلانات */}
      <Products />
      <Footer />

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
