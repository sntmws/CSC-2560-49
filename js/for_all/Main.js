var app = new Phaser.Game(1920, 1080, Phaser.CANVAS, "Main");
app.global = {
	deviceKey: null,
	username: null,
	roomId: null,
	algoName: null,
	algoType: null,
	stdIconSprite: [],
	parametersArr: [],
	swappedParametersArr: [],
	targetValue: null,
	desiredStds: 0,
	dateTime: null,
	time: null,
	result: null,
	popupOn: false,
	algosObj: {},
	algoNamesArr: [],
	algoGuidesBe: null,
	algoGuidesAf: null,
	algoText: null,
	operator: [],
	actors: [],
	userType: null,
	index: null,
	parameter: null,
	scanned: false,
	answer: 0,
	correctAnswer: 0
};
app.state.add("Boot", Boot);
app.state.add("Preload", Preload);
app.state.add("Login", Login);
app.state.add("TeacherMenu", TeacherMenu);
app.state.add("StudentMenu", StudentMenu);
app.state.add("WaitingRoom", WaitingRoom);
app.state.add("PlayingRoom", PlayingRoom);
app.state.add("Resultant", Resultant);
app.state.start("Boot");