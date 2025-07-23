import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Create floating particles
    const particlesContainer = document.getElementById("particles");

    function createParticles() {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const particle = document.createElement("div");
          particle.className = "particle";
          particle.style.left = Math.random() * 100 + "%";
          particle.style.animationDelay = Math.random() * 10 + "s";
          particlesContainer.appendChild(particle);

          setTimeout(() => {
            particle.remove();
          }, 10000);
        }, i * 500);
      }
    }

    createParticles();
    const interval = setInterval(createParticles, 10000);

    // Theme toggle functionality
    const body = document.body;
    const button = document.querySelector(".theme-toggle");

    function toggleTheme() {
      if (body.style.background.includes("1a1a1a")) {
        body.style.background = "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)";
        body.style.color = "#333";
        button.textContent = "☀️";
      } else {
        body.style.background = "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)";
        body.style.color = "white";
        button.textContent = "🌙";
      }
    }

    if (button) {
      button.addEventListener("click", toggleTheme);
    }

    // Scroll effects
    function onScroll() {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector(".phone-mockup");
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `perspective(1000px) rotateY(-15deg) translateY(${speed}px)`;
      }
    }
    window.addEventListener("scroll", onScroll);

    // Ripple effect on buttons
    const buttons = document.querySelectorAll(".btn");
    function createRipple(e) {
      e.preventDefault();

      const ripple = document.createElement("span");
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

      e.currentTarget.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
    buttons.forEach((btn) => btn.addEventListener("click", createRipple));

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      if (button) {
        button.removeEventListener("click", toggleTheme);
      }
      window.removeEventListener("scroll", onScroll);
      buttons.forEach((btn) => btn.removeEventListener("click", createRipple));
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: white;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          position: relative;
          z-index: 100;
        }

        .nav-left, .nav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo {
          margin: 0 2rem;
          display: flex;
          align-items: center;
          font-size: 1.8rem;
          font-weight: bold;
          color: #4F9CF9;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo::before {
          content: "🛒";
          margin-right: 0.5rem;
          font-size: 2rem;
          color: #FF6B35;
        }

        .nav {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          justify-content: flex-end;
        }

        .nav-left {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .nav-right {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .nav-link {
          color: #ccc;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: white;
          background: rgba(79, 156, 249, 0.1);
          transform: translateY(-2px);
        }

        .theme-toggle {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .theme-toggle:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(180deg);
        }

        /* Main Content */
        .main-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          min-height: calc(100vh - 200px);
          padding: 2rem;
          gap: 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .content-left {
          padding-left: 2rem;
          animation: slideInLeft 1s ease-out;
        }

        .main-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #4F9CF9, #FF6B35);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .main-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #ccc;
          margin-bottom: 2.5rem;
          max-width: 500px;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: linear-gradient(135deg, #FF6B35, #FF8E53);
          color: white;
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Illustration */
        .content-right {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: slideInRight 1s ease-out;
        }

        .phone-mockup {
          width: 300px;
          height: 600px;
          background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
          border-radius: 40px;
          padding: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          position: relative;
          transform: perspective(1000px) rotateY(-15deg);
          transition: transform 0.5s ease;
        }

        .phone-mockup:hover {
            transform: perspective(1000px) rotateY(-10deg) scale(1.05);
        }

        .phone-screen {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 30px;
            position: relative;
            overflow: hidden;
        }

        .app-header {
            background: #4F9CF9;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            position: relative;
        }

        .app-content {
            padding: 20px;
            height: calc(100% - 80px);
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .content-card {
            background: white;
            border-radius: 12px;
            padding: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 12px;
            animation: float 3s ease-in-out infinite;
        }

        .content-card:nth-child(2) {
            animation-delay: 0.5s;
        }

        .content-card:nth-child(3) {
            animation-delay: 1s;
        }

        .card-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #4F9CF9, #FF6B35);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        .card-content {
            flex: 1;
        }

        .card-title {
            font-size: 0.9rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
        }

        .card-subtitle {
            font-size: 0.8rem;
            color: #666;
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 2rem;
            color: #666;
            background: rgba(0, 0, 0, 0.2);
            margin-top: 4rem;
        }

        /* Animations */
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 2rem;
            }

            .content-left {
                padding-left: 0;
                order: 2;
            }

            .content-right {
                order: 1;
            }

            .phone-mockup {
                width: 250px;
                height: 500px;
                transform: none;
            }

            .header {
                padding: 1rem;
            }

            .nav {
                gap: 1rem;
            }

            .cta-buttons {
                justify-content: center;
            }
        }
      `}</style>

      <div className="particles" id="particles"></div>

      <header className="header">
        <div className="nav-left">
          <a href="#" className="btn btn-secondary">Home</a>
          <a href="#" className="btn btn-secondary">Products</a>
        </div>
        <a href="#" className="logo">HIcool Electronics</a>
        <div className="nav-right">
          <a href="#" className="btn btn-secondary">About</a>
          <a href="#" className="btn btn-primary">Sign Up</a>
          <button className="theme-toggle" aria-label="Toggle theme">
            🌙
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="content-left">
          <h1 className="main-title">Visit HIcool Electronics Store.</h1>
          <p className="main-description">
            Discover cutting-edge technology and the latest electronics at HIcool Store. From smartphones to smart home devices, we offer premium electronics with unbeatable prices and expert service.
          </p>
          {/* Removed Learn More and Sign Up buttons as per user request */}
        </div>

        <div className="content-right">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="app-header">
                HIcool Electronics
              </div>
              <div className="app-content">
                <div className="content-card">
                  <div className="card-icon">📱</div>
                  <div className="card-content">
                    <div className="card-title">Smartphones</div>
                    <div className="card-subtitle">Latest iPhone & Android</div>
                  </div>
                </div>
                <div className="content-card">
                  <div className="card-icon">💻</div>
                  <div className="card-content">
                    <div className="card-title">Laptops</div>
                    <div className="card-subtitle">Gaming & business laptops</div>
                  </div>
                </div>
                <div className="content-card">
                  <div className="card-icon">🎧</div>
                  <div className="card-content">
                    <div className="card-title">Audio</div>
                    <div className="card-subtitle">Headphones & speakers</div>
                  </div>
                </div>
                <div className="content-card">
                  <div className="card-icon">⚡</div>
                  <div className="card-content">
                    <div className="card-title">Accessories</div>
                    <div className="card-subtitle">Chargers & cables</div>
                  </div>
                </div>
                {/* Additional products */}
                <div className="content-card">
                  <div className="card-icon">📺</div>
                  <div className="card-content">
                    <div className="card-title">Smart TVs</div>
                    <div className="card-subtitle">4K & OLED Televisions</div>
                  </div>
                </div>
                <div className="content-card">
                  <div className="card-icon">⌚</div>
                  <div className="card-content">
                    <div className="card-title">Wearables</div>
                    <div className="card-subtitle">Smartwatches & Fitness Bands</div>
                  </div>
                </div>
                <div className="content-card">
                  <div className="card-icon">🖨️</div>
                  <div className="card-content">
                    <div className="card-title">Printers</div>
                    <div className="card-subtitle">Home & Office Printers</div>
                  </div>
                </div>
                <div className="content-card">
                  <div className="card-icon">🕹️</div>
                  <div className="card-content">
                    <div className="card-title">Gaming</div>
                    <div className="card-subtitle">Consoles & Accessories</div>
                  </div>
                </div>
                <div className="content-card">
                  <div className="card-icon">📷</div>
                  <div className="card-content">
                    <div className="card-title">Cameras</div>
                    <div className="card-subtitle">DSLR & Mirrorless</div>
                  </div>
                </div>
                {/* End additional products */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        Copyright &copy; 2025. HIcool Electronics. All rights reserved.
      </footer>
    </>
  );
};

export default Home;
