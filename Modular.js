/*
David Dada
Modular Arithmetic
*/




//radius to match the circle background
var radius = 230;

//how many numbers on the clock
var clocknumbers = 12;

//time it takes to perform animation
var timeout = 1000;

//how smooth the animation is (divides distance into multiple steps)
var smoothness = 50;

//input constraints
var DIVIDEND_MAX = 1000;
var DIVISOR_MAX = 60;

//ENUM used to identify each container
var CONTAINER_SECONDS = 700;
var CONTAINER_MINUTES = 701;
var CONTAINER_HOURS = 702;

var formdisabled = false;

//error messages
var errormsg = "error: NaN";
var div_by_zero_msg = "error: cannot divide by 0";


//create form from JS
document.write("<div class='banner1'>");

document.write("<div class='dropdown' id='MenuWrapper'>");
document.write("<button class='dropbtn'>Menu</button>");
document.write("<div class='dropdown-content'>");
document.write("<input class='Menu-button1' type='button' onclick='resetAll()' name='reset' value='reset clock'>");
document.write("</div>");
document.write("</div>");

document.write("</div>");

document.write("<div id='titlebanner'>");
document.write("<h1 id='title'>Modular Arithmetic</h1>");
document.write("</div>");

document.write("<figure class='clock' id='clock'>");
document.write("<div class='hours-container'>");
document.write("<div class='hours'></div>");
document.write("</div>");
document.write("<div class='minutes-container'>");
document.write("<div class='minutes'></div>");
document.write("</div>");
document.write("<div class='seconds-container'>");
document.write("<div class='seconds'></div>");
document.write("</div>");
document.write("<div class='clockpin'></div>");
document.write("<div id='clocknumwrapper'>");
populateNumbers(clocknumbers);
document.write("</div>");
document.write("</figure>");



document.write("<div id='clock-options'>");

document.write("<div class='dropdown'>");
document.write("<button class='dropbtn'>Animation</button>");
document.write("<div class='dropdown-content'>");
document.write("<input class='Menu-button1' type='button' onclick='setSmoothness(1)' name='smoothness1' value='Rough'>");
document.write("<input class='Menu-button1' type='button' onclick='setSmoothness(2)' name='smoothness2' value='Smooth'>");
document.write("<input class='Menu-button1' type='button' onclick='setSmoothness(50)' name='smoothness3' value='Very Smooth'>");
document.write("</div>");
document.write("</div>");

document.write("<div class='dropdown'>");
document.write("<button class='dropbtn'>Speed</button>");
document.write("<div class='dropdown-content'>");
document.write("<input class='Menu-button1' type='button' onclick='setSpeed(3000)' name='speed1' value='Slow'>");
document.write("<input class='Menu-button1' type='button' onclick='setSpeed(1000)' name='speed2' value='Moderate'>");
document.write("<input class='Menu-button1' type='button' onclick='setSpeed(500)' name='speed3' value='Fast'>");
document.write("</div>");
document.write("</div>");

document.write("<div class='formwrapper'>");
document.write("<form class='myforms' id='dividendForm'>");
document.write("<input class='valid' id='dividendAmount' name='dividendAmount' type='text' placeholder='Enter the dividend:'>");
document.write("</form>");
document.write("</div>");

document.write("<div id='resultwrapper'><span id='resultdividend'>0</span> mod <span id='resultdivisor'>12</span> = <span id='result'>0</span></div>");

document.write("<div class='formwrapper'>");
document.write("<form class='myforms' id='divisorForm'>");
document.write("<input type='hidden' name='form1dividend'>");
document.write("<input class='valid' id='divisorAmount' name='divisorAmount' type='text' placeholder='Enter the divisor:'>");
document.write("</form>");
document.write("</div>");

document.write("</div>");





//-- Animation

//animate the seconds hand independently of everything
moveSecondHands();


//-- Elements
var result = document.getElementById("result");
var dividend = document.getElementById("dividendAmount");
var divisor = document.getElementById("divisorAmount");

var containersSec = document.querySelectorAll('.seconds-container');
var containersMin = document.querySelectorAll('.minutes-container');
var containersHour = document.querySelectorAll('.hours-container');



//-- Events

//Event listeners on change for inputs
dividend.addEventListener("input",updateDividend);
divisor.addEventListener("input",updateDivisor);

//clicking on the clock also resets, could eventually have numbers clickable
document.getElementById("clock").addEventListener("click",resetAll);

//form submission
$( "#divisorForm" ).submit(function( event ) {
    event.preventDefault();
    if(formdisabled) {return false;}
    calculateResult();
});

$( "#dividendForm" ).submit(function( event ) {
    event.preventDefault();
    if(formdisabled) {return false;}
    calculateResult();
});




//-- Functions

//result calculation
function calculateResult() {
    pauseInput(timeout);
    var divisor_i = parseInt(divisor.value);
    var dividend_i = parseInt(dividend.value);

    //constrain with max/min
    if (divisor_i > DIVISOR_MAX) {
        divisor_i = DIVISOR_MAX;
        document.forms["divisorForm"].divisorAmount.value = DIVISOR_MAX;
        updateDivisor();
    }

    //constrain with max/min
    if (dividend_i > DIVIDEND_MAX) {
        dividend_i = DIVIDEND_MAX;
        document.forms["dividendForm"].dividendAmount.value = DIVIDEND_MAX;
        updateDividend();
    }


    if ((divisor_i>0)&&(dividend_i>=0)) {
        result.innerHTML = ""+(dividend_i%divisor_i);
    } else if((divisor_i===0)) {
        result.innerHTML = div_by_zero_msg;
    } else {
        result.innerHTML = errormsg;
    }

    clocknumbers = divisor_i;
    populateNumbers(clocknumbers);


    moveContainer(dividend_i, CONTAINER_MINUTES);
    moveContainer(Math.floor(dividend_i / divisor_i), CONTAINER_HOURS);
}

//display dividend value
function updateDividend() {
    if(verifyInput(dividend)) {
        document.getElementById("resultdividend").innerHTML = dividend.value;
    }
}

//display divisor value
function updateDivisor() {
    if(verifyInput(divisor)) {
        document.getElementById("resultdivisor").innerHTML = divisor.value;
    }
}

//sets the numbers on the clock, spaces them out accordingly
function populateNumbers(numbercount) {
    //clear all pre existing nodes
    var myNode = document.getElementById("clocknumwrapper");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    //set the radius for each number. has to be done before div creation
    if(numbercount < 20) {
        radius = 230;
    }
    else if(numbercount < 30) {
        radius = 235;
    }
    else {
        radius = 240;
    }

    //div creation
    for(var i=0;i<numbercount;i++){

        var numdiv = document.createElement("div");
        numdiv.className = "clocknum";
        numdiv.innerHTML=i;
        document.getElementById("clocknumwrapper").appendChild(numdiv);

        //incremental spacing, depending on number of elements
        rotateAbout(i,i*(360/numbercount));
    }

    //set font for each number. has to be done after div creation
    if(numbercount < 20) {
        for (i = 0; i < numbercount; i++) {
            document.getElementsByClassName("clocknum")[i].style.fontSize = "25px";
        }
    }
    else if(numbercount < 30) {
        for (i = 0; i < numbercount; i++) {
            document.getElementsByClassName("clocknum")[i].style.fontSize = "15px";
        }
    }
    else {
        for (i = 0; i < numbercount; i++) {
            document.getElementsByClassName("clocknum")[i].style.fontSize = "10px";
        }
    }
}

//modifies smoothness on animation
function setSmoothness(new_smoothness) {
    smoothness = new_smoothness;
}

//modifies time taken for animation cycle
function setSpeed(new_speed) {
    timeout = new_speed;
}

//sets the x and y coordinates to perform rotation
function rotateAbout(index,degree) {
    document.getElementsByClassName("clocknum")[index].style.bottom = radius*Math.cos(degree*(Math.PI/180))+"px";
    document.getElementsByClassName("clocknum")[index].style.left = radius*Math.sin(degree*(Math.PI/180))+"px";
}

//set everything to the 0'th position and divisor to 12
function resetAll() {
    pauseInput(timeout);
    setContainerHand(0,CONTAINER_SECONDS);
    setContainerHand(0,CONTAINER_MINUTES);
    setContainerHand(0,CONTAINER_HOURS);
    result.innerHTML = "0";
    divisor.value = "12";
    dividend.value = "0";
    updateDivisor();
    updateDividend();
    populateNumbers(divisor.value);
    setSmoothness(50);
    setSpeed(1000);
}

//input validation: numbers only
function verifyInput(input) {
    if (/^[0-9]*$/.test(""+input.value) && (input.value!=="")){
        input.className = "valid";
        return true;
    }
    else {
        input.className = "error";
        input.value = "";
        return false;
    }
}

//separate function to separately animate the seconds hand
function moveSecondHands() {
    var containers = document.querySelectorAll('.seconds-container');
    setInterval(function() {
        for (var i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 6;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
            containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
        }
    }, 1000);
}

//set the container hand to the nth number on the clock
function setContainerHand(n,containerNum){
    var container;
    if(containerNum===CONTAINER_SECONDS) {
        container = containersSec;
    } else if (containerNum===CONTAINER_MINUTES) {
        container = containersMin;
    } else if (containerNum===CONTAINER_HOURS) {
        container = containersHour;
    } else {
        return;
    }

    for (var i = 0; i < container.length; i++) {
        container[i].angle = n*(360/clocknumbers);
        container[i].style.webkitTransform = 'rotateZ('+ container[i].angle +'deg)';
        container[i].style.transform = 'rotateZ('+ container[i].angle +'deg)';
    }
}

//increment container hand by interval amount
function moveContainerHand(interval,containerNum) {
    //select container
    var container;
    if(containerNum===CONTAINER_SECONDS) {
        container = containersSec;
    } else if (containerNum===CONTAINER_MINUTES) {
        container = containersMin;
    } else if (containerNum===CONTAINER_HOURS) {
        container = containersHour;
    } else {
        return;
    }

    for (var i = 0; i < container.length; i++) {
        if (container[i].angle === undefined) {
            container[i].angle = interval;
        } else {
            container[i].angle += interval;
        }
        container[i].style.webkitTransform = 'rotateZ('+ container[i].angle +'deg)';
        container[i].style.transform = 'rotateZ('+ container[i].angle +'deg)';
    }
}

//disable till finished for spam prevention. locks till animation finishes
function pauseInput(time) {
    //disable till finished for spam prevention. locks till animation finishes
    formdisabled = true;
    divisor.disabled = true;
    dividend.disabled = true;
    setTimeout(function(){
        formdisabled=false;
        divisor.disabled=false;
        dividend.disabled=false;
    },time);
}

//move the selected container; minutes, seconds or hours
function moveContainer(ticks,containerNum) {
    //reset the hand; set the hand to 0
    setContainerHand(0,containerNum);

    //if 0, just return
    if (ticks===0 || ticks==="0") {
        return;
    }

    //modify variables to account for smoothness; smaller interval and more ticks
    ticks*=smoothness;
    var interval = 360/(clocknumbers*smoothness);

    //spaces out the ticks over the time it will take
    var speed = timeout/ticks;

    //move the container interval amount every speed milliseconds
    for (var i=0; i<ticks;i++) {
        setTimeout(function(){moveContainerHand(interval,containerNum)},i*speed);
    }

    //pause input to prevent spam
    pauseInput(timeout);
}