import { useState, useEffect } from 'react';
import LightPillar from './LightPillar';
import ReviewsPage from './pages/ReviewsPage';
import PortfolioPage from './pages/PortfolioPage';
import './App.css';

const Icons = {
  Star: () => (
    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  Briefcase: () => (
    <svg viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  )
};

const servicesList = [
  { 
    title: "Logo Design", 
    desc: "Custom brand logos tailored to your identity",
    details: {
      title: "BASIC LOGO PACKAGE",
      subtitle: "Best for startups & small businesses",
      features: [
        "1 Logo Concept",
        "2 Revision Rounds",
        "Color & Black/White Versions",
        "High-resolution files (PNG, JPG)",
        "Delivery within 3–4 working days"
      ]
    }
  },
  { title: "UI/UX Design", desc: "Beautiful and intuitive user interfaces" },
  { title: "Social Media Graphics", desc: "Eye-catching posts and banners" },
  { title: "Brand Identity", desc: "Full branding packages with style guides" },
  { title: "Web Design", desc: "Pixel-perfect website mockups and layouts" },
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [currentPage, setCurrentPage] = useState(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <div className="app-wrapper">
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={theme === 'dark' ? 1 : 0.6}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode={theme === 'dark' ? 'screen' : 'multiply'}
            quality="high"
          />
        </div>

        <div className="hero-content">

          <h1 className="hero-title">ASH DESIGNS</h1>

          <nav className="glass-nav">

            <div className="nav-item" onClick={() => setCurrentPage('reviews')}>
              <Icons.Star />
              <span>Reviews</span>
            </div>
            <div className="nav-item" onClick={() => setCurrentPage('portfolio')}>
              <Icons.Briefcase />
              <span>Portfolio</span>
            </div>
            <div style={{ position: 'relative' }}>
              <div 
                className={`nav-item ${isServicesOpen ? 'active' : ''}`}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                <Icons.Sparkles />
                <span>Services</span>
              </div>
              
              {isServicesOpen && (
                <>
                  <div className="dropdown-backdrop" onClick={() => setIsServicesOpen(false)} />
                  <div className="services-dropdown">
                    {!selectedService ? (
                      <div className="panel-view fade-in">
                        <div className="dropdown-header">
                          <h3>Our Design Services</h3>
                          <button className="close-btn" onClick={() => setIsServicesOpen(false)}>×</button>
                        </div>
                        <div className="services-list-scroll">
                          <div className="services-list">
                            {servicesList.map((svc, idx) => (
                              <div 
                                className="service-item" 
                                key={idx}
                                onClick={() => { if(svc.details) setSelectedService(svc); }}
                              >
                                <div className="service-title">{svc.title}</div>
                                <div className="service-desc">{svc.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="panel-view fade-in">
                        <div className="dropdown-header">
                          <div className="header-left">
                            <button className="back-btn" onClick={() => setSelectedService(null)}>
                              ←
                            </button>
                            <div className="detail-title">{selectedService.title}</div>
                          </div>
                          <button className="close-btn" onClick={() => { setIsServicesOpen(false); setTimeout(() => setSelectedService(null), 300); }}>×</button>
                        </div>
                        <div className="service-details-scroll-area">
                          <div className="detail-desc">{selectedService.desc}</div>
                          
                          <div className="package-card">
                            <div className="package-title">{selectedService.details.title}</div>
                            <div className="package-subtitle">{selectedService.details.subtitle}</div>
                            <ul className="package-features">
                              {selectedService.details.features.map((feature, fIdx) => (
                                <li key={fIdx}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      {currentPage === 'reviews' && (
        <ReviewsPage onClose={() => setCurrentPage(null)} />
      )}
      {currentPage === 'portfolio' && (
        <PortfolioPage onClose={() => setCurrentPage(null)} />
      )}
    </>
  );
}

export default App;
