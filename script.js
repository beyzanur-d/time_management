let selectedDate = null; // Seçilen tarih
let tasks = {}; // Görevler

// Haftanın gün adları
const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
let showAll = false; // Tüm görevleri gösterme durumu

// Takvim oluşturma
function createCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = ""; // Önceki takvimi temizle

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Haftanın gün başlıklarını ekle
    weekDays.forEach(day => {
        const dayHeader = document.createElement("div");
        dayHeader.textContent = day;
        dayHeader.classList.add("day-header");
        calendar.appendChild(dayHeader);
    });

    // Boş hücreler ekle (ayın ilk günü için)
    for (let i = 1; i < (firstDayOfMonth === 0 ? 7 : firstDayOfMonth); i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("empty-cell");
        calendar.appendChild(emptyCell);
    }

    // Ayın günlerini ekle
    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement("div");
        dayCell.textContent = i;
        dayCell.classList.add("day-cell");

        // Seçili tarihi vurgula
        if (selectedDate === `${year}-${month + 1}-${i}`) {
            dayCell.classList.add("selected");
        }

        dayCell.onclick = () => selectDate(`${year}-${month + 1}-${i}`);
        calendar.appendChild(dayCell);
    }
}

// Tarih seçme
function selectDate(date) {
    selectedDate = date;
    document.getElementById("selected-date").textContent = `Seçilen Tarih: ${date}`;
    document.getElementById("task-date").value = date; // Görev ekleme tarihini otomatik doldur
    showAll = false; // Tarih seçildiğinde tüm görevleri gösterme durumu sıfırlanır
    updateTaskTable();
}

// Görev ekleme
function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskDate = document.getElementById("task-date").value;
    const taskTime = document.getElementById("task-time").value;

    if (!taskInput.value || !taskDate || !taskTime) return alert("Lütfen tüm alanları doldurun!");

    if (!tasks[taskDate]) tasks[taskDate] = [];

    tasks[taskDate].push({ text: taskInput.value, time: taskTime, done: false });

    // Form alanlarını sıfırla
    taskInput.value = "";
    document.getElementById("task-time").value = "";

    updateTaskTable();
}

// Görev tablosunu güncelleme
function updateTaskTable() {
    const taskTable = document.getElementById("task-table");
    taskTable.innerHTML = "";

    if (showAll) {
        Object.keys(tasks).forEach(date => {
            tasks[date].forEach((task, index) => addTaskRow(taskTable, task, date, index));
        });
    } else if (selectedDate && tasks[selectedDate]) {
        tasks[selectedDate].forEach((task, index) => addTaskRow(taskTable, task, selectedDate, index));
    }
}

// Görev satırı ekleme fonksiyonu
function addTaskRow(taskTable, task, date, index) {
    const row = taskTable.insertRow();

    row.insertCell(0).textContent = task.text;
    row.insertCell(1).textContent = date; // Tarih
    row.insertCell(2).textContent = task.time; // Saat

    const statusCell = row.insertCell(3);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.onclick = () => {
        task.done = !task.done;
        updateTaskTable();
    };

    statusCell.appendChild(checkbox);

    const deleteCell = row.insertCell(4);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";

    deleteButton.onclick = () => {
        tasks[date].splice(index, 1);
        if (tasks[date].length === 0) delete tasks[date]; // Eğer o tarihte başka görev kalmadıysa tarihi sil
        updateTaskTable();
    };

    deleteCell.appendChild(deleteButton);
}

// Tüm görevleri gösterme butonu işlevi
function toggleShowAllTasks() {
    showAll = !showAll;
    
    const toggleButtonText = showAll ? "Seçili Gün Görevlerini Göster" : "Tüm Görevleri Göster";
    
    document.getElementById("toggle-tasks").textContent = toggleButtonText;
    
    updateTaskTable();
}

// Sayfa yüklendiğinde takvimi oluştur
createCalendar();
