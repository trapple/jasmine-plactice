# JasmineではじめるJSテスト入門 (1)

JavascriptのテストをJasmineを使って試してみようと思います。
[Jasmine公式サイト](http://jasmine.github.io/)


## スタンドアローン版で試す

https://github.com/pivotal/jasmine/tree/master/dist
jasmine-standalone-2.0.0.zipをダウンロード

解凍すると以下のようなファイル群になります

```
├── SpecRunner.html
├── lib
│   └── jasmine-2.0.0
├── spec
│   ├── PlayerSpec.js
│   └── SpecHelper.js
└── src
    ├── Player.js
    └── Song.js

```

- `SpecRunner.html` 
  テストを実行するためのhtml
- `lib/jasmine-2.0.0`
  jasmineのライブラリ 
- `spec` テストを書くファイル
- `src` 自作のJavascriptファイル



### 起動

まずはSpecRunner.htmlをブラウザで開いてみましょう。

![jasmine01.png](https://qiita-image-store.s3.amazonaws.com/0/29871/0464afea-a485-176e-e759-53b8c3685e6f.png "jasmine01.png")

よくわからない画面が表示されました。
そっと閉じましょう。

## もっとシンプルなテストを起動してみる

### SpecRunner.htmlを編集
SpecRunner.htmlをエディタで開き、以下の部分を編集してください。

```SpecRunner.html
<!-- include spec files here... -->
<script type="text/javascript" src="spec/SpecHelper.js"></script>
<script type="text/javascript" src="spec/PlayerSpec.js"></script>
```
↓

```SpecRunner.html
<!-- include spec files here... -->
<script type="text/javascript" src="spec/helloworld.js"></script>
```

### テストファイルの作成

次に`spec/helloworld.js`を作ります。

```spec/helloworld.js
describe("とてもシンプルなHello Worldのテスト", function () {
  it("say()を実行すると'Hello World.'と表示する", function () {
    expect(say()).toEqual("Hello World."); 
  });
});
```

- `describe` には「テストの対象」や「テストのグループ」を書きます。
`describe`の中に`describe` で入れ子することもできます。

- `it`はテストの内容を書きます。「○○すると■■する」といった内容にします。

- `expect(a).toEqual(b)` が実際のテスト内容です。
この場合aとｂの内容が等しいことをテストします。
toEqualの部分をmatcherと呼びますが、matcher部分を変えることでテスト条件を設定するのが基本です。
Jasmineが標準で持つmatcherについては以下URLを参照してください。

http://jasmine.github.io/2.0/introduction.html#section-Included_Matchers

***

`SpecRunner.html`と`spec/helloworld.js`を保存して
もう一度SpecRunner.htmlをブラウザで開いてみましょう。

![jasmine02.png](https://qiita-image-store.s3.amazonaws.com/0/29871/6111d046-0e83-18f4-60dd-0e2386ed0872.png "jasmine02.png")

`say is not defined` と怒られてます。
つまりまだsay()メソッドを実装していないので、テストに失敗しました。

***

### 自作Javascriptファイルの作成

それでは`src/helloworld.js`を作りましょう。

```src/helloworld.js
function say(){
  return "Hallo World.";
}
```

これを`SpecRunner.html`に読み込ませます。

```SpecRunner.html
<!-- include source files here... -->
<script type="text/javascript" src="src/Player.js"></script>
<script type="text/javascript" src="src/Song.js"></script>
```
↓

```SpecRunner.html
<!-- include source files here... -->
<script type="text/javascript" src="src/helloworld.js"></script>
```

SpecRunner.htmlをブラウザで開いてみましょう。

![jasmine03.png](https://qiita-image-store.s3.amazonaws.com/0/29871/5d8d0cf4-2d72-c284-335b-6fbeb6c11cc6.png "jasmine03.png")

今度は `Expected 'Hallo World' to equal 'Hello World'`と怒られてます。
Helloの綴りを間違えてしまったようです。
`src/helloworld.js`を修正します。

```src/helloworld.js
function say(){
  return "Hello World.";
}
```

### テスト成功

![jasmine04.png](https://qiita-image-store.s3.amazonaws.com/0/29871/7cf43493-48dc-2886-2041-a8262053a123.png "jasmine04.png")

無事テストが成功しました！！

## スクリプトの改良

sayを少し汎用的なオブジェクトにしてみましょう。
要件は以下。

- コンストラクタに名前を受け取ることができる。
- 名前の無いHumanがsay()を実行すると'Hello World'と表示する
- 名前のあるHumanがsay()を実行すると'Hello World. My name is 名前'と表示する


先にテストを書きます。spec/Human.jsを作成しましょう。

```spec/Human.js
describe("Humanオブジェクトのテスト", function () {
  it("名前の無いHumanがsay()を実行すると'Hello World'と表示する", function () {
    var anon = new Human();
    expect(anon.say()).toEqual("Hello World."); 
  });

  it("名前のあるHumanがsay()を実行すると'Hello World. My name is 名前'と表示する", function () {
    var taro = new Human("taro"); 
    expect(taro.say()).toEqual("Hello World. My name is taro.");
  });
});
```

SpecRunner.html に読み込ませます。

```SpecRunner.html
<!-- include spec files here... -->
<script type="text/javascript" src="spec/Human.js"></script>
```
SpecRunner.htmlをブラウザで開くと、当然ながらテストは失敗します。
では、テスト成功を目指してsrc/Human.js を実装していきましょう。

```src/Human.js
function Human(name){
  this.name = name;

  this.say = function () {
    var output = "Hello World.";
    if(this.name){
      output = output + " My name is " + this.name + "."; 
    }
    return output;
  };
}
```

SpecRunner.html で読み込みつつ、テスト実行してください。

![jasmine05.png](https://qiita-image-store.s3.amazonaws.com/0/29871/51dc5581-650d-bbfd-acfb-e52ae5d88b1e.png "jasmine05.png")

無事テストが通りました！

## テストがあれば機能追加に強い

"My name is 名前" だけを返すメソッドが必要になりました。
要件は以下

 - 名前の無いHumanがsayName()を実行すると'Sorry, I don't have name.'を返す。
 - 名前のあるHumanがsayName()を実行すると'My name is 名前.'を返す


ではテストから実装していきましょう。spec/Human.jsに追記していきます。

```spec/Human.js
it("名前の無いHumanがsayName()を実行すると'Sorry, I don\'t have name.'を返す", function () {
  var anon = new Human();
  expect(anon.sayName()).toEqual("Sorry, I don\'t have name."); 
});

it("名前のあるHumanがsayName()を実行すると'My name is 名前.'を返す", function () {
  var taro = new Human("taro"); 
  expect(taro.sayName()).toEqual("My name is taro."); 
});
```

続いてsrc/Human.jsも実装していきます。

```src/Human.js
function Human(name){
  this.name = name;

  this.say = function () {
    var output = "Hello World.";
    if(this.name){
      output = output + " " + this.sayName(); //(2)
    }
    return output;
  };

  // (1)
  this.sayName = function () {
    if(this.name){
      return "My name is " + this.name + ".";
    }else{
      return "Sorry, I don't have name.";
    }
  }
}
```

(1)が新しく追加したメソッドです。
それにともない、(2)部分もsayName()を呼び出す形に変更しました。
say()の実装に変更がありましたが、テストはすでに用意されている状態です。

SpecRunner.htmlをブラウザで開いてテストをします。

![jasmine06.png](https://qiita-image-store.s3.amazonaws.com/0/29871/55c4562e-6ff9-1ea0-52a0-c07330e50184.png "jasmine06.png")

テスト成功です！
このように、テストを書くことによって、新たな機能追加による旧機能の影響も同時にチェックできるのが、テストを書くことの大きなメリットの一つだと思います。

## おまけ（beforeEach）

テスト内でHumanオブジェクトの初期化処理が繰り返されていますが
これはbeforeEach/afterEachを使うことで簡略化できます。
beforeEach/afterEachはitが呼ばれる前後に実行されます。

またdescribeも入れ子に増やして名前のある・ないオブジェクトごとに整理しました。
この時、beforeEach/afterEachはdescribeの内側が対象になります。

```spec/Human.js

describe("Humanオブジェクトのテスト", function () {

  describe("名前の無いHuman", function () {
    var anon;

    beforeEach(function () {
      anon = new Human();
    });

    afterEach(function () {
      anon = undefined; 
    });
    
    it("say()を実行すると'Hello World'と表示する", function () {
      expect(anon.say()).toEqual("Hello World."); 
    });

    it("sayName()を実行すると'Sorry, I don\'t have name.'を返す", function () {
      expect(anon.sayName()).toEqual("Sorry, I don\'t have name."); 
    });
  });

  describe("名前のあるHuman", function () {
    var taro;
    
    beforeEach(function () {
      taro = new Human('taro'); 
    });

    afterEach(function () {
      taro = undefined; 
    });

    it("say()を実行すると'Hello World. My name is 名前'と表示する", function () {
      expect(taro.say()).toEqual("Hello World. My name is taro.");
    });

    it("sayName()を実行すると'My name is 名前.'を返す", function () {
      expect(taro.sayName()).toEqual("My name is taro."); 
    });
    
  });

});

```