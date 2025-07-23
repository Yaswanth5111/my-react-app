import { Link } from "react-router-dom";

const Navbar = ({ cartCount = 0, onCartClick = () => {} }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#181c2f]/80 backdrop-blur border-b border-cyan-900 shadow-xl">
      <div className="container mx-auto px-6 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-cyan-400 flex items-center space-x-2 px-4 py-2 bg-cyan-700 rounded-md hover:bg-cyan-600 transition-colors">
              <span className="text-3xl">🛒</span>
              <span>HIcool Electronics</span>
            </Link>
            <Link to="/home" className="text-cyan-200 px-4 py-2 bg-cyan-700 rounded-md hover:bg-cyan-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-cyan-200 px-4 py-2 bg-cyan-700 rounded-md hover:bg-cyan-600 transition-colors">
              Products
            </Link>
          </div>

          {/* Cart Icon with Count */}
          <div className="flex items-center space-x-8">
            <div className="relative">
              <button className="text-cyan-200 hover:text-cyan-400 transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full" onClick={onCartClick} aria-label="Open cart">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                </svg>
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-400 text-[#181c2f] text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg border-2 border-cyan-200 animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
