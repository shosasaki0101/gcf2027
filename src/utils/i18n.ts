// 多言語対応のためのi18nユーティリティ

export type Language = 'ja' | 'en';

export interface TranslationData {
  // ナビゲーション
  nav: {
    about: string;
    details: string;
    speakers: string;
    schedule: string;
    partners: string;
    access: string;
    register: string;
  };
  
  // ヒーローセクション
  hero: {
    title: string;
    subtitle: string;
    date: string;
    venue: string;
    register: string;
  };
  
  // 開催概要
  about: {
    title: string;
    description: string;
    videoTitle: string;
    register: string;
  };
  
  // 日時・場所
  details: {
    title: string;
    dateTime: {
      title: string;
      value: string;
    };
    venue: {
      title: string;
      name: string;
      address: string;
      accessLink: string;
    };
    format: {
      title: string;
      type: string;
      description: string;
    };
    language: {
      title: string;
      languages: string;
      interpretation: string;
    };
  };
  
  // 登壇者
  speakers: {
    title: string;
    modal: {
      biography: string;
      achievements: string;
      sessions: string;
    };
  };
  
  // タイムテーブル
  schedule: {
    title: string;
    register: string;
  };
  
  // パートナー
  partners: {
    title: string;
    coHost: string;
    sponsor: string;
  };
  
  // アクセス
  access: {
    title: string;
    address: {
      title: string;
      venue: string;
      office: string;
    };
    nearestStation: {
      title: string;
      metro1: string;
      metro2: string;
    };
  };
  
  // フッター
  footer: {
    register: string;
  };
  
  // セッション情報
  sessions: {
    opening: string;
    keynote: string;
    keynoteSubtitle: string;
    session1: string;
    session1Subtitle: string;
    session2: string;
    session2Subtitle: string;
    break: string;
    breakDescription: string;
    session3: string;
    session3Subtitle: string;
    specialSession: string;
    specialSessionSubtitle: string;
    session4: string;
    session4Subtitle: string;
    session5: string;
    session5Subtitle: string;
    closing: string;
    collaboration: string;
    collaborationSubtitle: string;
    collaborationNote: string;
  };
  
  // 組織名
  organizations: {
    universityOfTokyo: string;
    globalCommonsCenter: string;
    riken: string;
  };
}

// 日本語翻訳
export const jaTranslations: TranslationData = {
  nav: {
    about: '開催概要',
    details: '日時・場所',
    speakers: '登壇者',
    schedule: 'タイムテーブル',
    partners: 'パートナー',
    access: 'アクセス',
    register: '参加登録',
  },
  
  hero: {
    title: 'Global Commons Forum',
    subtitle: 'Safeguarding Global Commons through Transition to Nature Positive Economy',
    date: '2025年10月7日（火）',
    venue: '場所：東京大学 一条ホール',
    register: '参加登録',
  },
  
  about: {
    title: '開催概要',
    description: 'Planetary boundary science shows that the current economic system is pushing the stability and resilience of the Earth system, the "global commons", beyond its limits. Soon we will go beyond the Earth’s safe operating zone which would no longer support human wellbeing. \n To avoid such a catastrophe, a fundamental transformation of the economic system is urgently required. One effective lever is to account for the full value of natural capital and incorporate it into our economic decision-making. \n At this Forum, a diverse group of experts will discuss pathways to accelerate the transition through valuing natural capital, linking local actions to the global level, and building effective AI governance to support the transition.',
    videoTitle: 'Global Commons Forum 2025の様子',
    register: '参加登録',
  },
  
  details: {
    title: '日時・場所',
    dateTime: {
      title: '開催日時',
      value: '2025年10月7日（火）',
    },
    venue: {
      title: '会場',
      name: '弥生講堂 一条ホール',
      address: '〒113-0032 東京都文京区弥生１丁目１',
      accessLink: '詳しいアクセス情報はこちら →',
    },
    format: {
      title: '参加形式',
      type: 'ハイブリッド開催',
      description: '現地参加・オンライン参加両方可能',
    },
    language: {
      title: '言語',
      languages: '英語・日本語',
      interpretation: '同時通訳あり',
    },
  },
  
  speakers: {
    title: '登壇者',
    modal: {
      biography: '経歴・専門分野',
      achievements: '主な実績',
      sessions: '登壇セッション',
    },
  },
  
  schedule: {
    title: "タイムテーブル",
    register: "参加登録",
  },
  organizations: {
    universityOfTokyo: "東京大学",
    globalCommonsCenter: "東京大学グローバル・コモンズ・センター",
    riken: "理化学研究所",
  },
  
  partners: {
    title: 'パートナー',
    coHost: '共催',
    sponsor: '協賛',
  },
  
  access: {
    title: 'アクセス',
    address: {
      title: '会場住所',
      venue: '〒113-0032 東京都文京区弥生１丁目１',
      office: '東京大学弥生講堂一条ホール',
    },
    nearestStation: {
      title: '最寄り駅',
      metro1: '東京メトロ　東大前駅(南北線) 徒歩1分',
      metro2: '東京メトロ　根津駅(千代田線) 徒歩8分',
    },
  },
  
  footer: {
    register: '参加登録',
  },
  
  sessions: {
    opening: 'オープニング',
    keynote: '基調講演',
    keynoteSubtitle: '',
    session1: 'Session 1',
    session1Subtitle: 'Capitalizing Nature for Growth and Stability',
    session2: 'Session 2',
    session2Subtitle: 'The Fast Track to Nature as an Investable Asset',
    break: '休憩',
    breakDescription: 'ランチ休憩',
    session3: 'Session 3',
    session3Subtitle: 'Capitals approach - Linking with ANCA Summit in Cape Town',
    specialSession: "Special Session",
    specialSessionSubtitle: "The latest message from the Planetary Boundaries Science Planetary Health Check 2025",
    session4: 'Session 4',
    session4Subtitle: 'Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons',
    session5: 'Session 5',
    session5Subtitle: 'Will AI & HPC be the answer? The light and shadow of modern AI and its infrastructures towards Global Commons objectives',
    closing: 'Concluding',
    collaboration: '"Global Nature Positive Summit" との連携セッション',
    collaborationSubtitle: '（ハイブリッド／オンライン）',
    collaborationNote: '参照: https://www.dcceew.gov.au/initiatives/nature-summit-2024',
  },
};

// 英語翻訳
export const enTranslations: TranslationData = {
  nav: {
    about: 'About',
    details: 'Date & Venue',
    speakers: 'Speakers',
    schedule: 'Schedule',
    partners: 'Partners',
    access: 'Access',
    register: 'Register',
  },
  
  hero: {
    title: 'Global Commons Forum',
    subtitle: 'Safeguarding Global Commons through Transition to Nature Positive Economy',
    date: '7 October 2025',
    venue: 'Venue: University of Tokyo, Ichijo Hall',
    register: 'Register',
  },
  
  about: {
    title: 'About the Forum',
    description: 'Planetary boundary science shows that the current economic system is pushing the stability and resilience of the Earth system, the "global commons", beyond its limits. Soon we will go beyond the Earth’s safe operating zone which would no longer support human wellbeing. To avoid such a catastrophe, a fundamental transformation of the economic system is urgently required. One effective lever is to account for the full value of natural capital and incorporate it into our economic decision-making. At this Forum, a diverse group of experts will discuss pathways to accelerate the transition through valuing natural capital, linking local actions to the global level, and building effective AI governance to support the transition.',
    videoTitle: 'Highlight of Global Commons Forum 2025',
    register: 'Register',
  },
  
  details: {
    title: 'Date & Venue',
    dateTime: {
      title: 'Date & Time',
      value: 'Tuesday, October 7, 2025',
    },
    venue: {
      title: 'Venue',
      name: 'Ichijo Hall, Yayoi Auditorium, The University of Tokyo, Japan (Hybrid format)',
      address: 'Yayoi Auditorium(Ichijō Hall), 1-chōme-1-1 Yayoi, Bunkyo-Ku, Tokyo 113-0032',
      accessLink: 'Detailed access information →',
    },
    format: {
      title: 'Format',
      type: 'Hybrid Event',
      description: 'Both in-person and online participation available',
    },
    language: {
      title: 'Language',
      languages: 'English & Japanese',
      interpretation: 'Simultaneous interpretation available',
    },
  },
  
  speakers: {
    title: 'Speakers',
    modal: {
      biography: 'Biography & Expertise',
      achievements: 'Key Achievements',
      sessions: 'Speaking Sessions',
    },
  },
  
  schedule: {
    title: 'Schedule',
    register: 'Register',
  },
  
  organizations: {
    universityOfTokyo: 'The University of Tokyo',
    globalCommonsCenter: 'Center for Global Commons, The University of Tokyo',
    riken: 'RIKEN',
  },
  
  partners: {
    title: 'Partners',
    coHost: 'Co-hosts',
    sponsor: 'Sponsors',
  },
  
  access: {
    title: 'Access',
    address: {
      title: 'Venue Address',
      venue: '1 Chome-1-1 Yayoi, 文京区 Bunkyo City, Tokyo 113-0032',
      office: 'The University of Tokyo Ichijo Hall, Yayoi Auditorium',
    },
    nearestStation: {
      title: 'Nearest Stations',
      metro1: '1-minute walk from Tokyo Metro Nanboku Line Todai-mae Station',
      metro2: '8-minute walk from Tokyo Metro Chiyoda Line Nezu Station',
    },
  },
  
  footer: {
    register: 'Register',
  },
  
  sessions: {
    opening: 'Opening',
    keynote: 'Keynote Address',
    keynoteSubtitle: '',
    session1: 'Session 1',
    session1Subtitle: 'Capitalizing Nature for Growth and Stability',
    session2: 'Session 2',
    session2Subtitle: 'The Fast Track to Nature as an Investable Asset ',
    break: 'Break',
    breakDescription: 'Lunch Break',
    session3: 'Session 3',
    session3Subtitle: 'Capitals approach - Linking with ANCA Summit in Cape Town',
    specialSession: "Special Session",
    specialSessionSubtitle: "The latest message from the Planetary Boundaries Science Planetary Health Check 2025",
    session4: 'Session 4',
    session4Subtitle: 'Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons',
    session5: 'Session 5',
    session5Subtitle: 'Will AI & HPC be the answer? The light and shadow of modern AI and its infrastructures towards Global Commons objectives',
    closing: 'Concluding',
    collaboration: 'Collaboration Session with "Global Nature Positive Summit"',
    collaborationSubtitle: '(Hybrid/Online)',
    collaborationNote: 'Reference: https://www.dcceew.gov.au/initiatives/nature-summit-2024',
  },
};

// 翻訳データのマップ
export const translations: Record<Language, TranslationData> = {
  ja: jaTranslations,
  en: enTranslations,
};

// 翻訳関数
export const getTranslation = (language: Language): TranslationData => {
  return translations[language];
};

// 現在の言語を取得
export const getCurrentLanguage = (pathname: string): Language => {
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'ja';
};

// 言語切り替え用のURL生成
export const getLanguageUrl = (currentPath: string, targetLanguage: Language): string => {
  // 現在のパスから言語プレフィックスを除去
  const pathWithoutLang = currentPath.replace(/^\/(ja|en)/, '') || '/';
  
  if (targetLanguage === 'ja') {
    return pathWithoutLang === '/' ? '/' : pathWithoutLang;
  } else {
    return `/en${pathWithoutLang}`;
  }
};
