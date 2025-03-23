document.addEventListener('DOMContentLoaded', function() {
    // 프로젝트 데이터가 있는지 확인 (projects-data.js에서 로드됨)
    if (typeof projectsData !== 'undefined') {
        // 카드 컨테이너 요소 가져오기
        const cardContainer = document.getElementById('project-cards');
        
        // 카드 컨테이너가 존재하는지 확인
        if (cardContainer) {
            // 각 프로젝트에 대해 카드 생성
            projectsData.forEach((project, index) => {
                // 카드 요소 생성
                const card = document.createElement('div');
                card.className = 'project-card';
                card.setAttribute('data-project-index', index);
                
                // 대표 이미지 가져오기 (첫 번째 이미지)
                const thumbnailSrc = project.images && project.images.length > 0 
                    ? project.images[0].src 
                    : 'assets/placeholder.jpg';
                
                const thumbnailAlt = project.images && project.images.length > 0 
                    ? project.images[0].alt 
                    : project.title;
                
                // 카드 내용 생성
                let cardHTML = `
                    <div class="card-image">
                        <img src="${thumbnailSrc}" alt="${thumbnailAlt}">
                    </div>
                    <div class="card-content">
                        <h2>${project.title}</h2>
                `;
                
                // 프로젝트 세부 정보 추가
                if (project.details) {
                    cardHTML += '<div class="project-details">';
                    
                    if (project.details.project) {
                        cardHTML += `<p><strong>Project:</strong> ${project.details.project}</p>`;
                    }
                    
                    if (project.details.area) {
                        cardHTML += `<p><strong>Area:</strong> ${project.details.area}</p>`;
                    }
                    
                    if (project.details.design) {
                        cardHTML += `<p><strong>Design:</strong> ${project.details.design}</p>`;
                    }
                    
                    if (project.details.location) {
                        cardHTML += `<p><strong>Location:</strong> ${project.details.location}</p>`;
                    }
                    
                    cardHTML += '</div>';
                }
                
                // 카드 내용 닫기
                cardHTML += `
                        <div class="view-project">View</div>
                    </div>
                `;
                
                // 카드에 HTML 설정
                card.innerHTML = cardHTML;
                
                // 카드 클릭 이벤트 - 프로젝트 상세 보기
                card.addEventListener('click', function() {
                    const projectIndex = this.getAttribute('data-project-index');
                    createProjectModal(projectsData[projectIndex], projectIndex);
                });
                
                // 카드 컨테이너에 카드 추가
                cardContainer.appendChild(card);
            });
        }
    }
    
    // 스크롤 위치 관리
    let lastScrollPosition = 0;

    // 모달 열기 전에 스크롤 위치 저장
    function saveScrollPosition() {
        const cardContainer = document.getElementById('project-cards');
        if (cardContainer) {
            lastScrollPosition = cardContainer.scrollTop;
        }
    }

    // 모달 닫은 후 스크롤 위치 복원
    function restoreScrollPosition() {
        const cardContainer = document.getElementById('project-cards');
        if (cardContainer) {
            cardContainer.scrollTop = lastScrollPosition;
        }
    }

    // 프로젝트 모달 생성 함수
    function createProjectModal(project, index) {
        // 스크롤 위치 저장
        saveScrollPosition();
        
        // 기존 모달이 있으면 제거
        const existingModal = document.querySelector('.project-modal');
        if (existingModal) {
            document.body.removeChild(existingModal);
        }
        
        // body 스타일 변경
        document.body.style.overflow = 'hidden';
        
        // 모달 요소 생성
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        // z-index를 푸터(90)보다 높게 설정
        modal.style.zIndex = '1000';
        
        // 모달 내용 생성
        let modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${project.title}</h2>
                    <span class="close-modal">&times;</span>
                </div>
        `;
        
        // 프로젝트 세부 정보 추가
        if (project.details) {
            modalHTML += '<div class="modal-project-details">';
            
            if (project.details.project) {
                modalHTML += `<p><strong>Project:</strong> ${project.details.project}</p>`;
            }
            
            if (project.details.area) {
                modalHTML += `<p><strong>Area:</strong> ${project.details.area}</p>`;
            }
            
            if (project.details.design) {
                modalHTML += `<p><strong>Design:</strong> ${project.details.design}</p>`;
            }
            
            if (project.details.location) {
                modalHTML += `<p><strong>Location:</strong> ${project.details.location}</p>`;
            }
            
            modalHTML += '</div>';
        }
        
        // 이미지 갤러리 추가
        modalHTML += '<div class="project-gallery">';
        
        if (project.images && project.images.length > 0) {
            project.images.forEach(image => {
                modalHTML += `<div class="gallery-item"><img src="${image.src}" alt="${image.alt}"></div>`;
            });
        }
        
        modalHTML += '</div></div>';
        
        // 모달에 HTML 설정
        modal.innerHTML = modalHTML;
        
        // 모달 닫기 버튼 이벤트
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
            // 모달이 닫힐 때 푸터 다시 표시
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.style.display = '';
            }
            // body 스타일 복원
            document.body.style.overflow = '';
        });
        
        // 모달 외부 클릭 시 닫기
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                document.body.removeChild(modal);
                // 모달이 닫힐 때 푸터 다시 표시
                if (footer) {
                    footer.style.display = '';
                }
                // body 스타일 복원
                document.body.style.overflow = '';
            }
        });
        
        // 모달을 body에 추가
        document.body.appendChild(modal);
        
        // 모달이 열릴 때 푸터 숨기기
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.style.display = 'none';
        }
        
        // 모달 애니메이션 효과 추가
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}); 