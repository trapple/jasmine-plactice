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
