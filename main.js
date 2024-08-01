let counter = 0;
let increment = 1;
let autoincrement = 3;
let speed = 3000;
let drip = 1;
let cost = [10, 10, 10, 200, 10000];
let pics = ["1.jpg", "2.webp", "3.webp", "4.webp", "5.png", "6.webp", "7.jpg", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.jpg", "16.webp", "17.webp", "18.jpg"]

function autoclick() {
	counter += autoincrement;
	document.getElementById('counter').innerText = counter;
}

function count() {
	counter += increment;
	document.getElementById('counter').innerText = counter;
	
	// add new picture
	document.getElementById('pic').src = "./pic/"+ pics[Math.floor(Math.random()*pics.length)];
}

function purchases(purchase) {
	
	if (counter >= cost[purchase]) {
		counter -= cost[purchase];
		document.getElementById('counter').innerText = counter;
		
		// update the cost
		cost[purchase] = cost[purchase] * 2;
		
		switch (purchase) {
			
			case 0:
			increment++;
			document.getElementById('purchase0').innerText = "current increment: " + increment + " clicks\nbuy increment: " + cost[0] + " punds";
			break;
			
			case 1:
			speed = Math.round(speed/1.2);
			document.getElementById('purchase1').innerText = "current autoclick speed: " + Math.round(speed/100)/10 + "s\nbuy decrease autoclick speed: " + cost[1] + " punds";
			break;
			
			case 2:
			autoincrement += 2;
			document.getElementById('purchase2').innerText = "current autoclick increment: " + autoincrement + " clicks\nbuy autoclick increment: " + cost[2] + " punds";
			break;
			
			case 3:
			drip++;
			document.getElementById('purchase3').innerText = "current drip level: " + drip + "\nbuy drip: " + cost[3] + " punds";
			document.getElementById('epic').style.marginTop = drip*20-110 +"px";
			break;
			
			case 4:
			
			document.getElementById('duckroll').requestFullscreen();
			document.getElementById('duckroll').style.visibility = "visible";
			break;
			
			default:
			break;
		}
	}
}

window.onload = function () {
	setInterval(autoclick, speed)
}
