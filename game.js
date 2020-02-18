
var gamePattern=[];
var userClickedPattern=[];

var buttonColours=["red","blue","green","yellow"];

var started=false;
var level=0;

$(document).on("keydown",function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){

  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSoud(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    playSoud("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence(){
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber=Math.floor(Math.random()*4); //random number btw 0 and 3

  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSoud(randomChosenColour);
}

function playSoud(name){
  var soundSrc="sounds/"+name+".mp3";
  var audio=new Audio(soundSrc);
  audio.play();
}



function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
       $("#"+currentColor).removeClass("pressed");
   }, 100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
