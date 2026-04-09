import React, { useState, useMemo } from 'react';
import { factions, Faction, FactionEvent } from '../data/holyKingdom';
import { CharacterCard } from './CharacterCard';
import { Character } from '../data/holyKingdom';
import { X, MapPin, Users, Scroll, ChevronRight, Swords, Shield, Crown, Heart } from 'lucide-react';

interface FactionMapProps {
  onEventClick?: (event: FactionEvent) => void;
}

export const FactionMap: React.FC<FactionMapProps> = ({ onEventClick }) => {
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<FactionEvent | null>(null);
  const [hoveredFaction, setHoveredFaction] = useState<string | null>(null);
  const [showCharacters, setShowCharacters] = useState(false);

  const getAlignmentColor = (alignment: Faction['alignment']) => {
    switch (alignment) {
      case 'vassal': return { bg: 'bg-purple-500/30', border: 'border-purple-500', text: 'text-purple-400', label: '附庸' };
      case 'friendly': return { bg: 'bg-green-500/30', border: 'border-green-500', text: 'text-green-400', label: '友好' };
      case 'neutral': return { bg: 'bg-gray-500/30', border: 'border-gray-500', text: 'text-gray-400', label: '中立' };
      case 'hostile': return { bg: 'bg-red-500/30', border: 'border-red-500', text: 'text-red-400', label: '敌对' };
    }
  };

  const getEventIcon = (outcome?: string) => {
    if (outcome?.includes('灭亡') || outcome?.includes('死亡')) return Swords;
    if (outcome?.includes('同盟') || outcome?.includes('附庸')) return Shield;
    if (outcome?.includes('建立')) return Crown;
    return Scroll;
  };

  return (
    <div className="relative min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            势力分布图
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            点击各势力图标查看详细信息、人物和历史事件
          </p>
        </div>

        {/* Map container */}
        <div className="relative bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden mb-8">
          {/* Background pattern removed to expose global background image */}

          {/* SVG Map */}
          <svg viewBox="0 0 1000 600" className="w-full h-auto relative z-10">
            {/* Continent outline */}
            <defs>
              <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="50%" stopColor="#0f2744" />
                <stop offset="100%" stopColor="#0a1929" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ocean */}
            <rect width="1000" height="600" fill="#0a1628" />

            {/* Land masses */}
            <path
              d="M50 100 Q150 50 300 80 Q450 40 600 100 Q750 60 900 120 Q950 200 920 350 Q850 450 700 500 Q550 550 400 520 Q250 480 150 420 Q80 350 60 250 Q40 180 50 100"
              fill="url(#landGradient)"
              stroke="#2dd4bf"
              strokeWidth="1"
              opacity="0.8"
            />

            {/* Geographic labels */}
            <text x="150" y="150" fill="#64748b" fontSize="10" opacity="0.5">安杰利西亚山脉</text>
            <text x="400" y="300" fill="#64748b" fontSize="10" opacity="0.5">都武大森林</text>
            <text x="700" y="200" fill="#64748b" fontSize="10" opacity="0.5">大东部平原</text>
            <text x="200" y="450" fill="#64748b" fontSize="10" opacity="0.5">亚伯利恩丘陵</text>
            <text x="600" y="500" fill="#64748b" fontSize="10" opacity="0.5">大沙漠</text>

            {/* Water labels */}
            <text x="30" y="300" fill="#3b82f6" fontSize="10" opacity="0.5" transform="rotate(-90, 30, 300)">真水之海</text>
            <text x="900" y="100" fill="#3b82f6" fontSize="10" opacity="0.5" transform="rotate(-30, 900, 100)">林德海</text>

            {/* Faction territories */}
            {factions.map((faction) => {
              const isHovered = hoveredFaction === faction.id;
              const isSelected = selectedFaction?.id === faction.id;
              const color = getAlignmentColor(faction.alignment);

              return (
                <g
                  key={faction.id}
                  onMouseEnter={() => setHoveredFaction(faction.id)}
                  onMouseLeave={() => setHoveredFaction(null)}
                  onClick={() => setSelectedFaction(faction)}
                  className="cursor-pointer"
                >
                  {/* Territory circle */}
                  <circle
                    cx={faction.location.x * 10}
                    cy={faction.location.y * 6}
                    r={isSelected ? 45 : isHovered ? 40 : 35}
                    fill={color.bg}
                    stroke={color.border}
                    strokeWidth={isSelected || isHovered ? 3 : 2}
                    opacity={isSelected || isHovered ? 1 : 0.8}
                    filter={isSelected ? 'url(#glow)' : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Faction icon */}
                  <text
                    x={faction.location.x * 10}
                    y={faction.location.y * 6 + 5}
                    textAnchor="middle"
                    fontSize="20"
                  >
                    {faction.flag}
                  </text>

                  {/* Faction name */}
                  <text
                    x={faction.location.x * 10}
                    y={faction.location.y * 6 + 60}
                    textAnchor="middle"
                    fill="#f5f5f5"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {faction.name}
                  </text>

                  {/* Alignment badge */}
                  <rect
                    x={faction.location.x * 10 - 25}
                    y={faction.location.y * 6 + 68}
                    width="50"
                    height="16"
                    rx="8"
                    fill={color.bg}
                    stroke={color.border}
                    strokeWidth="1"
                  />
                  <text
                    x={faction.location.x * 10}
                    y={faction.location.y * 6 + 80}
                    textAnchor="middle"
                    fill={color.text}
                    fontSize="9"
                    fontWeight="600"
                  >
                    {color.label}
                  </text>
                </g>
              );
            })}

            {/* Compass */}
            <g transform="translate(920, 520)">
              <circle r="30" fill="#0f172a" stroke="#475569" strokeWidth="2" />
              <text y="-12" textAnchor="middle" fill="#f5f5f5" fontSize="10">N</text>
              <text y="18" textAnchor="middle" fill="#64748b" fontSize="10">S</text>
              <text x="-15" textAnchor="middle" fill="#64748b" fontSize="10">W</text>
              <text x="15" textAnchor="middle" fill="#64748b" fontSize="10">E</text>
              <polygon points="0,-20 5,-5 0,-10 -5,-5" fill="#ef4444" />
            </g>

            {/* Legend */}
            <g transform="translate(50, 500)">
              <rect width="180" height="90" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <text x="10" y="20" fill="#f5f5f5" fontSize="11" fontWeight="600">势力关系图例</text>
              {[
                { label: '附庸', color: 'bg-purple-500' },
                { label: '友好', color: 'bg-green-500' },
                { label: '中立', color: 'bg-gray-500' },
                { label: '敌对', color: 'bg-red-500' }
              ].map((item, i) => (
                <g key={item.label} transform={`translate(${i * 45}, 35)`}>
                  <circle r="8" fill={item.color} />
                  <text y="25" fill="#94a3b8" fontSize="9">{item.label}</text>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Faction detail panel */}
        {selectedFaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedFaction(null)}>
            <div
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-amber-500/30 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`sticky top-0 z-10 p-6 bg-gradient-to-r ${getAlignmentColor(selectedFaction.alignment).bg} backdrop-blur-sm border-b border-slate-700`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{selectedFaction.flag}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{selectedFaction.name}</h2>
                      <p className="text-slate-300">{selectedFaction.nameJp}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFaction(null)}
                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700"
                    title="Close faction details"
                    aria-label="Close faction details"
                  >
                    <X className="w-5 h-5 text-slate-300" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    势力简介
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{selectedFaction.description}</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setShowCharacters(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      !showCharacters ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    历史事件
                  </button>
                  <button
                    onClick={() => setShowCharacters(true)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      showCharacters ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <Users className="w-4 h-4 inline mr-2" />
                    重要人物 ({selectedFaction.characters.length})
                  </button>
                </div>

                {/* Events list */}
                {!showCharacters && (
                  <div className="space-y-4">
                    {selectedFaction.events.map((event, index) => {
                      const Icon = getEventIcon(event.outcome);
                      return (
                        <div
                          key={event.id}
                          className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-amber-500/20 rounded-lg">
                              <Icon className="w-5 h-5 text-amber-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-lg font-semibold text-white">{event.title}</h4>
                                <span className="text-sm text-slate-500">{event.date}</span>
                              </div>
                              <p className="text-slate-400 text-sm mb-2">{event.description}</p>
                              {event.participants && event.participants.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {event.participants.map((p, i) => (
                                    <span key={i} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                                      {p}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {event.outcome && (
                                <p className="text-sm text-green-400 mt-2">
                                  <span className="text-slate-500">结果：</span>{event.outcome}
                                </p>
                              )}
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-500" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Characters list */}
                {showCharacters && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedFaction.characters.length > 0 ? (
                      selectedFaction.characters.map((char) => (
                        <div
                          key={char.id}
                          className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedFaction(null)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border border-amber-500/30 flex items-center justify-center overflow-hidden">
                              {char.image && !char.image.includes('undefined') ? (
                                <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xl">👤</span>
                              )}
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">{char.name}</h4>
                              <p className="text-sm text-slate-400">{char.title}</p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-400 mt-2 line-clamp-2">{char.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                            <span>等级: {char.level}</span>
                            <span>种族: {char.race}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-8 text-slate-500">
                        该势力暂无详细人物资料
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Event detail modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
            <div
              className="w-full max-w-2xl bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-amber-500/30 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-amber-400">{selectedEvent.title}</h3>
                    <p className="text-slate-500">{selectedEvent.date}</p>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600"
                    title="Close event details"
                    aria-label="Close event details"
                  >
                    <X className="w-5 h-5 text-slate-300" />
                  </button>
                </div>

                <p className="text-slate-300 leading-relaxed mb-4">{selectedEvent.description}</p>

                {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-400 mb-2">参与者</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.participants.map((p, i) => (
                        <span key={i} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm border border-amber-500/30">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.outcome && (
                  <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                    <h4 className="text-sm font-semibold text-green-400 mb-1 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      事件结果
                    </h4>
                    <p className="text-slate-300">{selectedEvent.outcome}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FactionMap;
