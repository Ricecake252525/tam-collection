const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const nameText = document.getElementById('member-name');
const navLinks = document.querySelectorAll('nav a');
const leftPanel = document.getElementById('leftPanel');

const subjects = {
  purposive: {
    title: "Purposive Communication",
    desc: "Discover how we learned to communicate effectively through projects and presentations.",
    alt: "Purposive"
  },
  pe: {
    title: "Physical Education",
    desc: "Take a look at our fun and active PE moments!",
    alt: "PE"
  },
  nstp: {
    title: "National Service Training Program",
    desc: "A glimpse into our NSTP experiences and community service activities.",
    alt: "NSTP"
  }
};

const events = {
  sinagtam: {
    title: "Sinag Tam",
    images: ["shrek.jpg", "shrek.jpg", "shrek.jpg"]
  },
  sinagsports: {
    title: "Sinag Sports",
    images: ["shrek.jpg", "shrek.jpg", "shrek.jpg"]
  },
  orientation: {
    title: "Orientation",
    images: ["shrek.jpg", "shrek.jpg", "shrek.jpg"]
  }
};

const members = [
  { name: "Hi, I'm JM" },
  { name: "Hi, I'm Noel" },
  { name: "Hi, I'm Ramwil" }
];

let current = 0;

// Carousel
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

// Dropdown
function toggleDropdown(event) {
  event.preventDefault();
  document.getElementById("dropdownMenu").classList.toggle("show");
}

window.onclick = (e) => {
  if (!e.target.matches('.dropbtn')) {
    document.querySelectorAll(".dropdown-content").forEach(d => d.classList.remove("show"));
  }
};

// Expand Subject (Yellow transition)
function expandSubject(subjectKey) {
  const s = subjects[subjectKey];
  if (!s) return;
  document.body.classList.add('full-green');
  leftPanel.classList.add('expanded');
  navLinks.forEach(link => link.classList.add('nav-yellow'));

  leftPanel.innerHTML = `
    <div class="expanded-content">
      <img src="shrek.jpg" alt="${s.alt}">
      <h2>${s.title}</h2>
    </div>`;
}

// Expand Event (Green transition)
function expandEvent(eventKey) {
  const e = events[eventKey];
  if (!e) return;

  document.body.classList.add("full-green");
  leftPanel.classList.add("expanded");

  // Change nav color for visibility
  navLinks.forEach(link => link.style.color = "#f9e547");

  // Show event photos
  let photosHTML = e.images
    .map(src => `<img src="${src}" alt="${e.title}" style="width:250px;height:250px;border-radius:10px;margin:10px;">`)
    .join("");

  leftPanel.innerHTML = `
    <div class="expanded-content">
      <h2>${e.title}</h2>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-top:20px;">
        ${photosHTML}
      </div>
    </div>`;
}

// Close expanded section (both green/yellow)
function closeExpanded() {
  document.body.classList.remove("full-green", "full-yellow");
  leftPanel.classList.remove("expanded");
  leftPanel.innerHTML = `
    <div class="content-left">
      <img src="logo.png" alt="logo" class="logo">
      <h1>Tam Collection</h1>
      <p>A collection of our experience during our stay at FEU Roosevelt Marikina.</p>
    </div>`;
  navLinks.forEach(link => link.style.color = "#1a4731");
}

// About / Home
document.getElementById("aboutBtn").onclick = () => {
  document.body.classList.remove("full-green");
  document.body.classList.add("full-yellow");
};

document.getElementById("homeBtn").onclick = () => {
  closeExpanded();
};

// Handle FEUR Events clicks
document.querySelectorAll("#dropdownMenu a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const eventName = link.textContent.trim().toLowerCase().replace(" ", "");
    expandEvent(eventName);
  });
});
