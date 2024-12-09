$(document).ready(function(){
var userClickedPattern = []; 

var started = false;

var index = 0;

var level = 0;

var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

function nextSequence(){
    userClickedPattern = [];
    level+=1;
    $("h1").text("Level "+level);   
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
}

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    index+=1;
    checkAnswer(index);
    
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}
$("body").keydown(function(event){
    if(!started){
    nextSequence();
    started = true;
    }
}
)


function checkAnswer(currentLevel){
    if(userClickedPattern[index-1]!=gamePattern[index-1]){
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game over,Press any key to restart");
        index = 0;
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        started = false;
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);

    }
    if(index==level && index!=0){
        index = 0;
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}


})