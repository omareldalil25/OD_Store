// src/components/AdvertisementSlider.js
import React from 'react';
import Slider from 'react-slick';
import '../styles/AdvertisementSlider.css'; // يمكنك تخصيصه بشكل أكبر من هنا

const AdvertisementSlider = () => {
  const settings = {
    dots: true, // لعرض النقاط أسفل السلايدر
    infinite: true, // يجعل السلايدر يعيد تشغيل نفسه
    speed: 500, // سرعة التبديل بين الصور
    slidesToShow: 1, // عرض صورة واحدة في كل مرة
    autoplay: true, // التبديل التلقائي بين الصور
    autoplaySpeed: 3000, // سرعة التبديل بين الصور
    arrows: false, // إخفاء الأسهم للتنقل اليدوي
  };

  return (
    <div className="advertisement-slider">
      <Slider {...settings}>
        <div>
          <img src="/assets/slide1.jpg" alt="Slide 1" className="slide-image" />
        </div>
        <div>
          <img src="/assets/slide2.jpg" alt="Slide 2" className="slide-image" />
        </div>
        <div>
          <img src="/assets/slide3.jpg" alt="Slide 3" className="slide-image" />
        </div>
        <div>
          <img src="/assets/slide4.jpg" alt="Slide 4" className="slide-image" />
        </div>
        <div>
          <img src="/assets/slide5.jpg" alt="Slide 5" className="slide-image" />
        </div>
      </Slider>
    </div>
  );
};

export default AdvertisementSlider;
