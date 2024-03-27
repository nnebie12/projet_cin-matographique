function toggleMode() {
    var body = document.body;
    body.classList.toggle("night-mode"); 
    body.classList.toggle("day-mode"); 
    var modeIcon = document.getElementById("modeIcon");
    
    if (body.classList.contains("night-mode")) {
        modeIcon.textContent = "☀️"; 
    } else {
        modeIcon.textContent = "🌙"; 
    }
}