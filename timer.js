var timerLimit = 60; // default time setted in the application.
var stopTime = false; // help our program to break normal pomodoro flow.
var resetCustomTime = null; // just for making reset functionality work
var touchTimes = 0;
const wallpaperCount = 10; // It will only use 10 set of images for this app.


var totalTime = timerLimit;


document.getElementsByClassName("live-sec")[0].innerHTML = timerLimit;
document.getElementsByClassName("sec-limit")[0].innerHTML = timerLimit;


var tickSound = new Audio("sounds/tick.mp3");
var timeElapsedSound = new Audio("sounds/elapsed.mp3");
changeBackground();


for(var i=0; i < 4; i++){
    document.getElementsByClassName("cntrl-btn")[i].addEventListener("click", function(event) {

        timerLimit = event.toElement.childNodes[0].data * 60;
        setTimeLimit();
    })
}

document.getElementById("live-timer").addEventListener("touchstart", function(){
    // To allow touch functionalities ie. for mobiles and tablets.

    console.log(touchTimes,document.getElementsByClassName("start")[0].disabled)

    if((touchTimes % 2) == 0)    {
    	if(document.getElementsByClassName("start")[0].disabled == true) {
    		
    		touchTimes++

    	} else {

    	touchTimes++;
        startTimer();	
    	
    	}
    	
    
    } else {
        
        stopTimer();
    }

    //touchTimes++;

})


document.addEventListener("keydown", function(keyboard){

    // To enable keyboard functionalities for pomodaro 
    // Enter to start, Space to stop/ pause and R to restart the pomodoro.

    if (keyboard.key === "r") {
        
        resetTimer();
    
    } else if(keyboard.key === "Enter") {

        if(document.getElementsByClassName("start")[0].disabled == true) {
            // prevent calling startTimer if already running.
            {}

        } else {
            
            startTimer();
        }

    } else if(keyboard.key === " ") {
        
        keyboard.preventDefault();
        console.log("spaced");
        stopTimer();
    } else {
        {}
    }
})



function changeBackground() {
    // responsible for loading different background image each time web app reloads / loads.
    var randomNum = Math.round(Math.random() * 5);
    if(randomNum != 0){
        var targetImg = randomNum + ".jpg";
    } else {
        var targetImg = "1.jpg";
    }
    


    document.body.style.backgroundImage = "url(images/"+targetImg+")";
}

function setTimeLimit(){

    if (document.getElementsByClassName("setTimeLimit")[0].value.length == 0) {
        // If use has not provided any custom pomodoro time value, we will take look for custom button (if pressed )
        // If no custom input is provided, default time of 60 seconds will be considered.

        {}

    } else {

        // To take value from custom input box.
        timerLimit = Math.round(document.getElementsByClassName("setTimeLimit")[0].value * 60);
        document.getElementsByClassName("setTimeLimit")[0].value = null; // to empty value from custom time.
    }

    

    totalTime = timerLimit;
    console.log(timerLimit, totalTime);

    if( timerLimit != null) {

        resetTimer();
        if (!isNaN(parseInt(timerLimit))){
            timerLimit = parseInt(timerLimit)
            document.getElementsByClassName("sec-limit")[0].innerHTML = timerLimit;
        } else {
            {}
        }
        
    }
}


function resetTimer(){

    // This function is responsible for resetting the program to defaults.

    stopTime = true;
    touchTimes = 0;
    document.getElementsByClassName("live-sec")[0].style.wordWrap = "break-word";
    document.getElementsByClassName("sec-limit")[0].innerHTML = totalTime; // to reset the value of elapsed time on screen.
    document.getElementsByClassName("live-sec")[0].innerHTML = totalTime; // to reset the value of total time on screen.
    timerLimit = totalTime; // to reset the timer.

}


function stopTimer(){

    // This function will act as auxiliary to stop the timer once pressed.

    touchTimes++;
    stopTime = true;

}


function startTimer(){

    // function responsible for playing sounds, making timer run and to update realtime values.

    document.getElementsByClassName("start")[0].disabled = true;
    tickSound.play()
    document.getElementsByClassName("live-sec")[0].innerHTML = timerLimit;
    document.getElementsByClassName("timeleftinMinutes")[0].innerHTML = ((timerLimit / totalTime) * 100).toFixed(1) + "% Time remaining."


    if( timerLimit === 0) {
        // Times UP !
        tickSound.pause();
        timeElapsedSound.play();
        document.getElementsByClassName("start")[0].disabled = false;
        return 0;
    
    } else if (stopTime == true){

        document.getElementsByClassName("start")[0].disabled = false;
        tickSound.pause()
        stopTime = false;
        return 0;

    } else {

        
        timerLimit = timerLimit - 1; // responsible for dropping by one unit after each second.
        setTimeout(startTimer, 1000); // To reexecute startTimer() again after waiting 1 sec.
    }
    
    
}