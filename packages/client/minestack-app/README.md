# MinestackApp

Minecraftサーバーを管理するWebアプリ

## Npm Script

### yarn start

**CI/CD用スクリプト**
Reactをデバック実行を行う。3000番ポートを使用。
ポートを変更する場合はGithubActionsのスクリプトも変更すること

### yarn build

**CI/CD用スクリプト**
ReactをProductionビルドする。

### yarn licenses:build

`package.json`に記述されている`dependencies`からライセンス情報を収集する
`yarn build`コマンドの中で呼び出されることを前提とする。

### yarn test

単体テストを実行する。Watchオプションがデフォルトで有効になっている。

### yarn test:coverage

**CI/CD用スクリプト**
単体テストのカバレッジを取得する。

### yarn test:e2e

**CI/CD用スクリプト**
End 2 Endテストを実行する。

### yarn test:e2e:open

End 2 Endテストを実行する。Windows環境向けコマンド。UNIXでは`yarn test:e2e`を利用すること。