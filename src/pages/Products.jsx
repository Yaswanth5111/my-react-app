import React from "react";
import ProductCard from "../components/ProductCard";

const styles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: white;
    margin: 0;
    padding: 0;
  }
  .header {
    background: transparent;
    color: white;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header .logo {
    color: #4f9cf9;
    font-size: 1.8rem;
    font-weight: bold;
    text-decoration: none;
    letter-spacing: 1px;
  }
  .product-container {
    max-width: 1300px;
    margin: 2rem auto;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 2rem;
  }
  .product-card {
    background: linear-gradient(135deg, #23272f 60%, #181c2f 100%);
    border-radius: 18px;
    padding: 0;
    box-shadow: 0 8px 32px rgba(79,156,249,0.08), 0 1.5px 8px rgba(255,107,53,0.08);
    transition: transform 0.3s, box-shadow 0.3s;
    overflow: hidden;
    border: 1.5px solid #222b3a;
  }
  .product-card:hover {
    transform: translateY(-7px) scale(1.03);
    box-shadow: 0 16px 40px rgba(79,156,249,0.18), 0 4px 16px rgba(255,107,53,0.13);
  }
  .product-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    background: #222b3a;
    border-radius: 0;
    display: block;
  }
  .product-info {
    padding: 1.2rem 1.2rem 1.5rem 1.2rem;
  }
  .product-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #4f9cf9;
    margin-bottom: 0.4rem;
    letter-spacing: 0.5px;
  }
  .product-brand {
    font-size: 0.98rem;
    color: #ff6b35;
    margin-bottom: 0.3rem;
    font-weight: 500;
  }
  .product-price {
    font-size: 1.1rem;
    color: #fff;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .product-rating {
    font-size: 0.95rem;
    color: #ccc;
    margin-bottom: 0.2rem;
  }
  .footer {
    text-align: center;
    padding: 2rem;
    color: #666;
    background: rgba(0, 0, 0, 0.2);
    margin-top: 3rem;
  }
`;

const products = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    brand: "Apple",
    rating: 4.8,
    price: 1199,
    image: "/images/iphone15pro.jpg",
    reviews: 120
  },
  {
    id: 2,
    title: "Galaxy S24 Ultra",
    brand: "Samsung",
    rating: 4.7,
    price: 1099,
    image: "/images/galaxys24ultra.jpg",
    reviews: 98
  },
  {
    id: 3,
    title: "Sony WH-1000XM5",
    brand: "Sony",
    rating: 4.6,
    price: 399,
    image: "/images/sonywh1000xm5.jpg",
    reviews: 77
  },
  {
    id: 4,
    title: "Dell XPS 15",
    brand: "Dell",
    rating: 4.5,
    price: 1599,
    image: "/images/dellxps15.jpg",
    reviews: 54
  },
  {
    id: 5,
    title: "Apple Watch Series 9",
    brand: "Apple",
    rating: 4.7,
    price: 499,
    image: "/images/applewatch9.jpg",
    reviews: 65
  },
  {
    id: 6,
    title: "Canon EOS R8",
    brand: "Canon",
    rating: 4.6,
    price: 1499,
    image: "/images/canoneosr8.jpg",
    reviews: 41
  },
  {
    id: 7,
    title: "Logitech MX Master 3S",
    brand: "Logitech",
    rating: 4.8,
    price: 99,
    image: "/images/logitechmxmaster3s.jpg",
    reviews: 88
  },
  {
    id: 8,
    title: "Samsung 4K Smart TV",
    brand: "Samsung",
    rating: 4.7,
    price: 799,
    image: "/images/samsung4ktv.jpg",
    reviews: 73
  },
  {
    id: 9,
    title: "Anker PowerCore 20000",
    brand: "Anker",
    rating: 4.9,
    price: 59,
    image: "/images/ankerpowercore.jpg",
    reviews: 102
  }
];

function Products() {
  return (
    <>
      <style>{styles}</style>
      <header className="header">
        <a href="/" className="logo">HIcool Electronics</a>
      </header>

      <main>
        <section className="product-container">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} className="product-image" alt={product.title} />
              <div className="product-info">
                <div className="product-title">{product.title}</div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">⭐ {product.rating} ({product.reviews} reviews)</div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        © 2025 HIcool Electronics — All rights reserved.
      </footer>
    </>
  );
}

export default Products;