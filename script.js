// ===== Helper: time =====
function updateCurrentTime() {
  const timeEl = document.getElementById("current-time");
  if (!timeEl) return;
  const now = new Date();
  timeEl.textContent = now.toString();
}

// ===== Welcome Name =====
function askAndSetWelcomeName() {
  const el = document.getElementById("welcome-name");
  if (!el) return;

  let saved = localStorage.getItem("welcomeName");
  if (!saved) {
    saved = prompt("Masukkan namamu untuk sapaan di Home:", "") || "There";
    localStorage.setItem("welcomeName", saved);
  }
  el.textContent = saved;
}

// ===== Banner: change image from file input =====
function setupBannerChanger() {
  const btn = document.getElementById("btn-change-banner");
  const input = document.getElementById("banner-input");
  const img = document.getElementById("banner-image");

  // Load saved banner if any
  const savedBanner = localStorage.getItem("bannerDataURL");
  if (savedBanner) img.src = savedBanner;

  btn.addEventListener("click", () => input.click());
  input.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataURL = evt.target.result;
      img.src = dataURL;
      try { localStorage.setItem("bannerDataURL", dataURL); } catch {}
    };
    reader.readAsDataURL(file);
  });
}

// ===== Profile photo: change & persist =====
function setupProfilePhotoChanger() {
  const btn = document.getElementById("btn-change-profile");
  const input = document.getElementById("profile-input");
  const img = document.getElementById("profile-image");

  // Load saved profile if any
  const savedProfile = localStorage.getItem("profileDataURL");
  if (savedProfile) img.src = savedProfile;

  btn.addEventListener("click", () => input.click());
  input.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataURL = evt.target.result;
      img.src = dataURL;
      try { localStorage.setItem("profileDataURL", dataURL); } catch {}
    };
    reader.readAsDataURL(file);
  });
}

// ===== Form handling & validation =====
function setupForm() {
  const form = document.getElementById("message-form");
  const outName = document.getElementById("out-name");
  const outDob = document.getElementById("out-dob");
  const outGender = document.getElementById("out-gender");
  const outMsg = document.getElementById("out-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateCurrentTime();

    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = (form.elements["gender"].value || "").trim();
    const msg = document.getElementById("messageText").value.trim();

    const errors = [];
    if (!name) errors.push("Nama wajib diisi.");
    if (!dob) errors.push("Tanggal lahir wajib diisi.");
    if (!gender) errors.push("Jenis kelamin wajib dipilih.");
    if (!msg) errors.push("Pesan wajib diisi.");

    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }

    outName.textContent = name;
    outDob.textContent = dob;
    outGender.textContent = gender;
    outMsg.textContent = msg;
  });
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  askAndSetWelcomeName();
  setupBannerChanger();
  setupProfilePhotoChanger();
  setupForm();
  updateCurrentTime();
});
