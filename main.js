function getId(elementId){
  return document.getElementById(elementId);
}

function getClass(className, i){
  return document.getElementsByClassName(className)[i];
}

var selected=false;

function openURL(url){

  selected = true;

  if(mode == "apps"){

    for(var i = 0; i < 4 + maxRotate; i++){
      if(i != currItem) getClass("box", i).style.opacity = 0;
    }

  }else{

    for(var i = 0; i < 4 + maxRotateGames; i++){
      if(i != currItem) getClass("box", i).style.opacity = 0;
    }

  }

  setTimeout(function () {

    var absoluteItemPos = currItem + 1 - rotatePos;
    var contPrevLeft = getId("container").style.left.replace("vw", "");
    console.log(contPrevLeft);
    if(contPrevLeft == "") contPrevLeft = 15;
    getId("container").style.left = parseInt(contPrevLeft, 10) + 50 - absoluteItemPos * 20 + "vw";
    getId("selector").style.transition = "left 0.7s";
    getId("selector").style.left = "45vw";

  }, 500);

  setTimeout(function () {

    getId("ripple").style.width = "150vw";
    getId("ripple").style.height = "150vw";

    setTimeout(function () {
      window.location.href = url;
    }, 800);

  }, 1200);

}

function getTime(){

  var today = new Date();
  var hours = today.getHours();
  if(hours < 10) hours = "0" + hours;
  var minutes = today.getMinutes();
  if(minutes < 10) minutes = "0" + minutes;
  var seconds = today.getSeconds();
  if(seconds < 10) seconds = "0" + seconds;
  return(hours + ":" + minutes + ":" + seconds);

}

var currItem = 0;

function keypress(){

  if(selected) return 0;

  var event = window.event ? window.event : e;

  if(event.keyCode == 39) moveRight();
  else if(event.keyCode == 37) moveLeft();
  else if(event.keyCode == 13 || event.keyCode == 32) select();

}

function moveRight(){

  currItem++;

  var prevLeft=getId("selector").style.left.replace("vw","");
  if(prevLeft == "") prevLeft = 15;
  if(prevLeft == 75){
    prevLeft = 55;
    rotateList("right");
  }

  getId("selector").style.left = parseInt(prevLeft, 10) + 20 + "vw";

}

function moveLeft(){

  currItem--;

  var prevLeft = getId("selector").style.left.replace("vw", "");
  if(prevLeft == "") prevLeft = 15;
  if(prevLeft == 15){
    prevLeft = 35;
    rotateList("left");
  }

  getId("selector").style.left = parseInt(prevLeft, 10) - 20 + "vw";

}

function select(){

  if(mode == "apps") openURL(apps.link[currItem]);
  else openURL(games.link[currItem]);

}

var rotatePos = 0;
var maxRotate = apps.link.length - 4, maxRotateGames = games.link.length - 4;

function rotateList(direction){

  if(direction == "left"){

    if(rotatePos == 0){
      currItem++;
      return 0;
    }

    var contPrevLeft = getId("container").style.left.replace("vw", "");
    if(contPrevLeft == "") contPrevLeft = 15;

    getId("container").style.left = parseInt(contPrevLeft, 10) + 20 + "vw";
    getClass("box", rotatePos - 1).style.opacity = "1";
    getClass("box", rotatePos + 3).style.opacity = "0.2";

    rotatePos--;

  }else{

    if((mode == "apps" && maxRotate == rotatePos) || (mode != "apps" && maxRotateGames == rotatePos)){
      currItem--;
      return 0;
    }

    var contPrevLeft = getId("container").style.left.replace("vw", "");
    if(contPrevLeft == "") contPrevLeft = 15;

    getId("container").style.left = parseInt(contPrevLeft, 10) - 20 + "vw";
    getClass("box", rotatePos).style.opacity = "0.2";
    getClass("box", rotatePos + 4).style.opacity = "1";

    rotatePos++;

  }

}

function dockCheck(){

    if(window.innerWidth > 1280) getId("mode").innerHTML = "Mode: Docked";
    else getId("mode").innerHTML = "Mode: Handheld";

    setTimeout(function () {
      dockCheck();
    }, 5000);

}

function loadApps(){

  for(var i = 0; i < apps.link.length; i++){
    getId("container").innerHTML += '<div class="box"><img src="./icons/' + apps.icon[i] + '" alt="' + apps.title[i] + '"><p>' + apps.title[i] + '</p></div>';
  }

}

function onLoad(){

  loadApps();

  window.scrollTo(0,73);

  setInterval(function () {
    getId("clock").innerHTML = getTime();
  }, 1000);

  dockCheck();

  getId("ripple").style.width = 0;
  getId("ripple").style.height = 0;
  document.body.style.backgroundColor = "rgb(10,20,40)";

}
