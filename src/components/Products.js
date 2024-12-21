import React, { useEffect, useState, useRef } from 'react';
import '../styles/Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const categories = [
        'mobile-accessories',
        'kitchen-accessories',
        'furniture',
        'groceries',
        'motorcycle',
        'laptops',
        'mens-shirts',
        'mens-shoes',
        'mens-watches',
        'skin-care',
        'smartphones',
        'sports-accessories',
        'beauty',
        'fragrances',
        'home-decoration'
    ];

    const scrollRefs = useRef({});

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/products.json');
            const data = await response.json();
            setProducts(data.products);
            setFilteredProducts(data.products); // Initialize filtered products
        };
        fetchProducts();
    }, []);

    // تحديث المنتجات بناءً على البحث والتصفية
    useEffect(() => {
        const filtered = products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesPrice =
                product.price >= priceRange[0] && product.price <= priceRange[1];
            return matchesSearch && matchesPrice;
        });
        setFilteredProducts(filtered);
    }, [searchTerm, priceRange, products]);

    // إضافة المنتج إلى السلة
    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product); // إضافة المنتج إلى السلة

        // تخزين السلة المحدثة في localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // تحديث عدد المنتجات في السلة
        updateCartCount(cart); // تحديث عدد المنتجات فورًا
    };

    // تحديث عدد المنتجات في السلة
    const updateCartCount = (cart) => {
        const cartCount = cart.length;
        localStorage.setItem('cartCount', cartCount); // تخزين العدد في localStorage
    };


    const scrollContainer = (category, direction) => {
        if (scrollRefs.current[category]) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRefs.current[category].scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="products-container">
            {/* عنوان "Our Products" */}
            <h1 className="products-heading">Our Products</h1>

            {/* صندوق البحث */}
            <div className="search-filter-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                />
                <div className="price-filter">
                    <label>Price Range: </label>
                    <input
                        type="number"
                        min="0"
                        max="100000"
                        value={priceRange[0]}
                        onChange={(e) =>
                            setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                        }
                        className="price-input"
                    />
                    <span> - </span>
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) =>
                            setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])
                        }
                        className="price-input"
                    />
                </div>
            </div>

            {categories.map((category) => {
                const categoryProducts = filteredProducts.filter(
                    (product) => product.category === category
                );

                return (
                    categoryProducts.length > 0 && (
                        <div key={category} className="category-section">
                            <h2 className="category-title">
                                {category.replace('-', ' ').toUpperCase()}
                            </h2>
                            <div className="category-slider">
                                <button
                                    className="scroll-button left"
                                    onClick={() => scrollContainer(category, 'left')}
                                >
                                    &#9664;
                                </button>
                                <div
                                    className="horizontal-scroll-container"
                                    ref={(el) => (scrollRefs.current[category] = el)}
                                >
                                    {categoryProducts.map((product) => (
                                        <div key={product.id} className="product-card">
                                            <div className="product-image-container">
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    className="product-image"
                                                />
                                                {/* أيقونة إضافة إلى العربة */}
                                                <button
                                                    className="add-to-cart-btn"
                                                    onClick={() => handleAddToCart(product)}
                                                >
                                                    <i className="fas fa-cart-plus"></i> {/* Icon for adding to cart */}
                                                </button>
                                            </div>
                                            <div className="product-info">
                                                <h3 className="product-title">{product.title}</h3>
                                                <div className="product-price-section">
                                                    <span className="product-price">
                                                        ${product.price.toFixed(2)}
                                                    </span>
                                                    <span className="product-discount">
                                                        {product.discountPercentage}% Off
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="scroll-button right"
                                    onClick={() => scrollContainer(category, 'right')}
                                >
                                    &#9654;
                                </button>
                            </div>
                        </div>
                    )
                );
            })}
        </div>
    );
};

export default Products;
