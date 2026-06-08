# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


# Global Commons Forum Website

Global Commons Forumのイベント用Webサイトです。プラネタリー・バウンダリーのレーダーチャートが背景で回転し、中心に本物の地球テクスチャを使用した3D地球が表示される美しいインタラクティブサイトです。

## 🚀 Demo

![Preview](./preview.gif) <!-- Optional if you record a GIF -->

## 🛠 Features

### 3D地球表示
- **本物のテクスチャ**: NASA Blue Marbleの衛星画像を使用
- **Three.js実装**: TextureLoaderによる高品質な3D地球
- **自動回転**: 滑らかな自転アニメーション
- **フォールバック**: テクスチャ読み込み失敗時のCanvas描画による代替表示
- **透明背景**: SVGレーダーチャートとの完璧な統合

### レーダーチャート機能
- **SVGベース**: プラネタリー・バウンダリーの9つの境界を可視化
- **セクション連動**: スクロールで40度ずつ段階的に回転
- **Easingアニメーション**: 1.2秒のcubic-bezier(0.25, 0.46, 0.45, 0.94)
- **9時位置強調**: 回転中常に左側のセクターが拡大・強調表示
- **画面右端配置**: レーダーチャートの中心が画面右端に固定
- **リスクレベル色分け**: 高リスク（赤）、中リスク（オレンジ）、安全（緑）

### ナビゲーション
- **ヘッダーナビ**: 6つのセクションへのスムーススクロール
- **デスクトップ対応**: 横並びナビゲーション
- **モバイル対応**: ハンバーガーメニュー（768px以下）
- **アクティブ状態**: 現在のセクションをハイライト表示
- **ガラスモーフィズム**: backdrop-filterによる美しい背景ぼかし

### サイト構成
- **トップ**: Global Commons Forumの紹介
- **開催概要**: フォーラムの目的と特徴（3つの特徴をグリッド表示）
- **日時・場所**: 開催詳細情報（4つの詳細項目）
- **登壇者**: 主要スピーカー4名の紹介
- **タイムテーブル**: 3日間の詳細スケジュール
- **パートナー**: 主催・協賛・学術パートナー一覧

### プラネタリー・バウンダリー
1. **CLIMATE CHANGE** (気候変動) - 高リスク
2. **NOVEL ENTITIES** (新規物質) - 高リスク
3. **STRATOSPHERIC OZONE DEPLETION** (成層圏オゾン層破壊) - 安全
4. **ATMOSPHERIC AEROSOL LOADING** (大気エアロゾル負荷) - 中リスク
5. **OCEAN ACIDIFICATION** (海洋酸性化) - 中リスク
6. **BIOGEOCHEMICAL FLOWS** (生物地球化学的循環) - 高リスク
7. **FRESHWATER CHANGE** (淡水利用) - 高リスク
8. **LAND-SYSTEM CHANGE** (土地システム変化) - 高リスク
9. **BIOSPHERE INTEGRITY** (生物圏の完全性) - 高リスク

## 🎨 技術スタック

### フロントエンド
- **React 18**: 最新のReactフレームワーク
- **TypeScript**: 完全な型安全性
- **Vite**: 高速な開発環境
- **Three.js**: 3D地球レンダリング
- **SVG**: レーダーチャート描画

### スタイリング
- **CSS3**: カスタムCSS
- **レスポンシブデザイン**: モバイルファースト
- **CSS Grid & Flexbox**: モダンなレイアウト
- **CSS Transitions**: 滑らかなアニメーション
- **Backdrop Filter**: ガラスモーフィズム効果

### 3D技術
- **Three.js**: WebGL 3Dライブラリ
- **TextureLoader**: 画像テクスチャ読み込み
- **MeshPhongMaterial**: リアルな光の反射
- **SphereGeometry**: 高品質な球体（64セグメント）
- **Canvas API**: フォールバック地球テクスチャ

## 📦 Installation

```bash
git clone https://github.com/yourname/globalcommonsforum.git
cd globalcommonsforum
npm install
npm run dev
```

## 🚀 Development

### 開発サーバー起動
```bash
npm run dev
```

### ビルド
```bash
npm run build
```

### プレビュー
```bash
npm run preview
```

## 📁 プロジェクト構造

```
globalcommonsforum/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── Earth.tsx          # 3D地球コンポーネント
│   ├── App.tsx                # メインアプリケーション
│   ├── App.css                # メインスタイル
│   ├── index.css              # グローバルスタイル
│   └── main.tsx               # エントリーポイント
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 主要機能の実装詳細

### 1. 3D地球コンポーネント (Earth.tsx)
- NASA Blue Marbleテクスチャの非同期読み込み
- Three.jsによる3D球体レンダリング
- 自動回転アニメーション
- React StrictMode対応の重複防止機能
- 適切なメモリ管理とクリーンアップ

### 2. レーダーチャート (App.tsx)
- SVGによる9つのプラネタリー・バウンダリー描画
- スクロール位置に基づくセクション検知
- 40度ずつの段階的回転アニメーション
- 9時位置セクターの動的強調表示

### 3. ナビゲーション
- デスクトップ・モバイル対応のレスポンシブナビ
- ハンバーガーメニューのアニメーション
- スムーススクロール機能
- アクティブセクションの自動検知

## 🌍 使用テクスチャ

- **地球テクスチャ**: NASA Blue Marble (Wikimedia Commons)
- **ライセンス**: パブリックドメイン
- **解像度**: 1024px
- **フォールバック**: Canvas APIによる手描き地球

## 📱 レスポンシブ対応

- **デスクトップ**: フル機能表示
- **タブレット (768px以下)**: ハンバーガーメニュー
- **スマートフォン (480px以下)**: コンパクトレイアウト
- **レーダーサイズ**: 画面サイズに応じて自動調整

## 🎨 デザインシステム

### カラーパレット
- **背景**: #0a0a0a (ダークブラック)
- **高リスク**: #ff4500 (オレンジレッド)
- **中リスク**: #ffa500 (オレンジ)
- **安全**: #22c55e (グリーン)
- **海洋**: #1e40af (ブルー)
- **アクセント**: #ffa500 (オレンジ)

### タイポグラフィ
- **フォント**: Arial, sans-serif
- **見出し**: 2.5rem - 4rem
- **本文**: 1rem - 1.2rem
- **ナビ**: 1rem - 1.1rem

## 🔧 カスタマイズ

### 地球テクスチャの変更
```typescript
// src/components/Earth.tsx の textureLoader.load() 部分
textureLoader.load(
  'your-earth-texture-url.jpg', // ここを変更
  resolve,
  undefined,
  reject
);
```

### レーダー回転角度の調整
```typescript
// src/App.tsx の sections 配列
const sections = [
  { id: 'hero', name: 'トップ', angle: 0 },
  { id: 'about', name: '開催概要', angle: 60 }, // この角度を変更
  // ...
];
```

## 🐛 トラブルシューティング

### 地球が表示されない場合
1. ネットワーク接続を確認
2. ブラウザのコンソールでエラーを確認
3. フォールバック地球が表示されているか確認

### レーダーが回転しない場合
1. スクロール位置を確認
2. セクションのref設定を確認
3. ブラウザの開発者ツールでJavaScriptエラーを確認

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 クレジット

- **地球テクスチャ**: NASA Blue Marble
- **Three.js**: 3Dライブラリ
- **React**: UIフレームワーク
- **Vite**: ビルドツール
