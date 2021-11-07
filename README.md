# template
コーディングテンプレート<br>


▼CSSについて
※適宜調整

■SASS/CSSのディレクトリ構成
    css/
    └──style.css  ----sass(scss)をstyle.cssに圧縮。

    scss/
        ├── foundation/
        │   ├── (function/)
        │   ├── mixin/    ----- mixin設定
        │   ├── vars/     ----- 変数設定
        │   └── base/     ----- ベーススタイル設定
        ├── layout
        ├── object/
        │   ├── component/
        │   ├── project/
        │   ├── utility/
        └── style.scss ----- scssファイルを集約。


■「FLOCSS（フロックス）」
    クラス名の命名規則（MindBEMding, SMACSS）
    ・ファイルのモジュール化
    ・モジュールをレイヤーでまとめる
    ・クラス名に接頭辞（プレフィックス）をつける
    Sass（scss記法）を使う前提で進める。


■クラス名の命名規則（MindBEMding, SMACSS）
    クラス名の付け方はBEM（ベム）を元にした「MindBEMding（マインドベムディング）」をベースにしている。
    BEMは親要素であるBlockに対して、子要素であるElementやバージョン違いであるModifier（モディファイア）が依存する関係性になる。
    詳細度はなるべくフラットな状態になるように、ElementとModiferはBlockを連結させない。

    // Good
    .block {} // 親要素
    .block__element {} // 子要素
    .block--modifier {} // 親要素のバージョン違い
    .block__element--modifier {} // 子要素のバージョン違い

    // Bad
    .block {}
    .block .block__element {}
    .block .block--modifier {}
    .block .block__element--modifier {}
    ElementとModifierはBlockの名前を引き継ぐことで、どのBlockを親としているのかという関係性を示しながら、名前の重複を避けています。クラスセレクターにしかスタイルを指定しないのもBEMの特徴の1つ。


■クラス名に接頭辞（プレフィックス）をつける
    レイヤーにまとめたモジュールは、そのレイヤーごとに接頭辞（プレフィックス）をつけます。
    .l- Layoutレイヤー
    .c- Componentレイヤー
    .p- Projectレイヤー
    .u- Utilityレイヤー
    .is- クリックなどのイベントが発生している要素に付与する
    .js- JavaScriptから参照される要素（スタイルは当てない）
    個別ページ用のCSSも接頭辞をつけたほうがベターです。接頭辞をつけることで名前の重複をさらに抑えることができます。




参照：https://www.tam-tam.co.jp/tipsnote/html_css/post10205.html
