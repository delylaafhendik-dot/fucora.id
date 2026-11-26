// ================= 1. ANIMASI BINTANG LUAR ANGKASA =================
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function initStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 140 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.3,
    speed: Math.random() * 0.35 + 0.08,
    alpha: Math.random() * 0.8 + 0.2
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(186, 230, 253, ${s.alpha})`;
    ctx.fill();
    s.y += s.speed;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initStars);
initStars();
animateStars();

// ================= 2. SISTEM LOGIN & GMAIL =================
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');

let currentUser = {
  name: 'Delyla Afhendik',
  studentClass: 'XI IPA',
  email: 'delylaafhendik@gmail.com'
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  currentUser.name = document.getElementById('student-name').value.trim();
  currentUser.studentClass = document.getElementById('student-class').value.trim();
  currentUser.email = document.getElementById('student-email').value.trim();

  document.getElementById('display-name').textContent = currentUser.name;
  document.getElementById('display-meta').textContent = `${currentUser.studentClass} • ${currentUser.email}`;

  loginScreen.classList.remove('active');
  dashboardScreen.classList.add('active');
  calculateDetox();
});

document.getElementById('logout-btn').addEventListener('click', () => {
  dashboardScreen.classList.remove('active');
  loginScreen.classList.add('active');
});

// ================= 3. KALKULATOR DETOKSLAYAR =================
const inputSosmed = document.getElementById('input-sosmed');
const inputGame = document.getElementById('input-game');
const inputChat = document.getElementById('input-chat');
const inputAge = document.getElementById('input-age');

function calculateDetox() {
  const sosmed = parseFloat(inputSosmed.value);
  const game = parseFloat(inputGame.value);
  const chat = parseFloat(inputChat.value);
  const age = parseInt(inputAge.value, 10);

  document.getElementById('val-sosmed').textContent = `${sosmed.toFixed(1)} jam`;
  document.getElementById('val-game').textContent = `${game.toFixed(1)} jam`;
  document.getElementById('val-chat').textContent = `${chat.toFixed(1)} jam`;
  document.getElementById('val-age').textContent = `${age} tahun`;

  const dailyHours = sosmed + game + chat;
  document.getElementById('total-daily-hours').textContent = `${dailyHours.toFixed(1)} Jam / Hari`;

  // Perhitungan Dampak Mengejutkan
  const hoursPerYear = dailyHours * 365;
  const fullDaysPerYear = Math.round(hoursPerYear / 24);
  const remainingYears = Math.max(1, 60 - age);
  const yearsLost = ((hoursPerYear * remainingYears) / (24 * 365)).toFixed(1);
  const booksEquivalent = Math.round(hoursPerYear / 5); // 1 buku ~ 5 jam baca
  const focusScore = Math.max(12, Math.round(100 - dailyHours * 7.8));

  document.getElementById('res-days-year').textContent = fullDaysPerYear;
  document.getElementById('res-years-lost').textContent = yearsLost;
  document.getElementById('res-books').textContent = booksEquivalent;
  document.getElementById('res-focus-score').textContent = `${focusScore}%`;

  // Status & Pesan Kejutan
  const badge = document.getElementById('status-badge');
  const msg = document.getElementById('shock-message');

  if (dailyHours <= 2.5) {
    badge.textContent = 'ORBIT AMAN & TERKENDALI';
    badge.style.background = 'rgba(16, 185, 129, 0.2)';
    badge.style.color = '#6ee7b7';
    msg.innerHTML = `Hebat! Waktu layarmu tergolong sehat. Kamu masih menghemat ratusan jam untuk mengejar prestasi sekolah.`;
  } else if (dailyHours <= 6) {
    badge.textContent = 'WASPADA DOOMSCROLLING';
    badge.style.background = 'rgba(245, 158, 11, 0.2)';
    badge.style.color = '#fcd34d';
    msg.innerHTML = `Dalam 1 tahun, kamu menghabiskan <strong>${fullDaysPerYear} hari penuh (24 jam)</strong> hanya untuk layar—setara libur semester panjang yang hilang begitu saja!`;
  } else {
    badge.textContent = 'BAHAYA KECANDUAN GAWAI';
    badge.style.background = 'rgba(244, 63, 94, 0.25)';
    badge.style.color = '#fda4af';
    msg.innerHTML = `⚠️ <strong>PERINGATAN KERAS:</strong> Jika kebiasaan ${dailyHours.toFixed(1)} jam/hari ini berlanjut sampai usia 60 tahun, kamu akan kehilangan <strong>${yearsLost} TAHUN</strong> masa hidupmu hanya untuk menatap layar!`;
  }

  generateSchedule(dailyHours);
}

[inputSosmed, inputGame, inputChat, inputAge].forEach(el => {
  el.addEventListener('input', calculateDetox);
});

// Tombol Demo Cepat untuk Presentasi di Depan Guru
document.getElementById('demo-guru-btn').addEventListener('click', () => {
  inputSosmed.value = 6.5;
  inputGame.value = 3.0;
  inputChat.value = 2.0;
  inputAge.value = 16;
  calculateDetox();
});

// ================= 4. JADWAL BELAJAR OTOMATIS =================
function generateSchedule(dailyHours) {
  const scheduleList = document.getElementById('schedule-list');
  const isHeavy = dailyHours > 5;

  const items = [
    {
      time: '15.30 - 16.30',
      task: isHeavy ? 'Detoks Total: Simpan HP di luar kamar & istirahat' : 'Istirahat sore & evaluasi catatan sekolah'
    },
    {
      time: '19.00 - 20.00',
      task: 'Sesi Fokus 1 (2x Pomodoro): Mata Pelajaran Hitungan / Utama'
    },
    {
      time: '20.00 - 20.20',
      task: 'Jeda Reward: Boleh cek media sosial maksimal 20 menit'
    },
    {
      time: '20.20 - 21.15',
      task: 'Sesi Fokus 2: Review materi besok & merangkum'
    },
    {
      time: '21.30 - Pagi',
      task: 'Mode Pesawat (Anti-Doomscrolling sebelum tidur)'
    }
  ];

  scheduleList.innerHTML = items.map(item => `
    <div class="schedule-item">
      <span class="schedule-time">${item.time}</span>
      <span>${item.task}</span>
    </div>
  `).join('');
}

// ================= 5. KIRIM LAPORAN KE GMAIL =================
document.getElementById('send-gmail-btn').addEventListener('click', () => {
  const totalHours = document.getElementById('total-daily-hours').textContent;
  const daysLost = document.getElementById('res-days-year').textContent;
  const yearsLost = document.getElementById('res-years-lost').textContent;
  const focusScore = document.getElementById('res-focus-score').textContent;

  const targetEmail = 'delylaafhendik@gmail.com';
  const subject = encodeURIComponent(`[FUCORA DetoksLayar] Laporan Login & Analisis Siswa - ${currentUser.name}`);
  const body = encodeURIComponent(
    `Halo,\n\nBerikut adalah laporan aktivitas login dan hasil kalkulator FUCORA (DetoksLayar):\n\n` +
    `• Nama Siswa : ${currentUser.name}\n` +
    `• Kelas      : ${currentUser.studentClass}\n` +
    `• Email Login: ${currentUser.email}\n` +
    `----------------------------------------\n` +
    `• Total Screen Time   : ${totalHours}\n` +
    `• Waktu Hilang/Tahun  : ${daysLost} Hari Penuh\n` +
    `• Estimasi Hidup Hilang: ${yearsLost} Tahun\n` +
    `• Skor Fokus Belajar  : ${focusScore}\n\n` +
    `Dikirim otomatis melalui Aplikasi Web FUCORA — Focus Your Future.`
  );

  window.open(`mailto:${targetEmail}?subject=${subject}&body=${body}`, '_blank');
});

// ================= 6. POMODORO TIMER =================
let timeLeft = 25 * 60;
let timerInterval = null;

const timerDisplay = document.getElementById('timer-display');
const timerStatus = document.getElementById('timer-status');
const startBtn = document.getElementById('start-timer');

function updateTimerText() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${m}:${s}`;
}

startBtn.addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.textContent = 'Lanjutkan Fokus';
    timerStatus.textContent = 'Misi Dijeda Sementara';
    return;
  }

  startBtn.textContent = 'Jeda';
  timerStatus.textContent = '🚀 Kapsul Meluncur! Jauhkan Gawai Sekarang.';
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerText();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      timerStatus.textContent = '🎉 Misi Selesai! Kamu berhasil fokus 25 menit.';
      startBtn.textContent = 'Mulai Fokus';
    }
  }, 1000);
});

document.getElementById('reset-timer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 25 * 60;
  updateTimerText();
  startBtn.textContent = 'Mulai Fokus';
  timerStatus.textContent = 'Siap Meluncur ke Sesi Fokus';
});
