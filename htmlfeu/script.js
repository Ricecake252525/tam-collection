const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const nameText = document.getElementById('member-name');
const homeSection = document.getElementById('homeSection');
const aboutSection = document.getElementById('aboutSection');
const leftPanel = document.getElementById('leftPanel');
const rightPanel = document.getElementById('rightPanel');
const aboutLink = document.querySelector('nav a[href="#about"]');
const subjects = document.querySelector('.subjects');
const profile = document.querySelector('.profile');

const members = [
  { name: "Hi, I'm JM" },
  { name: "Hi, I'm Noel" },
  { name: "Hi, I'm Ramwil" }
];

let current = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
  nameText.textContent = members[index].name;
}

prevBtn.addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
});

nextBtn.addEventListener('click', () => {
  current = (current + 1) % images.length;
  showImage(current);
});

// Dropdown
function toggleDropdown() {
  document.getElementById("dropdownMenu").classList.toggle("show");
}

// Close dropdown when clicking outside
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('show');
    }
  }
};

// Switch between Home and About
document.getElementById("aboutBtn").addEventListener("click", () => {
  document.body.classList.add("full-yellow");
});

document.getElementById("homeBtn").addEventListener("click", () => {
  document.body.classList.remove("full-yellow");
});

function expandSubject(subject) {
  const leftPanel = document.getElementById('leftPanel');

  // Clear and prepare the expanded view
  leftPanel.innerHTML = '';

  let content = '';
  if (subject === 'purposive') {
    content = `
      <button class="close-btn" onclick="closeExpanded()">×</button>
      <div class="expanded-content">
        <img src="shrek.jpg" alt="Purposive">
        <h2>Purposive Communication</h2>
      </div>`;
  } else if (subject === 'pe') {
    content = `
      <button class="close-btn" onclick="closeExpanded()">×</button>
      <div class="expanded-content">
        <img src="shrek.jpg" alt="PE">
        <h2>Physical Education</h2>
      </div>`;
  } else if (subject === 'nstp') {
    content = `
      <button class="close-btn" onclick="closeExpanded()">×</button>
      <div class="expanded-content">
        <img src="shrek.jpg" alt="NSTP">
        <h2>National Service Training Program</h2>
      </div>`;
  }

  // Expand the left panel and show content
  leftPanel.classList.add('expanded');
  leftPanel.innerHTML = content;
}

function closeExpanded() {
  const leftPanel = document.getElementById('leftPanel');

  // Restore original logo + text
  leftPanel.classList.remove('expanded');
  leftPanel.innerHTML = `
    <div class="content-left">
      <img src="logo.png" alt="logo" class="logo">
      <h1>Tam Collection</h1>
      <p>A collection of our experience during our stay at FEU Roosevelt Marikina.</p>
    </div>
  `;
}
