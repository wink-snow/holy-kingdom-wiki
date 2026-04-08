import React from 'react';
import { Crown, Sword, Shield, Church, Map, Users, Scroll, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Crown icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Crown className="w-24 h-24 text-amber-400 animate-pulse" />
            <div className="absolute inset-0 blur-xl bg-amber-400/30 rounded-full" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent drop-shadow-lg">
          洛布尔圣王国
        </h1>
        <p className="text-xl md:text-2xl text-amber-300/80 mb-4 font-medium tracking-wider">
          Roble Holy Kingdom
        </p>
        <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
          在黑暗奇幻世界中，由圣王统治的圣地。<br/>
          探索其神圣的殿堂、勇敢的圣骑士与跌宕起伏的命运。
        </p>

        {/* Navigation cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto mb-16">
          {[
            { icon: Church, label: '神殿', section: 'temple' },
            { icon: Sword, label: '圣骑士团', section: 'paladins' },
            { icon: Crown, label: '王室', section: 'royalty' },
            { icon: Users, label: '贵族', section: 'nobles' },
            { icon: Map, label: '势力地图', section: 'map' },
            { icon: Scroll, label: '事件年表', section: 'timeline' }
          ].map((item, index) => (
            <button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              className="group relative bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4 transition-all duration-300 hover:bg-slate-800/80 hover:border-amber-500/60 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <item.icon className="w-8 h-8 mx-auto mb-2 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <span className="text-sm text-slate-200 group-hover:text-white font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { label: '角色总数', value: '50+' },
            { label: '势力派系', value: '8' },
            { label: '重要事件', value: '20+' },
            { label: '关系连线', value: '100+' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-amber-400">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce">
          <ChevronDown className="w-8 h-8 mx-auto text-amber-400/50" />
        </div>
      </div>

      {/* bottom gradient removed to expose full background image */}
    </div>
  );
};

export default HeroSection;
