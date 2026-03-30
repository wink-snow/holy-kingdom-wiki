// 圣王国角色与势力数据

export interface Character {
  id: string;
  name: string;
  nameJp: string;
  title: string;
  affiliation: string;
  race: string;
  job: string;
  level: number;
  description: string;
  abilities: string[];
  status: 'alive' | 'dead' | 'unknown';
  image?: string;
  quote?: string;
}

export interface Faction {
  id: string;
  name: string;
  nameJp: string;
  location: { x: number; y: number };
  description: string;
  ruler?: string;
  alignment: 'friendly' | 'neutral' | 'hostile' | 'vassal';
  events: FactionEvent[];
  characters: Character[];
  flag?: string;
}

export interface FactionEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  participants?: string[];
  outcome?: string;
}

export interface Relationship {
  from: string;
  to: string;
  type: 'ally' | 'enemy' | 'neutral' | 'family' | 'rival';
  description?: string;
}

// 圣王国角色数据
export const holyKingdomCharacters: Character[] = [
  // 王室
  {
    id: 'calca',
    name: '卡尔嘉·贝萨雷斯',
    nameJp: 'カルカ・ベサーレス',
    title: '圣王女',
    affiliation: '王室',
    race: '人类',
    job: '圣王',
    level: 19,
    description: '洛布尔圣王国的第一位女性君主，称号"清廉的圣王女"。她越过兄长继承王位，是一位虔诚的信徒，手持圣剑萨法利西亚。在亚达巴沃袭击中被杀。',
    abilities: ['圣剑术', '神圣魔法', '领导力'],
    status: 'dead',
    image: 'https://static.wikia.nocookie.net/overlordmaruyama/images/8/86/Calca.png/revision/latest/scale-to-width/360?cb=20171002012932',
    quote: '为了圣王国，我将战斗至最后一刻。'
  },
  {
    id: 'piada',
    name: '皮奥达王太子',
    nameJp: 'ピオダ',
    title: '王太子',
    affiliation: '王室',
    race: '人类',
    job: '王族',
    level: 15,
    description: '圣王国的王太子，在亚达巴沃袭击时前往王国求援失败，最终抵达魔导国请求援助。',
    abilities: ['政治外交', '基础剑术'],
    status: 'alive',
    quote: '请帮助我们，我们愿意付出任何代价。'
  },
  {
    id: 'kelart',
    name: '葵拉特·贝萨雷斯',
    nameJp: 'ケラルト',
    title: '圣王',
    affiliation: '王室',
    race: '人类',
    job: '前任圣王',
    level: 17,
    description: '卡尔嘉的兄长，前任圣王。继承制度改变后，由其妹越过他继承了王位。在亚达巴沃袭击中下落不明。',
    abilities: ['统治术', '战略'],
    status: 'unknown',
    quote: '愿圣王庇佑这片土地。'
  },

  // 圣骑士团
  {
    id: 'remedios',
    name: '蕾梅蒂欧丝·卡斯托迪奥',
    nameJp: 'レメディオス・カストディオ',
    title: '圣骑士团团长',
    affiliation: '圣骑士团',
    race: '人类',
    job: '圣骑士',
    level: 24,
    description: '圣王国最强的圣骑士，称号"白"，九色之一。圣王女的好友，手持圣剑萨法利西亚。实力高强但不擅长思考，容易感情用事，心中有着偏执的正义感。',
    abilities: ['圣剑术', '神圣魔法', '指挥'],
    status: 'dead',
    image: 'https://static.wikia.nocookie.net/overlordmaruyama/images/1/1a/Remedios_Custodio.png/revision/latest/scale-to-width/360?cb=20171003213433',
    quote: '只要我还活着，就绝不会让圣王国毁灭！'
  },
  {
    id: 'neia',
    name: '涅亚·巴拉哈',
    nameJp: 'ネイア・バラハ',
    title: '弓使',
    affiliation: '圣骑士团',
    race: '人类',
    job: '侍从',
    level: 18,
    description: '圣王国的普通侍从，在亚达巴沃事件后成为莫莫最虔诚的信徒，称号"无面者"。她在圣王国传播对魔导王的信仰，最终成为魔导国在圣王国的代理人。',
    abilities: ['弓术', '信念之力', '演讲'],
    status: 'alive',
    image: 'https://static.wikia.nocookie.net/overlordmaruyama/images/b/ba/Neia_%28Anime%29.png/revision/latest/scale-to-width/360?cb=20240324035459',
    quote: '您是我的太阳，魔导王陛下！'
  },
  {
    id: 'gab',
    name: '加尔赞',
    nameJp: 'ガルザン',
    title: '圣骑士副团长',
    affiliation: '圣骑士团',
    race: '人类',
    job: '圣骑士',
    level: 20,
    description: '圣骑士团副团长之一，称号"桃"。对于团长的缺乏常识的行为感到辛苦。在亚达巴沃袭击王都后下落不明。',
    abilities: ['圣剑术', '战术指挥'],
    status: 'unknown',
    quote: '团长大人，请三思而后行。'
  },

  // 神殿
  {
    id: 'head_priest',
    name: '神殿长',
    nameJp: '神殿長',
    title: '神殿最高负责人',
    affiliation: '神殿',
    race: '人类',
    job: '神官',
    level: 22,
    description: '圣王国神殿的最高负责人，统管全国的神殿事务与信仰事务。',
    abilities: ['高阶神圣魔法', '宗教领导'],
    status: 'unknown',
    quote: '神的光芒将照亮一切黑暗。'
  },

  // 贵族
  {
    id: 'dodocos',
    name: '多多科斯子爵',
    nameJp: 'ドドコス',
    title: '子爵',
    affiliation: '贵族',
    race: '人类',
    job: '贵族',
    level: 10,
    description: '圣王国贵族，在亚达巴沃袭击后试图掌控南圣王国的权力。',
    abilities: ['政治手腕'],
    status: 'alive',
    quote: '这个国家需要新的秩序。'
  },
  {
    id: 'bldb_knight',
    name: '南圣王国骑士团长',
    nameJp: '南聖王国騎士団長',
    title: '骑士团长',
    affiliation: '贵族',
    race: '人类',
    job: '骑士',
    level: 18,
    description: '南圣王国的骑士团长，在亚达巴沃事件后效忠于皮奥达王太子。',
    abilities: ['剑术', '指挥'],
    status: 'alive',
    quote: '我将誓死保护南圣王国。'
  }
];

// 九色圣骑士
export const nineColors: Character[] = [
  { id: 'white', name: '白（蕾梅蒂欧丝）', nameJp: '白', title: '九色之一', affiliation: '圣骑士团', race: '人类', job: '圣骑士', level: 24, description: '九色之首，圣王国最强圣骑士', abilities: ['圣剑术'], status: 'dead' },
  { id: 'pink', name: '桃（加尔赞）', nameJp: '桃', title: '九色之一', affiliation: '圣骑士团', race: '人类', job: '圣骑士', level: 20, description: '圣骑士团副团长', abilities: ['圣剑术'], status: 'unknown' },
  { id: 'red', name: '赤', nameJp: '赤', title: '九色之一', affiliation: '圣骑士团', race: '人类', job: '圣骑士', level: 19, description: '九色圣骑士之一', abilities: ['圣剑术'], status: 'unknown' },
  { id: 'blue', name: '青', nameJp: '青', title: '九色之一', affiliation: '圣骑士团', race: '人类', job: '圣骑士', level: 19, description: '九色圣骑士之一', abilities: ['圣剑术'], status: 'unknown' },
  { id: 'green', name: '绿', nameJp: '緑', title: '九色之一', affiliation: '圣骑士团', race: '人类', job: '圣骑士', level: 18, description: '九色圣骑士之一', abilities: ['圣剑术'], status: 'unknown' },
  { id: 'yellow', name: '黄', nameJp: '黄', title: '九色之一', affiliation: '圣骑士团', race: '人类', job: '圣骑士', level: 18, description: '九色圣骑士之一', abilities: ['圣剑术'], status: 'unknown' },
  { id: 'purple', name: '紫', nameJp: '紫', title: '九色之一', affiliation: '圣骑士团', race: '人类', job: '圣骑士', level: 18, description: '九色圣骑士之一', abilities: ['圣剑术'], status: 'unknown' },
  { id: 'brown', name: '茶', nameJp: '茶', title: '九色之一', affiliation: '圣骑士团', race: '人类', job: '圣骑士', level: 17, description: '九色圣骑士之一', abilities: ['圣剑术'], status: 'unknown' },
  { id: 'black', name: '黑', nameJp: '黒', title: '九色之一', affiliation: '圣骑士团', race: '人类', job: '圣骑士', level: 17, description: '九色圣骑士之一', abilities: ['圣剑术'], status: 'unknown' }
];

// 周边势力数据
export const factions: Faction[] = [
  {
    id: 'holy_kingdom',
    name: '洛布尔圣王国',
    nameJp: 'ローブル聖王国',
    location: { x: 10, y: 55 },
    description: '位于大陆最西端半岛的人类国家，被海湾分割成南北两个区域。以"圣王"为最高统治者，拥有强大的圣骑士团和神殿势力。因亚达巴沃的袭击而元气大伤，后成为魔导国的傀儡。',
    alignment: 'vassal',
    events: [
      { id: 'hk1', title: '亚达巴沃袭击', date: '第三纪元某年', description: '恶魔皇帝亚达巴沃联合亚人部落入侵圣王国首都，圣王女卡尔嘉战死。', participants: ['卡尔嘉', '蕾梅蒂欧丝', '亚达巴沃'], outcome: '圣王女死亡，首都陷落' },
      { id: 'hk2', title: '长城陷落', date: '袭击后数周', description: '亚人联合军突破长城防线，北圣王国全境沦陷。', participants: ['亚人联合军'], outcome: '北圣王国成为废墟' },
      { id: 'hk3', title: '魔导王救援', date: '求援后', description: '王太子皮奥达前往魔导国请求援助，莫莫率军击败亚达巴沃。', participants: ['莫莫', '涅亚', '皮奥达'], outcome: '亚达巴沃被消灭' },
      { id: 'hk4', title: '无面者信仰兴起', date: '事件之后', description: '涅亚在圣王国传播对魔导王的信仰，建立"无面者"教团。', participants: ['涅亚'], outcome: '圣王国成为魔导国附庸' }
    ],
    characters: holyKingdomCharacters,
    flag: '🏰'
  },
  {
    id: 'sorcerer_kingdom',
    name: '魔导国',
    nameJp: '魔導国',
    location: { x: 50, y: 40 },
    description: '由穿越者安兹·乌尔·恭建立的亡灵国家，定都于耶·兰提尔。原本是里·耶斯提杰王国的领土，现已成为大陆最强大的国家。',
    alignment: 'friendly',
    events: [
      { id: 'sk1', title: '纳萨力克降临', date: '2138年', description: '安兹穿越到纳萨力克地下大坟墓，开始建立魔导国。', participants: ['安兹'], outcome: '魔导国建立' },
      { id: 'sk2', title: '帝国臣服', date: '某年', description: '巴哈斯帝国皇帝向魔导国称臣，帝国成为附庸。', participants: ['安兹', '吉尔克尼弗'], outcome: '帝国臣服' },
      { id: 'sk3', title: '王都陷落', date: '某年', description: '魔导国消灭里·耶斯提杰王国最后一支军队。', participants: ['安兹'], outcome: '王国灭亡' }
    ],
    characters: [],
    flag: '💀'
  },
  {
    id: 'slane_theocracy',
    name: '斯连教国',
    nameJp: 'ス레이ヴ神政国',
    location: { x: 55, y: 65 },
    description: '一个人类至上主义的国家，信奉六大神。拥有强大的宗教军事组织"六典"和"六 scripture"。被认为是幕后操控大陆局势的势力。',
    alignment: 'hostile',
    events: [
      { id: 'st1', title: '六大神陨落', date: '200年前', description: '六位神级存在在与八欲王的战争中相继死亡或消失。', participants: ['六大神', '八欲王'], outcome: '六大神陨落' },
      { id: 'st2', title: '精灵国侵略', date: '近代', description: '斯连教国与精灵国在月牙湖地区爆发冲突。', participants: ['教国军队', '精灵军'], outcome: '持续战争' },
      { id: 'st3', title: '建国战争', date: '600年前', description: '六大神帮助人类击退亚人，建立斯连教国。', participants: ['六大神', '人类'], outcome: '教国建立' }
    ],
    characters: [
      { id: 'black_scripture', name: '漆黑典籍', nameJp: '黒の典籍', title: '秘密部队', affiliation: '斯连教国', race: '人类', job: '特殊部队', level: 30, description: '由教国最强战士组成的秘密部队，负责执行最高机密任务。', abilities: ['多种'], status: 'alive' },
      { id: 'six_cardinals', name: '六主教', nameJp: '六人の大主教', title: '最高决策层', affiliation: '斯连教国', race: '人类', job: '神官', level: 25, description: '教国最高决策机构，由六人组成，统管国家一切事务。', abilities: ['神圣魔法'], status: 'alive' }
    ],
    flag: '⛪'
  },
  {
    id: 'baharuth_empire',
    name: '巴哈斯帝国',
    nameJp: 'バハルス帝国',
    location: { x: 65, y: 30 },
    description: '大陆上最古老的人类帝国，由皇帝统治。拥有强大的正规军。在魔导国崛起后选择臣服，成为其附庸国。',
    alignment: 'vassal',
    events: [
      { id: 'be1', title: '帝国臣服', date: '某年', description: '皇帝吉尔克尼弗向魔导王宣誓效忠，帝国成为附庸。', participants: ['吉尔克尼弗', '安兹'], outcome: '帝国臣服' },
      { id: 'be2', title: '建国', date: '600年前', description: '巴哈斯皇室建立帝国，成为大陆强国。', participants: ['巴哈斯皇室'], outcome: '帝国建立' }
    ],
    characters: [
      { id: 'jircniv', name: '吉尔克尼弗·朗·巴哈斯', nameJp: 'ジルクニフ', title: '皇帝', affiliation: '巴哈斯帝国', race: '人类', job: '皇帝', level: 19, description: '帝国皇帝，被称为"金粉大帝"，拥有极高的智谋和判断力。', abilities: ['帝王学', '战略'], status: 'alive' }
    ],
    flag: '👑'
  },
  {
    id: 're_estize',
    name: '里·耶斯提杰王国',
    nameJp: 'リ・エスティーズ王国',
    location: { x: 35, y: 35 },
    description: '大陆西南部的人类王国，因魔导国的崛起而面临灭顶之灾。在最终决战后被魔导国灭亡。',
    alignment: 'hostile',
    events: [
      { id: 'rk1', title: '帝国入侵', date: '某年', description: '巴哈斯帝国入侵王国，双方在卡兹平原交战。', participants: ['王国军', '帝国军'], outcome: '王国军战败' },
      { id: 'rk2', title: '王国灭亡', date: '某年', description: '魔导国彻底消灭王国最后一支军队，里·耶斯提杰王国灭亡。', participants: ['安兹', '王国残军'], outcome: '王国灭亡' }
    ],
    characters: [],
    flag: '⚔️'
  },
  {
    id: 'draconic_kingdom',
    name: '龙王国',
    nameJp: '竜王国',
    location: { x: 75, y: 75 },
    description: '位于大陆东南部的龙族国家，由龙族女王统治。正面临周边亚人部落的持续入侵。',
    alignment: 'vassal',
    events: [
      { id: 'dk1', title: '亚人入侵', date: '持续中', description: '周边亚人部落持续入侵龙王国边界。', participants: ['龙族', '亚人军'], outcome: '边境沦陷' },
      { id: 'dk2', title: '求援魔导国', date: '某年', description: '龙族女王向魔导国求援。', participants: ['龙族女王', '安兹'], outcome: '建立同盟' }
    ],
    characters: [],
    flag: '🐉'
  },
  {
    id: 'argland_council',
    name: '亚格兰德评议国',
    nameJp: 'アーグランド評議国',
    location: { x: 20, y: 25 },
    description: '位于西北部的亚人国家，由龙王普拉姆建立。实行评议会制度，实际上是龙王们的傀儡国家。',
    alignment: 'neutral',
    events: [
      { id: 'ac1', title: '评议国建立', date: '某年', description: '白金龙王建立评议国，作为其Nation Building实验的一环。', participants: ['白金龙王'], outcome: '评议国建立' },
      { id: 'ac2', title: '评议国内战', date: '某年', description: '评议国内部发生内战，势力削弱。', participants: ['评议国各族'], outcome: '内战持续' }
    ],
    characters: [],
    flag: '🏛️'
  },
  {
    id: 'abelion_hills',
    name: '亚伯利恩丘陵',
    nameJp: 'アベリオン丘陵',
    location: { x: 25, y: 60 },
    description: '位于圣王国东部的广阔丘陵地带，是各种亚人部落的聚居地。曾组成联合军入侵圣王国。',
    alignment: 'hostile',
    events: [
      { id: 'ah1', title: '亚人联盟', date: '亚达巴沃入侵时', description: '亚伯利恩丘陵的亚人部落组成联盟，在亚达巴沃的带领下入侵圣王国。', participants: ['亚人部落', '亚达巴沃'], outcome: '北圣王国沦陷' }
    ],
    characters: [],
    flag: '⛰️'
  }
];

// 角色关系数据
export const relationships: Relationship[] = [
  // 王室关系
  { from: 'calca', to: 'kelart', type: 'family', description: '兄妹关系' },
  { from: 'calca', to: 'piada', type: 'family', description: '兄妹关系' },
  { from: 'piada', to: 'kelart', type: 'family', description: '父子关系' },

  // 圣骑士团关系
  { from: 'calca', to: 'remedios', type: 'ally', description: '君臣与挚友' },
  { from: 'remedios', to: 'gab', type: 'ally', description: '上下级关系' },
  { from: 'remedios', to: 'neia', type: 'ally', description: '上下级关系' },
  { from: 'neia', to: 'gab', type: 'ally', description: '同僚' },

  // 圣王国与外部
  { from: 'calca', to: 'jaldabaoth', type: 'enemy', description: '不共戴天之敌' },
  { from: 'remedios', to: 'jaldabaoth', type: 'enemy', description: '死敌' },
  { from: 'neia', to: 'ainz', type: 'ally', description: '狂信徒' },
  { from: 'piada', to: 'ainz', type: 'ally', description: '请求援助' },

  // 九色内部
  { from: 'remedios', to: 'white', type: 'family', description: '本人' },
  { from: 'gab', to: 'pink', type: 'family', description: '本人' },

  // 势力间关系
  { from: 'holy_kingdom', to: 'sorcerer_kingdom', type: 'ally', description: '宗主国与附庸' },
  { from: 'holy_kingdom', to: 'abelion_hills', type: 'enemy', description: '世仇' },
  { from: 'holy_kingdom', to: 'slane_theocracy', type: 'neutral', description: '宗教同盟' },
  { from: 're_estize', to: 'baharuth_empire', type: 'enemy', description: '世仇' },
  { from: 'baharuth_empire', to: 'sorcerer_kingdom', type: 'ally', description: '宗主国与附庸' }
];

// 重要事件时间线
export const timeline: FactionEvent[] = [
  { id: 't1', title: '六大神降临', date: '约600年前', description: '六位神级存在降临大陆，帮助人类击退亚人，建立斯连教国和巴哈斯帝国。' },
  { id: 't2', title: '龙帝之死', date: '500年前', description: '龙帝使用异界穿越魔法变得虚弱，被六大神或其子嗣杀死。' },
  { id: 't3', title: '八欲王时代', date: '200-300年前', description: '八位玩家降临，建立公会并统治大陆，最终被六大神和龙族联合消灭。' },
  { id: 't4', title: '纳萨力克降临', date: '2138年', description: '玩家安兹在游戏关闭时穿越到纳萨力克地下大坟墓，开始建立魔导国。' },
  { id: 't5', title: '亚达巴沃袭击圣王国', date: '2138年后', description: '恶魔皇帝亚达巴沃联合亚人部落入侵圣王国，圣王女卡尔嘉战死，北圣王国沦陷。' },
  { id: 't6', title: '魔导王救援', date: '亚达巴沃袭击后', description: '王太子皮奥达向魔导国求援，莫莫率军击败亚达巴沃，圣王国成为魔导国附庸。' },
  { id: 't7', title: '王国灭亡', date: '之后某年', description: '魔导国彻底消灭里·耶斯提杰王国，建立对大陆西部的完全统治。' }
];

// 职业与等级设定
export const jobClasses = {
  warrior: {
    name: '战士系',
    jobs: ['战士', '骑士', '圣骑士', '剑士', '武术家']
  },
  mage: {
    name: '魔法系',
    jobs: ['魔法师', '神官', '牧师', '妖术师', '死灵法师']
  },
  rogue: {
    name: '盗贼系',
    jobs: ['盗贼', '刺客', '游侠', '吟游诗人']
  },
  special: {
    name: '特殊职业',
    jobs: ['死者大法师', '龙人', '天使', '恶魔', '亚人']
  }
};

// 等级划分
export const levelTiers = [
  { min: 1, max: 10, name: '普通', description: '普通冒险者和士兵' },
  { min: 11, max: 15, name: '精锐', description: '精锐士兵和冒险者' },
  { min: 16, max: 20, name: '英雄级', description: '能扭转战局的强者' },
  { min: 21, max: 30, name: '守护者级', description: '能守护一座城市的强者' },
  { min: 31, max: 100, name: '神级', description: '超越人类想象的神级存在' }
];
