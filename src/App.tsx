import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import { Particles } from "./components/magicui/particles";
import { InteractiveHoverButton } from "./components/magicui/interactive-hover-button";
import { Timeline } from "./components/ui/timeline";
import { SpeakersMarquee } from "./components/ui/speakers-marquee";
import { SessionInfo } from "./components/ui/session-info";
import { Footer } from "./components/ui/footer";
import { LanguageSwitcher } from "./components/ui/language-switcher";
import { motion } from "motion/react";
import {
  trackSectionView,
  trackSpeakerModalOpen,
  trackRegistrationClick,
} from "./utils/analytics";
import { getCurrentLanguage, getTranslation, type Language } from "./utils/i18n";

// セクション情報
const sections = [
  { id: "about", name: "開催概要" },
  { id: "details", name: "日時・場所" },
  { id: "speakers", name: "登壇者" },
  { id: "schedule", name: "タイムテーブル" },
  { id: "partners", name: "パートナー" },
  { id: "access", name: "アクセス" },
];

// タイムラインデータ - SessionInfoコンポーネント内でi18nを使用するため言語分岐不要
const getTimelineData = (t: ReturnType<typeof getTranslation>) => {
  return [
    {
      title: "09:00-09:40",
      content: (
        <SessionInfo
          title={t.sessions.opening}
          speakers={[
            {
              name: "Makoto Gonokami",
              role: "President, RIKEN",
              color: "text-blue-300",
            },
          ]}
        />
      ),
    },
    {
      title: "09:40-10:20",
      content: (
        <SessionInfo
          title={t.sessions.keynote}
          subtitle=""
          speakers={[
            {
              name: "Tom Crowther",
              role: "Professor and founder of Restor",
              color: "text-white",
            },
            {
              name: "Dominic Waughray",
              role: "Executive Vice President, WBCSD",
              color: "text-white",
            }
          ]}
          description=""
        />
      ),
    },
    {
      title: "10:10-11:10",
      content: (
        <SessionInfo
          title={t.sessions.session1}
          subtitle={t.sessions.session1Subtitle}
          speakers={[
            {
              name: "Mark Gough",
              role: "CEO, Capitals Coalition",
              color: "text-white",
            },
            {
              name: "Dominic Waughray",
              role: "Executive Vice President, WBCSD",
              color: "text-white",
            },
            {
              name: "Hiroyuki Isono",
              role: "President & CEO, Oji Holdings Corporation",
              color: "text-white",
            },
            {
              name: "Robert Watson",
              role: "Former Chair of IPBES, online",
              color: "text-white",
            },
            {
              name: "Moderated by Naoko Ishii",
              role: "Professor and Director, University of Tokyo",
              color: "text-white",
            }
          ]}
          description=""
        />
      ),
    },
    {
      title: "11:25-12:15",
      content: (
        <SessionInfo
          title={t.sessions.session2}
          subtitle={t.sessions.session2Subtitle}
          speakers={[
            {
              name: "Vera Songwe",
              role: "Brookings, online",
              color: "text-white",
            },
            {
              name: "Lee Howell",
              role: "Executive Director, Villars Institute",
              color: "text-white",
            },
            {
              name: "Makoto Haraguchi",
              role: "MS&AD Insurance Group Holdings, Inc. Fellow",
              color: "text-white",
            },
            {
              name: "Rong Yu",
              role: "S&P Global, online",
              color: "text-white",
            },
            {
              name: "Moderated by Guido Schmidt-Traub",
              role: "Partner, Systemiq",
              color: "text-white",
            },
          ]}
          description=""
        />
      ),
    },
    {
      title: "12:15-13:15",
      content: (
        <SessionInfo
          title={t.sessions.break}
          description={t.sessions.breakDescription}
        />
      ),
    },
    {
      title: "13:30-14:00",
      content: (
        <SessionInfo
          title={t.sessions.session3}
          subtitle={t.sessions.session3Subtitle}
          speakers={[
            {
              name: "Dorothy Maseke",
              role: "Head, African Natural Capital Alliance Secretariat, online",
              color: "text-white",
            },
            {
              name: "Participants of ANCA Summit",
              role: "",
              color: "text-white",
            },
            {
              name: "Moderated by Mark Gough",
              role: "CEO, Capitals Coalition",
              color: "text-white",
            },
          ]}
          description=""
        />
      ),
    },
    {
      title: "14:00-14:20",
      content: (
        <SessionInfo
          title={t.sessions.specialSession}
          subtitle={t.sessions.specialSessionSubtitle}
          speakers={[
            { name: "Johan Rockstrom", role: "Professor and Director, PIK, online", color: "text-blue-300" },
          ]}
          description=""
        />
      ),
    },
    {
      title: "14:20-15:20",
      content: (
        <SessionInfo
          title={t.sessions.session4}
          subtitle={t.sessions.session4Subtitle}
          speakers={[
            {
              name: "Tom Crowther",
              role: "Professor and founder of Restor",
              color: "text-white",
            },
            {
              name: "Keiichi Mochida",
              role: "CSRS Team Director, RIKEN",
              color: "text-white",
            },
            {
              name: "Rishi Kalra",
              role: "Executive Director and Group CFO, Olam Food Ingredients (ofi)",
              color: "text-white",
            },
            {
              name: "Yasutoshi Miyamoto",
              role: "Nippon Life Insurance Company",
              color: "text-white",
            },
            {
              name: "Moderated by Martin Stuchtey",
              role: "CEO, The Landbanking Group",
              color: "text-white",
            },
          ]}
          description=""
        />
      ),
    },
    {
      title: "15:30-16:20",
      content: (
        <SessionInfo
          title={t.sessions.session5}
          subtitle={t.sessions.session5Subtitle}
          speakers={[
            {
              name: "Hiroaki Kitano",
              role: "President & CEO at Sony CSL",
              color: "text-white",
            },
            {
              name: "Thomas C. Schulthess",
              role: "Professor, ETH Zurich / Director, Swiss National Supercomputing Center",
              color: "text-white",
            },
            {
              name: "Martin Stuchtey",
              role: "CEO, The Landbanking Group",
              color: "text-white",
            },
            {
              name: "Moderated by Satoshi Matsuoka",
              role: "RIKEN",
              color: "text-white",
            },
          ]}
          description=""
        />
      ),
    },
    {
      title: "16:20-16:45",
      content: (
        <SessionInfo
          title={t.sessions.closing}
          speakers={[
            { name: "Teruo Fujii", role: "President, University of Tokyo", color: "text-blue-300" },
            { name: "Mahi Patki", role: "Environmental Advocate", color: "text-blue-300" },
            { name: "Kazuki Tsuda", role: "UTokyo graduate student", color: "text-blue-300" },
            { name: "Moderated by Ken Fukushi", role: "Dean, IFI, University of Tokyo", color: "text-blue-300" }
          ]}
        />
      ),
    },
  ];
};

const assetPath = (path: string) => {
  const cleanedPath = path.replace(/^\/gcf\//, "").replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${cleanedPath}`;
};

// 講演者データ - 日英両方の情報を含む
const speakersData = [
  {
    name: {
      en: "Johan Rockström",
      ja: "Johan Rockström"
    },
    title: {
      en: "Director of the Potsdam Institute for Climate Impact Research; Professor in Earth System Science, Potsdam University, and Professor in Water Systems and Global Sustainability, Stockholm University",
      ja: "Director of the Potsdam Institute for Climate Impact Research; Professor in Earth System Science, Potsdam University, and Professor in Water Systems and Global Sustainability, Stockholm University"
    },
    img: "/gcf/speakers/johan_rockstrom.jpg",
    bio: {
      en: "Johan Rockström is an internationally recognized scientist on global sustainability and Earth resilience. " +
          "He led the development of the Planetary Boundaries framework for human development. " +
          "He is deeply involved in research on the future of the Anthropocene and tipping points in the Earth System " +
          "as well as a leading scientist on global water resources. \n" +
          "Professor Rockström is laureate of many international science awards and a driving force behind " +
          "international scientific initiatives, including the Earth Commission, and the Planetary Boundaries Science Initiative. " +
          "He consults the United Nations and other national and multilateral government organizations and " +
          "business networks on global sustainability issues.",
      ja: ""
    },
    sessions: {
      en: ["14:00-14:20 Special Session The latest message from the Planetary Boundaries Science Planetary Health Check 2025"],
      ja: ["14:00-14:20 Special Session The latest message from the Planetary Boundaries Science Planetary Health Check 2025"]
    }
  },
  {
    name: {
      en: "Naoko Ishii",
      ja: "石井 菜穂子"
    },
    title: {
      en: "Special Presidential Envoy for Global Commons, The University of Tokyo. " +
          "Professor and Director of the Center for Global Commons",
      ja: "東京大学グローバル・コモンズ担当総長特使、未来ビジョン研究センター 特任教授、" +
          "グローバル・コモンズ・センター ダイレクター。東京大学博士（国際協力学）"
    },
    img: "/gcf/speakers/Naoko_Ishii.jpg",
    bio: {
      en: "Dr. Naoko Ishii is Professor and Director of the Center for Global Commons (CGC) at the University of Tokyo. " +
          "Before joining UTokyo, she was the CEO and Chairperson of the Global Environment Facility (GEF) from 2012 to 2020. " +
          "She is a vocal advocate for catalyzing systems change for sustainable development within planetary boundaries. " +
          "She brings her expertise to global discourse by joining the Independent High-Level Expert Group on Climate Finance, " +
          "Global Commission on the Economics of Water (GCEW), Food System Economics Commission, " +
          "High-Level Independent Panel on Financing Pandemic Preparedness, among others. " +
          "Her earlier roles include Deputy Vice Minister of Finance in Japan, senior positions at the World Bank and IMF.",
      ja: "1981年大蔵省 (現財務省) 入省。国際通貨基金 (IMF) エコノミスト、世界銀行ベトナム担当、" +
          "世界銀行スリランカ担当局長などを歴任。2010年財務省副財務官。2012年地球環境ファシリティ (GEF) CEO兼議長。" +
          "2020年8月より東京大学理事。2020年に東京大学に新設されたグローバル・コモンズ・センターのダイレクターとして、" +
          "人類の共有財産である「グローバル・コモンズ」（安定的な地球システム）の責任ある管理について、" +
          "国際的に共有される知的枠組みの構築と実践を目指している。"
    },
    sessions: {
      en: ["10:10-11:10 Session 1 Capitalizing Nature for Growth and Stability (Moderator)"],
      ja: ["10:10-11:10 Session 1 Capitalizing Nature for Growth and Stability (モデレーター)"]
    }
  },
  {
    name: {
      en: "Thomas Ward Crowther",
      ja: "Thomas Ward Crowther"
    },
    title: {
      en: "Professor of ecology and the founding co-chair of the advisory board for " +
          "the United Nations Decade on Ecosystem Restoration",
      ja: "Professor of ecology and the founding co-chair of the advisory board for " +
          "the United Nations Decade on Ecosystem Restoration"
    },
    img: "/gcf/speakers/Tom.jpeg",
    bio: {
      en: "Thomas Ward Crowther is a professor of ecology and the founding co-chair of the advisory board for " +
          "the United Nations Decade on Ecosystem Restoration. He is the head of Crowther Lab, " +
          "an interdisciplinary research group exploring the role of biodiversity in regulating Earth's climate. " +
          "In 2020 he founded restor, an international organization that supports hundreds of thousands of " +
          "local community-restoration initiatives across the globe. He was a finalist in Prince William's earthshot prize, " +
          "and the world economic forum recognized him as a young global leader for his contributions to global nature conservation.",
      ja: ""
    },
    sessions: {
      en: [
        "9:40-10:10 Keynote Address", 
        "14:20-15:20 Session 4 Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons"
      ],
      ja: [
        "9:40-10:10 Keynote Address", 
        "14:20-15:20 Session 4 Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons"
      ]
    }
  },
  {
    name: {
      en: "Hiroyuki Isono",
      ja: "磯野 裕之"
    },
    title: {
      en: "President & CEO of Oji Holdings Corporation",
      ja: "代表取締役社長、CEO 王子ホールディングス株式会社"
    },
    img: "/gcf/speakers/Hiroyuki_Isono.jpg",
    bio: {
      en: "Mr. Hiroyuki Isono is the President & CEO of Oji Holdings Corporation. " +
          "He has vast experience in overseas business development and contributed a lot to Oji's global expansion. \n" +
          "He was appointed to current role in 2022 and described company's purpose " +
          "\"Grow and manage the sustainable forest, develop and deliver the products from renewable forest, " +
          "and Oji will bring this world a brighter future filled with hope\". \n" +
          "He believes sustainable forestry can activate various forest ecosystem service such as " +
          "water resource conservation, global warming mitigation, and biodiversity conservation " +
          "which are economically and socially important.",
      ja: "海外事業に豊富な経験を有し、王子グループの東南アジア、オセアニア、ヨーロッパ等での展開に貢献。" +
          "2022年のCEO就任後、パーパス「森林を健全に育て、その森林資源を活かした製品を創造し、" +
          "社会に届けることで、希望あふれる地球の未来の実現に向け、時代を動かしていく」を発表。" +
          "持続可能な森林管理が、水資源涵養、地球温暖化緩和、生物多様性保全等、" +
          "社会・経済的に重要な役割をもたらすことを信念とした経営を実践。"
    },
    sessions: {
      en: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset"],
      ja: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset"]
    }
  },
  {
    name: {
      en: "Hiroaki Kitano",
      ja: "北野 宏明"
    },
    title: {
      en: "President and CEO of Sony Computer Science Laboratories, Inc. (Sony CSL)",
      ja: "ソニーコンピュータサイエンス研究所(ソニーCSL)代表取締役社長"
    },
    img: "/gcf/speakers/Hiroaki_Kitano.png",
    bio: {
      en: "Hiroaki Kitano is President and CEO of Sony Computer Science Laboratories, Inc. (Sony CSL). Kitano joined Sony CSL as a researcher in 1993 and has served as President and CEO since 2011. He served as Chief Technology Officer of Sony Group Corporation from 2022 to 2024 and has been Chief Technology Fellow since 2025. As a researcher at Carnegie Mellon University, Kitano built large-scale data-driven AI systems on massively parallel computers, for which he received the Computers and Thought Award from IJCAI. At Sony CSL and California Institute of Technology, he pioneered the field of systems biology.  Outside Sony, Kitano is a member of the OECD Expert Group on AI Futures, Japan’s AI Strategy Council and AI Safety Institute. Within academia, he serves as a professor at Okinawa Institute of Science and Technology (OIST). He is the Founding President of RoboCup Federation. In 2021, Kitano established the Nobel Turing Challenge, a grand challenge to develop a new engine for scientific discovery.",
      ja: "ソニーコンピュータサイエンス研究所(ソニーCSL)代表取締役社長。1993年 ソニーCSLにリサーチャーとして入社し、2011年より同研究所の代表取締役社長を務めている。2022年から2024年までソニーグループ株式会社のCTO、2025年よりチーフテクノロジーフェローを務める。自身の研究領域においては、カーネギーメロン大学にて、大規模データ駆動型AIシステムを超並列計算モデルで構築する研究に取り組み、国際人工知能学会(IJCAI)のThe Computers and Thought Awardを受賞。その後、ソニーCSLおよびカリフォルニア工科大学での研究を通じて、システムバイオロジーの新分野を確立。ソニーでの役職に加え、経済協力開発機構(OECD)の Expert Group on AI Futuresや、日本政府のAI戦略会議(イノベーション政策強化推進のための有識者会議)の構成員、独立行政法人 情報処理推進機構(IPA)に設置されているAIセーフティ・インスティティートの顧問、学校法人沖縄科学技術大学院大学(OIST)で教授を務めている。そのほか、ロボカップ国際委員会ファウンディング・プレジデントを務める。2011年に科学的発見のための新しいAIエンジンを開発するという壮大なチャレンジを掲げたNobel Tuning Challengeを設立。"
    },
    sessions: {
      en: ["15:30-16:20 Session 5 Will AI & HPC be the answer? The light and shadow of modern AI and its infrastructures towards Global Commons objectives"],
      ja: ["15:30-16:20 Session 5 Will AI & HPC be the answer? The light and shadow of modern AI and its infrastructures towards Global Commons objectives"]
    }
  },
  {
    name: {
      en: "Mark Gough",
      ja: "Mark Gough"
    },
    title: {
      en: "Founder and CEO of the Capitals Coalition",
      ja: "Founder and CEO of the Capitals Coalition"
    },
    img: "/gcf/speakers/Mark_Gough.jpeg",
    bio: {
      en: "Mark Gough is the founder and CEO of the Capitals Coalition. As a collaborative leader, he brings significant private sector experience, and as a dynamic public speaker and negotiator, he brings together diverse views and perspectives behind a common vision. Mark led the development of the Natural Capital Protocol and was also on the board of the Social and Human Capital Coalition. Among other board and advisory positions, Mark is Co-Chair of the Impact Management Platform, is on the Steering Committee for the Global Commons Alliance and the Nature Positive Initiative, and was one of the founders of Business for Nature. ",
      ja: ""
    },
    sessions: {
      en: [
        "10:10-11:10 Session 1 Capitalizing Nature for Growth and Stability",
        "13:30-14:00 Session 3 Capitals approach - Linking with ANCA Summit in Cape Town (Moderator)"
      ],
      ja: [
        "10:10-11:10 Session 1 Capitalizing Nature for Growth and Stability",
        "13:30-14:00 Session 3 Capitals approach - Linking with ANCA Summit in Cape Town (モデレーター)"
      ]
    }
  },
  {
    name: {
      en: "Guido Schmidt-Traub",
      ja: "Guido Schmidt-Traub"
    },
    title: {
      en: "Partner at Systemiq Ltd.",
      ja: ""
    },
    img: "/gcf/speakers/Guido-Schmidt-Traub.jpg",
    bio: {
      en: "Dr. Guido Schmidt-Traub is Partner at Systemiq Ltd. where he drives work on nature and climate finance, adaptation, value chain and country transitions. From 2021-2024, he served as Managing Partner of the firm. Previously he served as Executive Director of the UN Sustainable Development Solutions Network, which supports the design and implementation of the Sustainable Development Goals and the Paris Agreement. He has been deeply involved in developing long-term decarbonization pathways for G20 members. Previously he served as CEO of Paris-based CDC Climate Asset Management and Partner at South Pole Carbon Asset Management, where he worked on energy finance. As head of the UNDP MDG Support Team and Associate Director of the UN Millennium Project he has advised governments around the world (including some 30 countries in Africa) on their development strategies and financing frameworks. He holds a PhD in Economics from Wageningen University, an M.Phil. in Economics from Oxford University (Rhodes Scholar), and a Masters in Physical Chemistry from the Free University of Berlin.",
      ja: ""
    },
    sessions: {
      en: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset (Moderator)"],
      ja: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset (モデレーター)"]
    }
  },
  {
    name: {
      en: "Martin Stuchtey",
      ja: "Martin Stuchtey"
    },
    title: {
      en: "Founder of The Landbanking Group.",
      ja: ""
    },
    img: "/gcf/speakers/Martin_Stuchtey.JPG",
    bio: {
      en: "Prof. Dr. Martin Stuchtey is a geologist and economist who has dedicated himself to the renewal of the economic system in the sense of a natural capital approach. Together with Dr. Sonja Stuchtey, he is the founder of The Landbanking Group - a technology company that makes biodiversity measurable, assessable and investable. He also founded and managed the SYSTEMIQ group of companies. Previously, he worked for McKinsey & Co. for 20 years, where he was responsible for the sustainability division, among other things. He is a professor of resource economics at the University of Innsbruck, author, multiple advisor, father of six children, organic farmer and an avid alpinist.",
      ja: ""
    },
    sessions: {
      en: ["14:20-15:20 Session 4 Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons (Moderator)"],
      ja: ["14:20-15:20 Session 4 Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons (モデレーター)"]
    }
  },
  {
    name: {
      en: "Robert Tony Watson",
      ja: "Robert Tony Watson"
    },
    title: {
      en: "Professor Emeritus at University of East Anglia, UK. Co-chair of UNEP’s Global Environmental Outlook-7 assessment",
      ja: ""
    },
    img: "/gcf/speakers/Robert_Watson.png",
    bio: {
      en: "Currently Professor Emeritus at University of East Anglia, UK and co-chair of UNEP’s Global Environmental Outlook-7 assessment.  Former strategic director for the Tyndall Center, UEA, chief scientific advisor in OSTP, White House; World Bank, and UK Defra.  Chaired international assessments on stratospheric ozone depletion, agricultural science and technology, the Millennium Ecosystem Assessment, IPCC, and IPBES, and UNEP’s Making Peace with Nature, and What’s Cooking.  Honors include, UK Knights Bachelor, UK Companion of the Order of Saint Michael and Saint Georg, Fellow of the UK Royal Society, and member of the American Philosophical Society; and Awards include the Asahi Glass Foundation Blue Planet Prize and UN Champion of the World for Science and Innovation.",
      ja: ""
    },
    sessions: {
      en: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset"],
      ja: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset"]
    }
  },
  {
    name: {
      en: "Vera Songwe",
      ja: "Vera Songwe"
    },
    title: {
      en: "Chair and Founder, Liquidity and Sustainability Facility, Non Resident Senior Fellow, Global Economy and Development, Brookings.",
      ja: ""
    },
    img: "/gcf/speakers/Vera_Songwe.jpeg",
    bio: {
      en: "Dr Vera Songwe is Chair and Founder of the Liquidity and Sustainability Facility. She is a senior nonresident fellow at the Brookings Institution with Global Economy and Development and the Africa Growth Initiative. She is the Co-Chair of the Independent High Level Expert Panel on Climate Finance, where she has supported the government of the UK and Egypt for COP27 and also for the Egypt and the UAE under COP28 working with Lord Nick Stern. Under these COP presidencies they authored the Songwe- Stern report on Climate finance as well the report on Accelerating implementation of Climate Finance. She co-chaired the Task Force Clima Independent Group of Experts on Climate Finance for the Brazilian G20.",
      ja: ""
    },
    sessions: {
      en: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset"],
      ja: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset"]
    }
  },
  {
    name: {
      en: "Lee Howell",
      ja: "Lee Howell"
    },
    title: {
      en: "Executive Director of the Villars Institute",
      ja: ""
    },
    img: "/gcf/speakers/Lee_Howell.png",
    bio: {
      en: "Professor Lee Howell  is the Executive Director of the Villars Institute, a Swiss non-profit foundation advancing interdisciplinary research, intergenerational collaboration, and systems leadership to accelerate the transition to a Nature Positive and Net Zero economy.   Lee served on the Managing Board of the World Economic Forum and was responsible for their Annual Meeting in Davos (2009-2021). Lee is a Titular Professor at the Geneva School of Economics and Management at the University of Geneva and a Senior Lecturer in the CEMS program at the University of St. Gallen where he teaches undergraduate, graduate, and executive courses on Disruptive Technologies, Systems Leadership, and the Fourth Industrial Revolution. He is active in promoting public awareness about Planetary Health Education in his capacity as a board member of the EAT Foundation, advisory board member of the Frontiers Planet Prize, Vice Chair of the Board of Governors of the International Baccalaureate (IB) and as a member of  Global Learning Council. ",
      ja: ""
    },
    sessions: {
      en: ["10:10-11:10 Session 1 Capitalizing Nature for Growth and Stability"],
      ja: ["10:10-11:10 Session 1 Capitalizing Nature for Growth and Stability"]
    }
  },
  {
    name: {
      en: "Dorothy Maseke",
      ja: "Dorothy Maseke"
    },
    title: {
      en: "Head of the African Natural Capital Alliance (ANCA) Secretariat and Africa Lead for Nature Finance & TNFD at FSD Africa",
      ja: ""
    },
    img: "/gcf/speakers/Dorothy_Maseke.JPG",
    bio: {
      en: "Dorothy is the Head of the African Natural Capital Alliance (ANCA) Secretariat and Africa Lead for Nature Finance & TNFD at FSD Africa, where she leads efforts to drive systemic change in nature finance across the continent. She spearheads the development of innovative financial products, services, and solutions that address nature-related risks while building a high-impact portfolio of projects and partnerships. Dorothy has played a pivotal role in strengthening the nature finance capabilities of African financial institutions, leading key initiatives such as the African pilot of the Taskforce on Nature-related Financial Disclosures (TNFD) and, most recently, the continent’s pilot of TNFD’s Nature Data Public Facility. Her work also includes mobilizing capital for nature by developing a pipeline of investible nature-based solutions through accelerators set up by FSD Africa, coordinating nature-related central bank stress testing across African countries, and supporting the development of National Nature Strategies across African countries. \n A recognized thought leader in global sustainability, Dorothy serves on the World Economic Forum’s Global Futures Council on Natural Capital and has previously represented Africa in international taskforces, including the Task Force on Climate-Related Financial Disclosures (TCFD) insurer pilot group and the Partnership for Carbon Accounting Financials (PCAF). She played a key role in co-creating and launching the Nairobi Declaration on Sustainable Insurance in collaboration with UNEP PSI and FSD Africa, a landmark commitment by African insurance leaders to advancing the UN Sustainable Development Goals. Dorothy’s contributions have earned her multiple accolades, including recognition among Kenya’s Top 40 Under 40 Women, Top 50 Women in Insurance in Africa by the African Insurance Organisation (AIO) in 2022, and Fin-Erth Top 101 Leading Women in Climate (Nature and Biodiversity) Global Awards in 2024. \n Dorothy is an author of two books – “She Leads” where she covers her leadership journey as well as “Becoming Nature Positive”, a book that sets out why Nature Positive is so critical now – and how it can be achieved across business, finance, governance and society.",
      ja: ""
    },
    sessions: {
      en: ["13:30-14:00 Session 3 Capitals approach - Linking with ANCA Summit in Cape Town"],
      ja: ["13:30-14:00 Session 3 Capitals approach - Linking with ANCA Summit in Cape Town"]
    }
  },
  {
    name: {
      en: "Kensuke Fukushi",
      ja: "福士 謙介"
    },
    title: {
      en: "Leading environmental engineer and sustainability scientist at the University of Tokyo’s Institute for Future Initiatives (IFI)",
      ja: "東京大学未来ビジョン研究センター　センター長　教授"
    },
    img: "/gcf/speakers/kensuke_fukushi.png",
    bio: {
      en: "Prof. Kensuke Fukushi is a leading environmental engineer and sustainability scientist at the University of Tokyo’s Institute for Future Initiatives (IFI), where he has served as Director since 2023. He also holds senior leadership and advisory roles at the United Nations University Institute for the Advanced Study of Sustainability (UNU-IAS). A co-founder of the Integrated Research System for Sustainability Science (IR3S) and head of the Urban Sustainability Science Laboratory, his research bridges climate resilience, water systems, and risk assessment. Prof. Fukushi has played a central role in advancing global sustainability dialogues through his work at IFI and UNU-IAS, and has served on the editorial board of the journal Sustainability Science since its inception. ",
      ja: "東北大学土木工学科卒業。米国ユタ大学博士課程を経て東北大学助手、アジア工科大学助教授、東京大学助教授を経て2013年より現職。土木環境工学を専門とし、サステイナビリティ学を日本で立ち上げたメンバーのひとり。地球と地域の環境問題、気候変動適応と緩和、地域エネルギーマネジメント、排水・廃棄物処理、土木環境インフラ、健康リスクマネジメントに関する研究を日本と海外の両方で進めている。"
    },
    sessions: {
      en: ["16:15-16:45 Concluding (Moderator)"],
      ja: ["16:15-16:45 Concluding (モデレーター)"]
    }
  },
  {
    name: {
      en: "Teruo Fujii",
      ja: "藤井 輝夫"
    },
    title: {
      en: "President, The University of Tokyo",
      ja: "東京大学 総長"
    },
    img: "/gcf/speakers/Teruo_Fujii.jpg",
    bio: {
      en: "Dr. Teruo Fujii is the 31st President of the University of Tokyo (UTokyo). He was previously the Executive Vice President in charge of finance and external relations for the university and took the office of the President on April 1, 2021. He has also served as an Executive Member (part-time) of the Japanese Cabinet Office's Council for Science, Technology and Innovation from March 2021 until February 2024. He was appointed as President of the Japan Association of National Universities in June 2025. Dr. Fujii received his Ph.D. in engineering from UTokyo in 1993. His research specializes in applied microfluidics systems and underwater technology.",
      ja: "1993年東京大学大学院工学系研究科博士課程修了・博士(工学)、同生産技術研究所や理化学研究所での勤務を経て、2007年東京大学生産技術研究所教授、2015年同所長。2018年東京大学大学執行役・副学長、2019年同理事・副学長(財務、社会連携・産学官協創担当)を務め、2021年より同総長に就任。専門分野は応用マイクロ流体システム、海中工学。"
    },
    sessions: {
      en: ["16:15-16:45 Concluding"],
      ja: ["16:15-16:45 Concluding"]
    }
  },
  {
    name: {
      en: "Keiichi Mochida",
      ja: "持田 恵一"
    },
    title: {
      en: "CSRS Team Director, RIKEN",
      ja: "バイオ生産情報研究チーム チームディレクター　理化学研究所 環境資源科学研究センター"
    },
    img: "/gcf/speakers/Keiichi_Mochida.jpg",
    bio: {
      en: "Keiichi Mochida is a Team Director at RIKEN Center for Sustainable Resource Science, specializing in genome informatics as well as plant genetics and breeding, including studies on plant responses to environmental change and the improvement of adaptive traits. His work also explores carbon fixation and utilization with microalgae, aiming to develop sustainable and profitable bio-based technologies for CO₂ capture and use through international and industrial collaborations. He promotes the “Planetary Resilience Science” project at RIKEN, aiming to contribute to the conservation and restoration of global commons. Mochida is also a Professor at Nagasaki University and a member of its Interfaculty Initiative in Planetary Health.",
      ja: "持田恵一は、理化学研究所環境資源科学研究センターのチームディレクターであり、ゲノム情報科学および植物の遺伝育種を専門とする。特に、環境変化に対する植物の応答や適応形質の向上に関する研究に取り組んでいる。また、微細藻類を用いた炭素固定・利用技術の研究も進めており、国際的および産業界との共同研究を通じて、持続可能かつ収益性のあるバイオベースのCO₂吸収・利用技術の開発を目指している。さらに、理化学研究所における「プラネタリー・レジリエンス科学」研究プロジェクトを推進し、グローバルコモンズの保全と回復への貢献を目指している。また、長崎大学の「プラネタリーヘルス学環」のメンバーでもある。"
    },
    sessions: {
      en: ["14:20-15:20 Session 4 Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons"],
      ja: ["14:20-15:20 Session 4 Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons"]
    }
  },
  {
    name: {
      en: "Shin Gonokami",
      ja: "五神 真"
    },
    title: {
      en: "President of RIKEN",
      ja: "理化学研究所理事長"
    },
    img: "/gcf/speakers/gonokami.jpg",
    bio: {
      en: "2022	President, RIKEN. \n2021	Professor, Graduate School of Science, University of Tokyo. \n2015	President, University of Tokyo. \n2014	Dean, Graduate School of Science, University of Tokyo \n2012	Vice President, the University of Tokyo \n2010	Professor, Graduate School of Science, University of Tokyo \n1998	Professor, Graduate School of Engineering, University of Tokyo \n1985	PhD, Department of Physics, Graduate School of Science, University of Tokyo \n1982	MSc, Department of Physics, Graduate School of Science, University of Tokyo \n1980	BSc, Faculty of Science, University of Tokyo \n\n Awards \n 2021	MIC Minister Award of Denpa-no-hi \n2013	Fellow, Optical Society of America \n2012	Fellow, American Physical Society \n2010	Matsuo Science Prize \n2001	Japan IBM Science Prize \n2001	Outstanding Paper Award of the Physical Society of Japan",
      ja: ""
    },
    sessions: {
      en: ["9:30-9:40 Opening"],
      ja: ["9:30-9:40 Opening"]
    }
  },
  {
    name: {
      en: "Satoshi Matsuoka",
      ja: "松岡 聡"
    },
    title: {
      en: "Director, RIKEN Center for Computational Science RIKEN Center for Computational Science",
      ja: "理化学研究所 計算科学研究センター センター長"
    },
    img: "/gcf/speakers/Satoshi_Matsuoka.jpeg",
    bio: {
      en: "Satoshi Matsuoka is the Director of the RIKEN Center for Computational Science (R-CCS) in Japan, " +
          "where he leads the development and operation of the flagship Fugaku supercomputer. " +
          "He is a renowned computer scientist and thought leader in high-performance computing, " +
          "with a focus on large-scale parallel systems, AI integration, and energy efficiency. " +
          "He previously led the development of the TSUBAME series of supercomputers at the Tokyo Institute of Technology " +
          "(currently at Institute of Science Tokyo)\n" +
          "His most famous awards include: \n" +
          "・ACM Gordon Bell Prizes (2011,2021) : The most prestigious award in the field of supercomputing. He is a two-time winner. \n" +
          "・IEEE-CS Sidney Fernbach Award (2014): One of the highest honors in the field of HPC. \n" +
          "・IEEE-CS Seymour Cray Computer Engineering Award (2022): The highest award in computer engineering and supercomputing, " +
          "making him the only individual to receive both the Fernbach and Seymour Cray awards. \n" +
          "・Medal of Honor with Purple Ribbon (2022): A prestigious commendation from the Emperor of Japan for his academic and scientific contributions. \n" +
          "・Public Service Medal (Friends of Singapore) (2025): Award in recognition of contributions and service to Singapore. \n" +
          "https://www.r-ccs.riken.jp/en/about/leadership/.",
      ja: "略歴\n" +
          "1986年 東京大学理学部情報科学科卒業\n" +
          "1988年 東京大学大学院理学系研究科情報科学専攻修士課程修了\n" +
          "1989年～1993年 東京大学理学部・助手\n" +
          "1993年 博士（理学）（東京大学）取得\n" +
          "1993年～1995年 東京大学工学部、同大学大学院情報理工学研究科・講師\n" +
          "1996年～2001年 東京工業大学情報理工学研究科数理・計算科学専攻・助教授\n" +
          "2001年～2018年 東京工業大学学術国際情報センター・教授\n" +
          "2002年 国立情報学研究所・客員教授\n" +
          "2012年～2018年 理化学研究所計算科学センター・客員主管研究員\n" +
          "2016年～2018年 産業技術総合研究所人工知能研究センター・特定フェロー\n" +
          "2017年 産業技術総合研究所－東京工業大学 実世界ビッグデータ・オープンイノベーションラボラトリ（RWBC-OIL)・ラボ長\n" +
          "2018年～ 理化学研究所計算科学研究センター・センター長（現職）、東京科学大学（旧：東京工業大学）・特定教授（兼職）\n\n" +
          "主な受賞歴\n" +
          "1999年 情報処理学会坂井記念賞\n" +
          "2006年 第2回日本学術振興会賞\n" +
          "2008年 International Supercomputing Conference ISC 2008 Award\n" +
          "2009年 米国計算機学会（ACM）フェロー\n" +
          "2011年 ACM Gordon Bell Prize (米国計算機学会ACMゴードンベル賞)\n" +
          "2012年 文部科学大臣表彰科学技術賞（開発部門）、「運用世界一グリーンぺタスパコンの開発」\n" +
          "2013年 大川出版賞「岩波講座 計算科学 別巻 スーパーコンピュータ」\n" +
          "2014年 IEEE Computer Society Sidney Fernbach Memorial Award (HPC・スーパーコンピュータ分野で最高峰の賞・日本人初)\n" +
          "2018年 ACM HPDC 2018 Achievement Award\n" +
          "2019年 SCAsia 2019 Asia HPC Leadership Award\n" +
          "2020年,2021年 スーパーコンピュータ「富岳」TOP500、HPCG、HPL-AI、Graph500三期連続世界1位四冠達成\n" +
          "2021年 ACM Gordon Bell Prize (2度目の受賞) 、情報処理学会功績賞\n" +
          "2022年 紫綬褒章、IEEE Computer Society Seymour Cray Computer Engineering賞(Fernbach 賞との両賞受賞は史上初)、情報処理学会功績賞、NEC C&C 財団 C&C賞\n" +
          "2023年 一般社団法人情報処理学会フェロー認定\n" +
          "2024年 HPCwire 35 Legendsに選出\n" +
          "2025年 シンガポールに対する功績と奉仕を称える「The Public Service Medal（The Singapore National Day Awards 2025）」を受章"
    },
    sessions: {
      en: ["15:30-16:20 Session 5 Will AI & HPC be the answer? The light and shadow of modern AI and its infrastructures towards Global Commons objectives (Moderator)"],
      ja: ["15:30-16:20 Session 5 Will AI & HPC be the answer? The light and shadow of modern AI and its infrastructures towards Global Commons objectives (モデレーター)"]
    }
  },
  {
    name: {
      en: "Dominic Kailashnath Waughray",
      ja: "Dominic Kailashnath Waughray"
    },
    title: {
      en: "Executive Vice President (EVP) and a member of the Leadership Team (LT) at the World Business Council for Sustainable Development (WBCSD)",
      ja: "Executive Vice President (EVP) and a member of the Leadership Team (LT) at the World Business Council for Sustainable Development (WBCSD)"
    },
    img: "/gcf/speakers/Dominic_Waughray.jpeg",
    bio: {
      en: "In his role as EVP, Dominic leads the Climate, Nature and Tackling Inequality Imperatives as part of WBCSD's strategy. " +
          "Working closely with WBCSD Member companies, governments, INGOs and international organizations he focuses on building, " +
          "scaling and accelerating collaborative business solutions that: reduce greenhouse gas emissions and mainstream climate change adaptation; " +
          "improve corporate accountability for decarbonization; scale corporate action to become nature positive and promote high integrity " +
          "nature for climate investments in nature-based solutions; and tackle rising inequality.\n" +
          "Dominic also has responsibility for WBCSD's global policy and advocacy and helping with fundraising. " +
          "Since joining WBCSD Dominic has raised US$9.25m to support the WBCSD-WRI hosted Greenhouse Gas Protocol, " +
          "and $2m to support the WBCSD Avoided Emissions Guidance. He has also grown the WBCSD Climate, Nature and Equity Imperatives " +
          "to now engage close to 200 WBCSD member companies, considerably raising engagement and income, " +
          "and is leading deeper collaboration with government and companies in China.\n" +
          "While at WBCSD Dominic was invited to be a Special Advisor to Stockholm +50 in 2022 and was elected to be UNEP Business Industry Major Group Co-Chair. " +
          "He is also the executive co-chair of the Greenhouse Gas Protocol, where he has helped to considerably strengthen its international governance " +
          "through the creation of a CEO-led global steering committee and an independent science-based standards board. " +
          "Dominic was also appointed to the Council of Trustees of the INGO Flaura and Fauna International in January 2024, " +
          "where he chairs a special investment/fund raising committee. He was a two term Trustee of the CGIAR International Water Management Institute " +
          "(2016-2024) and helped encourage new programs for tech and the environment into IWMI.\n" +
          "Before joining WBCSD Dominic was Managing Director and Member of the Managing Board at the World Economic Forum, " +
          "where he built and led the Forum's sustainability agenda from 2005. During this time, Dominic helped catalyze and build " +
          "a significant program of public-private sustainability collaboration (Tropical Forest Alliance, Friends of Ocean Action, " +
          "Nature Action Agenda, 1t.org, Climate Leaders Alliance, Mission Possible Partnership etc.) and raised over $60m " +
          "in philanthropic and government funding to support it.",
      ja: ""
    },
    sessions: {
      en: ["9:40-10:10 Keynote Address", "10:10-11:10 Session 1 Capitalizing Nature for Growth and Stability"],
      ja: ["9:40-10:10 Keynote Address", "10:10-11:10 Session 1 Capitalizing Nature for Growth and Stability"]
    }
  },
  {
    name: {
      en: "Yasutoshi Miyamoto",
      ja: "宮本 泰俊"
    },
    title: {
      en: "Head of Responsible Investment Strategy Office, Nippon Life Insurance Company",
      ja: "財務企画部 責任投融資推進室長, 日本生命保険相互会社"
    },
    img: "/gcf/speakers/Yasutoshi_Miyamoto.jpg",
    bio: {
      en: "Since joining Nippon Life Insurance Company in 1997, he has built extensive experience in asset management. He spent approximately 10 years leading structured finance operations focused on project finance within the finance and credit departments, in addition to around 4 years in equity investment. Since April 2023, he has served as head of the Responsible Investment Strategy Office, where he is dedicated to developing and implementing responsible investment strategies as an institutional investor, aiming to contribute to a sustainable society and enhance corporate value. He holds a Bachelor of Economy in the University of Tokyo and a Master of Finance in Waseda University.",
      ja: "1997年に日本生命に入社以来、一貫して資産運用分野において経験を積む。融資部門および審査部門にて約10年間、プロジェクトファイナンスを軸とした高度なストラクチャードファイナンス業務をリードした経験に加え、約4年間にわたり株式投資業務にも取り組む。2023年4月より、責任投融資推進室の室長として、持続可能な社会の実現と企業価値の向上を目指し、機関投資家として責任ある投資戦略の策定と実践に邁進している。"
    },
    sessions: {
      en: ["14:20-15:20 Session 4 Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons"],
      ja: ["14:20-15:20 Session 4 Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons"]
    }
  },
  {
    name: {
      en: "Makoto Haraguchi",
      ja: "原口 真"
    },
    title: {
      en: "MS＆AD Insurance Group Holdings, Inc. Fellow / TNFD Taskforce member",
      ja: "MS&ADインシュアランスグループホールディングス株式会社 フェロー / TNFDタスクフォースメンバー"
    },
    img: "/gcf/speakers/Makoto_Haraguchi.jpg",
    bio: {
      en: "Within the MS&AD Group, he began researching business and biodiversity around the year 2000, subsequently launching risk consulting services for clients. Guided by his conviction that nature-related risks cannot be resolved without collective action among multi-stakeholders, he has been involved in establishing and operating numerous platforms. Selected as a TNFD Taskforce member in 2021, he is supporting the promotion of an accurate understanding of nature-related issues within the Japanese market and their integration into the risk management cycle.",
      ja: "MS＆ADグループにおいて、2000年前後からビジネスと生物多様性の調査を行い、顧客にリスクコンサルティングサービスの提供を開始する。自然関連リスクは、マルチステーホルダーによる共同行動がなくては解決できないという考えのもと、数多くのプラットフォームの設立と運営にかかわってきた。2021年にTNFDタスクフォースメンバーに選定され、日本市場における自然関連課題に対する正確な理解の促進とリスクマネジメントサイクルへの統合を支援している。"
    },
    sessions: {
      en: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset"],
      ja: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset"]
    }
  },
  {
    name: {
      en: "Rishi Kalra",
      ja: "Rishi Kalra"
    },
    title: {
      en: "Executive Director and Group CFO, Olam Food Ingredients (ofi)",
      ja: "Executive Director and Group CFO, Olam Food Ingredients (ofi)"
    },
    img: "/gcf/speakers/Rishi_Kalra.JPG",
    bio: {
      en: "Rishi Kalra is the Executive Director and Group CFO of ofi (Olam Food Ingredients), a global leader in food and ingredients. He brings over 30 years of global finance leadership experience, having worked across Asia, Africa and Europe. He co-founded and has chaired the APAC CFO Leadership Network for Accounting for Sustainability (A4S), established by HM King Charles III. A qualified Chartered Accountant and Wharton Alumnus, Rishi is also a Fellow of the RSA (Royal Society of Arts) and has been recognized with multiple awards for advancing sustainability in finance.",
      ja: "Rishi Kalra is the Executive Director and Group CFO of ofi (Olam Food Ingredients), a global leader in food and ingredients. He brings over 30 years of global finance leadership experience, having worked across Asia, Africa and Europe. He co-founded and has chaired the APAC CFO Leadership Network for Accounting for Sustainability (A4S), established by HM King Charles III. A qualified Chartered Accountant and Wharton Alumnus, Rishi is also a Fellow of the RSA (Royal Society of Arts) and has been recognized with multiple awards for advancing sustainability in finance."
    },
    sessions: {
      en: ["14:20-15:20 Session 4 Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons"],
      ja: ["14:20-15:20 Session 4 Building Trusted Infrastructure for Nature Positive Economy: Local Actions for Global Commons"]
    }
  },
  {
    name: {
      en: "Thomas C. Schulthess",
      ja: "Thomas C. Schulthess"
    },
    title: {
      en: "Professor of Computational Physics, ETH Zurich / Director, Swiss National Supercomputing Center (CSCS)",
      ja: "Professor of Computational Physics, ETH Zurich / Director, Swiss National Supercomputing Center (CSCS)"
    },
    img: "/gcf/speakers/Thomas_Schulthess.jpg",
    bio: {
      en: "Since 2008, Thomas Schulthess has been a Professor of Computational Physics at ETH Zurich and the Director of the Swiss National Supercomputing Center (CSCS), where he has played a key role in advancing the design and operation of cutting-edge computational infrastructures. Thomas earned his Ph.D. in 1994 from ETH Zurich, focusing on surface physics—a work that successfully combined experimental research with supercomputing simulations. He continued his research in the United States, contributing to a DARPA-funded spintronics program and spending over ten years at Oak Ridge National Laboratory (ORNL). During his tenure at ORNL, he led teams that earned the ACM Gordon Bell Prizes in 2008 and 2009 by developing production-level applications capable of sustaining petaflop-scale performance on peta-scale supercomputers. Upon returning to Switzerland in 2008, Thomas initiated a broad effort to advance high-performance computing software in general and improve weather and climate simulation systems in particular. Under his leadership, CSCS became the first center in Europe to deploy a productive GPU-accelerated supercomputing system in 2013. His team, in collaboration with MeteoSwiss, Cray, and NVIDIA, co-designed a GPU-based weather forecasting system, which since 2016 has supported MeteoSwiss's COSMO-NEXT model at 1 km resolution—a development recognized by the 2016 Swiss ICT Award for Outstanding IT-Based Projects and Services. More recently, Thomas has led the development of the \"Alps\" infrastructure, which, as of 2024, stands as the most performant AI-capable supercomputing research facility in academia. He continues to contribute significantly to the fields of high-performance computing and AI-driven scientific discovery through his balanced approach to research and collaboration.",
      ja: ""
    },
    sessions: {
      en: ["15:30-16:20 Session 5 Will AI & HPC be the answer? The light and shadow of modern AI and its infrastructures towards Global Commons objectives"],
      ja: ["15:30-16:20 Session 5 Will AI & HPC be the answer? The light and shadow of modern AI and its infrastructures towards Global Commons objectives"]
    }
  },
  {
    name: {
      en: "Rong Yu",
      ja: "Rong Yu"
    },
    title: {
      en: "Sustainability Market Engagement Lead, APAC, S&P Global",
      ja: "Sustainability Market Engagement Lead, APAC, S&P Global"
    },
    img: "/gcf/speakers/Rong_Yu.png",
    bio: {
      en: "Rong leads S&P Global's sustainability market engagement in APAC. A sustainable development expert working at the intersections of climate, nature, business, and finance, Rong drives S&P Global's continued expansion and leadership in APAC's sustainable finance markets. Rong is an industry veteran with over a decade of experience in sustainability having held various roles at PwC Strategy&, World Bank and the United Nations Development Programme across New York, London, Hong Kong, and Geneva. Rong is a regular speaker and respected commentator on ESG and sustainable finance issues. She holds an Master of Public Administration from Cornell University in Ithaca, NY.",
      ja: ""
    },
    sessions: {
      en: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset"],
      ja: ["11:25-12:15 Session 2 The Fast Track to Nature as an Investable Asset"]
    }
  },
];

// 講演者データを言語に応じて変換する関数
const getSpeakers = (language: Language) => {
  return speakersData.map(speaker => ({
    name: speaker.name[language] || speaker.name.en,
    title: speaker.title[language] || speaker.title.en,
    img: assetPath(speaker.img),
    bio: speaker.bio[language] || speaker.bio.en,
    sessions: speaker.sessions[language] || speaker.sessions.en
  }));
};

export default function App() {
  const location = useLocation();
  const currentLanguage = getCurrentLanguage(location.pathname);
  const t = getTranslation(currentLanguage);
  const speakers = getSpeakers(currentLanguage);
  const timelineData = getTimelineData(t);
  
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<
    (typeof speakers)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const handleSpeakerClick = (speaker: (typeof speakers)[0]) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
    // モーダル開時に背景スクロールを無効化
    document.body.style.overflow = 'hidden';
    // 講演者モーダル開閉をトラッキング
    trackSpeakerModalOpen(speaker.name);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpeaker(null);
    // モーダル閉時に背景スクロールを復元
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      let newCurrentSection = 0;

      for (let i = 0; i < sections.length; i++) {
        const section = sectionRefs.current[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;

          // セクションの上部が画面の中央より上にあり、
          // セクションの下部が画面の中央より下にある場合、そのセクションがアクティブ
          if (
            scrollPosition + windowHeight / 2 >= sectionTop &&
            scrollPosition + windowHeight / 2 < sectionBottom
          ) {
            newCurrentSection = i;
            break;
          }

          // 最後のセクションの場合、少し緩い条件で判定
          if (
            i === sections.length - 1 &&
            scrollPosition + windowHeight / 2 >= sectionTop
          ) {
            newCurrentSection = i;
          }
        }
      }

      if (currentSection !== newCurrentSection) {
        setCurrentSection(newCurrentSection);
        // セクション表示をトラッキング
        trackSectionView(sections[newCurrentSection].name);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期チェック
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // ヘッダーの高さ + 余白
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* 全体背景パーティクル */}
      <div className="fixed top-0 left-0 w-screen h-screen z-[1] opacity-100 pointer-events-none">
        <Particles
          className="absolute top-0 left-0 w-full h-full"
          quantity={100}
          ease={50}
          color="#ffffff"
          size={2}
        />
      </div>

      {/* ヘッダーナビゲーション */}
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-[rgba(10,22,40, 0.95)] backdrop-blur-md border-b border-blue-400/40">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <div className="logo">
            <img
              onClick={() => scrollToSection("hero")}
              className="cursor-pointer h-8 md:h-10 object-contain max-w-[200px] md:max-w-[300px] hidden md:block"
              src={assetPath("/gcf/title-single.png")}
              alt="Global Commons Forum"
            />
            <img
              onClick={() => scrollToSection("hero")}
              className="cursor-pointer h-10 object-contain max-w-[200px] block md:hidden"
              src={assetPath("/gcf/title-multi.png")}
              alt="Global Commons Forum"
            />
          </div>

          {/* デスクトップナビゲーション（1000px以上） */}
          <nav className="hidden min-[1000px]:flex gap-4 xl:gap-6 items-center">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`nav-item text-sm xl:text-base ${
                  currentSection === index ? "active" : ""
                }`}
              >
                {t.nav[section.id as keyof typeof t.nav]}
              </button>
            ))}
            <LanguageSwitcher />
            <InteractiveHoverButton
              onClick={() => {
                trackRegistrationClick('header');
                window.open('https://ws.formzu.net/fgen/S744341790/', '_blank');
              }}
              className="registration-button bg-emerald-600 text-white border-2 border-emerald-600 hover:bg-emerald-700"
            >
              {t.nav.register}
            </InteractiveHoverButton>
          </nav>

          {/* モバイル用言語切り替えとハンバーガーメニューボタン（1000px未満） */}
          <div className="min-[1000px]:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              className="flex flex-col bg-none border-none cursor-pointer p-2 gap-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="メニューを開く"
            >
              <span
                className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
              ></span>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <nav className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`mobile-nav-item ${
                currentSection === index ? "active" : ""
              }`}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </header>

      {/* スクロール可能なコンテンツ */}
      <div className="content relative z-2">
        {/* トップセクション */}
        <section
          className="hero h-screen flex flex-col justify-center items-center text-center p-4 relative overflow-hidden w-screen" style={{ marginLeft: 'calc(-50vw + 50%)' }}
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          id="hero"
        >
          {/* 背景動画 */}
          <video 
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-70" 
            autoPlay 
            muted 
            loop 
            playsInline
            poster={assetPath("/gcf/top.JPG")}
            onLoadedData={(e) => {
              // 動画が読み込まれた後、確実にループ再生を設定
              const target = e.target as HTMLVideoElement;
              target.loop = true;
            }}
            onError={(e) => {
              // 動画が再生できない場合、背景画像に切り替え
              const target = e.target as HTMLVideoElement;
              target.style.display = 'none';
              const fallbackImg = target.nextElementSibling as HTMLImageElement;
              if (fallbackImg) {
                fallbackImg.style.display = 'block';
              }
            }}
          >
            <source src={assetPath("/gcf/gcf2025-trailer.webm")} type="video/webm" />
            Your browser does not support the video tag.
          </video>
          
          {/* 動画再生できない環境用のフォールバック画像 */}
          <img 
            src={assetPath("/gcf/top.JPG")} 
            alt="Global Commons Forum Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-70"
            style={{ display: 'none' }}
          />

          {/* 下部グラデーションオーバーレイ */}
          <div className="absolute bottom-0 left-0 right-0 h-3/10 z-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.4)_30%,transparent_100%)]"></div>

          {/* コンテンツオーバーレイ - 左下配置 */}
          <div className="absolute bottom-12 left-4 md:left-12 z-1 text-left">
            <img 
              src={assetPath("/gcf/title-multi.png")} 
              alt="Global Commons Forum" 
              className="mb-2 md:mb-4 h-27 md:h-40 object-contain"
              style={{ filter: 'drop-shadow(0 0 30px rgba(96, 165, 250, 0.3))' }}
            />
            <p className="text-md md:text-lg max-w-600 mb-2 mr-2">{t.hero.subtitle}</p>
            <p className="text-md md:text-lg max-w-600 mb-2">{t.hero.date}</p>
            <p className="text-md md:text-lg max-w-600 mb-4">{t.hero.venue}</p>
            <InteractiveHoverButton
              onClick={() => {
                trackRegistrationClick('hero');
                window.open('https://ws.formzu.net/fgen/S744341790/', '_blank');
              }}
              className="registration-button bg-emerald-600 text-white border-2 border-emerald-600 hover:bg-emerald-700 py-8 px-20 text-3xl"
            >
              {t.hero.register}
            </InteractiveHoverButton>
          </div>
        </section>

        {/* 開催概要セクション */}
        <section
          className="py-16 px-8 mx-auto max-w-7xl relative"
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          id="about"
        >
          <h2 className="font-bold mb-4 text-sky-300 text-3xl">{t.about.title}</h2>
          <div className="text-lg opacity-90 text-justify mb-12">
            {t.about.description.split('\n').map((line, index) => (
              <p key={index} className={index > 0 ? 'mt-4' : ''}>
                {line}
              </p>
            ))}
          </div>

          {/* 昨年の様子動画セクション */}
          <div className="mt-12">
            <h3 className="font-bold mb-6 text-sky-300 text-2xl text-center">
              {t.about.videoTitle}
            </h3>
            <div className="bg-[rgba(255,255,255,0.05)] p-6 rounded-xl">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/UqaalEvBduA"
                  title={t.about.videoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* 参加登録ボタン */}
          <div className="flex justify-center mt-12">
            <InteractiveHoverButton
              onClick={() => {
                trackRegistrationClick('about');
                window.open('https://ws.formzu.net/fgen/S744341790/', '_blank');
              }}
              className="registration-button bg-emerald-600 text-white border-2 border-emerald-600 hover:bg-emerald-700 py-8 px-20 text-3xl"
            >
              {t.about.register}
            </InteractiveHoverButton>
          </div>
        </section>

        {/* 日時・場所セクション */}
        <section
          className="py-16 px-8 mx-auto max-w-7xl relative"
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
          id="details"
        >
          <h2 className="font-bold mb-4 text-sky-300 text-3xl">{t.details.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-[rgba(255,255,255,0.05)] p-8 rounded-sm">
              <h3 className="text-sky-200 mb-2 text-xl">{t.details.dateTime.title}</h3>
              <p className="text-lg opacity-90 text-justify mb-2">
                {t.details.dateTime.value}
              </p>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] p-8 rounded-sm">
              <h3 className="text-sky-200 mb-2 text-xl">{t.details.venue.title}</h3>
              <p className="text-lg opacity-90 text-justify mb-2">
                {t.details.venue.name}
              </p>
              <p className="text-lg opacity-90 text-justify mb-2">
                {t.details.venue.address}
              </p>
              <button
                onClick={() => scrollToSection("access")}
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm underline mt-2"
              >
                {t.details.venue.accessLink}
              </button>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] p-8 rounded-sm">
              <h3 className="text-sky-200 mb-2 text-xl">{t.details.format.title}</h3>
              <p className="text-lg opacity-90 text-justify mb-2">
                {t.details.format.type}
              </p>
              <p className="text-lg opacity-90 text-justify mb-2">
                {t.details.format.description}
              </p>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] p-8 rounded-sm">
              <h3 className="text-sky-200 mb-2 text-xl">{t.details.language.title}</h3>
              <p className="text-lg opacity-90 text-justify mb-2">
                {t.details.language.languages}
              </p>
              <p className="text-lg opacity-90 text-justify mb-2">
                {t.details.language.interpretation}
              </p>
            </div>
          </div>
        </section>
        {/* 参加登録ボタン */}
        <div className="flex justify-center mt-12">
            <InteractiveHoverButton
              onClick={() => {
                trackRegistrationClick('schedule');
                window.open('https://ws.formzu.net/fgen/S744341790/', '_blank');
              }}
              className="registration-button bg-emerald-600 text-white border-2 border-emerald-600 hover:bg-emerald-700 py-8 px-20 text-3xl"
            >
              {t.schedule.register}
            </InteractiveHoverButton>
          </div>

        {/* 登壇者セクション */}
        <section
          className="py-12 px-8 mx-auto max-w-7xl relative"
          ref={(el) => {
            sectionRefs.current[3] = el;
          }}
          id="speakers"
        >
          <h2 className="font-bold mb-4 text-sky-300 text-3xl">{t.speakers.title}</h2>
          {/* 全画面講演者セクション */}
          <div
            className="w-screen relative z-2 flex items-center justify-center"
            style={{
              marginLeft: "calc(-50vw + 50%)",
              marginRight: "calc(-50vw + 50%)",
            }}
          >
            <SpeakersMarquee
              speakers={speakers}
              onSpeakerClick={handleSpeakerClick}
            />
          </div>
        </section>

        {/* タイムテーブルセクション - Timelineコンポーネントを使用 */}
        <section
          className="pt-8 pb-16 px-8 mx-auto max-w-7xl relative"
          ref={(el) => {
            sectionRefs.current[4] = el;
          }}
          id="schedule"
        >
          <h2 className="font-bold mb-4 text-sky-300 text-3xl">{t.schedule.title}</h2>
          <Timeline data={timelineData} />
          
          {/* 参加登録ボタン */}
          <div className="flex justify-center mt-12">
            <InteractiveHoverButton
              onClick={() => {
                trackRegistrationClick('schedule');
                window.open('https://ws.formzu.net/fgen/S744341790/', '_blank');
              }}
              className="registration-button bg-emerald-600 text-white border-2 border-emerald-600 hover:bg-emerald-700 py-8 px-20 text-3xl"
            >
              {t.schedule.register}
            </InteractiveHoverButton>
          </div>
        </section>

        {/* パートナーセクション */}
        <section
          className="py-16 px-8 mx-auto max-w-7xl relative"
          ref={(el) => {
            sectionRefs.current[5] = el;
          }}
          id="partners"
        >
          <h2 className="font-bold mb-4 text-sky-300 text-3xl">{t.partners.title}</h2>
          <div className="mt-8">
            <div className="mb-12">
              <h3 className="font-bold text-2xl mb-8 text-center">{t.partners.coHost}</h3>
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex bg-white p-8 text-center items-center font-bold text-black flex-col rounded-lg gap-4">
                  <img src={assetPath("/gcf/organizations/u_tokyo.svg")} alt={t.organizations.universityOfTokyo} />
                  <span className="text-md">{t.organizations.universityOfTokyo}</span>
                </div>
                <div className="flex bg-white p-8 text-center items-center font-bold text-black flex-col rounded-lg gap-4">
                  <img
                    src={assetPath("/gcf/organizations/cgc.svg")}
                    alt={t.organizations.globalCommonsCenter}
                  />
                  <span className="text-md">
                    {t.organizations.globalCommonsCenter}
                  </span>
                </div>
                <div className="flex bg-white p-8 text-center items-center font-bold text-black flex-col rounded-lg gap-4">
                  <img
                    src={assetPath("/gcf/organizations/riken.svg")}
                    alt={t.organizations.riken}
                    className="w-200 object-contain"
                  />
                  <span className="text-md">{t.organizations.riken}</span>
                </div>
              </div>
            </div>
            {/* <div className="mb-12">
              <h3 className="font-bold text-2xl mb-8 text-center">{t.partners.sponsor}</h3>
              <div className="gap-8 grid grid-cols-1">
                <div className="flex bg-white p-8 text-center items-center font-bold text-black flex-col rounded-lg gap-4">
                  <img
                    src={assetPath("/gcf/organizations/mitsubishi.svg")}
                    alt={t.organizations.mitsubishi}
                    className="max-w-150 object-contain"
                  />
                  <span className="text-md">{t.organizations.mitsubishi}</span>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* アクセスセクション */}
        <section
          className="py-16 px-8 mx-auto max-w-7xl relative"
          ref={(el) => {
            sectionRefs.current[6] = el;
          }}
          id="access"
        >
          <h2 className="font-bold mb-4 text-sky-300 text-3xl">{t.access.title}</h2>
          <div className="flex flex-col gap-8 mt-8">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
              <div className="bg-[rgba(255,255,255,0.05)] p-8 rounded-lg">
                <h3 className="text-sky-200 font-bold mb-4 text-xl">
                  {t.access.address.title}
                </h3>
                <p className="text-lg text-white text-justify mb-2 text-left">
                  {t.access.address.venue}
                </p>
                <p className="text-lg text-white text-justify mb-2 text-left">
                  {t.access.address.office}
                </p>
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] p-8 rounded-lg">
                <h3 className="text-sky-200 font-bold mb-4 text-xl">
                  {t.access.nearestStation.title}
                </h3>
                <p className="text-lg opacity-90 text-justify mb-2 text-white text-left">
                  {t.access.nearestStation.metro1}
                </p>
                <p className="text-lg opacity-90 text-justify mb-2 text-white text-left">
                  {t.access.nearestStation.metro2}
                </p>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255, 0.05)] rounded-xl w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.417822366676!2d139.7589395!3d35.71594150000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c3235aad81b%3A0xa1faf1248a51f64f!2sIchijo%20Hall%2C%20Yayoi%20Auditorium!5e0!3m2!1sen!2sjp!4v1754383403918!5m2!1sen!2sjp" 
                width="100%" 
                height="400" 
                style={{ border: 0, borderRadius: "10px" }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                title="会場地図">
              </iframe>
            </div>
          </div>
        </section>
        
        {/* フッター手前の参加登録ボタン */}
        <div className="flex justify-center pb-16">
          <InteractiveHoverButton
            onClick={() => {
              trackRegistrationClick('footer');
              window.open('https://ws.formzu.net/fgen/S744341790/', '_blank');
            }}
            className="registration-button bg-emerald-600 text-white border-2 border-emerald-600 hover:bg-emerald-700 py-6 px-16 text-2xl"
          >
            {t.footer.register}
          </InteractiveHoverButton>
        </div>
      </div>

      {/* フッター - TracingBeamの外に配置 */}
      <Footer />

      {/* 講演者詳細モーダル */}
      {isModalOpen && selectedSpeaker && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* 背景オーバーレイ */}
          <div
            className="absolute inset-0 bg-opacity-70 backdrop-blur-md"
            onClick={closeModal}
          ></div>

          {/* モーダルコンテンツ */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative bg-slate-900 text-white rounded-2xl max-w-4xl h-[80vh] overflow-hidden mx-4 z-10"
          >
            {/* 閉じるボタン */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* 上部/左側: 写真エリア */}
              <div className={`w-full md:w-1/2 relative h-1/2 md:h-full ${
                selectedSpeaker.name === 'Hiroaki Kitano' || selectedSpeaker.name === '北野 宏明'
                  ? 'flex items-center justify-center bg-slate-800 p-4'
                  : 'bg-slate-800'
              }`}>
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className={
                    selectedSpeaker.name === 'Hiroaki Kitano' || selectedSpeaker.name === '北野 宏明'
                      ? 'max-w-full max-h-full object-contain rounded-lg'
                      : 'w-full h-full object-cover'
                  }
                  style={
                    selectedSpeaker.name === 'Mark Gough'
                      ? { objectPosition: '50% 0%' }
                      : selectedSpeaker.name === '藤井 輝夫' || selectedSpeaker.name === 'Teruo Fujii'
                      ? { objectPosition: '50% 20%' }
                      :undefined
                  }
                  alt={selectedSpeaker.name}
                  src={selectedSpeaker.img}
                />
                {/* 写真上のオーバーレイ情報 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedSpeaker.name}
                    </h2>
                    <p className="text-sm md:text-lg text-blue-300">
                      {selectedSpeaker.title}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* 下部/右側: プロフィール情報 */}
              <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-blue-200 mb-3">
                      {t.speakers.modal.biography}
                    </h3>
                    <div className="text-sm text-gray-300 leading-relaxed">
                      {selectedSpeaker.bio.split('\n').map((line, index) => (
                        <p key={index} className={index > 0 ? 'mt-4' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>


                  <div>
                    <h3 className="text-lg font-semibold text-blue-200 mb-3">
                      {t.speakers.modal.sessions}
                    </h3>
                    <ul className="space-y-2">
                      {selectedSpeaker.sessions.map((session, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-300"
                        >
                          <span className="text-orange-400 mt-1 flex-shrink-0">
                            🎤
                          </span>
                          <span>{session}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
