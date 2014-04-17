describe("とてもシンプルなHello Worldのテスト", function () {
  it("say()を実行すると'Hello World.'と表示する", function () {
    expect(say()).toEqual("Hello World."); 
  });
});
