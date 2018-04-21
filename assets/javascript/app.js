var StartScreen;
var gameHTML;
var counter = 30;
var questionArray = [
    "Who was Pam's Boyfriend in Season 1?",
    "Where did Michael Scott move to after he left Scranton?",
    "Who did Jim date when he went to Stamford?",
    "What was the name of the CEO of Sabre",
    "What was David Wallace's business idea after he left Dunder Mifflin?",
    "Which one of these people was not in accounting?",
    "Which one of these was not the receptionist at one point?",
    "Which city did Pam go to Art School in?",
];
var answerArray =[
    ["Roy","Jim","Michael","Creed"],
    ["California", "Colorado", "Illinois","Greece"],
    ["Pam", "Karen","Kelley","Erin"],
    ["David Wallace","Jan","Ryan","Jo"],
    ["Uber","Pop-it","Wack-it","Suck-it"],
    ["Kevin","Oscar","Toby","Angela"],
    ["Kelley","Erin","Ryan","Pam"],
    ["Chicago","Philadelphia","New York","Austin"],

];

var imageArray = [];
var correctAnswers = [
    "A. Roy",
    "B. Colorado",
    "B. Karen",
    "D. Jo",
    "D. Suck-it",
    "C. Toby",
    "A. Kelley",
    "C. New York",
];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;






$(document).ready(function() {

    function initialScreen () {
        var startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    
        $(".mainArea").html(startScreen);
    }

initialScreen();


$("body").on("click", ".start-button", function(event){
       
        generateHTML();

        timerWrapper();

});

$("body").on("click", ".answer", function(event){
    answeredQuestion = true;
    
    selectedAnswer = $(this).text();
    
    if(selectedAnswer === correctAnswers[questionCounter]) {
        alert("correct");

        clearInterval(theClock);
        
        generateWin();
    }
    else {
        
        alert("wrong answer");
        
        clearInterval(theClock);
        
        generateLoss();
    }
});

$("body").on("click", "reset-button", function (event){
    resetGame();
});

});

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}


function generateHTML() {
	var gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
};

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}











