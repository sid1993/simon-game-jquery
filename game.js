//initialize
var colors = ["green", "red", "yellow", "blue"];
var levelSequence = [];
var currentSequence = [];
var level = 0;

// start the game
$("*").keydown(function () {
	if (level == 0) {
		$("body").removeClass("game-over");
		levelUp();
	}
});

//Playing the game
$(".btn").click(function () {
	if (level != 0) {
		if (this.id != currentSequence[0]) {
			soundFx("sounds/wrong.mp3");
			currentSequence = [];
			levelSequence = [];
			level = 0;
			$("body").addClass("game-over");
			$("#level-title").text("Press Any Key to restart");
		} else {
			soundFx("sounds/" + currentSequence[0] + ".mp3");
			currentSequence.shift();
			if (currentSequence.length == 0) {
				levelUp();
			}
		}
	}
});

//Add a color to sequence after every level
function addSequence() {
	var nextSequence = colors[Math.floor(Math.random() * 4)];
	soundFx("sounds/" + nextSequence + ".mp3");
	levelSequence.push(nextSequence);
	animate(nextSequence);
}

//level up
function levelUp() {
	$("#level-title").text("Level " + ++level);
	addSequence();
	currentSequence = Array.from(levelSequence);
}

//sound effect
function soundFx(soundPath) {
	var sound = new Audio(soundPath);
	sound.play();
}

//animate
function animate(sequence) {
	$("#" + sequence).addClass("pressed");
	setTimeout(function () {
		$("#" + sequence).removeClass("pressed");
	}, 200);
}
