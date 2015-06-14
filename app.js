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

////////////////////////////////////////////////////////////////////


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

////////////////////////////////////////////////////////////////////


.controller('DiceCtrl', ['$scope', function($scope){
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
}])

////////////////////////////////////////////////////////////////////

.controller('TacCtrl', ['$scope', function($scope){
  $scope.tacMessage = "It's X's turn. Click a square to make your move."
//Listen for event on all squares of the board
  var turnCount = 0;
  var xSquares = [];
  var oSquares = [];
  var is_xTurn = true;

  $scope.clicked = function(num){
    // cretes a string with the number and string identifying the box
    var boardLocation = "bind" + num;
    //If that square hasn't already been clicked...
    if ($scope[boardLocation] === undefined || $scope[boardLocation] === ""){
    turnCount += 1;
    console.log("turncount:: ", turnCount);
    // pick which of the players turn it is
    // Push the number into their array
    // and change the text in the box
      if (is_xTurn){
        $scope[boardLocation] = "X";
        if(winDetector(num, xSquares)){
          win("X");
          return;
        };
        xSquares.push(num);
        $scope.tacMessage = "O's turn!"

      } else{
        $scope[boardLocation] = "O";
        if(winDetector(num, oSquares)){
          win("O");
          return;
        };
        oSquares.push(num);
        $scope.tacMessage = "X's turn!"
      };
      console.log("score", xSquares, oSquares);
      //change the turn
      is_xTurn = !is_xTurn;
      //increment count
      if (turnCount === 9){
        tie();
      }
    }
  };

  var winDetector = function(num, arr){
    //add three including the most recent
    var third = num;
    if (turnCount > 4){
      for(var x = 0; x < arr.length-1; x++){
        for (var y = x+1; y < arr.length; y++){
          console.log("trying again");
          if (arr[x]+arr[y]+third == 15){
            console.log("found it!");
            return true;
          }
        }
      }
    }
    return false;
  }
  var win = function(winner){
    $scope.disableButtons = true;
    $scope.tacMessage = winner+ " won! Click restart to play again."
  }
  var tie = function(){
    $scope.disableButtons = true;
    $scope.tacMessage = "Stalemate! Click restart to play again."
  }

  $scope.reset = function(){
    turnCount = 0;
    xSquares = [];
    oSquares = [];
    is_xTurn = true;
    $scope.tacMessage = "It's X's turn. Click a square to make your move."
    for (var i = 1; i < 10; i++) {
      var boardLocation = "bind" + i;
      $scope[boardLocation] = "";
    };
    $scope.disableButtons = false;
  }

}]);

