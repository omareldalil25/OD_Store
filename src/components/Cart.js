import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // حالة لفتح/إغلاق النافذة المنبثقة
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoading, setIsLoading] = useState(false); // حالة التحميل

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        updateCartCount(cart);
    }, []);

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        updateCartCount(updatedCart);
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

    const updateCartCount = (cart) => {
        const cartCount = cart.length;
        localStorage.setItem('cartCount', cartCount);
    };

    const handleProceedToCheckout = () => {
        setIsModalOpen(true); // فتح النافذة المنبثقة عند الضغط على Proceed to Checkout
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method); // تحديث طريقة الدفع المحددة
    };

    const handleConfirmOrder = () => {
        setIsLoading(true); // تفعيل حالة التحميل
        setTimeout(() => {
          if (paymentMethod === 'COD') {
            setIsLoading(false);
            alert('Your Order Confirmed'); // عرض رسالة تأكيد
          } else if (paymentMethod === 'Online') {
            // توجيه المستخدم إلى صفحة الدفع
            window.location.href = "https://omareldalil25.github.io/credit-card/";
          }
        }, 2000); // محاكاة عملية تحميل قصيرة (2 ثانية)
      };
      


    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h3>{item.title}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                    <button onClick={() => handleRemoveItem(item.id)} className="remove-item-btn">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="cart-summary">
                            <h3>Total: ${totalAmount}</h3>
                            <button className="checkout-btn" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
                        </div>
                    </div>
                )}

                {/* نافذة منبثقة (Modal) لخيارات الدفع */}
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Choose Payment Method</h2>
                            <div className="payment-options">
                                <button
                                    onClick={() => handlePaymentMethodChange('COD')}
                                    className={paymentMethod === 'COD' ? 'active' : ''}>
                                    Cash on Delivery
                                </button>
                                <button
                                    onClick={() => handlePaymentMethodChange('Online')}
                                    className={paymentMethod === 'Online' ? 'active' : ''}>
                                    Pay Online
                                </button>
                            </div>
                            <button
                                onClick={handleConfirmOrder}
                                className={`confirm-btn ${isLoading ? 'loading' : ''} ${!isLoading && paymentMethod === 'COD' ? 'confirmed' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : (isLoading && paymentMethod === 'COD' ? 'Your Order Confirmed' : 'Confirm')}
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
