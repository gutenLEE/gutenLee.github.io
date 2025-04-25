// 스크롤에 따라 로고 이미지 split 애니메이션 적용 및 프로젝트 fadeIn, 스크롤다운 아이콘 숨김
function handleLogoImgSplitAndFade() {
  const logoSplit = document.getElementById('logo-img-split');
  const project = document.getElementById('project');
  const contact = document.getElementById('contact');
  const scrollDown = document.getElementById('scroll-down');
  const scrollY = window.scrollY || window.pageYOffset;
  const trigger = window.innerHeight * 0.3;

  // split trigger
  if (scrollY > trigger) {
    logoSplit.classList.add('split');
    project.classList.add('visible');
    if (scrollDown) scrollDown.classList.add('hide');
  } else {
    logoSplit.classList.remove('split');
    project.classList.remove('visible');
    if (scrollDown) scrollDown.classList.remove('hide');
  }

  // contact fadeIn 
  if (contact) {
    const rect = contact.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      contact.classList.add('visible');
    }
  }
  // 프로젝트 항목별 인터랙션
  handleProjectItemsFadeIn();
}

// 프로젝트 항목별 인터랙티브 페이드/슬라이드 인
function handleProjectItemsFadeIn() {
  const items = document.querySelectorAll('.project-item');
  const windowBottom = window.innerHeight + window.scrollY;
  items.forEach((item, idx) => {
    const rect = item.getBoundingClientRect();
    const itemTop = rect.top + window.scrollY;
    if (windowBottom > itemTop + 100) {
      setTimeout(() => item.classList.add('visible'), idx * 120);
    }
  });
}

// 프로젝트 상세 모달 관련
const projectImages = {
  1: ['images/1/1.jpeg', 'images/1/2.jpeg'],
  2: ['images/2/1.jpeg', 'images/2/2.jpeg'],
  3: ['images/3/1.jpeg', 'images/3/2.jpeg']
};

// 프로젝트 상세 설명 데이터
const projectInfo = {
  1: {
    title: '카페',
    info: [
      { label: 'Project', value: 'CAFE PROJECT' },
      { label: 'Area', value: '150m2/45.5py' },
      { label: 'Design / Construction', value: 'STUDIO ZVAN / XYZ CONSTRUCTION' },
      { label: 'Location', value: 'Seoul, Korea' }
    ]
  },
  2: {
    title: '침실',
    info: [
      { label: 'Project', value: 'BEDROOM PROJECT' },
      { label: 'Area', value: '90m2/27py' },
      { label: 'Design / Construction', value: 'STUDIO ZVAN / ABC CONSTRUCTION' },
      { label: 'Location', value: 'Busan, Korea' }
    ]
  },
  3: {
    title: '키친',
    info: [
      { label: 'Project', value: 'KITCHEN PROJECT' },
      { label: 'Area', value: '60m2/18py' },
      { label: 'Design / Construction', value: 'STUDIO ZVAN / QRS CONSTRUCTION' },
      { label: 'Location', value: 'Incheon, Korea' }
    ]
  }
};

function renderModalInfo(projectId) {
  const info = projectInfo[projectId];
  if (!info) return '';
  return `
    <div class="modal-info-title">${info.title}</div>
    <table class="modal-info-table">
      <tbody>
        ${info.info.map(row => `
          <tr>
            <td class="modal-info-label">${row.label}</td>
            <td class="modal-info-value">${row.value}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function openProjectModal(projectId, startIdx = 0) {
  const modal = document.getElementById('project-modal');
  const thumbnails = document.getElementById('modal-thumbnails');
  const viewer = document.getElementById('modal-viewer');
  const infoBox = document.getElementById('modal-info');
  if (!projectImages[projectId]) return;
  // 썸네일 렌더링
  thumbnails.innerHTML = projectImages[projectId].map((src, idx) =>
    `<img src="${src}" class="modal-thumb${idx===startIdx?' selected':''}" data-idx="${idx}" alt="썸네일">`
  ).join('');
  // 뷰어 렌더링
  viewer.innerHTML = projectImages[projectId].map((src, idx) =>
    `<img src="${src}" class="modal-view-image" style="display:${idx===startIdx?'block':'none'}" data-idx="${idx}" alt="상세">`
  ).join('');
  // 상세 설명 렌더링
  infoBox.innerHTML = renderModalInfo(projectId);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function selectModalImage(idx) {
  const thumbs = document.querySelectorAll('.modal-thumb');
  const images = document.querySelectorAll('.modal-view-image');
  thumbs.forEach((t, i) => t.classList.toggle('selected', i === idx));
  images.forEach((img, i) => img.style.display = (i === idx ? 'block' : 'none'));
}

// --- Contact section effect on scroll ---
function revealContactSection() {
  const contact = document.querySelector('.contact-inner');
  if (!contact) return;
  const rect = contact.getBoundingClientRect();
  const trigger = window.innerHeight * 0.85;
  if (rect.top < trigger) {
    contact.classList.add('visible');
    window.removeEventListener('scroll', revealContactSection);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', handleLogoImgSplitAndFade);
  handleLogoImgSplitAndFade();
  // 프로젝트 항목별 인터랙션
  handleProjectItemsFadeIn();
  window.addEventListener('scroll', revealContactSection);
  revealContactSection();
  // 상세보기 버튼 이벤트
  document.querySelectorAll('.project-detail-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      openProjectModal(projectId, 0);
    });
  });
  // 모달 닫기
  document.getElementById('modal-close').addEventListener('click', closeProjectModal);
  document.querySelector('.modal-backdrop').addEventListener('click', closeProjectModal);
  // 썸네일 클릭
  document.getElementById('modal-thumbnails').addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-thumb')) {
      selectModalImage(Number(e.target.getAttribute('data-idx')));
    }
  });
  // ESC로 닫기
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeProjectModal();
  });
});
