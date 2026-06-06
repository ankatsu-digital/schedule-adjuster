# Schedule Adjuster - スケジュール調整

複数のスケジュールを簡単に調整し、最適な時間帯を自動提案するウェブアプリケーションです。

## 機能

- **イベント作成**: タイトル、説明、利用可能な時間帯を指定してイベントを作成
- **参加者管理**: 参加者を招待し、各自のスケジュール予定を入力してもらう
- **自動提案**: AI/機械学習を使用して最適な時間帯を自動提案
- **リアルタイム更新**: Firebaseを使用したリアルタイムデータベース

## 技術スタック

- **フロントエンド**
  - React 18.2
  - TypeScript
  - Tailwind CSS
  - Vite
  - React Router
  - Lucide React (アイコン)
  - QRCode.React (QRコード生成)

- **バックエンド & データベース**
  - Firebase (Authentication & Firestore)

## セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

1. リポジトリをクローン
```bash
git clone https://github.com/ankatsu-digital/schedule-adjuster.git
cd schedule-adjuster
```

2. 依存パッケージをインストール
```bash
npm install
```

3. 環境変数を設定
```bash
cp .env.example .env
# .envファイルをFirebaseの認証情報で編集
```

4. 開発サーバーを起動
```bash
npm run dev
```

ブラウザで `http://localhost:5173` にアクセス

## ビルド

本番環境向けにビルド
```bash
npm run build
```

## プロジェクト構成

```
src/
├── components/        # 再利用可能なUIコンポーネント
├── pages/            # ページコンポーネント
├── services/         # Firebase・ビジネスロジック
├── hooks/            # カスタムReactフック
├── types.ts          # TypeScript型定義
├── firebase.ts       # Firebase設定
├── App.tsx           # メインコンポーネント
├── main.tsx          # エントリーポイント
└── index.css         # グローバルスタイル
```

## ページ一覧

- `/` - ホームページ
- `/create` - イベント作成ページ
- `/event/:eventId` - イベント詳細・参加ページ

## 使用方法

1. **イベント作成**
   - ホームページの「新しいイベントを作成」をクリック
   - イベント名、説明、利用可能な時間帯を入力
   - 「イベント作成」をクリック

2. **参加者招待**
   - 作成されたイベントのURLを参加者に共有
   - 参加者がイベント詳細ページで名前とメール、スケジュール予定を入力
   - 「回答を送信」をクリック

3. **結果確認**
   - イベント詳細ページで全参加者の回答を確認
   - 自動提案された最適な時間帯を確認

## ライセンス

MIT

## サポート

問題が発生した場合は、GitHubの[Issues](https://github.com/ankatsu-digital/schedule-adjuster/issues)で報告してください。
