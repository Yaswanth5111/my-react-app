import { useState } from "react";

const Filters = ({ onFiltersChange, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 3000],
    selectedBrands: [],
    minRating: 0
  });

  // Get unique brands from products
  const brands = [...new Set(products.map(product => product.brand))].sort();

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    const newFilters = { ...filters, priceRange: newPriceRange };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleBrandChange = (brand) => {
    const newSelectedBrands = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter(b => b !== brand)
      : [...filters.selectedBrands, brand];
    const newFilters = { ...filters, selectedBrands: newSelectedBrands };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRatingChange = (rating) => {
    const newFilters = { ...filters, minRating: rating };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      priceRange: [0, 3000],
      selectedBrands: [],
      minRating: 0
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const renderStars = (rating, isClickable = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? 'text-cyan-400 drop-shadow-neon' : 'text-cyan-900'
          } fill-current ${isClickable ? 'cursor-pointer hover:text-cyan-300' : ''}`}
          viewBox="0 0 20 20"
          onClick={isClickable ? () => handleRatingChange(i) : undefined}
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="bg-[var(--card-bg)] border border-cyan-900 rounded-2xl shadow-xl p-5 space-y-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 text-lg font-bold text-cyan-400 flex items-center justify-between rounded-lg bg-[#232946] border border-cyan-900 hover:bg-cyan-900/20 transition-colors shadow"
        >
          <span>Filters</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-7`}>
        {/* Price Range Filter */}
        <div>
          <h4 className="text-base font-semibold text-cyan-300 mb-3 border-b border-cyan-900 pb-1 tracking-wide uppercase">Price Range</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-cyan-200 w-8">Min:</span>
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="flex-1 accent-cyan-400"
              />
              <span className="text-xs font-medium text-cyan-100 w-12">${filters.priceRange[0]}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-cyan-200 w-8">Max:</span>
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="flex-1 accent-cyan-400"
              />
              <span className="text-xs font-medium text-cyan-100 w-12">${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>
        {/* Brand Filter */}
        <div>
          <h4 className="text-base font-semibold text-cyan-300 mb-3 border-b border-cyan-900 pb-1 tracking-wide uppercase">Brand</h4>
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="rounded border-cyan-700 text-cyan-400 focus:ring-cyan-400 mr-2 h-4 w-4 bg-[#232946] focus:outline-none transition-all duration-150"
                />
                <span className="text-sm text-cyan-100 group-hover:text-cyan-300 transition-colors">{brand}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Rating Filter */}
        <div>
          <h4 className="text-base font-semibold text-cyan-300 mb-3 border-b border-cyan-900 pb-1 tracking-wide uppercase">Minimum Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1, 0].map(rating => (
              <label key={rating} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(rating)}
                  </div>
                  <span className="text-xs text-cyan-100 group-hover:text-cyan-300 transition-colors">
                    {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
        {/* Clear All Button */}
        <div className="pt-2">
          <button
            onClick={clearFilters}
            className="w-full py-2 bg-cyan-400 text-[#181c2f] rounded-lg font-semibold shadow hover:bg-cyan-300 transition-colors text-base"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
