import React, { useState, useMemo } from 'react';

export default function P4GFusionCalculator() {
  const [mode, setMode] = useState('fusion');
  const [fusionType, setFusionType] = useState('2body');
  const [reverseType, setReverseType] = useState('2body');
  const [persona1, setPersona1] = useState('');
  const [persona2, setPersona2] = useState('');
  const [persona3, setPersona3] = useState('');
  const [targetPersona, setTargetPersona] = useState('');
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [search3, setSearch3] = useState('');
  const [searchTarget, setSearchTarget] = useState('');
  const [maxResults, setMaxResults] = useState(10);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [materialPersona1, setMaterialPersona1] = useState('');
  const [materialPersona2, setMaterialPersona2] = useState('');
  const [searchMaterial1, setSearchMaterial1] = useState('');
  const [searchMaterial2, setSearchMaterial2] = useState('');
  const [currentLv1, setCurrentLv1] = useState('');
  const [currentLv2, setCurrentLv2] = useState('');
  const [currentLv3, setCurrentLv3] = useState('');

  // JSONデータ
  const jsonData = {"config":{"title":"P4G Fusion Database","totalPersonas":205,"rules":{"fusion2":"((Mat1_BaseLv + Mat2_BaseLv) / 2) + 1 -> Next equal or higher Lv in Result Arcana","fusion2Same":"((Mat1_BaseLv + Mat2_BaseLv) / 2) -> Next equal or lower Lv in same Arcana","fusion3":"Requires sort by Current Lv (A > B > C). Arcana = (B+C=X, then A+X). Result Lv = ((A_Base + B_Base + C_Base) / 3) + 5 -> Next equal or higher Lv"}},"personas":[{"name":"イザナギ","arc":"愚者","lv":1},{"name":"ヨモツシコメ","arc":"愚者","lv":7},{"name":"オバリヨン","arc":"愚者","lv":13},{"name":"レギオン","arc":"愚者","lv":21},{"name":"オセ","arc":"愚者","lv":31},{"name":"ジャアクフロスト","arc":"愚者","lv":38,"special":true,"recipe":["ピクシー","ジャックランタン","ジャックフロスト","グール","キングフロスト"]},{"name":"デカラビア","arc":"愚者","lv":46},{"name":"シキオウジ","arc":"愚者","lv":56},{"name":"ロキ","arc":"愚者","lv":64},{"name":"ピクシー","arc":"魔術師","lv":2},{"name":"オロバス","arc":"魔術師","lv":8},{"name":"ジャックフロスト","arc":"魔術師","lv":16},{"name":"カハク","arc":"魔術師","lv":25},{"name":"ジャックランタン","arc":"魔術師","lv":32},{"name":"ディース","arc":"魔術師","lv":39},{"name":"ランダ","arc":"魔術師","lv":47},{"name":"ジン","arc":"魔術師","lv":62},{"name":"スルト","arc":"魔術師","lv":69},{"name":"マダ","arc":"魔術師","lv":78},{"name":"サキミタマ","arc":"女教皇","lv":11},{"name":"サラスヴァティ","arc":"女教皇","lv":17},{"name":"ハイピクシー","arc":"女教皇","lv":22},{"name":"ガンガー","arc":"女教皇","lv":29},{"name":"パールヴァティ","arc":"女教皇","lv":37},{"name":"キクリヒメ","arc":"女教皇","lv":48},{"name":"ハリティー","arc":"女教皇","lv":59},{"name":"ツィツィミトル","arc":"女教皇","lv":70},{"name":"スカアハ","arc":"女教皇","lv":79},{"name":"センリ","arc":"女帝","lv":9},{"name":"ヤクシニー","arc":"女帝","lv":18},{"name":"ティターニア","arc":"女帝","lv":26},{"name":"ゴルゴン","arc":"女帝","lv":34},{"name":"ガブリエル","arc":"女帝","lv":44},{"name":"スカディ","arc":"女帝","lv":52},{"name":"マザーハーロット","arc":"女帝","lv":60},{"name":"アリラト","arc":"女帝","lv":70},{"name":"イシス","arc":"女帝","lv":79},{"name":"オベロン","arc":"皇帝","lv":12},{"name":"キングフロスト","arc":"皇帝","lv":22},{"name":"セタンタ","arc":"皇帝","lv":34},{"name":"オオクニヌシ","arc":"皇帝","lv":41},{"name":"トート","arc":"皇帝","lv":45},{"name":"パピルサグ","arc":"皇帝","lv":51},{"name":"バロン","arc":"皇帝","lv":65},{"name":"オーディン","arc":"皇帝","lv":74},{"name":"オモイカネ","arc":"法王","lv":7},{"name":"アンズー","arc":"法王","lv":15},{"name":"シーサー","arc":"法王","lv":21},{"name":"ユニコーン","arc":"法王","lv":29},{"name":"フラロウス","arc":"法王","lv":36},{"name":"ホクトセイクン","arc":"法王","lv":45},{"name":"ケルベロス","arc":"法王","lv":52},{"name":"だいそうじょう","arc":"法王","lv":60},{"name":"ハチマン","arc":"法王","lv":70},{"name":"コウリュウ","arc":"法王","lv":76,"special":true,"recipe":["ビャッコ","セイリュウ","スザク","ゲンブ"]},{"name":"クイーンメイブ","arc":"恋愛","lv":25},{"name":"ウンディーネ","arc":"恋愛","lv":33},{"name":"リャナンシー","arc":"恋愛","lv":42},{"name":"ラファエル","arc":"恋愛","lv":53},{"name":"キュベレ","arc":"恋愛","lv":64},{"name":"イシュタル","arc":"恋愛","lv":71},{"name":"スライム","arc":"戦車","lv":2},{"name":"ナタタイシ","arc":"戦車","lv":6},{"name":"エリゴール","arc":"戦車","lv":12},{"name":"アラミタマ","arc":"戦車","lv":18},{"name":"アレス","arc":"戦車","lv":25},{"name":"トリグラフ","arc":"戦車","lv":43},{"name":"キンキ","arc":"戦車","lv":54},{"name":"トール","arc":"戦車","lv":65},{"name":"アタバク","arc":"戦車","lv":72},{"name":"フツヌシ","arc":"戦車","lv":80,"special":true,"recipe":["ネコショウグン","トリグラフ","キンキ","アレス","アタバク"]},{"name":"エンジェル","arc":"正義","lv":4},{"name":"アークエンジェル","arc":"正義","lv":11},{"name":"プリンシパリティ","arc":"正義","lv":19},{"name":"パワー","arc":"正義","lv":27},{"name":"ヴァーチャー","arc":"正義","lv":33},{"name":"ドミニオン","arc":"正義","lv":38},{"name":"ソロネ","arc":"正義","lv":49},{"name":"ウリエル","arc":"正義","lv":58},{"name":"メルキセデク","arc":"正義","lv":66},{"name":"スラオシャ","arc":"正義","lv":74},{"name":"フォルネウス","arc":"隠者","lv":6},{"name":"イッポンダタラ","arc":"隠者","lv":17},{"name":"ラミア","arc":"隠者","lv":26},{"name":"モスマン","arc":"隠者","lv":33},{"name":"ヒトコトヌシ","arc":"隠者","lv":41},{"name":"クラマテング","arc":"隠者","lv":48},{"name":"ニーズホッグ","arc":"隠者","lv":55},{"name":"ネビロス","arc":"隠者","lv":63},{"name":"アラハバキ","arc":"隠者","lv":73},{"name":"オンギョウキ","arc":"隠者","lv":82,"special":true,"recipe":["フウキ","スイキ","キンキ","オニ"]},{"name":"フォルトゥナ","arc":"運命","lv":35},{"name":"クロト","arc":"運命","lv":44},{"name":"ラケシス","arc":"運命","lv":51},{"name":"アナンタ","arc":"運命","lv":58},{"name":"アトロポス","arc":"運命","lv":65},{"name":"ノルン","arc":"運命","lv":72,"special":true,"recipe":["ラケシス","クロト","アトロポス"]},{"name":"ザントマン","arc":"剛毅","lv":5},{"name":"ヴァルキリー","arc":"剛毅","lv":8},{"name":"タイターン","arc":"剛毅","lv":14},{"name":"ラクシャーサ","arc":"剛毅","lv":23},{"name":"クシミタマ","arc":"剛毅","lv":28},{"name":"オニ","arc":"剛毅","lv":30},{"name":"ハヌマーン","arc":"剛毅","lv":42},{"name":"カーリー","arc":"剛毅","lv":50},{"name":"ジークフリード","arc":"剛毅","lv":63},{"name":"ザオウゴンゲン","arc":"剛毅","lv":90},{"name":"ベリス","arc":"刑死者","lv":15},{"name":"ヨモツイクサ","arc":"刑死者","lv":22},{"name":"マカミ","arc":"刑死者","lv":27},{"name":"オルトロス","arc":"刑死者","lv":39},{"name":"ヤツフサ","arc":"刑死者","lv":49},{"name":"トウコツ","arc":"刑死者","lv":56},{"name":"ヘルズエンジェル","arc":"刑死者","lv":66},{"name":"ヴァスキ","arc":"刑死者","lv":71},{"name":"アティス","arc":"刑死者","lv":82},{"name":"グール","arc":"死神","lv":9},{"name":"モコイ","arc":"死神","lv":14},{"name":"マタドール","arc":"死神","lv":24},{"name":"サマエル","arc":"死神","lv":36},{"name":"モト","arc":"死神","lv":46},{"name":"ホワイトライダー","arc":"死神","lv":58},{"name":"アリス","arc":"死神","lv":72,"special":true,"recipe":["ネビロス","ベリアル"]},{"name":"マハカーラ","arc":"死神","lv":78},{"name":"アプサラス","arc":"節制","lv":4},{"name":"シルフ","arc":"節制","lv":11},{"name":"カイチ","arc":"節制","lv":16},{"name":"ニギミタマ","arc":"節制","lv":23},{"name":"ミトラ","arc":"節制","lv":31},{"name":"ゲンブ","arc":"節制","lv":40},{"name":"セイリュウ","arc":"節制","lv":47},{"name":"スザク","arc":"節制","lv":54},{"name":"ビャッコ","arc":"節制","lv":62},{"name":"ユルング","arc":"節制","lv":69},{"name":"ヴィシュー","arc":"節制","lv":73},{"name":"ウコバク","arc":"悪魔","lv":3},{"name":"リリム","arc":"悪魔","lv":10},{"name":"ヴェータラ","arc":"悪魔","lv":19},{"name":"インキュバス","arc":"悪魔","lv":28},{"name":"パズス","arc":"悪魔","lv":37},{"name":"サキュバス","arc":"悪魔","lv":44},{"name":"リリス","arc":"悪魔","lv":53},{"name":"ベルフェゴール","arc":"悪魔","lv":61},{"name":"ベリアル","arc":"悪魔","lv":68},{"name":"ベルゼブブ","arc":"悪魔","lv":81},{"name":"トウテツ","arc":"塔","lv":35},{"name":"クー・フーリン","arc":"塔","lv":46},{"name":"アバドン","arc":"塔","lv":55},{"name":"マーラ","arc":"塔","lv":62},{"name":"マサカド","arc":"塔","lv":69},{"name":"ヨシツネ","arc":"塔","lv":75,"special":true,"recipe":["マサカド","ヒトコトヌシ","ハチマン","シキオウジ","オオクニヌシ"]},{"name":"シヴァ","arc":"塔","lv":80,"special":true,"recipe":["ランダ","バロン"]},{"name":"キウン","arc":"星","lv":24},{"name":"ネコショウグン","arc":"星","lv":32,"special":true,"recipe":["ニギミタマ","サキミタマ","クシミタマ","アラミタマ"]},{"name":"フウキ","arc":"星","lv":43},{"name":"ガネーシャ","arc":"星","lv":50},{"name":"ガルーダ","arc":"星","lv":57},{"name":"カルティケーヤ","arc":"星","lv":67},{"name":"サトゥルヌス","arc":"星","lv":75},{"name":"ルシフェル","arc":"星","lv":87},{"name":"アンドラス","arc":"月","lv":20},{"name":"ノズチ","arc":"月","lv":27},{"name":"ヤマタノオロチ","arc":"月","lv":34},{"name":"アルラウネ","arc":"月","lv":41},{"name":"ギリメカラ","arc":"月","lv":48},{"name":"スイキ","arc":"月","lv":57},{"name":"セト","arc":"月","lv":68},{"name":"バアル・ゼブル","arc":"月","lv":77},{"name":"サンダルフォン","arc":"月","lv":84},{"name":"カーシー","arc":"太陽","lv":10},{"name":"ホウオウ","arc":"太陽","lv":20},{"name":"ドゥン","arc":"太陽","lv":31},{"name":"ヤタガラス","arc":"太陽","lv":40},{"name":"ナラシンハ","arc":"太陽","lv":47},{"name":"タムリン","arc":"太陽","lv":53,"special":true,"recipe":["ヤタガラス","ホウオウ","ナラシンハ","ドゥン"]},{"name":"ジャターユ","arc":"太陽","lv":61},{"name":"ホルス","arc":"太陽","lv":68},{"name":"スパルナ","arc":"太陽","lv":77},{"name":"アスラおう","arc":"太陽","lv":86},{"name":"アヌビス","arc":"審判","lv":59},{"name":"トランペッター","arc":"審判","lv":67,"special":true,"recipe":["マタドール","ホワイトライダー","パピルサグ","トウテツ","トウコツ","だいそうじょう"]},{"name":"ミカエル","arc":"審判","lv":72},{"name":"サタン","arc":"審判","lv":76},{"name":"メタトロン","arc":"審判","lv":83},{"name":"アルダー","arc":"審判","lv":90,"special":true,"recipe":["パールヴァティ","シヴァ"]},{"name":"ルシファー","arc":"審判","lv":93,"special":true,"recipe":["メタトロン","ミカエル","トランペッター","サタン","アヌビス","アナンタ"]},{"name":"グルル","arc":"道化師 / 欲望","lv":20},{"name":"タケミナカタ","arc":"道化師 / 欲望","lv":27},{"name":"ペイルライダー","arc":"道化師 / 欲望","lv":34},{"name":"ロア","arc":"道化師 / 欲望","lv":40},{"name":"バフォメット","arc":"道化師 / 欲望","lv":47},{"name":"クヴァンダ","arc":"道化師 / 欲望","lv":55},{"name":"チェルノボグ","arc":"道化師 / 欲望","lv":62},{"name":"セイテンタイセイ","arc":"道化師 / 欲望","lv":68},{"name":"マガツイザナギ","arc":"道化師 / 欲望","lv":77},{"name":"アメノウズメ","arc":"永劫","lv":18},{"name":"ナルキッソス","arc":"永劫","lv":24},{"name":"サティ","arc":"永劫","lv":31},{"name":"ナーガラジャ","arc":"永劫","lv":37},{"name":"クシナダヒメ","arc":"永劫","lv":44},{"name":"ケツアルカトル","arc":"永劫","lv":51},{"name":"キングー","arc":"永劫","lv":58},{"name":"ラクシュミ","arc":"永劫","lv":65},{"name":"カグヤ","arc":"永劫","lv":74},{"name":"伊邪那岐大神","arc":"世界","lv":91,"special":true,"recipe":["レギオン","ミトラ","ノルン","ナタタイシ","ザントマン","クー・フーリン","ギリメカラ","カルティケーヤ","オルトロス","オオクニヌシ","イザナギ"]}],"chart2Reverse":{"魔術師":[["愚者","正義"],["愚者","運命"],["愚者","剛毅"],["魔術師","魔術師"],["女教皇","死神"],["女教皇","塔"],["女帝","正義"],["女帝","隠者"],["皇帝","月"],["法王","節制"],["法王","道化師"],["恋愛","隠者"],["戦車","剛毅"],["戦車","節制"],["正義","悪魔"],["隠者","節制"],["隠者","永劫"],["悪魔","永劫"]],"女教皇":[["愚者","道化師"],["女教皇","女教皇"],["女帝","悪魔"],["女帝","太陽"],["女帝","審判"],["皇帝","隠者"],["法王","運命"],["恋愛","正義"],["正義","刑死者"],["運命","太陽"],["運命","永劫"],["刑死者","死神"],["刑死者","月"],["刑死者","道化師"],["死神","月"],["塔","月"],["太陽","永劫"]],"女帝":[["愚者","恋愛"],["愚者","星"],["魔術師","隠者"],["女教皇","皇帝"],["女帝","女帝"],["皇帝","法王"],["皇帝","刑死者"],["法王","月"],["隠者","運命"],["隠者","月"],["剛毅","道化師"],["刑死者","星"],["刑死者","審判"],["死神","太陽"],["節制","永劫"],["悪魔","月"],["星","道化師"]],"皇帝":[["愚者","月"],["魔術師","死神"],["魔術師","永劫"],["女教皇","恋愛"],["女教皇","星"],["皇帝","皇帝"],["法王","悪魔"],["恋愛","剛毅"],["正義","道化師"],["運命","悪魔"],["運命","星"],["剛毅","星"],["悪魔","塔"],["悪魔","星"],["塔","永劫"],["星","月"]],"法王":[["愚者","節制"],["魔術師","道化師"],["女教皇","戦車"],["女教皇","節制"],["女帝","剛毅"],["法王","法王"],["恋愛","戦車"],["恋愛","節制"],["恋愛","悪魔"],["戦車","星"],["隠者","剛毅"],["剛毅","刑死者"],["節制","星"],["悪魔","太陽"],["月","永劫"]],"恋愛":[["魔術師","運命"],["魔術師","審判"],["皇帝","運命"],["皇帝","審判"],["恋愛","恋愛"],["正義","運命"],["正義","塔"],["正義","審判"],["正義","永劫"],["運命","月"],["死神","塔"],["死神","星"],["太陽","道化師"]],"戦車":[["愚者","法王"],["魔術師","太陽"],["女帝","死神"],["女帝","星"],["皇帝","太陽"],["法王","審判"],["戦車","戦車"],["戦車","道化師"],["運命","塔"],["剛毅","永劫"],["死神","節制"],["悪魔","道化師"],["塔","太陽"],["星","永劫"],["審判","道化師"]],"正義":[["魔術師","女帝"],["魔術師","剛毅"],["女教皇","剛毅"],["女教皇","悪魔"],["女帝","戦車"],["皇帝","恋愛"],["皇帝","道化師"],["法王","隠者"],["恋愛","永劫"],["戦車","隠者"],["正義","正義"],["隠者","悪魔"],["隠者","星"],["剛毅","月"],["刑死者","悪魔"]],"隠者":[["愚者","死神"],["女教皇","女帝"],["女教皇","正義"],["女帝","塔"],["皇帝","剛毅"],["恋愛","星"],["戦車","死神"],["正義","節制"],["隠者","隠者"],["運命","死神"],["剛毅","悪魔"],["刑死者","塔"],["節制","悪魔"],["節制","太陽"],["塔","道化師"],["月","道化師"]],"運命":[["運命","運命"]],"剛毅":[["愚者","隠者"],["愚者","刑死者"],["魔術師","皇帝"],["魔術師","正義"],["魔術師","節制"],["女帝","道化師"],["法王","太陽"],["恋愛","審判"],["戦車","太陽"],["戦車","永劫"],["正義","隠者"],["正義","死神"],["正義","月"],["剛毅","剛毅"],["月","太陽"]],"刑死者":[["愚者","審判"],["魔術師","塔"],["女教皇","運命"],["女帝","恋愛"],["皇帝","永劫"],["法王","塔"],["恋愛","月"],["戦車","塔"],["運命","審判"],["剛毅","死神"],["剛毅","塔"],["刑死者","刑死者"],["死神","永劫"],["節制","月"],["塔","星"],["審判","永劫"]],"死神":[["愚者","女教皇"],["愚者","皇帝"],["愚者","永劫"],["魔術師","恋愛"],["女教皇","隠者"],["女帝","法王"],["皇帝","星"],["法王","恋愛"],["法王","刑死者"],["戦車","刑死者"],["隠者","塔"],["運命","刑死者"],["刑死者","節制"],["刑死者","永劫"],["死神","死神"],["節制","道化師"]],"節制":[["愚者","魔術師"],["愚者","悪魔"],["魔術師","戦車"],["女帝","刑死者"],["女帝","月"],["女帝","永劫"],["皇帝","戦車"],["法王","正義"],["戦車","正義"],["戦車","審判"],["正義","剛毅"],["正義","太陽"],["隠者","太陽"],["剛毅","太陽"],["死神","道化師"],["節制","節制"]],"悪魔":[["愚者","太陽"],["魔術師","法王"],["女教皇","太陽"],["女教皇","道化師"],["女帝","節制"],["皇帝","正義"],["法王","死神"],["恋愛","太陽"],["戦車","運命"],["運命","節制"],["運命","道化師"],["刑死者","太陽"],["悪魔","悪魔"],["道化師","永劫"]],"塔":[["塔","塔"]],"星":[["愚者","塔"],["魔術師","月"],["女教皇","月"],["女帝","運命"],["皇帝","塔"],["恋愛","運命"],["恋愛","死神"],["恋愛","塔"],["隠者","審判"],["運命","剛毅"],["死神","悪魔"],["節制","塔"],["星","星"]],"月":[["愚者","女帝"],["魔術師","女教皇"],["女教皇","刑死者"],["女帝","皇帝"],["皇帝","死神"],["皇帝","悪魔"],["法王","星"],["法王","永劫"],["恋愛","刑死者"],["戦車","悪魔"],["正義","星"],["隠者","刑死者"],["隠者","道化師"],["星","太陽"],["月","月"]],"太陽":[["愚者","戦車"],["魔術師","刑死者"],["魔術師","悪魔"],["女教皇","法王"],["女教皇","審判"],["女教皇","永劫"],["皇帝","節制"],["法王","戦車"],["法王","剛毅"],["恋愛","道化師"],["戦車","月"],["隠者","死神"],["剛毅","節制"],["太陽","太陽"]],"審判":[["審判","審判"]],"道化師":[["道化師","道化師"]],"永劫":[["永劫","永劫"]]},"chart3Reverse":{"愚者":[["愚者","愚者"],["魔術師","死神"],["女教皇","永劫"],["女帝","皇帝"],["女帝","恋愛"],["女帝","隠者"],["女帝","悪魔"],["法王","審判"],["恋愛","剛毅"],["戦車","月"],["運命","刑死者"],["運命","審判"],["運命","永劫"],["刑死者","審判"]],"魔術師":[["魔術師","魔術師"],["女教皇","戦車"],["女教皇","隠者"],["法王","正義"],["法王","死神"],["法王","太陽"],["正義","節制"],["隠者","死神"],["運命","塔"],["運命","星"],["剛毅","道化師"],["刑死者","月"]],"女教皇":[["愚者","道化師"],["女教皇","女教皇"],["女帝","法王"],["皇帝","運命"],["皇帝","塔"],["戦車","隠者"],["戦車","太陽"],["正義","運命"],["正義","剛毅"],["正義","悪魔"],["運命","剛毅"],["節制","道化師"]],"女帝":[["愚者","剛毅"],["愚者","月"],["愚者","太陽"],["魔術師","隠者"],["魔術師","永劫"],["女教皇","法王"],["女教皇","剛毅"],["女教皇","星"],["女教皇","月"],["女帝","女帝"],["剛毅","死神"],["刑死者","太陽"],["死神","太陽"]],"皇帝":[["魔術師","戦車"],["魔術師","塔"],["女帝","戦車"],["皇帝","皇帝"],["法王","節制"],["法王","塔"],["恋愛","審判"],["戦車","悪魔"],["正義","隠者"],["運命","道化師"],["剛毅","節制"]],"法王":[["魔術師","星"],["女帝","死神"],["皇帝","刑死者"],["法王","法王"],["恋愛","戦車"],["恋愛","隠者"],["恋愛","星"],["戦車","塔"],["剛毅","月"],["節制","星"],["太陽","永劫"]],"恋愛":[["愚者","女教皇"],["愚者","戦車"],["愚者","悪魔"],["女教皇","節制"],["女帝","太陽"],["法王","隠者"],["法王","星"],["恋愛","恋愛"],["剛毅","悪魔"],["死神","悪魔"],["悪魔","太陽"],["悪魔","永劫"],["星","審判"],["太陽","道化師"]],"戦車":[["愚者","正義"],["魔術師","正義"],["魔術師","悪魔"],["女教皇","刑死者"],["女教皇","死神"],["皇帝","法王"],["皇帝","道化師"],["戦車","戦車"],["正義","塔"],["運命","太陽"],["節制","審判"],["星","太陽"],["太陽","審判"]],"正義":[["愚者","節制"],["女教皇","皇帝"],["恋愛","刑死者"],["戦車","永劫"],["正義","正義"],["隠者","剛毅"],["刑死者","節制"],["刑死者","悪魔"],["死神","塔"],["節制","悪魔"]],"隠者":[["愚者","皇帝"],["愚者","星"],["女教皇","正義"],["女教皇","悪魔"],["皇帝","剛毅"],["正義","道化師"],["隠者","隠者"],["剛毅","永劫"],["塔","星"],["月","審判"]],"運命":[["愚者","魔術師"],["愚者","塔"],["魔術師","女教皇"],["魔術師","刑死者"],["魔術師","太陽"],["法王","道化師"],["恋愛","節制"],["運命","運命"],["刑死者","塔"],["死神","星"],["死神","道化師"],["節制","太陽"],["悪魔","星"],["塔","永劫"]],"剛毅":[["愚者","隠者"],["魔術師","運命"],["女帝","運命"],["皇帝","死神"],["皇帝","月"],["戦車","道化師"],["隠者","刑死者"],["運命","月"],["剛毅","剛毅"],["死神","審判"],["死神","永劫"]],"刑死者":[["女教皇","恋愛"],["皇帝","審判"],["法王","恋愛"],["法王","運命"],["恋愛","運命"],["恋愛","死神"],["恋愛","月"],["刑死者","刑死者"],["死神","月"],["節制","月"],["塔","月"],["月","道化師"]],"死神":[["魔術師","皇帝"],["女帝","正義"],["皇帝","悪魔"],["隠者","悪魔"],["隠者","星"],["死神","死神"],["悪魔","月"],["悪魔","審判"],["塔","太陽"],["星","月"],["星","道化師"],["月","太陽"],["審判","道化師"]],"節制":[["愚者","審判"],["魔術師","恋愛"],["女教皇","女帝"],["女教皇","審判"],["戦車","正義"],["戦車","運命"],["正義","永劫"],["隠者","審判"],["剛毅","審判"],["節制","節制"]],"悪魔":[["愚者","恋愛"],["女帝","道化師"],["皇帝","恋愛"],["皇帝","節制"],["皇帝","太陽"],["戦車","刑死者"],["戦車","死神"],["正義","死神"],["隠者","節制"],["剛毅","塔"],["剛毅","星"],["刑死者","死神"],["悪魔","悪魔"]],"塔":[["愚者","法王"],["魔術師","剛毅"],["皇帝","戦車"],["恋愛","悪魔"],["恋愛","道化師"],["戦車","審判"],["隠者","太陽"],["運命","節制"],["運命","悪魔"],["剛毅","太陽"],["塔","塔"],["星","永劫"],["月","永劫"]],"星":[["愚者","刑死者"],["愚者","死神"],["魔術師","道化師"],["女帝","審判"],["女帝","永劫"],["法王","刑死者"],["正義","刑死者"],["正義","月"],["剛毅","刑死者"],["悪魔","塔"],["星","星"]],"月":[["女教皇","塔"],["女教皇","道化師"],["女帝","月"],["皇帝","隠者"],["法王","剛毅"],["法王","悪魔"],["戦車","節制"],["隠者","永劫"],["運命","死神"],["刑死者","道化師"],["月","月"]],"太陽":[["魔術師","女帝"],["魔術師","節制"],["魔術師","月"],["魔術師","審判"],["女帝","刑死者"],["皇帝","星"],["皇帝","永劫"],["法王","永劫"],["正義","星"],["正義","審判"],["刑死者","星"],["太陽","太陽"],["審判","永劫"]],"審判":[["愚者","女帝"],["愚者","運命"],["女帝","塔"],["法王","戦車"],["恋愛","塔"],["恋愛","永劫"],["正義","太陽"],["隠者","運命"],["節制","塔"],["節制","永劫"],["塔","道化師"],["審判","審判"],["道化師","永劫"]],"道化師":[["愚者","永劫"],["魔術師","法王"],["女帝","剛毅"],["女帝","星"],["皇帝","正義"],["恋愛","太陽"],["隠者","塔"],["隠者","月"],["刑死者","永劫"],["死神","節制"],["道化師","道化師"]],"永劫":[["女教皇","運命"],["女教皇","太陽"],["女帝","節制"],["法王","月"],["恋愛","正義"],["戦車","剛毅"],["戦車","星"],["隠者","道化師"],["悪魔","道化師"],["塔","審判"],["永劫","永劫"]]}};

  const personaData = jsonData.personas;
  const chart2Reverse = jsonData.chart2Reverse;
  const chart3Reverse = jsonData.chart3Reverse;

  // アルカナ名の正規化（「道化師 / 欲望」→「道化師」）
  const normalizeArcana = (arcana) => {
    if (arcana.includes('道化師')) return '道化師';
    return arcana;
  };

  // 特殊合体専用ペルソナセット（recipeがあるものだけ）
  const specialOnlyPersonas = useMemo(() => {
    return new Set(personaData.filter(p => p.special && p.recipe).map(p => p.name));
  }, []);

  // アルカナ別インデックス（正規化アルカナ名を使用）
  const personaByArcana = useMemo(() => {
    const index = {};
    personaData.forEach(p => {
      const normalizedArc = normalizeArcana(p.arc);
      if (!index[normalizedArc]) index[normalizedArc] = [];
      index[normalizedArc].push(p);
    });
    Object.keys(index).forEach(arc => {
      index[arc].sort((a, b) => a.lv - b.lv);
    });
    return index;
  }, []);

  // アルカナ検索ヘルパー
  const getArcanaResult = (arc1, arc2, table) => {
    // tableの全キーを探索し、該当するペアを持つアルカナを探す
    for (const [resultArcana, pairs] of Object.entries(table)) {
      for (const pair of pairs) {
        if ((pair[0] === arc1 && pair[1] === arc2) || (pair[0] === arc2 && pair[1] === arc1)) {
          return resultArcana;
        }
      }
    }
    return null;
  };

  // 2身合体計算
  const calculate2Fusion = (p1Name, p2Name) => {
    if (!p1Name || !p2Name) return null;
    if (p1Name === p2Name) return { error: "同じペルソナ同士の合体はできません" };
    
    const p1 = personaData.find(p => p.name === p1Name);
    const p2 = personaData.find(p => p.name === p2Name);
    if (!p1 || !p2) return null;
    
    // アルカナ名を正規化して検索
    const arc1 = normalizeArcana(p1.arc);
    const arc2 = normalizeArcana(p2.arc);
    
    const resultArcana = getArcanaResult(arc1, arc2, chart2Reverse);
    if (!resultArcana) return { error: "この組み合わせは合体できません" };
    
    const candidates = personaByArcana[resultArcana];
    if (!candidates || candidates.length === 0) return { error: "該当するペルソナが見つかりません" };
    
    const materialNames = new Set([p1Name, p2Name]);
    let result;
    
    if (arc1 !== arc2) {
      const baseLevel = Math.floor((p1.lv + p2.lv) / 2) + 1;
      result = candidates.find(p => 
        p.lv >= baseLevel && 
        !specialOnlyPersonas.has(p.name) && 
        !materialNames.has(p.name)
      ) || candidates[candidates.length - 1];
    } else {
      const baseLevel = Math.floor((p1.lv + p2.lv) / 2);
      const filtered = candidates.filter(p => 
        p.lv <= baseLevel && 
        !specialOnlyPersonas.has(p.name) && 
        !materialNames.has(p.name)
      );
      result = filtered.length > 0 ? filtered[filtered.length - 1] : null;
      if (!result) return { error: "同アルカナ合体で該当するペルソナがありません" };
    }
    
    if (specialOnlyPersonas.has(result.name)) {
      return { error: "この組み合わせでは合体できません(特殊合体が必要)" };
    }
    
    return { name: result.name, arcana: result.arc, level: result.lv };
  };

  // 3身合体計算
  const calculate3Fusion = (p1Name, p2Name, p3Name, curr1 = null, curr2 = null, curr3 = null) => {
    if (!p1Name || !p2Name || !p3Name) return null;
    
    const p1 = personaData.find(p => p.name === p1Name);
    const p2 = personaData.find(p => p.name === p2Name);
    const p3 = personaData.find(p => p.name === p3Name);
    if (!p1 || !p2 || !p3) return null;
    
    const currentLv1 = curr1 !== null && curr1 >= p1.lv ? curr1 : p1.lv;
    const currentLv2 = curr2 !== null && curr2 >= p2.lv ? curr2 : p2.lv;
    const currentLv3 = curr3 !== null && curr3 >= p3.lv ? curr3 : p3.lv;
    
    const personasWithCurrentLv = [
      { persona: p1, currentLv: currentLv1 },
      { persona: p2, currentLv: currentLv2 },
      { persona: p3, currentLv: currentLv3 }
    ].sort((a, b) => b.currentLv - a.currentLv);
    
    const [pA, pB, pC] = personasWithCurrentLv.map(p => p.persona);
    
    // アルカナ名を正規化して検索
    const arcA = normalizeArcana(pA.arc);
    const arcB = normalizeArcana(pB.arc);
    const arcC = normalizeArcana(pC.arc);
    
    const baseArcana = getArcanaResult(arcB, arcC, chart2Reverse);
    if (!baseArcana) return { error: "この組み合わせは合体できません" };
    
    const resultArcana = getArcanaResult(baseArcana, arcA, chart3Reverse);
    if (!resultArcana) return { error: "この組み合わせは合体できません" };
    
    const candidates = personaByArcana[resultArcana];
    if (!candidates || candidates.length === 0) return { error: "該当するペルソナが見つかりません" };
    
    const baseLevel = Math.floor((pA.lv + pB.lv + pC.lv) / 3) + 5;
    const materialNames = new Set([p1Name, p2Name, p3Name]);
    
    const result = candidates.find(p => 
      p.lv >= baseLevel && 
      !specialOnlyPersonas.has(p.name) && 
      !materialNames.has(p.name)
    ) || candidates[candidates.length - 1];
    
    if (specialOnlyPersonas.has(result.name)) {
      return { error: "この組み合わせでは合体できません(特殊合体が必要)" };
    }
    
    return { name: result.name, arcana: result.arc, level: result.lv };
  };

  // 合体結果の計算
  const fusionResult = useMemo(() => {
    if (mode !== 'fusion') return null;
    if (fusionType === '2body') return calculate2Fusion(persona1, persona2);
    if (fusionType === '3body') {
      const curr1 = currentLv1 ? parseInt(currentLv1) : null;
      const curr2 = currentLv2 ? parseInt(currentLv2) : null;
      const curr3 = currentLv3 ? parseInt(currentLv3) : null;
      return calculate3Fusion(persona1, persona2, persona3, curr1, curr2, curr3);
    }
    return null;
  }, [mode, fusionType, persona1, persona2, persona3, currentLv1, currentLv2, currentLv3]);

  // 逆引き結果の計算(useEffect + useState)
  const [reverseResults, setReverseResults] = useState({ recipes: [], total: 0 });
  
  React.useEffect(() => {
    if (mode === 'reverse' && targetPersona) {
      performIncrementalSearch().then(result => {
        setReverseResults(result);
      });
    } else {
      setReverseResults({ recipes: [], total: 0 });
    }
  }, [mode, targetPersona, reverseType, maxResults, materialPersona1, materialPersona2]);

  // フィルタリング済みペルソナリスト
  const filteredPersonas1 = useMemo(() => {
    if (!search1) return personaData;
    return personaData.filter(p => 
      p.name.includes(search1) || p.arc.includes(search1)
    );
  }, [search1]);

  const filteredPersonas2 = useMemo(() => {
    if (!search2) return personaData;
    return personaData.filter(p => 
      p.name.includes(search2) || p.arc.includes(search2)
    );
  }, [search2]);

  const filteredPersonas3 = useMemo(() => {
    if (!search3) return personaData;
    return personaData.filter(p => 
      p.name.includes(search3) || p.arc.includes(search3)
    );
  }, [search3]);

  const filteredTargetPersonas = useMemo(() => {
    let baseList = personaData;
    
    if (mode === 'reverse') {
      if (reverseType === 'special') {
        const specialPersonaNames = new Set(personaData.filter(p => p.special).map(p => p.name));
        baseList = personaData.filter(p => specialPersonaNames.has(p.name));
      } else {
        baseList = personaData.filter(p => !specialOnlyPersonas.has(p.name));
      }
    }
    
    if (!searchTarget) return baseList;
    return baseList.filter(p => 
      p.name.includes(searchTarget) || p.arc.includes(searchTarget)
    );
  }, [searchTarget, mode, reverseType]);

  const filteredMaterial1Personas = useMemo(() => {
    let baseList = personaData;
    
    // 逆引き検索時は全ペルソナを選択可能（フィルタなし）
    // 特殊合体ペルソナも素材として使用できる
    
    // 検索フィルタ
    if (!searchMaterial1) return baseList;
    return baseList.filter(p => 
      p.name.includes(searchMaterial1) || p.arc.includes(searchMaterial1)
    );
  }, [searchMaterial1, mode, reverseType]);

  const filteredMaterial2Personas = useMemo(() => {
    let baseList = personaData;
    
    // 逆引き検索時は全ペルソナを選択可能（フィルタなし）
    // 特殊合体ペルソナも素材として使用できる
    
    // 検索フィルタ
    if (!searchMaterial2) return baseList;
    return baseList.filter(p => 
      p.name.includes(searchMaterial2) || p.arc.includes(searchMaterial2)
    );
  }, [searchMaterial2, mode, reverseType]);

  // 段階的検索の実行関数
  const performIncrementalSearch = async () => {
    if (!targetPersona || mode !== 'reverse') return;
    
    setIsSearching(true);
    setSearchProgress(0);
    
    const recipes = [];
    
    // 特殊合体モード
    if (reverseType === 'special') {
      const targetP = personaData.find(p => p.name === targetPersona);
      if (targetP && targetP.special && targetP.recipe) {
        const parents = targetP.recipe.map(name => 
          personaData.find(p => p.name === name)
        ).filter(p => p);
        
        if (parents.length === targetP.recipe.length) {
          recipes.push({
            type: '特殊合体',
            parents: parents,
            cost: parents.reduce((sum, p) => sum + p.lv, 0),
            isSpecial: true
          });
        }
      }
      setIsSearching(false);
      return { recipes, total: recipes.length };
    }
    
    // 2身合体モード
    if (reverseType === '2body') {
      let count = 0;
      const total = personaData.length * (personaData.length - 1) / 2;
      
      for (let i = 0; i < personaData.length; i++) {
        for (let j = i; j < personaData.length; j++) {
          const p1 = personaData[i];
          const p2 = personaData[j];
          
          if (p1.name === p2.name) continue;
          
          if (materialPersona1 && p1.name !== materialPersona1 && p2.name !== materialPersona1) {
            continue;
          }
          
          const result = calculate2Fusion(p1.name, p2.name);
          
          if (result && !result.error) {
            if (targetPersona && result.name !== targetPersona) continue;
            
            if (result.name === p1.name || result.name === p2.name) continue;
            
            recipes.push({
              type: '2身',
              parents: [p1, p2],
              result: result.name,
              resultArcana: result.arcana,
              resultLevel: result.level,
              cost: p1.lv + p2.lv,
              isSpecial: false
            });
          }
          
          count++;
          if (count % 1000 === 0) {
            setSearchProgress(recipes.length);
            await new Promise(resolve => setTimeout(resolve, 0));
          }
        }
      }
      
      const sortedRecipes = recipes.sort((a, b) => a.cost - b.cost);
      setIsSearching(false);
      return { recipes: sortedRecipes.slice(0, maxResults), total: sortedRecipes.length };
    }
    
    // 3身合体モード
    if (reverseType === '3body') {
      let count = 0;
      
      for (let i = 0; i < personaData.length; i++) {
        for (let j = i; j < personaData.length; j++) {
          for (let k = j; k < personaData.length; k++) {
            const p1 = personaData[i];
            const p2 = personaData[j];
            const p3 = personaData[k];
            
            const names = [p1.name, p2.name, p3.name];
            const uniqueNames = new Set(names);
            if (uniqueNames.size !== 3) continue;
            
            if (materialPersona1 && !names.includes(materialPersona1)) continue;
            if (materialPersona2 && !names.includes(materialPersona2)) continue;
            
            const result = calculate3Fusion(p1.name, p2.name, p3.name);
            
            if (result && !result.error) {
              if (targetPersona && result.name !== targetPersona) continue;
              
              if (names.includes(result.name)) continue;
              
              recipes.push({
                type: '3身',
                parents: [p1, p2, p3],
                result: result.name,
                resultArcana: result.arcana,
                resultLevel: result.level,
                cost: p1.lv + p2.lv + p3.lv,
                isSpecial: false
              });
            }
            
            count++;
            if (count % 5000 === 0) {
              setSearchProgress(recipes.length);
              await new Promise(resolve => setTimeout(resolve, 0));
            }
          }
        }
      }
      
      const sortedRecipes = recipes.sort((a, b) => a.cost - b.cost);
      setIsSearching(false);
      return { recipes: sortedRecipes.slice(0, maxResults), total: sortedRecipes.length };
    }
    
    setIsSearching(false);
    return { recipes: [], total: 0 };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-amber-800 mb-6 sm:mb-8">
            P4G ペルソナ合体検索ツール v2.8
          </h1>

          {/* メインモード切替 */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => setMode('fusion')}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                mode === 'fusion'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              合体検索
            </button>
            <button
              onClick={() => setMode('reverse')}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                mode === 'reverse'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              逆引き検索
            </button>
          </div>

          {/* 合体検索モード */}
          {mode === 'fusion' && (
            <div>
              {/* 2身/3身切替 */}
              <div className="flex justify-center gap-2 mb-6">
                <button
                  onClick={() => setFusionType('2body')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    fusionType === '2body'
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  2身合体
                </button>
                <button
                  onClick={() => setFusionType('3body')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    fusionType === '3body'
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  3身合体
                </button>
              </div>

              {/* 2身合体入力 */}
              {fusionType === '2body' && (
                <div className="space-y-4 mb-6 sm:mb-8">
                  <div className="space-y-3">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700">ペルソナ1</label>
                    <input
                      type="text"
                      placeholder="検索..."
                      value={search1}
                      onChange={(e) => setSearch1(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
                    />
                    <select
                      value={persona1}
                      onChange={(e) => setPersona1(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 text-sm sm:text-base"
                    >
                      <option value="">選択してください</option>
                      {filteredPersonas1.map((p, idx) => (
                        <option key={idx} value={p.name}>【{p.arc}】{p.name} (Lv.{p.lv})</option>
                      ))}
                    </select>
                    {search1 && <p className="text-xs sm:text-sm text-gray-600">{filteredPersonas1.length}件</p>}
                  </div>

                  <div className="space-y-3">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700">ペルソナ2</label>
                    <input
                      type="text"
                      placeholder="検索..."
                      value={search2}
                      onChange={(e) => setSearch2(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
                    />
                    <select
                      value={persona2}
                      onChange={(e) => setPersona2(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 text-sm sm:text-base"
                    >
                      <option value="">選択してください</option>
                      {filteredPersonas2.map((p, idx) => (
                        <option key={idx} value={p.name}>【{p.arc}】{p.name} (Lv.{p.lv})</option>
                      ))}
                    </select>
                    {search2 && <p className="text-xs sm:text-sm text-gray-600">{filteredPersonas2.length}件</p>}
                  </div>
                </div>
              )}

              {/* 3身合体入力 */}
              {fusionType === '3body' && (
                <div className="space-y-4 mb-6 sm:mb-8">
                  <div className="space-y-3">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700">ペルソナ1</label>
                    <input
                      type="text"
                      placeholder="検索..."
                      value={search1}
                      onChange={(e) => setSearch1(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
                    />
                    <select
                      value={persona1}
                      onChange={(e) => {
                        setPersona1(e.target.value);
                        if (e.target.value) {
                          const p = personaData.find(p => p.name === e.target.value);
                          if (p) setCurrentLv1(p.lv.toString());
                        } else {
                          setCurrentLv1('');
                        }
                      }}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 text-sm sm:text-base"
                    >
                      <option value="">選択してください</option>
                      {filteredPersonas1.map((p, idx) => (
                        <option key={idx} value={p.name}>【{p.arc}】{p.name} (Lv.{p.lv})</option>
                      ))}
                    </select>
                    {search1 && <p className="text-xs sm:text-sm text-gray-600">{filteredPersonas1.length}件</p>}
                    {persona1 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">現在のLv</label>
                        <input
                          type="number"
                          value={currentLv1}
                          onChange={(e) => setCurrentLv1(e.target.value)}
                          onBlur={(e) => {
                            const val = e.target.value;
                            const p = personaData.find(p => p.name === persona1);
                            if (p && (!val || parseInt(val) < p.lv)) {
                              setCurrentLv1(p.lv.toString());
                            }
                          }}
                          min={personaData.find(p => p.name === persona1)?.lv || 1}
                          max="99"
                          className="w-full px-3 sm:px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700">ペルソナ2</label>
                    <input
                      type="text"
                      placeholder="検索..."
                      value={search2}
                      onChange={(e) => setSearch2(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
                    />
                    <select
                      value={persona2}
                      onChange={(e) => {
                        setPersona2(e.target.value);
                        if (e.target.value) {
                          const p = personaData.find(p => p.name === e.target.value);
                          if (p) setCurrentLv2(p.lv.toString());
                        } else {
                          setCurrentLv2('');
                        }
                      }}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 text-sm sm:text-base"
                    >
                      <option value="">選択してください</option>
                      {filteredPersonas2.map((p, idx) => (
                        <option key={idx} value={p.name}>【{p.arc}】{p.name} (Lv.{p.lv})</option>
                      ))}
                    </select>
                    {search2 && <p className="text-xs sm:text-sm text-gray-600">{filteredPersonas2.length}件</p>}
                    {persona2 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">現在のLv</label>
                        <input
                          type="number"
                          value={currentLv2}
                          onChange={(e) => setCurrentLv2(e.target.value)}
                          onBlur={(e) => {
                            const val = e.target.value;
                            const p = personaData.find(p => p.name === persona2);
                            if (p && (!val || parseInt(val) < p.lv)) {
                              setCurrentLv2(p.lv.toString());
                            }
                          }}
                          min={personaData.find(p => p.name === persona2)?.lv || 1}
                          max="99"
                          className="w-full px-3 sm:px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700">ペルソナ3</label>
                    <input
                      type="text"
                      placeholder="検索..."
                      value={search3}
                      onChange={(e) => setSearch3(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
                    />
                    <select
                      value={persona3}
                      onChange={(e) => {
                        setPersona3(e.target.value);
                        if (e.target.value) {
                          const p = personaData.find(p => p.name === e.target.value);
                          if (p) setCurrentLv3(p.lv.toString());
                        } else {
                          setCurrentLv3('');
                        }
                      }}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 text-sm sm:text-base"
                    >
                      <option value="">選択してください</option>
                      {filteredPersonas3.map((p, idx) => (
                        <option key={idx} value={p.name}>【{p.arc}】{p.name} (Lv.{p.lv})</option>
                      ))}
                    </select>
                    {search3 && <p className="text-xs sm:text-sm text-gray-600">{filteredPersonas3.length}件</p>}
                    {persona3 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">現在のLv</label>
                        <input
                          type="number"
                          value={currentLv3}
                          onChange={(e) => setCurrentLv3(e.target.value)}
                          onBlur={(e) => {
                            const val = e.target.value;
                            const p = personaData.find(p => p.name === persona3);
                            if (p && (!val || parseInt(val) < p.lv)) {
                              setCurrentLv3(p.lv.toString());
                            }
                          }}
                          min={personaData.find(p => p.name === persona3)?.lv || 1}
                          max="99"
                          className="w-full px-3 sm:px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 合体結果表示 */}
              {fusionResult && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-300">
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3 sm:mb-4">合体結果</h3>
                  {fusionResult.error ? (
                    <p className="text-red-600 font-semibold text-sm sm:text-base">{fusionResult.error}</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-2xl sm:text-3xl font-bold text-amber-900">【{fusionResult.arcana}】{fusionResult.name}</p>
                      <p className="text-lg sm:text-xl text-gray-700">Lv.{fusionResult.level}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 逆引き検索モード */}
          {mode === 'reverse' && (
            <div>
              {/* 2身/3身/特殊切替 */}
              <div className="flex justify-center gap-2 mb-6">
                <button
                  onClick={() => setReverseType('2body')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                    reverseType === '2body'
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  2身合体
                </button>
                <button
                  onClick={() => setReverseType('3body')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                    reverseType === '3body'
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  3身合体
                </button>
                <button
                  onClick={() => setReverseType('special')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                    reverseType === 'special'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  特殊合体
                </button>
              </div>

              {/* 目標ペルソナ入力 */}
              <div className="space-y-4 mb-6 sm:mb-8">
                <div className="space-y-3">
                  <label className="block text-base sm:text-lg font-semibold text-gray-700">作りたいペルソナ</label>
                  <input
                    type="text"
                    placeholder="検索..."
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
                  />
                  <select
                    value={targetPersona}
                    onChange={(e) => setTargetPersona(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white text-gray-800 text-sm sm:text-base"
                  >
                    <option value="">選択してください</option>
                    {filteredTargetPersonas.map((p, idx) => (
                      <option key={idx} value={p.name}>【{p.arc}】{p.name} (Lv.{p.lv})</option>
                    ))}
                  </select>
                  {searchTarget && <p className="text-xs sm:text-sm text-gray-600">{filteredTargetPersonas.length}件</p>}
                </div>

                {/* 素材ペルソナ1(2身・3身合体のみ) */}
                {reverseType !== 'special' && (
                  <div className="space-y-3">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700">素材ペルソナ1(任意)</label>
                    <input
                      type="text"
                      placeholder="検索..."
                      value={searchMaterial1}
                      onChange={(e) => {
                        setSearchMaterial1(e.target.value);
                        if (e.target.value === '') {
                          setMaterialPersona1('');
                        }
                      }}
                      className="w-full px-3 sm:px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                    />
                    <select
                      value={materialPersona1}
                      onChange={(e) => setMaterialPersona1(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-800 text-sm sm:text-base"
                    >
                      <option value="">指定なし</option>
                      {filteredMaterial1Personas.map((p, idx) => (
                        <option key={idx} value={p.name}>【{p.arc}】{p.name} (Lv.{p.lv})</option>
                      ))}
                    </select>
                    {searchMaterial1 && <p className="text-xs sm:text-sm text-gray-600">{filteredMaterial1Personas.length}件</p>}
                  </div>
                )}

                {/* 素材ペルソナ2(3身合体のみ) */}
                {reverseType === '3body' && (
                  <div className="space-y-3">
                    <label className="block text-base sm:text-lg font-semibold text-gray-700">素材ペルソナ2(任意)</label>
                    <input
                      type="text"
                      placeholder="検索..."
                      value={searchMaterial2}
                      onChange={(e) => {
                        setSearchMaterial2(e.target.value);
                        if (e.target.value === '') {
                          setMaterialPersona2('');
                        }
                      }}
                      className="w-full px-3 sm:px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
                    />
                    <select
                      value={materialPersona2}
                      onChange={(e) => setMaterialPersona2(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-800 text-sm sm:text-base"
                    >
                      <option value="">指定なし</option>
                      {filteredMaterial2Personas.map((p, idx) => (
                        <option key={idx} value={p.name}>【{p.arc}】{p.name} (Lv.{p.lv})</option>
                      ))}
                    </select>
                    {searchMaterial2 && <p className="text-xs sm:text-sm text-gray-600">{filteredMaterial2Personas.length}件</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">表示件数</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={maxResults}
                    onChange={(e) => setMaxResults(parseInt(e.target.value) || 10)}
                    className="w-full px-3 sm:px-4 py-2 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* 逆引き結果表示 */}
              {isSearching && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-xl border-2 border-blue-300">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <p className="text-lg font-semibold text-blue-800">
                      検索中... {searchProgress}件見つかりました
                    </p>
                  </div>
                </div>
              )}
              
              {!isSearching && reverseResults.recipes.length > 0 && (
                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-800">
                    合体レシピ ({reverseResults.recipes.length}件表示 / 全{reverseResults.total}件)
                  </h3>
                  {reverseResults.recipes.map((recipe, idx) => (
                    <div
                      key={idx}
                      className={`p-3 sm:p-4 rounded-lg border-2 ${
                        recipe.isSpecial 
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300'
                          : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 sm:px-3 py-1 text-white text-xs sm:text-sm font-bold rounded w-fit ${
                            recipe.isSpecial ? 'bg-purple-600' : 'bg-amber-600'
                          }`}>
                            {recipe.type}
                          </span>
                          {recipe.isSpecial && (
                            <span className="px-2 py-0.5 bg-pink-100 text-pink-800 text-xs font-semibold rounded border border-pink-300">
                              特殊合体
                            </span>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600">合計Lv: {recipe.cost}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
                        {recipe.parents.map((parent, pidx) => (
                          <span key={pidx} className="text-xs sm:text-sm text-gray-800">
                            【{parent.arc}】{parent.name} (Lv.{parent.lv})
                            {pidx < recipe.parents.length - 1 && ' × '}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isSearching && (targetPersona || materialPersona1 || materialPersona2) && reverseResults.recipes.length === 0 && (
                <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
                  <p className="text-sm sm:text-base text-gray-600">該当する合体レシピが見つかりませんでした</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
