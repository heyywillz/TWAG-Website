/**
 * departments.js — True Worshippers A/G
 * Handles: Department filtering, executive data modal display
 */

function filterDepartments(category, btn) {
  const buttons = document.querySelectorAll('.dept-filter-btn');
  buttons.forEach(b => {
    b.classList.remove('bg-navy', 'text-gold', 'border-navy', 'shadow-md');
    b.classList.add('bg-surface', 'text-navy', 'border-borderSubtle/80');
  });
  if (btn) {
    btn.classList.remove('bg-surface', 'text-navy', 'border-borderSubtle/80');
    btn.classList.add('bg-navy', 'text-gold', 'border-navy', 'shadow-md');
  }

  const cards = document.querySelectorAll('.dept-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'flex';
      card.classList.add('animate-fadeIn');
    } else {
      card.style.display = 'none';
    }
  });
}

// Exact department executive dataset
const deptExecData = {
  sapphire: {
    title: "The Sapphire Worship Team",
    category: "WORSHIP & MUSIC EXECUTIVES",
    executives: [
      { name: "Ruth Mensah", role: "President", photo: "images/leadership/ruth-mensah.jpg" },
      { name: "Stephen Adu", role: "Music Director", photo: "images/leadership/stephen-adu.jpg" },
      { name: "Hannah Fosu", role: "Treasurer", initials: "HF" }
    ]
  },
  choir: {
    title: "Melodious Choir",
    category: "CHOIR EXECUTIVES",
    executives: [
      { name: "Stephen Adu", role: "President", photo: "images/leadership/stephen-adu.jpg" },
      { name: "Isaac Boafo", role: "Choir Director", photo: "images/leadership/isaac-boafo.jpg" },
      { name: "Yoosi Ankomah", role: "Choir Director", photo: "images/leadership/eric-takyi-mensah.jpg" },
      { name: "Patience Ansong", role: "Secretary", photo: "images/leadership/ivy-yeboah.jpg" },
      { name: "Comfort Tetteh", role: "Treasurer", photo: "images/leadership/comfort-tetteh.jpg" },
      { name: "Mabel Afriyie", role: "Curator", photo: "images/leadership/mabel-afriyie.jpg" }
    ]
  },
  youth: {
    title: "Youth Ministry",
    category: "YOUTH EXECUTIVES",
    executives: [
      { name: "Pastor Emmanuel Osei Mensah", role: "President", photo: "images/leadership/emmanuel-osei.jpg" },
      { name: "Stephen Adu", role: "Vice President", photo: "images/leadership/stephen-adu.jpg" },
      { name: "Mercy Oduro", role: "Secretary", photo: "images/leadership/mercy-oduro.jpg" },
      { name: "Edna Konadu Boah", role: "Treasurer", photo: "images/leadership/edna-konadu-boah.jpg" }
    ]
  },
  children: {
    title: "Children's Ministry",
    category: "CHILDREN'S MINISTRY EXECUTIVES",
    executives: [
      { name: "Mavis Aba Baffoe", role: "Teacher", photo: "images/leadership/mavis-aba-baffoe.jpg" },
      { name: "Frank Boadu", role: "Teacher", photo: "images/leadership/frank-boadu.png" }
    ]
  },
  women: {
    title: "Women's Ministry",
    category: "WOMEN'S MINISTRY EXECUTIVES",
    executives: [
      { name: "Mary Owusu", role: "President", photo: "images/leadership/mary-owusu.jpg" },
      { name: "Beatrice Owusu", role: "Vice President", photo: "images/leadership/beatrice-owusu.jpg" },
      { name: "Victoria Yeboah", role: "Secretary", photo: "images/leadership/victoria-yeboah.jpg" },
      { name: "Mary Aboagye", role: "Treasurer", photo: "images/leadership/mary-aboagye.jpg" }
    ]
  },
  joy: {
    title: "Joy Fellowship",
    category: "JOY FELLOWSHIP EXECUTIVES",
    executives: [
      { name: "Juliana Manu", role: "President", initials: "JM" },
      { name: "Juliana Donkor", role: "Vice President", photo: "images/leadership/juliana-donkor.png" },
      { name: "Agartha", role: "Treasurer", initials: "A" },
      { name: "Abigail Asante", role: "Secretary", photo: "images/leadership/abigail-asante.jpg" }
    ]
  },
  ys: {
    title: "Young Singles (YS)",
    category: "YOUNG SINGLES EXECUTIVES",
    executives: [
      { name: "Jane Doe", role: "President", initials: "JD" },
      { name: "Jane Doe II", role: "Vice President", initials: "JD" },
      { name: "Jane Doe III", role: "Secretary", initials: "JD" },
      { name: "Naomi Serwaa", role: "Treasurer", photo: "images/leadership/naomi-serwaa.jpg" },
      { name: "Hagar Panful", role: "Sponsor", photo: "images/leadership/hagar-panful.png" }
    ]
  },
  missionette: {
    title: "Missionette",
    category: "MISSIONETTE EXECUTIVES",
    executives: [
      { name: "Mavis Aba Baffoe", role: "Sponsor", photo: "images/leadership/mavis-aba-baffoe.jpg" },
      { name: "Cecilia Opoku", role: "Sponsor", photo: "images/leadership/cecilia-opoku.jpg" },
      { name: "Juliana Donkor", role: "Sponsor", photo: "images/leadership/juliana-donkor.png" },
      { name: "Christiana Mensah", role: "Sponsor", initials: "CM" }
    ]
  },
  men: {
    title: "Men's Ministry",
    category: "MEN'S MINISTRY EXECUTIVES",
    executives: [
      { name: "Patrick Gyamfi", role: "President", photo: "images/leadership/patrick-gyamfi.jpg" },
      { name: "Seth Boakye", role: "Vice President", photo: "images/leadership/seth-boakye.jpg" },
      { name: "Victor Agyemang", role: "Secretary", photo: "images/leadership/victor-agyemang.jpg" },
      { name: "Richard Blay", role: "Organizer", photo: "images/leadership/richard-blay.jpg" },
      { name: "Frank Boadu", role: "Treasurer", photo: "images/leadership/frank-boadu.png" }
    ]
  },
  rangers: {
    title: "Royal Rangers",
    category: "ROYAL RANGERS EXECUTIVES",
    executives: [
      { name: "Patrick Gyamfi", role: "Sponsor", photo: "images/leadership/patrick-gyamfi.jpg" },
      { name: "Fiifi Baffoe", role: "Commander", initials: "FB" }
    ]
  },
  evangelism: {
    title: "Evangelism & Missions",
    category: "EVANGELISM EXECUTIVES",
    executives: [
      { name: "Pastor Emmanuel Osei Mensah", role: "President", photo: "images/leadership/emmanuel-osei.jpg" },
      { name: "Deacon Emmanuel Fosu", role: "Vice President", photo: "images/leadership/emmanuel-fosu.jpg" },
      { name: "Eric Amoah", role: "Secretary", photo: "images/leadership/eric-amoah.jpg" }
    ]
  },
  prayer: {
    title: "Prayer Tower",
    category: "PRAYER TOWER EXECUTIVES",
    executives: [
      { name: "Eric Amoah", role: "President", photo: "images/leadership/eric-amoah.jpg" },
      { name: "Emmanuel Osei", role: "Vice President", photo: "images/leadership/emmanuel-osei.jpg" }
    ]
  },
  sundayschool: {
    title: "Sunday School",
    category: "SUNDAY SCHOOL EXECUTIVES",
    executives: [
      { name: "Mavis Aba Baffoe", role: "SS Superintendent", photo: "images/leadership/mavis-aba-baffoe-2.jpg" },
      { name: "Johnson Adu", role: "Vice President", photo: "images/leadership/johnson-adu.png" }
    ]
  },
  welfare: {
    title: "Welfare Team",
    category: "WELFARE EXECUTIVES",
    executives: [
      { name: "Juliana Donkor", role: "President", photo: "images/leadership/juliana-donkor.png" },
      { name: "James Duodu", role: "Vice President", photo: "images/leadership/james-duodu.png" }
    ]
  },
  ushering: {
    title: "Ushering & Protocol",
    category: "USHERING EXECUTIVES",
    executives: [
      { name: "Prince Agyemang", role: "President", photo: "images/leadership/prince-agyemang.png" },
      { name: "Ivy Yeboah", role: "Vice President", photo: "images/leadership/ivy-yeboah.jpg" }
    ]
  },
  properties: {
    title: "Properties",
    category: "PROPERTIES EXECUTIVES",
    executives: [
      { name: "Patrick Gyamfi", role: "Chairman", photo: "images/leadership/patrick-gyamfi.jpg" },
      { name: "Eric Takyi Mensah", role: "Vice Chairman", photo: "images/leadership/eric-takyi-mensah.jpg" },
      { name: "Comfort Tetteh", role: "Secretary", photo: "images/leadership/comfort-tetteh.jpg" }
    ]
  },
  media: {
    title: "Media Team",
    category: "MEDIA TEAM EXECUTIVES",
    executives: [
      { name: "Stephen Adu", role: "President", photo: "images/leadership/stephen-adu.jpg" },
      { name: "Daniel Sarpong", role: "Head of Production", photo: "images/leadership/daniel-sarpong.jpg" },
      { name: "Eric Amoah", role: "Sound Manager", photo: "images/leadership/eric-amoah.jpg" }
    ]
  }
};

function openExecModal(deptKey) {
  const data = deptExecData[deptKey];
  if (!data) return;

  document.getElementById('modal-dept-title').textContent = data.title;
  document.getElementById('modal-dept-category').textContent = data.category;

  const container = document.getElementById('modal-exec-list');
  container.innerHTML = data.executives.map(exec => `
    <div class="flex items-center gap-4 p-3.5 rounded-2xl bg-cream border border-borderSubtle/60 hover:border-gold/50 transition-all">
      ${exec.photo 
        ? `<img src="${exec.photo}" alt="${exec.name}" class="w-14 h-14 rounded-xl object-cover shrink-0 border border-gold/40 shadow-sm">`
        : `<div class="w-14 h-14 rounded-xl bg-navy text-gold font-sora text-base font-extrabold flex items-center justify-center shrink-0 border border-gold/40 shadow-sm">${exec.initials || 'HF'}</div>`
      }
      <div>
        <h4 class="font-sora text-base font-bold text-navy">${exec.name}</h4>
        <p class="font-inter text-xs text-muted font-medium">${exec.role}</p>
      </div>
    </div>
  `).join('');

  const modal = document.getElementById('exec-modal');
  const card = document.getElementById('exec-modal-card');
  if (modal && card) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
  }
}

function closeExecModal() {
  const modal = document.getElementById('exec-modal');
  const card = document.getElementById('exec-modal-card');
  if (modal && card) {
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
  }
}
