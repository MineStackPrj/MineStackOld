# Soracom API

Clientに提供するコンポーネントを提供する。

## Src Directory

- common: 全てのClientで利用する共通コンポーネントを提供

## Npm Script

### yarn test

単体テストを実行する。Watchオプションがデフォルトで有効になっている。

### yarn test:update

スナップショットテストの結果を更新する。**プルリクエストを出す前には必ず更新を済ませておく必要がある。**

### yarn test:coverage

**CI/CD用スクリプト**
単体テストのカバレッジを取得する。

### yarn storybook

Storybookを起動する。6006番ポートを使用。

### yarn storybook:build

**CI/CD用スクリプト**
Storybookの静的コンテナを生成する。
