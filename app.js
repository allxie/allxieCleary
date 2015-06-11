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
  $scope.currentWord = "angular";
  $scope.hiddenCharls = [];
  $scope.win = " ";
  $scope.lose = " ";
  $("#hangDraw").html("<br>&nbsp;&nbsp;____<br>&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|_<br>&nbsp;&nbsp;&nbsp;&nbsp;|___|");

  $scope.addWord = function(){
    $scope.currentWord = $scope.newWord;
    $scope.newWord = "";
    $scope.hiddenCharls = $scope.currentWord.split('');
    $scope.hiddenCharls.forEach(function(el,id,arr){
      arr[id] = "_";
    });
    console.log("first one: ", $scope.hiddenCharls);
  };



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
            $scope.lose = "You LOSE. And you're DEAD.";
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
      $scope.win = "You Won!";
    }
  };
}]);