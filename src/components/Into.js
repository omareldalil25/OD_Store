import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Into.css"; // لتحميل الأنماط الخاصة بالصفحة

const Into = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // بعد 3 ثواني من ظهور الأنيميشن يتم الانتقال لصفحة التسجيل
    const timer = setTimeout(() => {
      navigate("/signup"); // التوجيه إلى صفحة SignUp
    }, 3000); // مدة الأنيميشن (3 ثواني)
    
    return () => clearTimeout(timer); // تنظيف الtimeout عند الخروج من الصفحة
  }, [navigate]);

  return (
    <div className="intro-container">
      <img src="/logo3.svg" alt="Logo" className="logo-animation" />
    </div>
  );
};

export default Into;
