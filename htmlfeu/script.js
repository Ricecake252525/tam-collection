const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const nameText = document.getElementById('member-name');
const navLinks = document.querySelectorAll('nav a');
const leftPanel = document.getElementById('leftPanel');

const subjects = {
  purposive: {
    title: "Purposive Communication",
    images: ["purposive(1).jpg", "purposive(2).jpg", "purposive(3).jpg"]
  },
  pe: {
    title: "Physical Education",
    images: ["pe(1).jpg", "pe(2).jpg", "pe(3).jpg"]
  },
  nstp: {
    title: "National Service Training Program",
    images: ["nstp(1).jpg", "nstp(2).jpg"]
  },
  halloween: {
    title: "Halloween",
    images: ["halloween(1).jpg", "halloween(2).jpg", "halloween(3).jpg"]
  }
};

const events = {
  sinagtam: {
    title: "Sinag Tam",
    images: ["sinag_tam(1).jpg", "sinag_tam(2).jpg", "sinag_tam(3).jpg"]
  },
  sinagsports: {
    title: "Sinag Sports",
    images: ["sinag_sport(1).jpg", "sinag_sport(2).jpg", "sinag_sport(3).jpg"]
  },
  orientation: {
    title: "Orientation",
    images: ["orientation(1).jpg", "orientation(2).jpg"]
  }
};

const members = [
  { name: "Hi, I'm JM" },
  { name: "Hi, I'm Noel" },
  { name: "Hi, I'm Ramwil" }
];

let current = 0;

// === CAROUSEL ===
function showImage(index) {
  images.forEach((img, i) => img.classList.toggle('active', i === index));
  nameText.textContent = members[index].name;
}

prevBtn.onclick = () => {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
};

nextBtn.onclick = () => {
  current = (current + 1) % images.length;
  showImage(current);
};

// === DROPDOWN ===
function toggleDropdown(event) {
  event.preventDefault();
  document.getElementById("dropdownMenu").classList.toggle("show");
}

window.onclick = (e) => {
  if (!e.target.matches('.dropbtn')) {
    document.querySelectorAll(".dropdown-content").forEach(d => d.classList.remove("show"));
  }
};

// === SUBJECT EXPANSION ===
function expandSubject(subjectKey) {
  const s = subjects[subjectKey];
  if (!s) return;

  document.body.classList.add('full-green');
  leftPanel.classList.add('expanded');
  navLinks.forEach(link => link.classList.add('nav-yellow'));

  const photosHTML = s.images
    .map(
      src => `
      <div class="subject-photo-container">
        <img src="${src}" alt="${s.title}" class="subject-photo" onclick="enlargeSubjectPhoto('${src}', '${s.title}')">
      </div>`
    )
    .join("");

  leftPanel.innerHTML = `
    <div class="expanded-content">
      <button class="close-btn" onclick="closeExpanded()">✕</button>
      <h2>${s.title}</h2>
      <div class="subject-photos">${photosHTML}</div>
    </div>`;
}

// === SUBJECT ENLARGEMENT (SMALL INSIDE GREEN DIV) ===
function enlargeSubjectPhoto(src, title) {
  const existing = document.querySelector(".subject-enlarge");
  if (existing) existing.remove();

  const box = document.createElement("div");
  box.className = "subject-enlarge";
  box.innerHTML = `
    <div class="subject-enlarge-box">
      <img src="${src}" alt="${title}" class="subject-enlarge-img">
      <button class="photo-close-inside" onclick="this.closest('.subject-enlarge').remove()">✕</button>
    </div>`;
  leftPanel.appendChild(box);
}

// === EVENT EXPANSION (SINAG TAM, SPORTS, ORIENTATION) ===
function expandEvent(eventKey) {
  const e = events[eventKey];
  if (!e) return;

  document.body.classList.add("full-green");
  leftPanel.classList.add("expanded");
  navLinks.forEach(link => (link.style.color = "#f9e547"));

  const photosHTML = e.images
    .map(
      src => `
      <img src="${src}" alt="${e.title}" 
      class="event-photo" 
      style="width:250px;height:250px;border-radius:10px;margin:10px;cursor:pointer;transition:transform 0.3s;"
      onmouseover="this.style.transform='scale(1.05)'"
      onmouseout="this.style.transform='scale(1)'"
      onclick="enlargeEventPhoto('${src}', '${e.title}')">`
    )
    .join("");

  leftPanel.innerHTML = `
    <button class="close-btn" onclick="closeExpanded()">✕</button>
    <div class="expanded-content">
      <h2>${e.title}</h2>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-top:20px;">
        ${photosHTML}
      </div>
    </div>`;
}

// === ENLARGE EVENT PHOTO (FULLSCREEN FIXED OVERLAY) ===
function enlargeEventPhoto(src, title) {
  const overlay = document.createElement('div');
  overlay.className = 'photo-overlay';
  overlay.innerHTML = `
    <div class="photo-box fade-in">
      <button class="photo-close" aria-label="Close" onclick="this.closest('.photo-overlay').remove()">✕</button>
      <img src="${src}" alt="${title}">
    </div>`;
  document.body.appendChild(overlay);
}


// === CLOSE PANELS ===
function closeExpanded() {
  document.body.classList.remove("full-green", "full-yellow");
  leftPanel.classList.remove("expanded", "expanded-small");

  leftPanel.innerHTML = `
    <div class="content-left">
      <img src="logo.png" alt="logo" class="logo">
      <h1>Tam Collection</h1>
      <p>A collection of our experience during our stay at FEU Roosevelt Marikina.</p>
    </div>`;

  navLinks.forEach(link => (link.style.color = "#1a4731"));
}

// === ABOUT & HOME ===
document.getElementById("aboutBtn").onclick = () => {
  document.body.classList.remove("full-green");
  document.body.classList.add("full-yellow");
};

document.getElementById("homeBtn").onclick = closeExpanded;

// === EVENT LINKS ===
document.querySelectorAll("#dropdownMenu a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const eventName = link.textContent.trim().toLowerCase().replace(" ", "");
    expandEvent(eventName);
  });
});

