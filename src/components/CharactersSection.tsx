import React, { useState } from 'react';
import { Character, holyKingdomCharacters, nineColors } from '../data/holyKingdom';
import { CharacterCard } from './CharacterCard';
import { Church, Sword, Crown, Users, Star, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

interface CharactersSectionProps {
  initialTab?: string;
}

const categoryConfig = [
  {
    id: 'temple',
    icon: Church,
    title: '神殿势力',
    color: 'from-amber-500 to-amber-700',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-500',
    description: '神殿是圣王国的精神支柱，负责管理全国信仰事务，统管神圣魔法与宗教事务。'
  },
  {
    id: 'paladins',
    icon: Sword,
    title: '圣骑士团',
    color: 'from-blue-500 to-blue-700',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500',
    description: '圣骑士团是圣王国最强的军事力量，由圣王直属，九色圣骑士是其中的精英。'
  },
  {
    id: 'royalty',
    icon: Crown,
    title: '王室',
    color: 'from-purple-500 to-purple-700',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-500',
    description: '圣王国王室以"圣王"为最高统治者，统治着这片神圣的土地。'
  },
  {
    id: 'nobles',
    icon: Users,
    title: '贵族',
    color: 'from-emerald-500 to-emerald-700',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-500',
    description: '圣王国的贵族阶层在政治和经济上拥有重要影响力。'
  }
];

const getCategoryCharacters = (categoryId: string): Character[] => {
  switch (categoryId) {
    case 'temple':
      return holyKingdomCharacters.filter(c => c.affiliation === '神殿');
    case 'paladins':
      return holyKingdomCharacters.filter(c => c.affiliation === '圣骑士团');
    case 'royalty':
      return holyKingdomCharacters.filter(c => c.affiliation === '王室');
    case 'nobles':
      return holyKingdomCharacters.filter(c => c.affiliation === '贵族');
    default:
      return [];
  }
};

export const CharactersSection: React.FC<CharactersSectionProps> = ({ initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'paladins');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const charactersPerPage = 6;

  const activeConfig = categoryConfig.find(c => c.id === activeTab) || categoryConfig[0];
  const characters = getCategoryCharacters(activeTab);
  const filteredCharacters = activeTab === 'paladins' ? [...characters, ...nineColors] : characters;

  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);
  const currentCharacters = filteredCharacters.slice(
    currentPage * charactersPerPage,
    (currentPage + 1) * charactersPerPage
  );

  return (
    <div className="relative min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            圣王国人物志
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            探索洛布尔圣王国的各派势力与重要人物
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categoryConfig.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveTab(category.id);
                setCurrentPage(0);
              }}
              className={`relative px-6 py-3 rounded-xl transition-all duration-300 ${
                activeTab === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
              } border ${activeTab === category.id ? category.borderColor : 'border-slate-700'}`}
            >
              <category.icon className="w-5 h-5 inline-block mr-2" />
              {category.title}
            </button>
          ))}
        </div>

        {/* Category description */}
        <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-r ${activeConfig.color} bg-opacity-10 border ${activeConfig.borderColor} backdrop-blur-sm`}>
          <div className="flex items-center gap-3 mb-2">
            <activeConfig.icon className={`w-6 h-6 ${activeConfig.bgColor} text-white rounded-lg p-1`} />
            <h3 className="text-xl font-semibold text-white">{activeConfig.title}</h3>
          </div>
          <p className="text-slate-300">{activeConfig.description}</p>
        </div>

        {/* Characters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentCharacters.map((character) => (
            <button
              key={character.id}
              onClick={() => setSelectedCharacter(character)}
              className="group relative bg-slate-800/60 backdrop-blur border border-slate-700 rounded-xl p-6 transition-all duration-300 hover:border-amber-500/50 hover:bg-slate-800/80 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 text-left"
            >
              {/* Character icon or image */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-amber-500/30 flex items-center justify-center overflow-hidden">
                {character.image && !character.image.includes('undefined') ? (
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <Star className="w-10 h-10 text-amber-500/50" />
                )}
              </div>

              {/* Status badge */}
              <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                character.status === 'alive' ? 'bg-green-500/20 text-green-400' :
                character.status === 'dead' ? 'bg-red-500/20 text-red-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {character.status === 'alive' ? '生还' : character.status === 'dead' ? '已故' : '不明'}
              </div>

              {/* Character info */}
              <h4 className="text-lg font-semibold text-amber-400 text-center mb-1 group-hover:text-amber-300">
                {character.name}
              </h4>
              <p className="text-sm text-slate-500 text-center mb-3">{character.nameJp}</p>
              <p className="text-sm text-amber-300/80 text-center mb-4">{character.title}</p>

              {/* Stats */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-amber-500/50" />
                  <span className="text-xs text-slate-400">Lv.{character.level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className={`w-4 h-4 ${character.level >= 20 ? 'text-red-400' : character.level >= 15 ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className={`text-xs ${
                    character.level >= 20 ? 'text-red-400' :
                    character.level >= 15 ? 'text-amber-400' : 'text-slate-400'
                  }`}>
                    {character.level >= 31 ? '神级' : character.level >= 21 ? '守护者级' : character.level >= 16 ? '英雄级' : '精锐级'}
                  </span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
            </button>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
              title="Previous page"
            >
              <ChevronLeft className="w-5 h-5 text-slate-300" />
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === i
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
              title="Next page"
            >
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        )}
      </div>

      {/* Character detail modal */}
      {selectedCharacter && (
        <CharacterCard
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default CharactersSection;
