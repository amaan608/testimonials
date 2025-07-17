// List of all professors with departments and images
const professors = [
  { name: "Dr. Priya Sharma", department: "Computer Science", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Dr. Aditi Singh", department: "Computer Science", image: "https://randomuser.me/api/portraits/women/45.jpg" },
  { name: "Dr. Ramesh Kumar", department: "Mathematics", image: "https://randomuser.me/api/portraits/men/46.jpg" },
  { name: "Dr. Anil Joshi", department: "Mathematics", image: "https://randomuser.me/api/portraits/men/48.jpg" },
  { name: "Dr. Suresh Patel", department: "Physics", image: "https://randomuser.me/api/portraits/men/47.jpg" }
];

let selectedProf = null;

// Show only the requested step, hide others
function showStep(id) {
  document.querySelectorAll('.step').forEach(div => div.style.display = 'none');
  document.getElementById(id).style.display = '';
}

// Username Continue Button: Populate department select and go to prof-select
document.getElementById('continueBtn').onclick = () => {
  if (document.getElementById('username').value.trim().length === 0) {
    alert('Please enter your name.');
    return;
  }

  // Get unique department names
  const deptSel = document.getElementById('dept-select');
  const departments = [...new Set(professors.map(p => p.department))].sort();
  deptSel.innerHTML = '<option value="">Select Department</option>';
  departments.forEach(dept => {
    const opt = document.createElement('option');
    opt.value = dept;
    opt.textContent = dept;
    deptSel.appendChild(opt);
  });

  document.getElementById('prof-list').innerHTML = '';
  showStep('prof-select');
};

// When a department is chosen, list professors from just that department
document.getElementById('dept-select').onchange = function() {
  const selDept = this.value;
  const profList = document.getElementById('prof-list');
  profList.innerHTML = '';
  if (!selDept) return;
  professors.filter(prof => prof.department === selDept).forEach(prof => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = prof.image;
    img.alt = prof.name;
    img.className = "prof-pic";
    const a = document.createElement('a');
    a.href = "#";
    a.textContent = prof.name;
    a.onclick = function() {
      selectedProf = prof;
      document.getElementById('prof-info').innerHTML =
        `<img src="${prof.image}" alt="${prof.name}"><span>${prof.name} (${prof.department})</span>`;
      showStep('testi-step');
      return false;
    };
    li.appendChild(img);
    li.appendChild(a);
    profList.appendChild(li);
  });
};

// When a testimonial is submitted
document.getElementById('submitBtn').onclick = () => {
  if (document.getElementById('testimonial').value.trim().length < 3) {
    alert('Please write a testimonial.');
    return;
  }
  document.getElementById('testimonial').value = '';
  showStep('thankyou');
};

// "Submit another" returns to department/prof page, with departments still populated
document.getElementById('submitAnother').onclick = (e) => {
  e.preventDefault();
  showStep('prof-select');
};
