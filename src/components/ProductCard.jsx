import { useState } from "react";

const ProductCard = ({ product, viewMode = "grid", onAddToCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-cyan-400 drop-shadow-neon fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-cyan-400 drop-shadow-neon fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-cyan-900 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }

    return stars;
  };

  if (viewMode === "list") {
    return (
      <div className="bg-[var(--card-bg)] border border-cyan-900 rounded-2xl shadow-xl hover:shadow-cyan-400/30 transition-shadow duration-300 p-6 flex items-center space-x-6">
        <div className="flex-shrink-0 w-24 h-24">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="w-full h-full bg-cyan-900 rounded-xl animate-pulse flex items-center justify-center">
              <svg className="w-10 h-10 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-cyan-200 truncate mb-1 drop-shadow-neon">{product.title}</h3>
          <p className="text-base text-cyan-400 mb-2">{product.brand}</p>
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-base text-cyan-300">({product.rating})</span>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-2xl font-extrabold text-cyan-400">${product.price}</p>
          <button className="mt-3 bg-cyan-400 text-[#181c2f] px-5 py-2 rounded-lg font-semibold shadow hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200" onClick={e => { e.stopPropagation(); onAddToCart && onAddToCart(product); }}>
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--card-bg)] border border-cyan-900 rounded-2xl shadow-xl hover:shadow-cyan-400/30 transition-shadow duration-300 overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-cyan-900 animate-pulse flex items-center justify-center">
            <svg className="w-14 h-14 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-cyan-200 mb-2 line-clamp-2 drop-shadow-neon">{product.title}</h3>
        <p className="text-base text-cyan-400 mb-2">{product.brand}</p>
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-base text-cyan-300">({product.rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-extrabold text-cyan-400">${product.price}</p>
          <button className="bg-cyan-400 text-[#181c2f] px-5 py-2 rounded-lg font-semibold shadow hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200" onClick={e => { e.stopPropagation(); onAddToCart && onAddToCart(product); }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
