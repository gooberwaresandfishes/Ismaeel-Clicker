// declare stat variables
var points = 0;
var clickspersecond = 1;
var manualincrement = 1;
var floppamoney = 200;
var theftchance = 1;
var bargainingskill = 0;
var cementmoney = 100;

var ogheight;

// declare time variables
var currentAutoInterval = 0;
var currentFloppaInterval = 0;

var bingusMode = true;

// sound variables
var purchasesound;
var eatsound;
var meowsound;
var bruhsound;

// bruh count
var bruh = 0;

// these are all the purchases you can have, and their details
// 0 : level 1 : cost 2 : valuesincreased
var purchases =
[
// index 2 is a dictionary to find all values changed and how much it is changed by
// pure upgrades that increase a single stat
[1, 100, {"clickspersecond":1}, "peter<br>increases clickspersecond by 1"], 
[1, 100, {"manualincrement":1}, "concreteater<br>increases manualincrement by 1"],
[1, 100, {"floppamoney":400}, "doge<br>increases floppamoney by 400"],
[1, 100, {"theftchance":-0.2}, "apustaja<br>decreases theftchance by 0.2%"],
[1, 100, {"bargainingskill":5}, "wunkus<br>increases bargainingskill by 5"],
[1, 100, {"cementmoney":100}, "clefland<br>increases cementmoney by 100"],

// upgrades that increase or decrease certain stats
[1, 100, {"theftchance":0.1, "clickspersecond":3},
"mort<br>increases clickspersecond by 3<br>increases theftchance by 0.1%"],

[1, 100, {"theftchance":0.15, "bargainingskill":10},
"brain griffer<br>increases bargainingskill by 10<br>increases theftchance by 0.15%"],

[1, 100, {"manualincrement":3, "clickspersecond":-2},
"appel<br>increases manual increment by 3<br>decreases clickspersecond by 2"],

[1, 100, {"clickspersecond":3, "manualincrement":-2},
"kitler<br>increases clickspersecond by 3<br>decreases manualincrement by 2"],

[1, 100, {"floppamoney":500, "bargainingskill":-10},
"chris grillen<br>increases floppamoney by 500<br>decreases bargainingskill by 10"],

[1, 100, {"cementmoney":200, "floppamoney":-200},
"jinx<br>increases cementmoney by 200<br>decreases floppamoney by 200"],

[1, 100, {"clickspersecond":5, "manualincrement":5,
"theftchance":0.4}, "maxwell<br>increases clickspersecond by 5<br>\
increases manualincrement by 5<br> increases theftchance by 0.4%"],

[1, 100, {}, "vsauce<br>does nothing"]
]


// all characters purchaseable, characters[name][0] tells you if you have it unlocked
var characters = {"ismaeel":[true, 0], "adam":[false, 10000],
"mario":[false, 20000], "custom":[false, 30000]}


// button click functions

// triggered when the centre bottom box (ismaeel) is clicked
function clicked() {
	
	// points are increased by manual increment and doubled if bongus mode
	points += manualincrement * (bingusMode ? 1 : 2);
	
	// changes the images in the boxes randomly
	document.getElementById('rightpic').src =
	"./resources/rightpics/"
	+ Math.floor(Math.random()*329) + ".jpg";
	
	document.getElementById('leftpic').src =
	"./resources/leftpics/"
	+ Math.floor(Math.random()*22) + ".jpg";
	
	// response is changed on click, checks if points are greater than 1000
	document.getElementById('response').innerText = points > 1000 ?
	// displays different message depending on condition
	"you git tha hang of it buddy! ure rich now!!" : "yes keep cilcking him xd";
	
	
	// theft mechanic - random chance to be robbed
	if ((Math.random()*100) <= theftchance) {
		points = Math.floor(points / 2)
		document.getElementById('response').innerText =
		"LOL YOU GOT ROBED FOR HALF YOUR MONEY IDOT!!! " + points +
		"PESOS WERE TAKEN XD HAHHA";
	}
	
	// 5% chance of triggering
	if (Math.floor(Math.random()*100) <= 4) {
		
		// moves to a random location on screen
		document.getElementById('cement').style.top = Math.round(Math.random() *
		(window.innerHeight - document.getElementById('cement').height)) + "px";
		
		document.getElementById('cement').style.left = Math.round(Math.random() *
		(window.innerWidth - document.getElementById('cement').width)) + "px";
	}
}

// triggered when bingus is clicked, toggles bingus mode
function bingusModeClicked() {
	
	meowsound.play();
	
	// bingusMode is toggled
	bingusMode = !bingusMode;

	// response is changed on click, checks if bingus or bongus mode
	document.getElementById('response').innerText = bingusMode ?
	// informs user on what happens when on bingus mode and bongus mode
	"you cilcked bingus 2x clickspersec!!" : "you cilcked bongus 2x manualincrement!!";
	
	// bingusMode is visually toggled
	document.getElementById('bingus').src =
	"./resources/other/"
	+ (bingusMode ? "bingus" : "bongus") + ".gif";
	
	// background becomes dark / changes gif
	document.body.style.backgroundImage =
	"url('./resources/other/"
	+ (bingusMode ? "background" : "backgrounddark") + ".gif')";
}

// triggered when big floppa gif is clicked
function floppaClicked() {
	
	
	// checks to see if floppa is ready
	if (3000 < currentFloppaInterval) { // if floppa is ready...
	
		meowsound.play();
		
		// points are added on depending on floppa money stat
		points += floppamoney;
		
		// big floppa is reset and unreadies
		document.getElementById('floppa').src =
		"./resources/other/big-floppa.gif";
		
		currentFloppaInterval = 0;
		
		// response is thrown to display money gained
		document.getElementById('response').innerText =
		"wowee you clicked floppa and collected " + floppamoney + " punds!!!";
	}
	else { // if floppa is not ready throw a simple response
		document.getElementById('response').innerText = "floppa is not ready yet silly idot";
	}
}

// triggered if a character is clicked
function characterClicked(name) {
	
	if (!characters[name][0]) { // if character is not unlocked
		
		// if you have enough money
		if (characters[name][1] <= points) {
			
			// purchase sound is played
			purchasesound.play();
			
			// money is taken (bargaining skill not applied)
			points -= characters[name][1];
			
			// sets text on button to unlocked
			document.getElementById(name).innerHTML = name + "<br>unlocked!";
			
			// sets it to unlocked
			characters[name][0] = true;

			// sets the face to the character
			document.getElementById('face').src = name == "custom" ?
				prompt("Please enter the image link", "") : // if it is custom it prompts the user for the image
				"./resources/other/" + name + ".jpg"; // else it gets the correct image
			
			// creates response
			document.getElementById('response').innerText = "O: unlocked " + name
		}
		else {
			// response if user cant afford
			document.getElementById('response').innerText = name +
			" hahahaha youer'e two poor! too buy " + name
		}
	}
	else { // if the character is unlocked it just sets it
	
		// sets the face to the character
			document.getElementById('face').src = name == "custom" ?
				prompt("Please enter the image link", "") : // if it is custom it prompts the user for the image
				"./resources/other/" + name + ".jpg"; // else it gets the correct image
		
		// response
		document.getElementById('response').innerText = "you are now wearing the skin of " + name;
	}
}

// runs for each purchase with different index
function purchase(index) {
	
	// checks if person can afford the transaction (bargaing skill decreases price)
	if (purchases[index][1] - bargainingskill > points) {
		
		// updates resonse and tells you money needed
		document.getElementById('response').innerText =
			"ur so poor xd noob, you need " + (purchases[index][1] -
			(points + bargainingskill))  + " more lakhs you silly boy";
		
		// returns (obviously)
		return;
	}
	
	purchasesound.play()
	
	// removes cost (including bargaining discount) from points
	points -= purchases[index][1] - bargainingskill;
	
	// updates purchase level
	purchases[index][0] += 1;
	
	// updates purchase cost and rounds it
	purchases[index][1] *= 1.3;
	purchases[index][1] = Math.floor(purchases[index][1]);
	
	// looks through all the values changed with that purchase
	for(var key in purchases[index][2]) {
		
		// the amount the key stat is changed by, (defined to avoid repitition)
		amount = purchases[index][2][key];
		
		// to find the variable per key
		switch(key) {
			// updates the stat with the value specified
			case "clickspersecond": clickspersecond += amount;break;
			case "manualincrement": manualincrement += amount;break;
			case "floppamoney": floppamoney += amount;break;
			
			case "theftchance":
				theftchance += amount;
				theftchance = Math.round(theftchance * 100) / 100;
				break;
			
			case "bargainingskill": bargainingskill += amount;break;
			case "cementmoney": cementmoney += amount;break;
			
			default: alert("error"); // should never happen
		}
	}
	
	// response
	document.getElementById('response').innerText = "than you fir shopin at adsa ples com again xdxd";
	
	// updates the stats of the purchase buttons
	for (let i = 0; i < purchases.length; i++) {
 		document.getElementById("p" + i).innerHTML = purchases[i][3] + "<br>level:"
			+ purchases[i][0] + " cost:" + (purchases[i][1] - bargainingskill);
	}
	
	// updates the overall stats
	document.getElementById('stats').innerHTML = 
	`
		clicks per second: ` + clickspersecond + `
		<br> manual increment: ` + manualincrement + `
		<br> floppa money: ` + floppamoney + `
		<br> theft chance: ` + theftchance +`%
		<br> bargaining skill: ` + bargainingskill +`
		<br> cement money: ` + cementmoney
	
	// vsauce ending triggered if vsauce reaches 25 (without buttonpress unlike dingusending)
	if (purchases[13][0] >= 25) {
		ending(10);
	}
}

// if an ending button is pressed
function ending(index) {
	
	// finds the code for each ending
	switch(index) {
		case 0: // changes ending
			if (points < 50000) { // user must have 50,000 points
				document.getElementById('response').innerText = "ur too poor noob"
			} else {
				playCutscene("changes ending", 49);
			}
			break;
		
		case 1: // frogged ending
			if (points > -10000) { // user must have -50,000 points
				document.getElementById('response').innerText = "ur too rich noob"
			} else {
				playCutscene("frogged ending", 61);
			}
			break;
		
		case 2: // cool guy ending
			for(var key in characters) { // must have every skin unlocked
				if(!characters[key][0]) {
					document.getElementById('response').innerText = "yu need mur skins brah";
					return;
				}
			}
			
			playCutscene("cool guy ending", 47);
			break;
			
		case 3: // trolled ending
			if (points < 100000) { // must have 100,000 points
				document.getElementById('response').innerText = "ur too poor noob"
			} else {
				playCutscene("trolled ending", 28);
			}
			break;
		
		case 4: // kicked out ending
			if (cementmoney < 2000) { // must have 2000 cement money
				document.getElementById('response').innerText = "I NEED MORE CEMENT NOWb"
			} else {
				playCutscene("kicked out ending", 60);
			}
			break;
		
		case 5: // dingus ending
			if (purchases[12][0] < 25) { // must have level 25 dingus
				document.getElementById('response').innerText = "dingus thirsts for further power"
			} else {
				playCutscene("dingus ending", 40);
			}
			break;
		
		case 6: // robbed ending
			if (theftchance < 10) { // must have a theft chance of 10%
				document.getElementById('response').innerText = "he will arrive when the chance is certain"
			} else {
				playCutscene("robbed ending", 52);
			}
			break;
			
		case 7: // fool ending
			for(var i in purchases) { // checks if stats are all level 1
				if (purchases[i][0] != 1) {
					
					document.getElementById('response').innerText =
					"WHY ARE YOU CLICKING THIS. YOU CLEARLY HAVENT DONE IT IDIOT"
					
					return;
				}
			}
			
			if (points < 10000) { // chekcs if they have the points
				
				document.getElementById('response').innerText =
				"WHY ARE YOU CLICKING THIS. YOU CLEARLY HAVENT DONE IT IDIOT"
			} else {
				playCutscene("fool ending", 87); 
			}
			break;
			
		case 8: // asdfghjk ending
			playCutscene("asdfghjk ending", 65);
			break;
		case 9: // lore ending
			playCutscene("lore ending", 42);
			break;
		case 10: // vsauce ending
			playCutscene("vsauce ending", 37);
			break;
	}
}

// plays the bruh sound effect when button is clicked
function playbruh() {
	bruhsound.play(); // bruh is played
	bruh += 1; // bruh is increased by 1
	if (bruh >= 100) { // if you got 100 bruh
		ending(9) // ending bruh
	}
}


// triggered when cement is clicked
function cementClicked() {
	
	eatsound.play();
	
	// gives you points when clicks
	points += cementmoney;
	// moves button off screen
	document.getElementById('cement').style.left = "10000px";
	
	// creates response
	document.getElementById('response').innerText =
	"you ate the cement! wel don buddy, yu got " + cementmoney + " rupees";
}


// inner js working functions

// main game loop, triggers every 10 ms (0ms = 1 second)
function mainloop() {
	
	// intervals are increased
	currentAutoInterval += 1;
	currentFloppaInterval += 1;
	
	// when 1 second has passed points are added (autoclick)
	if (500 < currentAutoInterval) {
		// points are increased by the clicks per second state and doubled if on bingus mode
		points += clickspersecond * (bingusMode ? 2 : 1);
		// interval is reset
		currentAutoInterval = 0;
	}
	
	// every 40 seconds floppa becomes ready, == insead of < to prevent gif reseting each tick
	if (15000 == currentFloppaInterval) {
		// set floppa to the ready gif to let players know
		document.getElementById('floppa').src = "./resources/other/floppaready.gif";
	}
	
	// counter is updated
	document.getElementById('counter').innerHTML = points;
	
}

// initialises all the stuff and stuff
function init() {
	
	// initialise the sounds
	purchasesound = new sound("./resources/music/purchasesound.ogg");
	eatsound = new sound("./resources/music/eatsound.ogg");
	meowsound = new sound("./resources/music/meowsound.ogg");
	bruhsound = new sound("./resources/music/bruhsound.ogg");
	
	// og height is saved to detect console openinings
	ogheight = window.innerHeight;
	
	// variable reliant html text is put here so all information is accurate
	document.getElementById('counter').innerHTML = points;
	
	document.getElementById('stats').innerHTML = 
	`
		clicks per second: ` + clickspersecond + `
		<br> manual increment: ` + manualincrement + `
		<br> floppa money: ` + floppamoney + `
		<br> theft chance: ` + theftchance +`%
		<br> bargaining skill: ` + bargainingskill +`
		<br> cement money: ` + cementmoney

	// purhases are updated in for loop
	for (let i = 0; i < purchases.length; i++) {
 		document.getElementById("p" + i).innerHTML = purchases[i][3] + "<br>level:"
			+ purchases[i][0] + " cost:" + (purchases[i][1] - bargainingskill);
	}
	
}

// entrance to the script
window.onload = function () {
	// everything is initialised
	init();
	
	// mainloop is called every tick
	setInterval(mainloop, 0);
}

// misc functions

// sound effect class/function thing i stole so idk how it works
function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
} 

// plays cutscenes
function playCutscene(name, duration) { // duration in seconds

	// adds the video
	document.getElementById('vid').insertAdjacentHTML('beforeend',
		`<source src="./resources/cutscenes/` + name + `.mp4"
			type="video/mp4">Your browser does not support the video tag.`);
	
	// stops music
	document.getElementById('backgroundmusic').src =
	document.getElementById('backgroundmusic').src.replace('autoplay=0','autoplay=1');

	document.getElementById('backgroundmusic').pause();

	// fullscreens it
	document.getElementById('vid').requestFullscreen();
	
	// destroys cursor
	document.body.style.cursor = 'none';
	
	// when it ends it will be reset
	setInterval(refresh, duration * 1000);
}

// only because set interval only accepts functions in the file
function refresh() {
	window.location.reload();
}
