function Human(name){
  this.name = name;

  this.say = function () {
    var output = "Hello World.";
    if(this.name){
      output = output + " " + this.sayName();
    }
    return output;
  };

  this.sayName = function () {
    if(this.name){
      return "My name is " + this.name + ".";
    }else{
      return "Sorry, I don't have name.";
    }
  }
}
