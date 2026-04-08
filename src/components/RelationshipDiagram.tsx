import React, { useState, useMemo } from 'react';
import { holyKingdomCharacters, relationships, Character } from '../data/holyKingdom';
import { CharacterCard } from './CharacterCard';
import { Heart, Swords, Users, HeartHandshake, Target, X, ZoomIn, ZoomOut } from 'lucide-react';

interface NodePosition {
  x: number;
  y: number;
  character: Character;
}

export const RelationshipDiagram: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState<string | null>(null);

  // Calculate node positions in a circular layout
  const nodes: NodePosition[] = useMemo(() => {
    const centerX = 500;
    const centerY = 350;
    const radius = 250;
    const angleStep = (2 * Math.PI) / holyKingdomCharacters.length;

    return holyKingdomCharacters.map((char, index) => {
      // Organize by affiliation
      let angle: number;
      const affiliations = ['王室', '圣骑士团', '神殿', '贵族'];
      const affIndex = affiliations.indexOf(char.affiliation);
      const affAngle = affIndex * (Math.PI / 2) + Math.PI;
      const offset = (index % 3) * 0.3 - 0.3;
      angle = affAngle + offset;

      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        character: char
      };
    });
  }, []);

  // Get relationships for selected character
  const getRelatedCharacters = (charId: string) => {
    return relationships.filter(r => r.from === charId || r.to === charId);
  };

  // Get relationship color and style
  const getRelationshipStyle = (type: string) => {
    switch (type) {
      case 'ally':
        return { color: '#22c55e', width: 3, dasharray: '0' };
      case 'enemy':
        return { color: '#ef4444', width: 3, dasharray: '8,4' };
      case 'family':
        return { color: '#a855f7', width: 4, dasharray: '0' };
      case 'neutral':
        return { color: '#6b7280', width: 2, dasharray: '4,4' };
      case 'rival':
        return { color: '#f59e0b', width: 2, dasharray: '0' };
      default:
        return { color: '#6b7280', width: 2, dasharray: '0' };
    }
  };

  // Get relationship icon
  const getRelationshipIcon = (type: string) => {
    switch (type) {
      case 'ally': return Heart;
      case 'enemy': return Swords;
      case 'family': return HeartHandshake;
      case 'neutral': return Users;
      default: return Target;
    }
  };

  return (
    <div className="relative min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            角色关系图
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            探索圣王国重要人物之间的复杂关系
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { type: 'ally', label: '同盟/效忠', color: 'bg-green-500' },
            { type: 'enemy', label: '敌对/仇恨', color: 'bg-red-500' },
            { type: 'family', label: '血缘关系', color: 'bg-purple-500' },
            { type: 'neutral', label: '中立关系', color: 'bg-gray-500' }
          ].map(({ type, label, color }) => (
            <button
              key={type}
              onClick={() => setFilter(filter === type ? null : type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                filter === type
                  ? 'bg-slate-700 border-2 border-amber-500'
                  : 'bg-slate-800/50 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${color}`} />
              <span className="text-sm text-slate-300">{label}</span>
            </button>
          ))}
        </div>

        {/* Zoom controls */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700"
          >
            <ZoomOut className="w-5 h-5 text-slate-300" />
          </button>
          <span className="flex items-center px-3 text-slate-300">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700"
          >
            <ZoomIn className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* SVG Diagram */}
        <div className="relative bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden">
          <svg
            viewBox="0 0 1000 700"
            className="w-full h-auto"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
          >
            <defs>
              {/* Arrow marker */}
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
              </marker>
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Relationship lines */}
            {relationships
              .filter(r => !filter || r.type === filter)
              .map((rel, index) => {
                const fromNode = nodes.find(n => n.character.id === rel.from);
                const toNode = nodes.find(n => n.character.id === rel.to);
                if (!fromNode || !toNode) return null;

                const style = getRelationshipStyle(rel.type);
                const midX = (fromNode.x + toNode.x) / 2;
                const midY = (fromNode.y + toNode.y) / 2;

                return (
                  <g key={`rel-${index}`}>
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={style.color}
                      strokeWidth={style.width}
                      strokeDasharray={style.dasharray}
                      markerEnd="url(#arrowhead)"
                      opacity={0.7}
                    />
                    {/* Relationship label */}
                    <text
                      x={midX}
                      y={midY - 10}
                      fill={style.color}
                      fontSize="10"
                      textAnchor="middle"
                      opacity={0.9}
                    >
                      {rel.description}
                    </text>
                  </g>
                );
              })}

            {/* Character nodes */}
            {nodes.map((node, index) => {
              const relatedCount = getRelatedCharacters(node.character.id).length;
              const isSelected = selectedCharacter?.id === node.character.id;
              const baseColor = node.character.affiliation === '王室' ? '#a855f7' :
                               node.character.affiliation === '圣骑士团' ? '#3b82f6' :
                               node.character.affiliation === '神殿' ? '#f59e0b' : '#22c55e';

              return (
                <g
                  key={node.character.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedCharacter(node.character)}
                  className="cursor-pointer"
                >
                  {/* Outer glow for selected */}
                  {isSelected && (
                    <circle
                      r="55"
                      fill="none"
                      stroke={baseColor}
                      strokeWidth="3"
                      opacity="0.5"
                      filter="url(#glow)"
                    />
                  )}

                  {/* Main circle */}
                  <circle
                    r="45"
                    fill={baseColor}
                    opacity="0.2"
                    stroke={baseColor}
                    strokeWidth="2"
                    className="transition-all hover:opacity-40"
                  />

                  {/* Inner circle with icon */}
                  <circle
                    r="35"
                    fill="#0f172a"
                    stroke={baseColor}
                    strokeWidth="2"
                  />

                  {/* Character initial */}
                  <text
                    y="5"
                    textAnchor="middle"
                    fill="#fbbf24"
                    fontSize="20"
                    fontWeight="bold"
                  >
                    {node.character.name.charAt(0)}
                  </text>

                  {/* Character name */}
                  <text
                    y="70"
                    textAnchor="middle"
                    fill="#f5f5f5"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {node.character.name.length > 6
                      ? node.character.name.slice(0, 6) + '...'
                      : node.character.name}
                  </text>

                  {/* Affiliation badge */}
                  <rect
                    x="-35"
                    y="78"
                    width="70"
                    height="18"
                    rx="9"
                    fill={baseColor}
                    opacity="0.3"
                  />
                  <text
                    y="91"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="9"
                  >
                    {node.character.affiliation}
                  </text>

                  {/* Level badge */}
                  <circle
                    cx="35"
                    cy="-35"
                    r="15"
                    fill={node.character.level >= 20 ? '#ef4444' : node.character.level >= 15 ? '#f59e0b' : '#6b7280'}
                  />
                  <text
                    x="35"
                    y="-31"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {node.character.level}
                  </text>
                </g>
              );
            })}

            {/* Center label */}
            <text
              x="500"
              y="350"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="14"
              fontWeight="bold"
              opacity="0.3"
            >
              洛布尔圣王国
            </text>
          </svg>
        </div>

        {/* Info panel */}
        {selectedCharacter && (
          <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-amber-400">{selectedCharacter.name}</h3>
                <p className="text-slate-400">{selectedCharacter.title}</p>
              </div>
              <button
                onClick={() => setSelectedCharacter(null)}
                className="p-2 rounded-lg hover:bg-slate-700"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Relationships */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-300">人物关系</h4>
              {getRelatedCharacters(selectedCharacter.id).map((rel, i) => {
                const otherId = rel.from === selectedCharacter.id ? rel.to : rel.from;
                const other = holyKingdomCharacters.find(c => c.id === otherId);
                if (!other) return null;

                const Icon = getRelationshipIcon(rel.type);
                const style = getRelationshipStyle(rel.type);

                return (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <Icon className="w-5 h-5" style={{ color: style.color }} />
                    <div>
                      <span className="text-amber-300">{other.name}</span>
                      <span className="text-slate-500 text-sm ml-2">{rel.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Character modal */}
      {selectedCharacter && (
        <CharacterCard
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default RelationshipDiagram;
