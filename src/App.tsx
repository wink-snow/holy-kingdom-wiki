import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { CharactersSection } from './components/CharactersSection';
import { RelationshipDiagram } from './components/RelationshipDiagram';
import { FactionMap } from './components/FactionMap';
import { TimelineSection } from './components/TimelineSection';
import { SettingSection } from './components/SettingSection';
import { Menu, X, Home, Church, Sword, Crown, Users, Map, Scroll, Sparkles } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'relations', label: '关系图', icon: Users },
    { id: 'temple', label: '神殿', icon: Church },
    { id: 'paladins', label: '圣骑士', icon: Sword },
    { id: 'royalty', label: '王室', icon: Crown },
    { id: 'nobles', label: '贵族', icon: Users },
    { id: 'map', label: '势力地图', icon: Map },
    { id: 'timeline', label: '历史年表', icon: Scroll },
    { id: 'settings', label: '世界设定', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-1 left-0 right-0 z-40 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 px-4 py-2">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-xl">🏰</span>
              </div>
              <span className="hidden sm:block text-lg font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                圣王国百科
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeSection === item.id
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-300" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-2 p-4 bg-slate-900/95 backdrop-blur-lg rounded-2xl border border-slate-700/50">
              <div className="grid grid-cols-3 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                      activeSection === item.id
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                        : 'text-slate-400 bg-slate-800 border border-slate-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <HeroSection onNavigate={scrollToSection} />

        {/* Relationship Diagram */}
        <section id="relations">
          <RelationshipDiagram />
        </section>

        {/* Character Sections */}
        <section id="temple">
          <CharactersSection initialTab="temple" />
        </section>
        <section id="paladins">
          <CharactersSection initialTab="paladins" />
        </section>
        <section id="royalty">
          <CharactersSection initialTab="royalty" />
        </section>
        <section id="nobles">
          <CharactersSection initialTab="nobles" />
        </section>

        {/* Faction Map */}
        <section id="map">
          <FactionMap />
        </section>

        {/* Timeline */}
        <section id="timeline">
          <TimelineSection />
        </section>

        {/* Settings */}
        <section id="settings">
          <SettingSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🏰</span>
            <span className="text-lg font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              洛布尔圣王国主题百科
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-2">
            Overlord Fan Site | 不死者之王
          </p>
          <p className="text-slate-600 text-xs">
            本网站仅供粉丝学习交流使用，版权归原作丸山黄金所有
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
