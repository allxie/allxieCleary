angular.module('myApp', [])

.controller('MainCtrl', ['$scope', function($scope) {

  $scope.partials =
  	[ { name: 'projects.html', url: 'projects.html'},
      { name: 'contact.html', url: 'contact.html'} ];
  $scope.partial = $scope.partials[0];

  $scope.contact = function(){
  	$scope.title = "Contact Me";
  	$scope.url = "contact.html";
  }
  $scope.projects = function(){
  	$scope.title = "Projects";
  	$scope.url = "projects.html";
  }
  $scope.resume = function(){
  	$scope.title = "Resume";
  	$scope.url = "resume.html";
  }
  $scope.games = function(){
    $scope.title = "Games";
    $scope.url = "hangman.html";
  }
}])

.controller('HangManCtrl', ['$scope', function($scope){
  $scope.inGame = false;
  $scope.currentWord = "";
  $scope.hiddenCharls = [];
  $scope.win = " ";
  $scope.lose = " ";
  $("#hangDraw").html("<br>&nbsp;&nbsp;____<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|_<br>&nbsp;&nbsp;&nbsp;&nbsp;|___|");

  $scope.addWord = function(){
    $scope.guesses = [];
    $scope.inGame = true;
    // Re makes the platform empty
    $("#hangDraw").html("<br>&nbsp;&nbsp;____<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|_<br>&nbsp;&nbsp;&nbsp;&nbsp;|___|");
    // changes the win and lose so that they're blank
    $scope.win = " ";
    $scope.lose = " ";
    // grabs the new word
    $scope.currentWord = $scope.newWord;
    // empties the form
    $scope.newWord = "";
    $scope.hiddenCharls = $scope.currentWord.split('');
    $scope.hiddenCharls.forEach(function(el,id,arr){
      arr[id] = "_";
    });
    console.log("first one: ", $scope.hiddenCharls);
  };


  var winOrLose = function(){
    $scope.inGame = false;
    // $scope.currentWord = "";
    // $scope.hiddenCharls = [];
  }

  $scope.guesses = [];
  $scope.guessLetter = function(){
    $scope.errorMessage = "";
    // if the letter is really only one character
    if($scope.letter.length === 1){
      if($scope.guesses.indexOf($scope.letter) === -1 && $scope.currentWord.indexOf($scope.letter) === -1) {
        $scope.guesses.push($scope.letter);

        switch ($scope.guesses.length) {
        case 0:
            break;
        case 1:
            $("#hangDraw").html("<br>&nbsp;&nbsp;____<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;0&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|_<br>&nbsp;&nbsp;&nbsp;&nbsp;|___|");
            break;
        case 2:
            $("#hangDraw").html("<br>&nbsp;&nbsp;____<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>\\0&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|_<br>&nbsp;&nbsp;&nbsp;&nbsp;|___|");
            break;
        case 3:
            $("#hangDraw").html("<br>&nbsp;&nbsp;____<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>\\0/&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|_<br>&nbsp;&nbsp;&nbsp;&nbsp;|___|");
            break;
        case 4:
            $("#hangDraw").html("<br>&nbsp;&nbsp;____<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>\\0/&nbsp;&nbsp;&nbsp;|<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|_<br>&nbsp;&nbsp;&nbsp;&nbsp;|___|");
            break;
        case 5:
            $("#hangDraw").html("<br>&nbsp;&nbsp;____<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>\\0/&nbsp;&nbsp;&nbsp;|<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>/&nbsp;&nbsp;&nbsp;&nbsp;_|_<br>&nbsp;&nbsp;&nbsp;&nbsp;|___|");
            break;
        case 6:
            $("#hangDraw").html("<br>&nbsp;&nbsp;____<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>\\0/&nbsp;&nbsp;&nbsp;|<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>/&nbsp;\\&nbsp;&nbsp;_|_<br>&nbsp;&nbsp;&nbsp;&nbsp;|___|");
            $scope.lose = "You LOSE. And you're DEAD. The word was \"" + $scope.currentWord + ".\"";
            winOrLose();
            break;
        }
      }

      indOfGuessed = $scope.currentWord.indexOf($scope.letter)
      if ( indOfGuessed!= -1) {
        $scope.hiddenCharls[indOfGuessed] = $scope.letter;
        for(var i = indOfGuessed; i < $scope.hiddenCharls.length; i++){
          if ($scope.currentWord[i] === $scope.letter){
            $scope.hiddenCharls[i] = $scope.letter;
          }
        }
      }
    } else{
    $scope.errorMessage = "Please enter only one letter.";

    }
    //end one char validation

    $scope.letter = "";
    console.log("scope Word array: ", $scope.hiddenCharls);
    if ($scope.hiddenCharls.indexOf("_") === -1){
      winOrLose();
      $scope.win = "You Won!";
    }
  };
}])
.controller('DiceCtrl',['$scope', function($scope){
  console.log("tis loading");

  $scope.rollBut = function(){
    console.log("clicked");
    //grabs the three forms
    var numDice = $scope.numDice;
    var numSides = $scope.numSides;
    var constant = $scope.constant;
    // var numDice = document.getElementById("numDice").value;
    // var numSides = document.getElementById("numSides").value;
    // var constant = document.getElementById("constant").value;
    var roll = new Roll(constant);
    roll.init(numDice, numSides);
    roll.roll();
    console.log("sum :" + roll.sum);
    //puts the sum where we want it.
    $scope.rollsum = roll.sum;
    // document.getElementById("rollsum").innerHTML = roll.sum;
  };

    //Using object oriented programming
  //to create dice with numbers of sides

  //Die constructor with a number of sides
  function Die(numSides){
    this.numSides = numSides;
    this.result = 0;
  }
  //This prototype rolls a Die
  Die.prototype.roll = function(){
    var numSides = this.numSides;
    this.result = Math.ceil(Math.random() * numSides);
    return this.result;
  }

  //this is a constructor for a roll
  function Roll(mod, dice){
    this.dice = dice || [];
    this.sum = 0;
    this.mod = mod || 0;
  }

  //This rolls the dice and creates
  Roll.prototype.roll = function(){
    this.sum = 0;
    $scope.individual = "";
    // document.getElementById("individual").innerHTML = "";
    var _this = this;
    this.dice.forEach(function(die){

      die.roll();
      console.log("result: " + die.result);
      console.log("sum 1 :" + _this.sum);
      console.log(typeof die.result);
      $scope.individual = $scope.individual + die.result + "  +  ";
      // document.getElementById("individual").innerHTML += die.result + "  +  ";
      _this.sum += die.result;
      return _this.sum;
    });
    console.log(typeof this.mod);
    this.sum += Number(this.mod);
    $scope.individual = $scope.individual + "Mod " + this.mod;
    // document.getElementById("individual").innerHTML += "Mod " + this.mod;
  };
  //initiates the roll by creating the right number of dice of the size we want
  Roll.prototype.init = function(numDice, numSides){
    while(this.dice.length < numDice) {
      var die = new Die(numSides);
      this.dice.push(die);
    };
  };


  //end dice speciic stuff
  // // // // // // // // // // // // // // // //

}])
.controller('TacCtrl',['$scope', function($scope){
//Listen for event on all squares of the board




}]);

