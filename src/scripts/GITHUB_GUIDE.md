# GitHub API 連携機能ガイド

## 概要

このモジュールは、GitHub API を使用してユーザーの GitHub 活動をリアルタイムで表示する機能を提供します。

## 機能

### 1. GitHub 統計情報

- 公開リポジトリ数
- 総スター数
- 総フォーク数
- フォロワー数

### 2. 最新リポジトリ表示

- 最近更新された 6 つのリポジトリを表示
- 各リポジトリの情報:
  - リポジトリ名
  - 説明
  - 使用言語
  - スター数とフォーク数
  - 最終更新日時

### 3. キャッシュ機能

- API リクエストを最小限に抑えるため、10 分間データをキャッシュ
- API rate limit を考慮した設計

## ファイル構成

### `github.js`

GitHub API 連携のメインモジュール

**主要な関数:**

- `fetchUserData()`: ユーザー情報を取得
- `fetchRepositories()`: リポジトリ情報を取得
- `calculateGitHubStats()`: 統計情報を計算
- `formatRelativeTime()`: 日付を相対的な表現に変換
- `initializeGitHubActivity()`: GitHub Activity セクションを初期化

### `components.css`

GitHub Activity 用のスタイル定義

**主要なクラス:**

- `.github-activity-section`: メインコンテナ
- `.github-stats`: 統計情報グリッド
- `.github-repos-grid`: リポジトリグリッド
- `.github-loading`: ローディング状態
- `.github-error`: エラー状態

### `responsive.css`

レスポンシブ対応のスタイル

**ブレークポイント:**

- モバイル (< 768px): 2 列グリッド
- タブレット (768px+): 4 列グリッド
- デスクトップ (1024px+): 3 列リポジトリグリッド

## 設定

### `GITHUB_CONFIG`オブジェクト

```javascript
const GITHUB_CONFIG = {
  USERNAME: "Nyayuta1060", // GitHubユーザー名
  API_BASE: "https://api.github.com",
  CACHE_DURATION: 10 * 60 * 1000, // キャッシュ期間(ミリ秒)
  MAX_REPOS: 6, // 表示するリポジトリ数
};
```

## カスタマイズ方法

### ユーザー名の変更

`github.js`の`GITHUB_CONFIG.USERNAME`を変更してください。

### 表示リポジトリ数の変更

`github.js`の`GITHUB_CONFIG.MAX_REPOS`を変更してください。

### キャッシュ期間の変更

`github.js`の`GITHUB_CONFIG.CACHE_DURATION`を変更してください（ミリ秒単位）。

### 言語の色をカスタマイズ

`components.css`の`.language-dot[data-language="..."]`セクションで色を追加・変更できます。

## エラーハンドリング

### API エラー時の挙動

- ローディング状態を表示
- エラー発生時は、エラーメッセージと GitHub プロフィールへのリンクを表示
- コンソールにエラーログを出力

### フォールバック

- API が使用できない場合、GitHub プロフィールへの直接リンクを表示
- キャッシュデータがあれば、それを使用

## API 制限について

GitHub API には認証なしで使用する場合、以下の制限があります:

- **Rate Limit**: 60 リクエスト/時間（IP アドレスごと）

キャッシュ機能により、通常の使用では制限に引っかかることはありません。

### Personal Access Token の使用（オプション）

より高い制限（5000 リクエスト/時間）が必要な場合は、Personal Access Token を使用できます:

```javascript
async function fetchGitHubAPI(endpoint) {
  const response = await fetch(`${GITHUB_CONFIG.API_BASE}${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: "token YOUR_PERSONAL_ACCESS_TOKEN", // 追加
    },
  });
  // ...
}
```

⚠️ **注意**: トークンをクライアントサイドのコードに含めると、誰でもアクセスできるため、推奨しません。

## トラブルシューティング

### データが表示されない

1. ブラウザのコンソールでエラーを確認
2. ネットワークタブで API 応答を確認
3. GitHub ユーザー名が正しいか確認

### ローディングが終わらない

1. ネットワーク接続を確認
2. GitHub API のステータスページを確認: https://www.githubstatus.com/
3. ブラウザのキャッシュをクリア

## 今後の拡張案

- [ ] GitHub GraphQL API でコントリビューション情報を取得
- [ ] スター付きリポジトリの表示
- [ ] 言語別のコード統計グラフ
- [ ] プルリクエストやイシューの統計
- [ ] コミットアクティビティのヒートマップ

## 参考リンク

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitHub GraphQL API Documentation](https://docs.github.com/en/graphql)
- [Rate Limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
