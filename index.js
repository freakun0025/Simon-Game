var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "green", "blue", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("h1").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        
        var audio=new Audio("./sounds/wrong.mp3");
        audio.play()
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    
}


}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text(`Level ${level}`);

    // Add animation and sound for the new sequence
    $(`#${randomChosenColour}`).fadeOut(250).fadeIn(250);
    var audio = new Audio(`./sounds/${randomChosenColour}.mp3`);
    audio.play();
}

function playSound(name) {
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[]
    started=false;
}


