# youtube-otosuyatu

Node.js v14.16.0 で動作確認  
名前のまんま  
ダウンロードするための URL を出力してくれます

## 使い方

### 1.クローン

```
git clone https://github.com/owatu1234/youtube-otosuyatu.git
```

### 2.依存関係のインストール

```
npm install
```

### 3.実行

```shell
npm start <videoId> <''|video|audio|both|out|mimetype>

#対話モード(デフォルト)
#リストが出力されるので、数字を入れて選択できます)
#リストでは色付けをしています
npm start dQw4w9WgXcQ

#最もビットレートの高い動画 (動画、音声は別れている)
#`v`で短縮できます
npm start dQw4w9WgXcQ video
npm start dQw4w9WgXcQ v

#最もビットレートの高い音声 (音声、動画は別れている)
#`a`で短縮できます
npm start dQw4w9WgXcQ audio
npm start dQw4w9WgXcQ a

#どっちも 画質は最高まで出ない(多分720p30fpsまで)
#`b`で短縮できます
npm start dQw4w9WgXcQ both
npm start dQw4w9WgXcQ b

#mimeTypeを指定する 部分的な文字列で可能 検索方法は`includes`
npm start dQw4w9WgXcQ mimetype audio/mp4
```

### 4

出力される URL を開く(ストリーミングっぽい感じ)

## 参考と発見

ほとんど [Tyrrrz/YoutubeExplode](https://github.com/Tyrrrz/YoutubeExplode) から学んだものです  
https://tyrrrz.me/blog/reverse-engineering-youtube も参考にしてます

https://www.youtube.com/watch?v={videoId}&pbj=1 の pbj=1 は自分で見つけました  
YouTube のウェブアプリは SPA なので、そのページのデータをやり取りするものだと考えられます

例: https://www.youtube.com/watch?v=dQw4w9WgXcQ&pbj=1 に**POST**する(GET じゃだめよ)  
そうするといい感じのデータがかえってきます(あとはご自分で...最悪ソースコード見てね)

## 他にも...

### レスポンスの保存 ~~Postman 使え~~

https://www.youtube.com/watch?v={videoId}&pbj=1 のレスポンスが保存できます  
同じディレクトリに out.json が生成されます

```shell
npm start dQw4w9WgXcQ out
```

### グローバルにインストールした**様に**

以下を実行すると`youtube-otosuyatu`だけで実行できるようになります

```shell
npm link
```
