import React from 'react';
import { levelTiers, jobClasses } from '../data/holyKingdom';
import { Star, Shield, Sword, Wand2, Sparkles, Crown } from 'lucide-react';

export const SettingSection: React.FC = () => {
  const getTierColor = (tier: typeof levelTiers[0]) => {
    if (tier.name === '神级') return { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', gradient: 'from-red-500 to-orange-500' };
    if (tier.name === '守护者级') return { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400', gradient: 'from-purple-500 to-pink-500' };
    if (tier.name === '英雄级') return { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400', gradient: 'from-amber-500 to-yellow-500' };
    if (tier.name === '精锐级') return { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', gradient: 'from-blue-500 to-cyan-500' };
    return { bg: 'bg-slate-500/20', border: 'border-slate-500', text: 'text-slate-400', gradient: 'from-slate-500 to-gray-500' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            世界设定
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            深入了解Overlord的独特世界观与规则体系
          </p>
        </div>

        {/* Level System */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
            <Star className="w-6 h-6" />
            等级体系
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {levelTiers.map((tier, index) => {
              const colors = getTierColor(tier);
              const isHighest = tier.name === '神级';
              const isLowest = tier.name === '普通';

              return (
                <div
                  key={tier.name}
                  className={`relative p-6 rounded-xl ${colors.bg} border ${colors.border} ${isHighest ? 'scale-105 shadow-lg shadow-amber-500/20' : ''}`}
                >
                  {/* Tier badge */}
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r ${colors.gradient} text-white text-xs font-bold`}>
                    {tier.name}
                  </div>

                  <div className="text-center mt-4">
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                      Lv.{tier.min}-{tier.max}
                    </div>
                    <p className="text-slate-300 text-sm mb-4">{tier.description}</p>

                    {/* Example */}
                    <div className="pt-3 border-t border-slate-700/50">
                      <p className="text-xs text-slate-500 mb-1">代表人物</p>
                      {tier.name === '神级' && <p className="text-sm text-amber-400">安兹·乌尔·恭</p>}
                      {tier.name === '守护者级' && <p className="text-sm text-amber-400">守护者们</p>}
                      {tier.name === '英雄级' && <p className="text-sm text-amber-400">蕾梅蒂欧丝</p>}
                      {tier.name === '精锐级' && <p className="text-sm text-amber-400">普通冒险者</p>}
                      {tier.name === '普通' && <p className="text-sm text-amber-400">一般士兵</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Job System */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6" />
            职业系统
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(jobClasses).map(([key, category]) => (
              <div
                key={key}
                className="p-6 bg-slate-800/50 rounded-xl border border-slate-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    {key === 'warrior' && <Sword className="w-5 h-5 text-amber-400" />}
                    {key === 'mage' && <Wand2 className="w-5 h-5 text-amber-400" />}
                    {key === 'rogue' && <Sparkles className="w-5 h-5 text-amber-400" />}
                    {key === 'special' && <Crown className="w-5 h-5 text-amber-400" />}
                  </div>
                  <h4 className="text-xl font-semibold text-white">{category.name}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.jobs.map((job) => (
                    <span
                      key={job}
                      className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm border border-slate-600"
                    >
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Races */}
        <section>
          <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            主要种族
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { race: '人类', description: '大陆上数量最多的种族，拥有高度的适应性和创造力', trait: '适应力强' },
              { race: '亚人', description: '兽人、兽人与怪物的混血等，在丘陵和山区聚居', trait: '战斗力强' },
              { race: '龙族', description: '强大的种族，拥有悠长的寿命和压倒性的力量', trait: '寿命极长' },
              { race: '精灵', description: '优雅的长寿种族，擅长魔法和艺术', trait: '魔法亲和' },
              { race: '矮人', description: '擅长锻造和地下挖掘的种族', trait: '工艺精湛' },
              { race: '蜥蜴人', description: '两栖种族，居住在大湖周围的湿地', trait: '水下呼吸' },
              { race: '天使', description: '神创造的圣属性存在，侍奉神明', trait: '神圣属性' },
              { race: '恶魔', description: '邪属性的高阶存在，力量强大但邪恶', trait: '邪属性' },
              { race: '不死者', description: '死亡的产物，畏惧神圣属性', trait: '不死之身' }
            ].map((item) => (
              <div
                key={item.race}
                className="p-5 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors"
              >
                <h4 className="text-lg font-semibold text-amber-400 mb-2">{item.race}</h4>
                <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">特性：</span>
                  <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-300 rounded">{item.trait}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingSection;
