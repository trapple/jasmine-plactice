# JasmineではじめるJSテスト入門 (2)

## Karmaを使ってテストの自動化

> 以下、基本的にMacのターミナルを利用した説明となります
Windowsの方はGitbash(git for windows)をインストールすると、ほぼ同じ手順で進めることができるかと思われます。
[git for windows](http://msysgit.github.io/)


### node.jsのインストール

karmaはnode.jsベースのプログラムです。
次のサイトからインストーラーをダウンロードしてnode.jsをインストールしてください。
http://nodejs.org/

コンソールで`npm --version` と打って、バージョンが表示されればインストール成功です。
(執筆時バージョン: 1.3.14)

***

### 作業ファイルを用意

入門（１）で使ったファイル群を利用します。
無い場合はリポジトリから取得してください。
https://github.com/trapple/jasmine-plactice.git

***

### karmaのインストール

```
npm install karma
npm install karma-jasmine
npm install karma-chrome-launcher
npm install -g karma-cli
```
コンソールで`karma --version`と打って、バージョンが表示されればインストール成功です。
(執筆時バージョン: 0.12.9)

### karmaの初期化

コンソールで`karma init`と打って、設定ファイルを初期化します。
`What is the location of your source and test files ?`の部分だけ設定します。
（もしくはすべて初期設定で、後ほどkarma.conf.jsを編集してもよい）
`source adn test files`は`src/*.js`と`spec/*.js`を登録します。

```
$ karma init

Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> jasmine

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> Chrome
> 

What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
> src/*.js
> spec/*.js
> 

Should any of the files included by the previous patterns be excluded ?
You can use glob patterns, eg. "**/*.swp".
Enter empty string to move to the next question.
> 

Do you want Karma to watch all the files and run the tests on change ?
Press tab to list possible options.
> yes


Config file generated at "/Path/to/jasmine-plactice/karma.conf.js".
```

`karma.conf.js`が自動生成されました。内容については[公式サイト](http://karma-runner.github.io/0.12/config/configuration-file.html)を参照してください。

### karma 起動

`karma start`でkarmaが起動します。次いでChromeが起動し、テストが実行されます。

```
INFO [karma]: Karma v0.12.9 server started at http://localhost:9876/
INFO [launcher]: Starting browser Chrome
INFO [Chrome 34.0.1847 (Mac OS X 10.9.2)]: Connected on socket RMzwYeyNHvVCWL53THwR with id 85378584
Chrome 34.0.1847 (Mac OS X 10.9.2): Executed 5 of 5 SUCCESS (0.026 secs / 0.022 secs)
```

最後の行がテスト結果で、5つのテストが成功したことをあらわしています。
karmaを停止するにはCtrl-Cとうちます。

### reporterの変更

JasmineのStandalone版でテストしていた時に比べて、テスト結果の表示（reporter）が少々さみしいので、変更してみましょう。karmaはプラグインをインストールすることで機能を拡張していきます。

```
npm install karma-spec-reporter
```

`karma.config.js`を編集してreporterを変更します。
39行目あたりを編集します。

```karma.conf.js
reporters: ['progress'],
```

↓

```karma.conf.js
reporters: ['spec'],
```

もう一度`karma start`してみましょう。
以下のようにテストの内容がわかりやすく表示されるはずです。

```
INFO [karma]: Karma v0.12.9 server started at http://localhost:9876/
INFO [launcher]: Starting browser Chrome
INFO [Chrome 34.0.1847 (Mac OS X 10.9.2)]: Connected on socket YCrBzbsl_Ka1eGzCWqnX with id 55787104

  Humanオブジェクトのテスト
    名前の無いHuman
      ✓ say()を実行すると'Hello World'と表示する
      ✓ sayName()を実行すると'Sorry, I don't have name.'を返す
    名前のあるHuman
      ✓ say()を実行すると'Hello World. My name is 名前'と表示する
      ✓ sayName()を実行すると'My name is 名前.'を返す

  とてもシンプルなHello Worldのテスト
    ✓ say()を実行すると'Hello World.'と表示する

Chrome 34.0.1847 (Mac OS X 10.9.2): Executed 5 of 5 SUCCESS (0.031 secs / 0.029 secs)
```

### ブラウザの追加

テストするブラウザを追加してみましょう。
コンソールでプラグインをインストールします。

```
npm install karma-firefox-launcher

# macのみ
npm install karma-safari-launcher 

# windowsのみ
npm install karma-ie-launcher
```


`karma.conf.js`を編集してbrowersを追加します。
61行目あたりを編集します。

```karma.conf.js
browsers: ['Chrome'],
```

↓

```karma.conf.js
browsers: ['Chrome', 'Firefox', 'Safari'],
```

`karma start`でテストを起動してみます。

```
INFO [karma]: Karma v0.12.9 server started at http://localhost:9876/
INFO [launcher]: Starting browser Chrome
INFO [launcher]: Starting browser Firefox
INFO [launcher]: Starting browser Safari
INFO [Chrome 34.0.1847 (Mac OS X 10.9.2)]: Connected on socket Sh_B3XaIZWViICuAZQpb with id 34240754
INFO [Firefox 28.0.0 (Mac OS X 10.9)]: Connected on socket gs5ioQhtWdHy4W2WZQpc with id 81083217
INFO [Safari 7.0.3 (Mac OS X 10.9.2)]: Connected on socket SbRK9bko-gPcqpjPZQpd with id 99942740

~~~省略~~~

Chrome 34.0.1847 (Mac OS X 10.9.2): Executed 5 of 5 SUCCESS (0.043 secs / 0.039 secs)
Firefox 28.0.0 (Mac OS X 10.9): Executed 5 of 5 SUCCESS (0.119 secs / 0.078 secs)
Safari 7.0.3 (Mac OS X 10.9.2): Executed 5 of 5 SUCCESS (0.124 secs / 0.092 secs)
TOTAL: 15 SUCCESS
```

実際にFirefoxとSafariが起動し、
テスト結果にもFirefoxとSafariが追加されました。

### ヘッドレスブラウザを使う

実行してみるとわかると思いますが、毎回毎回実ブラウザを使ってテストするのは結構重たいと感じるかもしれません。
細かい開発中はPhantomJSというヘッドレスブラウザを利用するとよいでしょう。
PhantomJSはWebKitベースのブラウザエミュレータです。
http://phantomjs.org/


まずはPhantomJS本体とkarmaプラグインをインストールしましょう。

```
npm install phantomjs
npm install karma-phantomjs-launcher
```

`karma.conf.js`を編集します。

```karma.conf.ks
browsers: ['PhantomJS'],
```

`karma start` でテストを起動してみます。

```
INFO [karma]: Karma v0.12.9 server started at http://localhost:9876/
INFO [launcher]: Starting browser PhantomJS
INFO [PhantomJS 1.9.7 (Mac OS X)]: Connected on socket nZzdpBKLnigJVNs9iD-b with id 93212249

  Humanオブジェクトのテスト
    名前の無いHuman
      ✓ say()を実行すると'Hello World'と表示する
      ✓ sayName()を実行すると'Sorry, I don't have name.'を返す
    名前のあるHuman
      ✓ say()を実行すると'Hello World. My name is 名前'と表示する
      ✓ sayName()を実行すると'My name is 名前.'を返す

  とてもシンプルなHello Worldのテスト
    ✓ say()を実行すると'Hello World.'と表示する

PhantomJS 1.9.7 (Mac OS X): Executed 5 of 5 SUCCESS (0.006 secs / 0.004 secs)
```

実ブラウザを使わずにテストすることが出来ました！！