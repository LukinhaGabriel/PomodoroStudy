const $type = document.querySelector(".type"); 
const $time = document.querySelector(".time"); 

const $starTimer = document.querySelector(".startimer"); 
const $stopTimer = document.querySelector(".stoptimer"); 

const audioStart = new Audio("/assets/audio/soundEffect-start.wav");  
const audioPause = new Audio("/assets/audio/soundEffect-pause.wav");  
const audioReset = new Audio("/assets/audio/soundEffect-reset.wav");  
const audioBreakCoffe = new Audio("/assets/audio/soundEffect-coffebreak.wav");  

const pomodoro = {
    workMinutes: 25,
    breakCoffe: 5,
    seconds: 0,
}

let minutes = pomodoro.workMinutes;
let seconds = pomodoro.seconds;
let timer;




$time.textContent = `${minutes < 10 ? '0':''}${minutes}:${seconds < 10 ? '0':''}${seconds}`;

$starTimer.addEventListener("click", (e) => {
    const btnStart = e.target;
    const btnStartContent = btnStart.textContent;

    
    if($type.textContent === ""){
        $type.textContent = "Focus"
    } 

    btnStart.textContent = "pause";
    if(btnStartContent === "pause"){
        pause(btnStart);
    } else{
        start();
        audioStart.play();
    }
})

$stopTimer.addEventListener("click", () => {
    stopPomodoro();
});



function start(){
    const countDown = () => {
        seconds--
        if(seconds === -1){
            seconds = 59;
            minutes--;
        }
        if(minutes < 0){
            if($type.textContent === "Focus"){
                minutes = pomodoro.breakCoffe;
                seconds = pomodoro.seconds
                $type.textContent = "Coffee Break";
                audioBreakCoffe.play();
            } else{
                minutes = pomodoro.workMinutes;
                seconds = pomodoro.seconds;
                $type.textContent = "Focus";
                audioStart.play();
            }
        }
        $time.innerHTML = `${minutes < 10 ? '0':''}${minutes}:${seconds < 10 ? '0':''}${seconds}`;
    }
    timer = setInterval(countDown, 1000);
}

function pause(btnStart){
    btnStart.textContent = "start";
    audioPause.play();
    clearInterval(timer);
}

function stopPomodoro(){
    clearInterval(timer);
    $starTimer.textContent = "start";
    $type.textContent = "";
    minutes = pomodoro.workMinutes;
    seconds = pomodoro.seconds;
    audioReset.play();
    $time.innerHTML = `${minutes < 10 ? '0':''}${minutes}:${seconds < 10 ? '0':''}${seconds}`;
}






