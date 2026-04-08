import React, { useState } from 'react';
import { timeline, FactionEvent } from '../data/holyKingdom';
import { X, ChevronDown, ChevronUp, Scroll, Swords, Shield, Crown, Star, Flame } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const getEventIcon = (title: string) => {
    if (title.includes('神') || title.includes('降临')) return Star;
    if (title.includes('龙')) return Crown;
    if (title.includes('帝国') || title.includes('王国')) return Shield;
    if (title.includes('袭击') || title.includes('战争')) return Swords;
    if (title.includes('灭亡') || title.includes('死')) return Flame;
    return Scroll;
  };

  const getEventColor = (title: string) => {
    if (title.includes('神') || title.includes('降临')) return { bg: 'bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-400', icon: 'bg-purple-500' };
    if (title.includes('龙')) return { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400', icon: 'bg-amber-500' };
    if (title.includes('纳萨力克')) return { bg: 'bg-slate-500/20', border: 'border-slate-500', text: 'text-slate-400', icon: 'bg-slate-500' };
    if (title.includes('袭击') || title.includes('入侵') || title.includes('战争')) return { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', icon: 'bg-red-500' };
    if (title.includes('灭亡')) return { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400', icon: 'bg-orange-500' };
    return { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', icon: 'bg-blue-500' };
  };

  return (
    <div className="relative min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            历史年表
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            从神代到现代，探索Overlord世界的重大历史事件
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 rounded-full" />

          {/* Events */}
          <div className="space-y-8">
            {timeline.map((event, index) => {
              const isExpanded = expandedEvent === event.id;
              const isLeft = index % 2 === 0;
              const Icon = getEventIcon(event.title);
              const colors = getEventColor(event.title);

              return (
                <div
                  key={event.id}
                  className={`relative flex items-start gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-full bg-slate-900 border-4 border-amber-500 flex items-center justify-center z-10 transform -translate-x-1/2">
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-20 md:ml-0 w-full md:w-[calc(50%-3rem)] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}
                  >
                    <button
                      onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                      className={`w-full p-5 rounded-xl ${colors.bg} border ${colors.border} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] group`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.icon} text-white text-xs font-medium`}>
                          <Icon className="w-3 h-3" />
                          {event.date}
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>

                      <h3 className={`text-xl font-bold ${colors.text} mb-2 group-hover:underline`}>
                        {event.title}
                      </h3>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                          <p className="text-slate-300 leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End marker */}
          <div className="relative mt-12 flex justify-center">
            <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-full bg-amber-500 border-4 border-slate-900 flex items-center justify-center z-10 transform -translate-x-1/2">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className={`ml-20 md:ml-0 w-full md:w-[calc(50%-3rem)] md:mr-auto md:pr-8`}>
              <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/50 text-center">
                <p className="text-amber-400 font-medium">历史仍在继续...</p>
                <p className="text-slate-400 text-sm mt-1">魔导国的崛起改变了一切</p>
              </div>
            </div>
          </div>
        </div>

        {/* Era divisions */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">时代划分</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { era: '神代', period: '约600年前', color: 'from-purple-500 to-purple-700', description: '六大神降临，人类崛起' },
              { era: '八欲王时代', period: '200-300年前', color: 'from-blue-500 to-blue-700', description: '玩家降临，群雄割据' },
              { era: '现代', period: '2138年至今', color: 'from-amber-500 to-amber-700', description: '纳萨力克降临，新的霸权' },
              { era: '魔导国纪元', period: '未来', color: 'from-slate-500 to-slate-700', description: '大陆格局重塑' }
            ].map((item) => (
              <div
                key={item.era}
                className={`p-6 rounded-xl bg-gradient-to-r ${item.color} bg-opacity-10 border border-amber-500/30`}
              >
                <h4 className="text-lg font-bold text-white mb-1">{item.era}</h4>
                <p className="text-sm text-slate-400 mb-2">{item.period}</p>
                <p className="text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
