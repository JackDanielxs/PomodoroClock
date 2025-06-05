let workDuration = 25 * 60; // 25 minutes
let shortBreakDuration = 5 * 60; // 5 minutes
let longBreakDuration = 15 * 60; // 15 minutes
let timeLeft = workDuration;

let timerInterval;
let isRunning = false;
let isOnBreak = false;
let pomodoroCount = 0; // Counts completed work sessions

function setSessionLabel() {
  const label = document.getElementById("session-type");
  if (isOnBreak) {
    if (pomodoroCount > 0 && pomodoroCount % 4 === 0) {
      label.textContent = "Long Break";
      label.style.color = "#9c27b0"; // Purple for long break
    } else {
      label.textContent = "Break";
      label.style.color = "#03a9f4"; // Blue for short break
    }
  } else {
    label.textContent = "Work";
    label.style.color = "#4caf50"; // Green for work
  }
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalDuration = isOnBreak ?
    pomodoroCount > 0 && pomodoroCount % 4 === 0 ? longBreakDuration : shortBreakDuration
    : workDuration;
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
  document.getElementById("bar").style.width = progress + "%";
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  setSessionLabel();

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimer();
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      
      if (!isOnBreak) {
        pomodoroCount++;
        isOnBreak = true;

        // Check if it’s time for a long break
        if (pomodoroCount % 4 === 0)
          timeLeft = longBreakDuration;
        else 
          timeLeft = shortBreakDuration;

      } else {
        isOnBreak = false;
        timeLeft = workDuration;
      }

      updateTimer();
      setSessionLabel();
      startTimer(); // Automatically start the next session
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  isOnBreak = false;
  pomodoroCount = 0;
  timeLeft = workDuration;
  updateTimer();
  setSessionLabel();
}

updateTimer();