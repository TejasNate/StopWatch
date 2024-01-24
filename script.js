window.onload = function () {
  var milliseconds = 0;
  var seconds = 0;
  var minutes = 0;
  var hours = 0;
  var lapCount = 1; // Track lap count
  var lapTimes = []; // Array to store lap times
  var Interval;

  var appendHour = document.getElementById("hours");
  var appendMin = document.getElementById("minutes");
  var appendSec = document.getElementById("second");
  var appendMillisec = document.getElementById("milliseconds");
  var buttonstart = document.getElementById("button-start");
  var buttonstop = document.getElementById("button-stop");
  var buttonreset = document.getElementById("button-reset");
  var buttonlap = document.getElementById("button-lap");
  var lapTimesList = document.getElementById("lap-times");

  buttonstart.onclick = function () {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
  };

  buttonstop.onclick = function () {
    clearInterval(Interval);
  };

  buttonreset.onclick = function () {
    clearInterval(Interval);
    resetDisplay();
    clearLapTimes();
    lapCount = 1;
  };

  buttonlap.onclick = function () {
    recordLapTime();
  };

  function startTimer() {
    milliseconds++;

    if (milliseconds > 99) {
      milliseconds = 0;
      seconds++;

      if (seconds > 59) {
        seconds = 0;
        minutes++;

        if (minutes > 59) {
          minutes = 0;
          hours++;

          if (hours <= 9) {
            appendHour.innerHTML = "0" + hours;
          } else {
            appendHour.innerHTML = hours;
          }
        }

        if (minutes <= 9) {
          appendMin.innerHTML = "0" + minutes;
        } else {
          appendMin.innerHTML = minutes;
        }
      }

      if (seconds <= 9) {
        appendSec.innerHTML = "0" + seconds;
      } else {
        appendSec.innerHTML = seconds;
      }
    }

    if (milliseconds <= 9) {
      appendMillisec.innerHTML = "0" + milliseconds;
    } else {
      appendMillisec.innerHTML = milliseconds;
    }
  }

  function resetDisplay() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
  }

  function updateDisplay() {
    appendHour.innerHTML = "00";
    appendMin.innerHTML = "00";
    appendSec.innerHTML = "00";
    appendMillisec.innerHTML = "00";
  }

  function recordLapTime() {
    var lapTime = formatTime();
    var lapItem = document.createElement("li");
    lapItem.appendChild(
      document.createTextNode("Lap " + lapCount + ": " + lapTime)
    );
    lapTimesList.appendChild(lapItem);
    lapTimes.push({ lap: lapCount, time: lapTime });
    lapCount++;
  }

  function formatTime() {
    return (
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds +
      "." +
      (milliseconds < 10 ? "0" : "") +
      milliseconds
    );
  }

  function clearLapTimes() {
    lapTimesList.innerHTML = "";
    lapTimes = [];
  }
};
