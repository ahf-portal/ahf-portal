// ================= SOUNDS =================
const soundClick = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3");
const soundError = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3");
const soundLogout = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-interface-hint-notification-911.mp3");

// ================= SUBJECTS =================
const subjects = [
  'Discrete Structure',
  'Programming Fundamentals',
  'AICT',
  'Pakistan Studies',
  'Functional English',
  'Linear Algebra'
];

// ================= STUDENTS =================
const studentNames = [
  { name: "Syed Abdurrehman", roll: "2025F-BCIS-005" },
  { name: "Syeda Hooriya Hussain", roll: "2025F-BCIS-026" },
  { name: "Syeda Farwa Batool", roll: "2025F-BCIS-017" },
  ...Array.from({ length: 47 }, (_, i) => ({
    name: `Student ${i + 4}`,
    roll: `2025F-BCIS-${String(i + 30).padStart(3, "0")}`
  }))
];

const students = studentNames.map(s => {
  const courses = subjects.map(sub => ({
    subject: sub,
    attendance: Math.floor(Math.random() * 21) + 80,
    mid: Math.floor(Math.random() * 21) + 60,
    final: Math.floor(Math.random() * 31) + 60
  }));

  return {
    name: s.name,
    roll: s.roll.toLowerCase(),
    cgpa: (Math.random() * 1.5 + 2.5).toFixed(2),
    courses
  };
});

// ================= LOGIN =================
function login() {
  const roll = document.getElementById("rollno").value.toLowerCase().trim();
  const pass = document.getElementById("password").value;

  const student = students.find(s => s.roll === roll);

  if (student && pass === "cloudcomputing") {
    soundClick.play();
    localStorage.setItem("student", JSON.stringify(student));
    window.location.href = "dashboard.html";
  } else {
    const box = document.querySelector(".login-box");
    box.classList.add("shake");
    setTimeout(() => box.classList.remove("shake"), 400);
    alert("Invalid Roll Number or Password");
    soundError.play();
  }
}

// ================= PASSWORD TOGGLE =================
function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

// ================= LOAD STUDENT DATA =================
if (localStorage.getItem("student")) {
  const s = JSON.parse(localStorage.getItem("student"));

  // Dashboard student info
  if (document.getElementById("studentName")) {
    document.getElementById("studentName").textContent = s.name;
    document.getElementById("rollNumber").textContent = s.roll.toUpperCase();
    document.getElementById("cgpaText").textContent = s.cgpa;

    // CGPA progress animation
    const percent = (s.cgpa / 4) * 100;
    setTimeout(() => {
      document.getElementById("cgpaFill").style.width = percent + "%";
    }, 200);

    // Average attendance
    const avg = Math.round(s.courses.reduce((a, c) => a + c.attendance, 0) / s.courses.length);
    document.getElementById("attendance").textContent = avg + "%";

    // Marks table
    const marks = document.getElementById("marksTable");
    if (marks) {
      s.courses.forEach(c => {
        marks.innerHTML += `
          <tr>
            <td>${c.subject}</td>
            <td>${c.mid}</td>
            <td>${c.final}</td>
          </tr>`;
      });
    }

    // Attendance table
    const att = document.getElementById("attendanceTable");
    if (att) {
      s.courses.forEach(c => {
        att.innerHTML += `
          <tr>
            <td>${c.subject}</td>
            <td>
              ${c.attendance}%
              <div class="att-bar">
                <div class="att-fill" style="width:${c.attendance}%"></div>
              </div>
            </td>
          </tr>`;
      });
    }
  }
}

// ================= LOGOUT =================
function logout() {
  soundLogout.play();
  setTimeout(() => {
    localStorage.clear();
    window.location.href = "login.html";
  }, 300);
}

// ================= THEME TOGGLE =================
const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "ultra") {
  document.body.classList.add("ultra-dark");
  if (toggleBtn) toggleBtn.textContent = "☀️";
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("ultra-dark");
    const isUltra = document.body.classList.contains("ultra-dark");
    toggleBtn.textContent = isUltra ? "☀️" : "🌙";
    localStorage.setItem("theme", isUltra ? "ultra" : "dark");
  });
}
