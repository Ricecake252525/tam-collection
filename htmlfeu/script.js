const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const nameText = document.getElementById('member-name');
const homeSection = document.getElementById('homeSection');
const aboutSection = document.getElementById('aboutSection');
const leftPanel = document.getElementById('leftPanel');
const rightPanel = document.getElementById('rightPanel');

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
