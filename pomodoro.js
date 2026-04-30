
let countdown; // Sayaç kontrolü
const timerDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");
const message = document.querySelector("#message");

// Butonlar ve Input
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");
const pomodoroBtn = document.querySelector("#pomodoro");
const longPomodoroBtn = document.querySelector("#long-pomodoro");
const setCustomTimeBtn = document.querySelector("#set-custom-time");
const customMinutesInput = document.querySelector("#custom-minutes");

let totalSeconds = 25 * 60; // Varsayılan süre 25 dakika
let isRunning = false;

// Zamanlayıcı Güncelleme
function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

// Sayaç Başlat
startBtn.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        countdown = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateTimer();
            } else {
                clearInterval(countdown);
                message.textContent = "Süre doldu! 🎉 Mola vakti!";
                isRunning = false;
            }
        }, 1000);
    }
});

// Sayaç Durdur
stopBtn.addEventListener("click", () => {
    clearInterval(countdown);
    isRunning = false;
});

// Sayaç Sıfırla
resetBtn.addEventListener("click", () => {
    clearInterval(countdown);
    totalSeconds = 25 * 60;
    updateTimer();
    message.textContent = "";
    isRunning = false;
});

// 25-5 Pomodoro
pomodoroBtn.addEventListener("click", () => {
    totalSeconds = 25 * 60;
    updateTimer();
    message.textContent = "25-5 Pomodoro ayarlandı.";
});

// 50-10 Uzun Pomodoro
longPomodoroBtn.addEventListener("click", () => {
    totalSeconds = 50 * 60;
    updateTimer();
    message.textContent = "50-10 Uzun Pomodoro ayarlandı.";
});

// Özel Zaman Ayarı
setCustomTimeBtn.addEventListener("click", () => {
    const customMinutes = parseInt(customMinutesInput.value);
    if (customMinutes > 0) {
        totalSeconds = customMinutes * 60;
        updateTimer();
        message.textContent = `Özel süre ${customMinutes} dakika olarak ayarlandı.`;
    } else {
        alert("Geçerli bir süre girin!");
    }
});

updateTimer();
