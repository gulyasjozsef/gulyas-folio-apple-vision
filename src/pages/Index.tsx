import { useState, useEffect } from 'react';
import profilePhoto from '../assets/profile-photo.jpg';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Correct SHA-256 hash for password "1995" (calculated using online tools)
  const expectedHash = 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3';

  useEffect(() => {
    // Check if user is already authenticated
    const isLoggedIn = sessionStorage.getItem('portfolio_authenticated');
    if (isLoggedIn === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);

    // Add fade-in animations after content loads
    setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in-up');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add(`delay-${Math.min(index + 1, 4)}`);
        }, index * 100);
      });
    }, 100);
  }, [isAuthenticated]);

  const sha256 = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const hashedPassword = await sha256(password);
      console.log('Input password:', password);
      console.log('Generated hash:', hashedPassword);
      console.log('Expected hash:', expectedHash);
      console.log('Hashes match:', hashedPassword === expectedHash);
      
      if (hashedPassword === expectedHash) {
        sessionStorage.setItem('portfolio_authenticated', 'true');
        setIsAuthenticated(true);
      } else {
        setError('Hibás jelszó');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Hiba történt');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(var(--background))' }}>
        <div className="animate-pulse">Betöltés...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="login-gate">
        <div className="login-card">
          <h2 className="text-subheadline mb-6" style={{ color: 'hsl(var(--foreground))' }}>Belépés</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Jelszó"
              className="input-apple mb-4"
              required
            />
            <button type="submit" className="btn-primary w-full">
              Belépés
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" 
           style={{ 
             background: 'hsl(var(--background) / 0.8)', 
             borderColor: 'hsl(var(--grey-100))' 
           }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Gulyás József
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-blue-500 transition-colors" style={{ color: 'hsl(var(--grey-400))' }}>Rólam</a>
              <a href="#skills" className="hover:text-blue-500 transition-colors" style={{ color: 'hsl(var(--grey-400))' }}>Szakértelem</a>
              <a href="#works" className="hover:text-blue-500 transition-colors" style={{ color: 'hsl(var(--grey-400))' }}>Munkáim</a>
              <a href="#insights" className="hover:text-blue-500 transition-colors" style={{ color: 'hsl(var(--grey-400))' }}>Eredmények</a>
              <a href="#contact" className="hover:text-blue-500 transition-colors" style={{ color: 'hsl(var(--grey-400))' }}>Kapcsolat</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="fade-in-up">
                <h1 className="text-hero mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  Gulyás József
                </h1>
                <h2 className="text-subheadline mb-6" style={{ color: 'hsl(var(--primary))' }}>
                  Digital Marketing & Content Specialist
                </h2>
                <p className="text-body text-xl mb-8 max-w-2xl">
                  I combine creative storytelling, technical skills, and data-driven strategies to build strong digital brands.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#works" className="btn-primary">
                    Portfolió megtekintése
                  </a>
                  <a href="#contact" className="btn-secondary">
                    Kapcsolatfelvétel
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="fade-in-up delay-2">
                <div className="relative">
                  <img
                    src={profilePhoto}
                    alt="Gulyás József profilkép"
                    className="w-80 h-80 object-cover rounded-full shadow-lg"
                    style={{ boxShadow: 'var(--shadow-large)' }}
                  />
                  <div className="absolute inset-0 rounded-full border-4" 
                       style={{ borderColor: 'hsl(var(--primary) / 0.1)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-6 fade-in-up" style={{ color: 'hsl(var(--foreground))' }}>
              Rólam
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <p className="text-body text-lg mb-6">
                Szakértő vagyok az integrált marketing stratégiákban, kreatív tartalom-előállításban, 
                SEO-optimalizált webfejlesztésben és közösségi média növekedésben.
              </p>
              <p className="text-body text-lg mb-6">
                Képes vagyok egyesíteni a marketinget az IT támogatással és toborzási ismeretekkel, 
                ami sokoldalúvá tesz különböző iparágakban.
              </p>
              <p className="text-body text-lg">
                Specializációm a kreatív megoldások és technikai készségek ötvözése, hogy 
                erős digitális márkákat építsek fel adatvezérelt stratégiákkal.
              </p>
            </div>
            <div className="fade-in-up delay-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="card-apple p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>5+</div>
                  <div className="text-body">Év tapasztalat</div>
                </div>
                <div className="card-apple p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>300K+</div>
                  <div className="text-body">TikTok megtekintés</div>
                </div>
                <div className="card-apple p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>#1</div>
                  <div className="text-body">Google ranking</div>
                </div>
                <div className="card-apple p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>50+</div>
                  <div className="text-body">Projekt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6" style={{ background: 'hsl(var(--grey-50))' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-6 fade-in-up" style={{ color: 'hsl(var(--foreground))' }}>
              Szakértelmem
            </h2>
          </div>
          <div className="grid-auto-fit">
            {[
              {
                title: "Digital Marketing Stratégia",
                description: "LinkedIn, Facebook, Instagram, TikTok kampányok százezer organikus megtekintéssel",
                icon: "📱"
              },
              {
                title: "Tartalom Készítés",
                description: "Grafikai design Canva, Adobe Photoshop, Illustrator, Lightroom; videószerkesztés Final Cut Pro",
                icon: "🎨"
              },
              {
                title: "Videó Produkció",
                description: "Drón videózás Mavic Air-rel, konstrukciós gépek promóciós klipjei",
                icon: "🎬"
              },
              {
                title: "Webfejlesztés & SEO",
                description: "WordPress weboldalak, HTML/PHP frontend, CMS kezelés, Google első helyezések",
                icon: "💻"
              },
              {
                title: "Toborzás & HR Támogatás",
                description: "Állásajánlatok, sourcing, előszűrés, betanítás, HR folyamatok",
                icon: "👥"
              },
              {
                title: "IT & Technikai Támogatás",
                description: "Windows, Microsoft Office, WordPress, hálózati hibaelhárítás",
                icon: "🔧"
              }
            ].map((skill, index) => (
              <div key={index} className={`card-apple p-8 fade-in-up delay-${index % 4 + 1}`}>
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {skill.title}
                </h3>
                <p className="text-body">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Works Section */}
      <section id="works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-6 fade-in-up" style={{ color: 'hsl(var(--foreground))' }}>
              Munkáim
            </h2>
          </div>
          <div className="grid-auto-fill">
            {[
              {
                title: "Social Media Kampányok",
                description: "TikTok Reels 300K+ organikus megtekintéssel",
                type: "Digital Marketing"
              },
              {
                title: "WordPress Weboldal",
                description: "SEO optimalizált, Google első helyezés",
                type: "Web Development"
              },
              {
                title: "Nyomtatott Dizájn",
                description: "Brosúrák, flyer-ek, járműmatricák",
                type: "Graphic Design"
              },
              {
                title: "Drón Videók",
                description: "Építőipari gépek promóciós tartalmai",
                type: "Video Production"
              },
              {
                title: "Toborzási Anyagok",
                description: "Állásajánlat vizuálok, sourcing stratégiák",
                type: "HR & Recruitment"
              },
              {
                title: "Brand Identitás",
                description: "Teljes arculat kialakítás és implementáció",
                type: "Branding"
              }
            ].map((work, index) => (
              <div key={index} className={`card-apple overflow-hidden fade-in-up delay-${index % 4 + 1}`}>
                <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="text-6xl opacity-30">📊</div>
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium mb-2" style={{ color: 'hsl(var(--primary))' }}>
                    {work.type}
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                    {work.title}
                  </h3>
                  <p className="text-body">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-20 px-6" style={{ background: 'hsl(var(--grey-50))' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-6 fade-in-up" style={{ color: 'hsl(var(--foreground))' }}>
              Eredmények & Statisztikák
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="card-apple p-8 fade-in-up">
              <div className="flex items-center mb-6">
                <div className="text-5xl mr-4">📈</div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                    TikTok Növekedés
                  </h3>
                  <p className="text-body">0 → 300K organikus megtekintés</p>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-600">TikTok növekedési grafikon</span>
              </div>
            </div>
            
            <div className="card-apple p-8 fade-in-up delay-2">
              <div className="flex items-center mb-6">
                <div className="text-5xl mr-4">🏆</div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                    SEO Siker
                  </h3>
                  <p className="text-body">WordPress oldal Google #1 helyezés</p>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-r from-green-200 to-green-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-600">SEO ranking grafikon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-6 fade-in-up" style={{ color: 'hsl(var(--foreground))' }}>
              Kapcsolat
            </h2>
            <p className="text-body text-xl fade-in-up delay-1">
              Dolgozzunk együtt a márkád növekedésén
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="fade-in-up">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                    Név
                  </label>
                  <input type="text" className="input-apple" placeholder="Az Ön neve" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                    Email
                  </label>
                  <input type="email" className="input-apple" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                    Üzenet
                  </label>
                  <textarea rows={5} className="input-apple resize-none" placeholder="Írja le projektjét..."></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Üzenet küldése
                </button>
              </form>
            </div>
            
            <div className="fade-in-up delay-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                    Lépjen kapcsolatba velem
                  </h3>
                  <p className="text-body">
                    Készen állok, hogy segítsek a következő projektjében. Vegye fel velem a kapcsolatot, 
                    és beszéljük meg, hogyan tudok hozzájárulni a márkája sikeréhez.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a href="https://linkedin.com/in/gulyas-jozsef" 
                     className="flex items-center space-x-4 p-4 rounded-xl transition-colors hover:bg-blue-50">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">💼</span>
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>LinkedIn</div>
                      <div className="text-body text-sm">Szakmai profil</div>
                    </div>
                  </a>
                  
                  <a href="https://instagram.com/gulyas.jozsef" 
                     className="flex items-center space-x-4 p-4 rounded-xl transition-colors hover:bg-pink-50">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📸</span>
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>Instagram</div>
                      <div className="text-body text-sm">Kreatív munkák</div>
                    </div>
                  </a>
                  
                  <a href="mailto:gulyas.jozsef@email.com" 
                     className="flex items-center space-x-4 p-4 rounded-xl transition-colors hover:bg-gray-50">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">✉️</span>
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>Email</div>
                      <div className="text-body text-sm">Közvetlen kapcsolat</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: 'hsl(var(--grey-100))' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-body">
            © 2024 Gulyás József. Minden jog fenntartva.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;