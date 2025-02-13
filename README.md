SNS App
プロジェクト概要
このアプリは、ユーザーが投稿を作成し、他のユーザーと共有できるシンプルな SNS プラットフォームです。ユーザーはメールや Google アカウントを使ってサインインし、投稿の作成、削除、ページネーションを通じて投稿を閲覧することができます。
技術スタック
フロントエンド: React, Tailwind CSS
バックエンド: Supabase (認証とデータベース)
その他: React Router, Context API
セットアップ手順

1. リポジトリをクローンします。
   git clone https://github.com/58yang/portfolio-sns-app.git
   cd sns-app

2. 必要な依存関係をインストールします。
   npm install

3. Supabase のプロジェクトを作成し、環境変数を設定します。
   .env ファイルを作成し、Supabase の URL と API キーを設定します。

4. アプリを起動します。
   npm start

##機能一覧
ユーザー認証（メール、Google）
投稿の作成、削除
投稿のページネーション
ユーザープロフィールの表示

##学んだことや挑戦したこと
認証の実装: Supabase を使った認証機能の実装により、セキュアなログインシステムを構築しました。
状態管理: React の Context API を用いて、アプリ全体でのユーザーセッション管理を行いました。
UI/UX の改善: Tailwind CSS を使用して、レスポンシブで直感的なユーザーインターフェースをデザインしました。

##今後の展望
リアルタイム更新: 投稿のリアルタイム更新機能を追加予定です。
コメント機能: 投稿に対するコメント機能を実装し、ユーザー間のインタラクションを促進します。
通知機能: 新しい投稿やコメントがあった際にユーザーに通知を送る機能を追加します。
