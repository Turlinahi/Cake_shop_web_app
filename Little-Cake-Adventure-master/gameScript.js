
var version = "";
var title = "Little Cake Adventure";
document.getElementById("header").innerHTML = title + " " + version;
document.title = title;

var fps = 40;
var intervalId;

var aspectRatio = 0.567;
var insetRatio = 0.95;

var mousePos;
var canvas = document.getElementById("gameCanvas");
var endImg = document.getElementById("endImg");
var startImg = document.getElementById("startImg");
resizeCanvas();
var ctx = canvas.getContext("2d");

var debugText = document.getElementById("debugText");

var showInfo = false;
var soundOn = true;
var jumpSound = new Audio("Sounds/Hopp.mp3");
var bgMusic = new Audio("Sounds/Cooking%20by%20the%20book%208%20bit.mp3");
bgMusic.volume = 0.4;
var pickUpSound = new Audio("Sounds/pickup.mp3");
var failSound = new Audio("Sounds/oops.mp3");
failSound.volume = 0.6;

var BG_i = 0, PlayerSheet_i = 1, BushSheet_i = 2, ItemsSheet_i = 3, ButterflySheet_i = 4,
	Level_i = 5, LevelForeground_i = 6, Mountains_i = 7, Cloud_i = 8, objNote_i = 9,
	objEgg_i = 10, objFlour_i = 11, objSugar_i = 12, objButter_i = 13, objBerries_i = 14,
	soundOn_i = 15, soundOff_i = 16, infoHidden_i = 17, infoShown_i = 18, doorOpen_i = 19;
var img_names = ["Stationary/BEAN_BG.png","Animations/bean_sprite.png","Animations/buske_sheet.png","Animations/ITEMS_sheet.png","Animations/butterfly_sheet.png", "Stationary/bean_lvl.png","Stationary/bean_lvl_bro.png", "Stationary/berg.png", "Stationary/moln1.png", "Stationary/lapp1.png", "Stationary/lapp_1eggs.png", "Stationary/lapp_2flour.png", "Stationary/lapp_3sugar.png", "Stationary/lapp_4butter.png", "Stationary/lapp_5berries.png", "Stationary/sound1.png", "Stationary/sound2.png", "Stationary/info.png", "Stationary/infoclick.png", "Stationary/doorOpen.png"];
var imgs = [];
var loadingComplete = false;



canvas.addEventListener('mousemove', function(evt) {
    mousePos = getInGameMousePos(canvas, evt);
}, false);

loadImages(initialize);

var gravity = 0.198;
var camera;
var player;
var playerAnimation;
var playerWalkCycleRight = [18,19,20,21,22,23,24,25]; //0.1
var playerWalkCycleLeft = [27,28,29,30,31,32,33,34]; //0.1
var playerIdleCycleRight = [0,0,1,1,2,2,1,1]; //0.2
var playerIdleCycleLeft = [9,9,10,10,11,11,10,10]; //0.2
var playerJumpRight = [36,37,38,39,39,40]; //Jump
var playerJumpLeft = [45,46,47,48,48,49]; //Jump
var landFrames = 3;
var item_egg;
var item_egg_animation;
var item_egg_cycle = [0,1]; //0.2
var item_flour;
var item_flour_animation;
var item_flour_cycle = [2,3]; //0.2
var item_sugar;
var item_sugar_animation;
var item_sugar_cycle = [5,6]; //0.2
var item_butter;
var item_butter_animation;
var item_butter_cycle = [7,8]; //0.2
var item_berries;
var item_berries_animation;
var item_berries_cycle = [0,1]; //0.2
var item_bush_cycle = [2];

var goal_door;

var platforms = [];

var endDoor;

var cloudAmmount = 20;
var clouds = [];
var butterfly;
var butterflyAnimation;
var butterfly_cycle = [0,1];

var leftKeyDown = false;
var rightKeyDown = false;
var upKeyDown = false;
var downKeyDown = false;
var wKeyDown = false;
var aKeyDown = false;
var sKeyDown = false;
var dKeyDown = false;
var infoKeyDown = false;

var keysLeftDown; //(leftKeyDown || aKeyDown);
var keysRightDown; //(rightKeyDown || dKeyDown);
var keysUpDown; //(upKeyDown || wKeyDown);
var keysDownDown; // (downKeyDown || sKeyDown);

var failed = false;

var objective_egg = false;
var objective_flour = false;
var objective_sugar = false;
var objective_butter = false;
var objective_berries = false;

function loadImages(callback) {
  var n, count = img_names.length;
  var onload = function() { 
		if(--count === 0){
			loadingComplete = true;
			resizeCanvas();
			callback();
		}
	};
  
  for(n = 0 ; n < img_names.length ; n++) {
    name = img_names[n];
    imgs[n] = document.createElement('img');
	imgs[n].addEventListener('load', onload);
    imgs[n].src = name;
  }
}

function moveTo(currentVal, targetVal){
	if(currentVal-targetVal < 0.5 && currentVal-targetVal > -0.5)
		return targetVal;
	return currentVal + (targetVal-currentVal)/35;
}

function initialize(){
	// Values
	failed = false;
	
	objective_egg = false;
	objective_flour = false;
	objective_sugar = false;
	objective_butter = false;
	objective_berries = false;
	
	// Camera
	camera = new Entity(0,0,(imgs[Level_i].height)/aspectRatio,(imgs[Level_i].height),"#000000", 0, 0, 1.0);
	camera.update = function(){
		if(player.facingRight){
			camera.posX = moveTo(camera.posX,player.posX+player.width/2 - camera.width/3);
		}
		else if(!player.facingRight){
			camera.posX = moveTo(camera.posX, player.posX+player.width/2 - 2*camera.width/4);
		}
		if(camera.posX <= 0)
			camera.posX = 0;
		else if(camera.posX >= imgs[Level_i].width - camera.width){
			camera.posX = imgs[Level_i].width - camera.width;
		}
	};
	
	// Player
	player = new Entity(10,155,52,58,"#111111", 0, 0, 1.5, true);
	player.onGround = true;
	playerAnimation = new animatedSprite(imgs[PlayerSheet_i], 52, 58, 6, 9, 0.1);
	
	butterfly = new Entity(camera.posX+camera.width + 50 + Math.random()*250,
							imgs[BG_i].height*(0.4+Math.random()*0.1),
							14,16,"#111111", -2, 0, 100, false);
	butterflyAnimation = new animatedSprite(imgs[ButterflySheet_i], 14, 16, 1, 3, 0.2);
	
	// Entities infront
	item_egg = new Entity(589,180,35,35,"#111111", 0, 0, 0, false);
	item_egg_animation = new animatedSprite(imgs[ItemsSheet_i], 35,35,2,5,0.4);
	// Entities behind
	item_sugar = new Entity(2056,179,35,35,"#111111", 0, 0, 0, false);
	item_sugar_animation = new animatedSprite(imgs[ItemsSheet_i], 35,35,2,5,0.4);
	item_flour = new Entity(1082,52,35,35,"#111111", 0, 0, 0, false);
	item_flour_animation = new animatedSprite(imgs[ItemsSheet_i], 35,35,2,5,0.4);
	item_butter = new Entity(2438,52,35,35,"#111111", 0, 0, 0, false);
	item_butter_animation = new animatedSprite(imgs[ItemsSheet_i], 35,35,2,5,0.4);
	item_berries = new Entity(3535,181,69,35,"#111111", 0, 0, 0, false);
	item_berries_animation = new animatedSprite(imgs[BushSheet_i], 69,35,2,2,0.4);
	
	goal_door = new Entity(3456,153,40,58,"#111111", 0, 0, 0, false);
	
	
	// Clouds
	for(j=0; j<cloudAmmount; ++j){
		var cloudHeight = Math.random();
		var cloudX = Math.random()*imgs[Level_i].width;
			clouds[j] =
				new Entity(cloudX, cloudHeight*imgs[Level_i].height*0.5+imgs[Level_i].height*0.05, imgs[Cloud_i].width, imgs[Cloud_i].height, "#000000", -1, 0, 100, false, 0.6-0.5*cloudHeight/2);
			clouds[j].velX = -0.5*clouds[j].distanceScaling*clouds[j].distanceScaling;
			clouds[j].width = imgs[Cloud_i].width * (0.6+clouds[j].distanceScaling);
			clouds[j].height = imgs[Cloud_i].height * (0.6+clouds[j].distanceScaling);
	}
	
		
	// Platforms and Blocks
	var i = 0;
	platforms[i++] = new Block(0, 213, 316, 880);
	platforms[i++] = new Block(365, 183, 89, 1780);
	platforms[i++] = new Block(546, 213, 88, 880);
	platforms[i++] = new Block(699, 213, 881, 880);
	platforms[i++] = new Platform(890, 140, 305, 2);
	platforms[i++] = new Platform(1075, 87, 108, 2);
	platforms[i++] = new Block(1653, 181, 90, 1200);
	platforms[i++] = new Block(1808, 182, 89, 1190);
	platforms[i++] = new Block(1955, 213, 169, 880);
	platforms[i++] = new Block(2186, 213, 594, 880);
	platforms[i++] = new Platform(2251, 139, 179, 2);
	platforms[i++] = new Platform(2412, 87, 140, 2);
	platforms[i++] = new Platform(2533, 140, 177, 2);
	platforms[i++] = new Block(2823, 182, 89, 1190);
	platforms[i++] = new Block(2974, 182, 54, 1190);
	platforms[i++] = new Block(3074, 140, 53, 1610);
	platforms[i++] = new Block(3153, 87, 54, 214);
	platforms[i++] = new Block(3337, 213, 316, 880);
	
	// Done
	loadingComplete = true;
	if(intervalId == null)
	if(intervalId == null)
		intervalId = setInterval(mainLoop, 1000 / fps);
}

function restart(){
		
	failed = false;
	
	objective_egg = false;
	objective_flour = false;
	objective_sugar = false;
	objective_butter = false;
	objective_berries = false;
	
	player.posX = 10;
	player.posY = 155;
	player.velY = 0;
	player.onGround = true;
	
	/*// Clouds
	for(j=0; j<cloudAmmount; ++j){
		var cloudHeight = Math.random();
		var cloudX = Math.random()*imgs[Level_i].width;
			clouds[j] =
				new Entity(cloudX, cloudHeight*imgs[Level_i].height*0.5+imgs[Level_i].height*0.05, imgs[Cloud_i].width, imgs[Cloud_i].height, "#000000", -1, 0, 100, false, 0.6-0.5*cloudHeight/2);
			clouds[j].velX = -0.5*clouds[j].distanceScaling*clouds[j].distanceScaling;
			clouds[j].width = imgs[Cloud_i].width * (0.6+clouds[j].distanceScaling);
			clouds[j].height = imgs[Cloud_i].height * (0.6+clouds[j].distanceScaling);
	}*/
}


function mainLoop(){
	if(canvas.style.display == "none")
		return;
    update();
    draw();
}

function collisionCheckElement(element, index, array){
	element.collision(player);
}

var timeOffFail;
function update(){
	if(soundOn){
		if(bgMusic.paused)
			bgMusic.play();
	}
	else if(!bgMusic.paused)
		bgMusic.pause();
	
    controlsCheck();
    player.update();
	platforms.forEach(collisionCheckElement);
	objectiveCheck();
    camera.update();
	updateClouds();
	
	/* Player boundaries */
	if(player.posY > camera.posY+camera.height-player.height){
		if(new Date().valueOf() - timeOffFail >= 1350)
			restart();
		/*
		player.posY = camera.posY+camera.height-player.height;
		player.onGround = true;
		player.velY=0;*/
	}
	if(player.posY+player.height > 95*imgs[BG_i].height/100){
		if(soundOn && !failed){
			failSound.play();
		}
		if(!failed)
			timeOffFail = new Date().valueOf();
		failed = true;
	}
	if(player.posX > imgs[Level_i].width-player.width){
		player.posX = imgs[Level_i].width-player.width;
	}
	if(player.posX < 0){
		player.posX = 0;
	}
}

function objectiveCheck(){
	if(!objective_egg && item_egg.collisionCheck(player)){
		objective_egg = true;
		if(soundOn)
			pickUpSound.play();
	}
	if(!objective_flour && item_flour.collisionCheck(player)){
		objective_flour = true;
		if(soundOn)
			pickUpSound.play();
	}
	if(!objective_sugar && item_sugar.collisionCheck(player)){
		objective_sugar = true;
		if(soundOn)
			pickUpSound.play();
	}
	if(!objective_butter && item_butter.collisionCheck(player)){
		objective_butter = true;
		if(soundOn)
			pickUpSound.play();
	}
	if(!objective_berries && item_berries.collisionCheck(player)){
		objective_berries = true;
		if(soundOn)
			pickUpSound.play();
	}
	
	if(objective_berries &&
		objective_butter && 
		objective_egg && 
		objective_flour && 
		objective_sugar &&
		goal_door.collisionCheck(player)){
			canvas.style.display = "none";
			endImg.style.display = "block";
	}
}

function updateClouds(){
	for(i=0; i<cloudAmmount; ++i){
		if(clouds[i].posX < -imgs[Cloud_i].width*2){
			clouds[i].posX = imgs[Level_i].width * (1 + Math.random()/2);
			var cloudHeight = Math.random();
			clouds[i].posY = cloudHeight*imgs[Level_i].height*0.5+imgs[Level_i].height*0.05;
			clouds[i].distanceScaling = 0.6-0.3*cloudHeight;
			clouds[j].velX = -0.5*clouds[j].distanceScaling*clouds[j].distanceScaling;
			clouds[j].width = imgs[Cloud_i].width * (0.6+clouds[j].distanceScaling);
			clouds[j].height = imgs[Cloud_i].height * (0.6+clouds[j].distanceScaling);
		}
		clouds[i].update();
	}
	clouds.sort(function(a, b){
		return parseFloat(a.distanceScaling) - parseFloat(b.distanceScaling);
	});
	
	butterfly.update();
	if(butterfly.posX < camera.posX - camera.width - 100){
		butterfly.posX = camera.posX+camera.width + 50 + Math.random()*250;
		butterfly.posY = imgs[BG_i].height*(0.4+Math.random()*0.1);
	}
	
	
}

function controlsCheck(){	
	keysLeftDown = (leftKeyDown || aKeyDown);
	keysRightDown = (rightKeyDown || dKeyDown);
	keysUpDown = (upKeyDown || wKeyDown);
	keysDownDown = (downKeyDown || sKeyDown);

    //Player
    if(keysLeftDown&&!keysRightDown){
        if(player.velX > -player.speed)
            player.velX -= 0.3;
        else
            player.velX = -player.speed;
    }
    else if(keysRightDown&&!keysLeftDown){
        if(player.velX < player.speed)
            player.velX += 0.3;
        else
            player.velX = player.speed;
    }
    else{
        if(player.velX < -0.1)
            player.velX+=0.1;
        else if(player.velX > 0.1)
            player.velX-=0.1;
        else
            player.velX = 0;
    }
    if(keysUpDown){
			if(player.onGround){
				player.velY -= player.speed*3;
				player.onGround = false;
				player.landCounter = landFrames;
				if(soundOn)
					jumpSound.play();
			}
			else if(player.velY <= 0)
				player.velY -= gravity/3;
    }
	showInfo = false;
	if(infoKeyDown){
		showInfo = true;
	}
	/*if(keysDownDown){
        player.velY += gravity/2;
    }*/
	
	/*Info button hover?*/
	if(mousePosX > imgs[BG_i].width-imgs[infoHidden_i].width &&
		mousePosX < imgs[BG_i].width)
		if(mousePosY > imgs[BG_i].height-imgs[infoHidden_i].height &&
		mousePosY < imgs[BG_i].height)
			showInfo = true;
	/*Sound button clicked?*/
	if(mousePosX > imgs[BG_i].width-imgs[infoHidden_i].width-imgs[soundOn_i].width &&
		mousePosX < imgs[BG_i].width-imgs[infoHidden_i].width)
		if(mousePosY > imgs[BG_i].height-imgs[infoHidden_i].height &&
		mousePosY < imgs[BG_i].height){
			if(mouseClicked){
				soundOn = !soundOn;
			}
		}
			
	mouseClicked = false;
}

function draw(){
	ctx.imageSmoothingEnabled = false;       /* standard */
    ctx.mozImageSmoothingEnabled = false;    /* Firefox */
    ctx.oImageSmoothingEnabled = false;      /* Opera */
    ctx.webkitImageSmoothingEnabled = false; /* Safari */
    ctx.msImageSmoothingEnabled = false;     /* IE */
	
    var widthScale = canvas.width/camera.width;
    var heightScale = canvas.height/camera.height;
    
	/* If no image has loaded this color will show instead */
    ctx.fillStyle = "#771133";
    ctx.fillRect(0,0,canvas.width,canvas.height);
	
	/* Sky */
	ctx.drawImage(imgs[BG_i],0,0,canvas.width,canvas.height);
			
	/* Clouds */ 
	for( i = 0; i < clouds.length; ++i){
		if(!clouds[i])
			continue;
		ctx.drawImage(imgs[Cloud_i],getDrawCoordinate(clouds[i].posX, camera.posX*clouds[i].distanceScaling, widthScale),
									getDrawCoordinate(clouds[i].posY, camera.posY*clouds[i].distanceScaling, heightScale),
									clouds[i].width*widthScale,
									clouds[i].height*heightScale);
	}
	
	/* Far Background */
	ctx.drawImage(imgs[Mountains_i],
		getBackgroundDrawCoordinate(imgs[Mountains_i].width, camera.width, camera.posX, imgs[Level_i].width, widthScale),
		0,
		imgs[Mountains_i].width*widthScale,
		canvas.height);

	var frame;
	/* Entities behind grass */
	if(!objective_berries)
		item_berries_animation.updateTime(item_berries_cycle);
	else
		item_berries_animation.updateTime(item_bush_cycle);
	frame = item_berries_animation.getFrame();
	ctx.drawImage(item_berries_animation.image, frame.x-1, frame.y+1, frame.width, frame.height, getDrawCoordinate(item_berries.posX, camera.posX, widthScale), getDrawCoordinate(item_berries.posY, camera.posY, heightScale), item_berries.width*widthScale, item_berries.height*heightScale);
	
	
	
	/* Near Background */
	ctx.drawImage(imgs[Level_i],getDrawCoordinate(0, camera.posX, widthScale), getDrawCoordinate(0, camera.posY, heightScale), imgs[Level_i].width*widthScale, imgs[Level_i].height*heightScale);
	
	/* Door */
	if(objective_berries &&
		objective_butter && 
		objective_egg && 
		objective_flour && 
		objective_sugar){
			ctx.drawImage(imgs[doorOpen_i],getDrawCoordinate(goal_door.posX, camera.posX, widthScale), getDrawCoordinate(goal_door.posY, camera.posY, heightScale), goal_door.width*widthScale, goal_door.height*heightScale);
	}
    
	/* Entities behind player */
	if(!objective_sugar){
		item_sugar_animation.updateTime(item_sugar_cycle);
		frame = item_sugar_animation.getFrame();
		ctx.drawImage(item_sugar_animation.image, frame.x-1, frame.y+1, frame.width, frame.height, getDrawCoordinate(item_sugar.posX, camera.posX, widthScale), getDrawCoordinate(item_sugar.posY, camera.posY, heightScale), item_sugar.width*widthScale, item_sugar.height*heightScale);
	}
	if(!objective_flour){
		item_flour_animation.updateTime(item_flour_cycle);
		frame = item_flour_animation.getFrame();
		ctx.drawImage(item_flour_animation.image, frame.x-1, frame.y+1, frame.width, frame.height, getDrawCoordinate(item_flour.posX, camera.posX, widthScale), getDrawCoordinate(item_flour.posY, camera.posY, heightScale), item_flour.width*widthScale, item_flour.height*heightScale);
	}
	if(!objective_butter){
		item_butter_animation.updateTime(item_butter_cycle);
		frame = item_butter_animation.getFrame();
		ctx.drawImage(item_butter_animation.image, frame.x-1, frame.y+1, frame.width, frame.height, getDrawCoordinate(item_butter.posX, camera.posX, widthScale), getDrawCoordinate(item_butter.posY, camera.posY, heightScale), item_butter.width*widthScale, item_butter.height*heightScale);
	}
	
		
	/*for( i = 0; i < platforms.length; ++i){
		ctx.fillStyle = "#441111";
		ctx.fillRect(getDrawCoordinate(platforms[i].posX, camera.posX, widthScale),
		getDrawCoordinate(platforms[i].posY, camera.posY, heightScale),
		platforms[i].width*widthScale,
		platforms[i].height*heightScale);
	}*/
	
	/* Player */
	if(player.landCounter > 0 || !player.onGround){
		if(player.facingRight){
			playerAnimation.updateAerial(playerJumpRight, player);
		}
		else if(!player.facingRight)
			playerAnimation.updateAerial(playerJumpLeft, player);
	}
	else if(player.facingRight && keysRightDown && player.velX > player.speed/10)
        playerAnimation.updateTime(playerWalkCycleRight);
	else if(!player.facingRight && keysLeftDown && player.velX < -player.speed/10)
        playerAnimation.updateTime(playerWalkCycleLeft);
    else{
		if(player.facingRight)
			playerAnimation.updateTime(playerIdleCycleRight);
		else if(!player.facingRight)
			playerAnimation.updateTime(playerIdleCycleLeft);
	}
	
    frame = playerAnimation.getFrame();
    
    ctx.drawImage(playerAnimation.image, frame.x-1, frame.y+1, frame.width, frame.height, getDrawCoordinate(player.posX, camera.posX, widthScale), getDrawCoordinate(player.posY, camera.posY, heightScale), player.width*widthScale, player.height*heightScale);
	/* END PLAYER */
	
	/* Entities infront of player */
	if(!objective_egg){
		item_egg_animation.updateTime(item_egg_cycle);
		frame = item_egg_animation.getFrame();
		ctx.drawImage(item_egg_animation.image, frame.x-1, frame.y+1, frame.width, frame.height, getDrawCoordinate(item_egg.posX, camera.posX, widthScale), getDrawCoordinate(item_egg.posY, camera.posY, heightScale), item_egg.width*widthScale, item_egg.height*heightScale);
	}
	
	/* Near Foreground */
	ctx.drawImage(imgs[LevelForeground_i],getDrawCoordinate(0, camera.posX, widthScale), getDrawCoordinate(0, camera.posY, heightScale), imgs[Level_i].width*widthScale, imgs[Level_i].height*heightScale);
	
	/*ctx.fillStyle = "#000000";
	ctx.fillRect(getDrawCoordinate(player.hitbox.posX, camera.posX, widthScale),
		getDrawCoordinate(player.hitbox.posY, camera.posY, heightScale),
		player.hitbox.width*widthScale,
		player.hitbox.height*heightScale);
	*/
	
	butterflyAnimation.updateTime(butterfly_cycle);
	frame = butterflyAnimation.getFrame();
	ctx.drawImage(butterflyAnimation.image, frame.x-1, frame.y+1, frame.width, frame.height, getDrawCoordinate(butterfly.posX, camera.posX, widthScale), getDrawCoordinate(butterfly.posY, camera.posY, heightScale), butterfly.width*widthScale, butterfly.height*heightScale);
	
	/* UI */
	ctx.drawImage(imgs[objNote_i],0,0,canvas.width,canvas.height);
	if(objective_egg)
		ctx.drawImage(imgs[objEgg_i],0,0,canvas.width,canvas.height);
	if(objective_flour)
		ctx.drawImage(imgs[objFlour_i],0,0,canvas.width,canvas.height);
	if(objective_sugar)
		ctx.drawImage(imgs[objSugar_i],0,0,canvas.width,canvas.height);
	if(objective_butter)
		ctx.drawImage(imgs[objButter_i],0,0,canvas.width,canvas.height);
	if(objective_berries)
		ctx.drawImage(imgs[objBerries_i],0,0,canvas.width,canvas.height);
	
	/* INFO BUTTON */
	if(showInfo){
		ctx.drawImage(imgs[infoShown_i],getDrawCoordinate(imgs[BG_i].width-imgs[infoShown_i].width, 0, widthScale), getDrawCoordinate(imgs[BG_i].height-imgs[infoShown_i].height, 0, heightScale), imgs[infoShown_i].width*widthScale, imgs[infoShown_i].height*heightScale);
	}
	else{
		ctx.drawImage(imgs[infoHidden_i],getDrawCoordinate(imgs[BG_i].width-imgs[infoHidden_i].width, 0, widthScale), getDrawCoordinate(imgs[BG_i].height-imgs[infoHidden_i].height, 0, heightScale), imgs[infoHidden_i].width*widthScale, imgs[infoHidden_i].height*heightScale);
	}
	
	/* SOUND BUTTON */
	if(soundOn){
		ctx.drawImage(imgs[soundOn_i],getDrawCoordinate(imgs[BG_i].width-imgs[infoHidden_i].width-imgs[soundOn_i].width, 0, widthScale), getDrawCoordinate(imgs[BG_i].height-imgs[soundOn_i].height, 0, heightScale), imgs[soundOn_i].width*widthScale, imgs[soundOn_i].height*heightScale);
	}
	else{
		ctx.drawImage(imgs[soundOff_i],getDrawCoordinate(imgs[BG_i].width-imgs[infoHidden_i].width-imgs[soundOff_i].width, 0, widthScale), getDrawCoordinate(imgs[BG_i].height-imgs[soundOff_i].height, 0, heightScale), imgs[soundOff_i].width*widthScale, imgs[soundOff_i].height*heightScale);
	}
	
}

function getBackgroundDrawCoordinate(sizeRef, cameraSizeRef, cameraCoordRef, levelSizeRef, scale){
	return ((levelSizeRef-sizeRef)*(cameraCoordRef/(levelSizeRef-cameraSizeRef)) - cameraCoordRef)*scale;
	// 0->(levelWidth - imageWidth)		<= Far background
	// 0->(levelWidth - cameraWidht)    <= Camera
}

function getDrawCoordinate(coordRef, cameraRef, scale){
    return ((coordRef-cameraRef)*scale);
}

function stop(){
    clearInterval(intervalId);
}

/*
    Method borrowed from the web.
*/
function getHexColor(number){
    return "#"+((number)>>>0).toString(16).slice(-6);
}

var mainMenuView = true;
document.addEventListener('keydown', function(event){
	if(mainMenuView){
		mainMenuView = false;
		canvas.style.display = "block";
		startImg.style.display = "none";
	}
    switch(event.keyCode){
        case 37: //Left
            event.preventDefault();
            leftKeyDown = true;
            break;
        case 39: //Right
            event.preventDefault();
            rightKeyDown = true;
            break;
        case 40: //Down
            event.preventDefault();
            downKeyDown = true;
            break;
        case 38: //Up
            event.preventDefault();
            upKeyDown = true;
            break;
        case 87: //W
            event.preventDefault();
            wKeyDown = true;
            break;
        case 65: //A
            event.preventDefault();
            aKeyDown = true;
            break;
        case 83: //S
            event.preventDefault();
            sKeyDown = true;
            break;
        case 68: //D
            event.preventDefault();
            dKeyDown = true;
            break;
		case 77: //M
			soundOn = !soundOn;
			if(soundOn);
			break;
		case 73: //I
			infoKeyDown = true;
			break;
		case 82: //R
			restart();
			break;
        default:
            break;
    }  
});

document.addEventListener('keyup', function(event){
    switch(event.keyCode){
        case 37: //Left
            leftKeyDown = false;
            break;
        case 39: //Right
            rightKeyDown = false;
            break;
        case 40: //Down
            downKeyDown = false;
            break;
        case 38: //Up
            upKeyDown = false;
            break;
        case 87: //W
            wKeyDown = false;
            break;
        case 65: //A
            aKeyDown = false;
            break;
        case 83: //S
            sKeyDown = false;
            break;
        case 68: //D
            dKeyDown = false;
            break;
		case 73: //I
			infoKeyDown = false;
			break;
        default:
            break;
    }    
});

var mouseClicked = false;
document.addEventListener('click', function(event){
		mouseClicked = true;
});


function Block(posX, posY, width, height){
	this.posX = posX;
	this.posY = posY;
	this.width = width;
	this.height = height;	
	
	this.collision = function(entity){
		var hitbox = entity.hitbox; 
		if(hitbox.posX+hitbox.width > this.posX && hitbox.posX < this.posX+this.width){
			if(hitbox.posY+hitbox.height > this.posY && hitbox.posY < this.posY+this.height){
				if(entity.velY > 0 && hitbox.posY < this.posY){
					entity.posY = this.posY - (hitbox.posY-entity.posY + hitbox.height);
					entity.onGround = true;
					entity.velY = 0;
				}
				else if(hitbox.posX < this.posX+this.width/2-hitbox.width/2){
					entity.posX = this.posX - (hitbox.posX-entity.posX) - hitbox.width;
				}
				else{
					entity.posX = this.posX + this.width - (hitbox.posX-entity.posX);
				}
			}
		}
	};
}

function Platform(posX, posY, width, height){
	this.posX = posX;
	this.posY = posY;
	this.width = width;
	this.height = height;
	
	this.collision = function(entity){
		var hitbox = entity.hitbox; 
		if(hitbox.posX+hitbox.width > this.posX && hitbox.posX < this.posX+this.width){
			if(hitbox.posY+hitbox.height > this.posY && hitbox.posY < this.posY+this.height){
				if(entity.velY > 0 && hitbox.posY < this.posY){
					entity.posY = this.posY - (hitbox.posY-entity.posY + hitbox.height);
					entity.onGround = true;
					entity.velY = 0;
				}
			}
		}
	};
}

function Entity(posX, posY, width, height, color, velX, velY, speed, gravityEffect, distanceScaling){
    this.posX = posX || 0;
    this.posY = posY || 0;
    this.width = width || 10;
    this.height = height || 10;
	this.hitbox = new Block(this.posX+this.width/3+1, this.posY+9*this.height/10-1, this.width/3, this.height/10);
    this.color = color || "#000000";
    this.velX = velX || 0;
    this.velY = velY || 0;
	this.facingRight = true;
    this.speed = speed || 5;
	this.onGround = true;
	this.landCounter = 0;
	this.gravityEffect = gravityEffect || false;
	this.distanceScaling = distanceScaling || 1;
    
    this.update = function (){
		if(this.gravityEffect){
			if(this.velY > 0.1)
				this.onGround = false;
			if(this.velY > 0)
				this.velY += gravity/3;
			else
				this.velY += gravity;
		}
		if(this.velX<0)
			this.facingRight=false;
		if(this.velX>0)
			this.facingRight=true;
        this.posX += this.velX;
        this.posY += this.velY;
		this.hitbox.posX = this.posX+this.width/3+1;
		this.hitbox.posY = this.posY+9*this.height/10-1;
    };
	
	this.collisionCheck = function(entity){
		var hitbox = entity.hitbox; 
		if(hitbox.posX+hitbox.width > this.posX+this.width/3 && hitbox.posX < this.posX+2*this.width/3){
			if(hitbox.posY+hitbox.height > this.posY+this.height/2 && hitbox.posY < this.posY+this.height){
				return true;
			}
		}
		return false;
	};
}

function animatedSprite(image, frameWidth, frameHeight, rows, columns, spf){
    this.image = image;
    this.frameWidth = frameWidth || 100;
    this.frameHeight = frameHeight || 100;
    this.rows = rows || 1;
    this.columns = columns || 1;
    this.currentFrame = 0;
    this.currentFrameIndex = 0;
    this.spf = spf;
    this.currentTime = 0;
    
    this.updateTime = function (frameList){
        this.currentTime++;
        if((this.currentTime >= (fps*this.spf))){
			this.currentTime = 0;
            this.currentFrame = this.getNextFrameIndex(frameList);
		}
    };
	
	this.updateAerial = function (frameList, entity){
		if(!entity.onGround){
			if(entity.velY < -0.2)
				this.currentFrameIndex = 0;
			else if(entity.velY > 0.2)
				this.currentFrameIndex = 2;
			else
				this.currentFrameIndex = 1;
			this.currentTime = 0;
		}else if(entity.landCounter > 0){
			this.currentTime++;
			if((this.currentTime >= (fps*this.spf))){
				this.currentTime = 0;
				this.currentFrameIndex = frameList.length-entity.landCounter;
				entity.landCounter--;
			}
		}
		this.currentFrame = frameList[this.currentFrameIndex];
			
	};
    
    this.getNextFrameIndex = function (frameList){
		if(++this.currentFrameIndex >= frameList.length)
			this.currentFrameIndex = 0;
        return frameList[this.currentFrameIndex];
    };
    
    this.getFrame = function (index){
        this.currentFrame = this.currentFrame%(this.columns*this.rows);
        var x = index || this.currentFrame;
        while(x>(this.rows*this.columns) && x >= 0){
            x -= this.rows*this.columns;
        }
        var y = 0;
        while(x >= this.columns){
            x -= this.columns;
            ++y;
        }
        return new frameInfo(x*this.frameWidth, y*this.frameHeight, this.frameWidth, this.frameHeight);
    };
}

function frameInfo(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
}
 
var oldMul = 0.5;
function resizeCanvas(){
    var webWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    var webHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    
    /*if(webHeight/webWidth > aspectRatio){
        canvas.width = webWidth*insetRatio;
        canvas.height = canvas.width*aspectRatio;
    }
    else{
        canvas.height = webHeight*insetRatio;
        canvas.width = canvas.height/aspectRatio;
    }*/

	if(loadingComplete){
		var dimMul = Math.min(Math.floor(webHeight / imgs[BG_i].height), Math.floor(webWidth / imgs[BG_i].width));
		if(dimMul <= 0){
			dimMul = 0.5;
		}
		if(dimMul == oldMul)
			return;
		oldMul = dimMul;
			canvas.height = imgs[BG_i].height * dimMul;
			canvas.width = imgs[BG_i].width * dimMul;
		
		endImg.height = canvas.height;
		endImg.width = canvas.width;
		startImg.height = canvas.height;
		startImg.width = canvas.width;
	}
}
var mousePosX = 0;
var mousePosY = 0;
function getInGameMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
	mousePosX = Math.floor((evt.clientX - rect.left)/oldMul),
    mousePosY = Math.floor((evt.clientY - rect.top)/oldMul);
}