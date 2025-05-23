# 🛍️ customer

**customer** は、小規模店舗向け商品管理アプリ「[seller](https://seller-weld.vercel.app/)」と連携する、**お客様（顧客）専用の Web アプリケーション**です。

## 🔍 概要

QR コードを通じて顧客がスマートフォンから直接商品詳細を確認し、そのままオンラインで閲覧・購入できるシンプルな UI 設計が特徴です。

店舗側が `seller` で管理した商品情報を Supabase 経由で取得し、リアルタイムに表示します。

## ✨ 主な機能

- 📱 QR コードから商品ページに直接アクセス
- 🛒 商品一覧・詳細ページの閲覧
- 🌐 英語翻訳（DeepL API 連携）
- 💳 Stripe による決済（クレジットカード対応）
- 🔐 顧客ログイン（ロールベースで制御）
- 👍 いいね機能の実装(お気に入りの商品のいいねが可能)
- 😎 マイページでのいいねした商品の表示機能

## 🧩 技術スタック

| 分類            | 技術                         |
| --------------- | ---------------------------- |
| フロントエンド  | Next.js, React, TypeScript   |
| バックエンド 　 | Supabase (DB, Auth, Storage) |
| 決済            | Stripe                       |
| 翻訳            | DeepL API                    |

## 🔗 seller との連携

- Supabase の共通テーブル（例: `shopUsers`, `shopposts`）を使用
- ログインユーザーの `role` が `customer` の場合に本アプリへアクセス可能
- Row Level Security（RLS）によりデータの読み書きを制限

### Vercelのリンク
Vercel:[customer](https://customer-gamma-one.vercel.app/)