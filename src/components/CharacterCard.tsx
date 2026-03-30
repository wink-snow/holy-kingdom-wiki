import React, { useState } from 'react';
import { Character } from '../data/holyKingdom';
import { X, Swords, Heart, Star, Skull, Quote } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onClose: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClose }) => {
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'alive': return 'text-green-400';
      case 'dead': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status: Character['status']) => {
    switch (status) {
      case 'alive': return 'bg-green-500/20 border-green-500/50';
      case 'dead': return 'bg-red-500/20 border-red-500/50';
      default: return 'bg-gray-500/20 border-gray-500/50';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-600/30 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5 text-slate-300" />
        </button>

        {/* Content */}
        <div className="relative p-6 pt-8">
          {/* Character image */}
          {!imageError && character.image ? (
            <div className="relative mb-6">
              <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-amber-500/50 shadow-xl">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
              {/* Status badge */}
              <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border ${getStatusBg(character.status)} backdrop-blur-sm`}>
                <span className={`text-xs font-medium ${getStatusColor(character.status)}`}>
                  {character.status === 'alive' ? '生还' : character.status === 'dead' ? '已故' : '下落不明'}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-slate-700 flex items-center justify-center border-4 border-amber-500/50">
              <Star className="w-16 h-16 text-amber-500/50" />
            </div>
          )}

          {/* Name and title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-amber-400 mb-2">{character.name}</h2>
            <p className="text-lg text-slate-400 mb-1">{character.nameJp}</p>
            <p className="text-xl text-amber-300">{character.title}</p>
          </div>

          {/* Quote */}
          {character.quote && (
            <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border-l-4 border-amber-500">
              <Quote className="w-5 h-5 text-amber-500/50 mb-2" />
              <p className="text-slate-300 italic">"{character.quote}"</p>
            </div>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-xs text-slate-500 mb-1">所属势力</div>
              <div className="text-amber-300">{character.affiliation}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-xs text-slate-500 mb-1">种族</div>
              <div className="text-slate-200">{character.race}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-xs text-slate-500 mb-1">职业</div>
              <div className="text-slate-200">{character.job}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-xs text-slate-500 mb-1">等级</div>
              <div className="text-slate-200 flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500" />
                Lv.{character.level}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              角色简介
            </h3>
            <p className="text-slate-300 leading-relaxed">{character.description}</p>
          </div>

          {/* Abilities */}
          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center gap-2">
              <Swords className="w-5 h-5" />
              主要能力
            </h3>
            <div className="flex flex-wrap gap-2">
              {character.abilities.map((ability, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm border border-amber-500/30"
                >
                  {ability}
                </span>
              ))}
            </div>
          </div>

          {/* Level tier indicator */}
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
            <div className="text-xs text-slate-500 mb-2">实力等级</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                  style={{ width: `${Math.min(100, (character.level / 100) * 100)}%` }}
                />
              </div>
              <span className="text-sm text-slate-300">Lv.{character.level}</span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              {character.level >= 31 ? '神级' : character.level >= 21 ? '守护者级' : character.level >= 16 ? '英雄级' : character.level >= 11 ? '精锐级' : '普通级'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
