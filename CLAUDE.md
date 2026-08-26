# CLAUDE.md

雪音りう オリジンストア（ https://shop.yukineriu.online ）のリポジトリです。
このファイルは Claude Code / AI アシスタント向けのガイドです。

## プロジェクト概要

VTuber「雪音りう」公式グッズの **1 ページ完結の静的通販サイト**。
カート機能やバックエンドは持たず、注文は **Google フォーム**、決済は
**JPYC（POL チェーン）または銀行振込** という運用でカバーしています。

- ビルドツールなし、依存パッケージなし、テストなし（`package.json` は存在しない）
- 素の HTML / CSS / JavaScript（ES5〜ES6、フレームワーク不使用）
- 表示言語は日本語のみ（`<html lang="ja">`）

## ファイル構成

```
index.html    ページ骨格。ヘッダー / ヒーロー / 商品一覧(空) / 送料バナー /
              支払い方法 / 注文の流れ / フッター / モーダル / QR オーバーレイ
script.js     商品データ(products 配列)とすべての挙動。カード描画・モーダル・
              ギャラリー・支払いタブ・アドレスコピー・トースト
style.css     全スタイル（約 1,400 行）。:root の CSS 変数 → セクション別ブロック
              → @media → スクロールバー / セレクション の順

CNAME                       カスタムドメイン shop.yukineriu.online
.github/workflows/static.yml  GitHub Pages への自動デプロイ
sozai/1-3.png               「ご注文からお届けまでの流れ」ステップ画像
*.png / *.svg               商品画像・ロゴ・背景・QR コード（ルート直下に平置き）
```

**ディレクトリを切らずルート直下に画像を平置き**するのが既存の慣習です。
新しく画像を追加する場合もこれに合わせてください（`sozai/` は流れ図専用）。

## 開発ワークフロー

### ローカル確認

ビルド不要。任意の静的サーバーで開くだけです。

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

`file://` で直接開いても概ね動きますが、`navigator.clipboard` などが
効かないことがあるためサーバー経由を推奨します。

### デプロイ

`main` への push で `.github/workflows/static.yml` が発火し、
**リポジトリ全体（`path: '.'`）** がそのまま GitHub Pages へ公開されます。

- ビルドステップは無いので、**コミットした内容がそのまま本番**です
- 作業用ファイルや未使用画像を置きっぱなしにしない
- `main` 以外への push ではデプロイされません（`workflow_dispatch` で手動実行可）

### ブランチ / コミット

- 日常の変更は `main` へ直接コミットされてきました
- コミットメッセージは**日本語**。`feat:` / `style:` の Conventional Commits 風
  接頭辞が付くこともあれば、素の日本語だけのこともあります
  （例: `style: JPYCおトクバッジの背景色を淡い緑、文字色を濃い緑に変更` /
  `ロゴ画像追加、リンク修正、商品詳細に画像はイメージです追記`）
- 変更点を列挙する読点区切りのスタイルに揃えると自然です

## 商品の追加・編集

商品は `script.js` 冒頭の `products` 配列だけで管理されています。
`index.html` の `#products-grid` は空で、`renderProducts()` が描画します。

```js
{
  id: 'badge-riu',              // DOM id (product-card-<id>) に使われる一意キー
  name: 'オリジナル缶バッジ（雪音りう）',
  jpycPrice: '¥450',            // JPYC 決済価格（税込）
  normalPrice: '¥500',          // 通常価格（税込）
  discount: '10%',              // 「（10%おトク）」表示用
  image: 'ff70d8c4-....png',    // カード / モーダルのメイン画像
  images: ['a.png', 'b.png'],   // 任意。2 枚以上でモーダルがギャラリー表示になる
  badge: 'New!',                // 左上バッジ
  badgeType: 'new',             // 'new' | 'sale' | 'set' → badge-new/-sale/-set
  badge2: 'JPYCで10%おトク',     // 2 段目バッジ（badge-second が付与される）
  badge2Type: 'sale',
  description: '……… ※画像はイメージです',
  tags: ['44mm', '缶バッジ', 'JPYC対応'],  // 'JPYC対応' のみ .modal-tag.jpyc
}
```

### 値を変えるときの注意

- **割引率は 3 か所で整合を取る**必要があります:
  `jpycPrice` / `normalPrice` の実差額、`discount`、`badge2` の文言。
  価格を変えたら 3 つとも直してください。
- 価格表記は常に**税込**で、UI 側に「（税込）」が付きます。
- 商品説明の末尾には慣例として `※画像はイメージです` を入れています。
- `badgeType` / `badge2Type` は上記 3 値以外を渡すとクラスが付かず素の見た目に
  なります。新種を足すなら `style.css` の `.badge-*` も追加してください。

## 重複している定数（片方だけ直さない）

同じ値がコード中の複数箇所にハードコードされています。変更時は全部直すこと。

| 値 | 出現箇所 |
| --- | --- |
| Google フォーム URL | `index.html` のヘッダー CTA、`script.js` の `GOOGLE_FORM_URL` |
| JPYC アドレス `0xfD90…A575` | `index.html` のアドレスボックス、QR オーバーレイ |
| 送料条件（800 円 / 2,000 円以上無料） | `index.html` の送料バナー |
| 銀行口座情報 | `index.html` の `.bank-table` |

## JavaScript の作法

- **すべてグローバル関数**です。`index.html` の インライン `onclick`
  （`copyAddress()` / `showQR()` / `closeQR(event)` / `closeModal()` /
  `goToForm()`）と、`script.js` が生成する HTML 内の
  `switchGalleryImage(i)` / `goToForm()` から呼ばれます。
  → **モジュール化（`type="module"`）や IIFE で包むと全部壊れます。**
- `script.js` は `</body>` 直前で `defer` なしに読み込まれます。トップレベルで
  `#modal-overlay` や `.payment-tab` に `addEventListener` しているため、
  読み込み位置を動かさないでください。
- 描画は `innerHTML` によるテンプレート文字列。データは `products` 配列由来の
  静的な値のみで、ユーザー入力は一切混ざりません。
  外部由来の文字列を差し込む変更をする場合はエスケープを検討してください。
- モーダル / QR を開くときは `document.body.style.overflow = 'hidden'`、
  閉じるときに空文字へ戻す、という背景スクロール抑止をペアで行っています。
  新しいオーバーレイを足すときも同じ扱いにしてください。
- Escape キーはモーダルと QR の両方を閉じます（`document` レベルの keydown）。

### キャッシュバスティング

`index.html` は `<script src="script.js?v=16percent">` のように
**手書きのクエリ文字列**でキャッシュを回避しています。
`script.js` を変更したらこの `?v=` の値も更新してください
（値は連番ではなく変更内容にちなんだ短い文字列）。
`style.css` にはクエリが付いていないため、CSS の反映が遅れることがあります。

## CSS の作法

- 先頭 `:root` に色・影・角丸・トランジション・フォントの変数を集約。
  **色は必ず `var(--pink-400)` などの変数経由**で（ピンク / ブルー / パープル
  各 100〜400、`--lavender` `--mint` `--cream` とグレースケール）。
- セクション区切りは `/* ---------- SECTION NAME ---------- */` の形式。
  新しいブロックもこの形に揃えてください。
- レスポンシブは **`@media (max-width: 900px)` と `(max-width: 600px)` の 2 段のみ**。
  ファイル末尾付近の `RESPONSIVE` ブロックにまとめる方針で、
  各セクションの中に散らさないでください。
- 商品グリッドは PC 3 列 → 900px 以下 2 列 → 600px 以下も 2 列（gap のみ縮小）。
- フォントは Google Fonts の Zen Maru Gothic / M PLUS Rounded 1c。
  `--font-main` / `--font-accent` 経由で使います。
- 装飾は絵文字と CSS アニメーション（`@keyframes` が 7 個）で構成。
  丸ゴシック＋パステルのかわいい系トンマナを維持してください。

## 画像・アセットの注意点

- ファイル名に**スペースや日本語**を含むものがあります。
  - `orizginstore logo.png` → HTML では `orizginstore%20logo.png` と URL エンコード
  - `haikei りう.png` → CSS では `url('haikei りう.png')` とクォート付きでそのまま
  - `riusta-pr.png-noplice.png` / `jhgsagd.png-noplice.png` のような
    二重拡張子の名前もそのまま使われています
  → **既存ファイル名は勝手にリネームしない**でください。参照が壊れます。
- 商品画像は 1.7〜2.4 MB の PNG が多く、最適化パイプラインはありません。
  新規追加時は事前に手元で圧縮してからコミットするのが望ましいです。
- 現時点でルート直下・`sozai/` の画像はすべてどこかから参照されています。

## やらないこと / 注意

- **決済まわりの文言や注意書きを勝手に緩めない**。JPYC は POL チェーン限定、
  GOX 等の免責、フォーム送信 → 入金の順序、といった記述は運用上の重要事項です。
- 銀行口座・ウォレットアドレス・連絡先メールは実在の値です。
  依頼がない限り変更しないでください。
- 商品名・価格・在庫に関わる文言は独断で変えず、指示された内容のみ反映すること。
