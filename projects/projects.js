// 정적 JSON 파일에서 프로젝트 데이터 가져오기
async function loadProjects() {
    try {
        const response = await fetch('projects/projects-data.json');
        if (!response.ok) {
            throw new Error('JSON 파일을 불러오는데 실패했습니다');
        }
        const data = await response.json();
        return data.projects;
    } catch (error) {
        console.error('프로젝트 데이터 로드 실패:', error);
        
        // 오류 발생 시 폴백 데이터
        return [
            {
                name: "샘플 프로젝트",
                images: ["placeholder1.jpg", "placeholder2.jpg"]
            }
        ];
    }
}

// 슬라이더 구성 함수
async function setupSliders() {
    const projectsContent = document.querySelector('.projects-content');
    if (!projectsContent) {
        console.error('.projects-content 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 기본 세로 슬라이더 구조 생성 - SVG 아이콘을 직접 삽입
    projectsContent.innerHTML = `
        <div class="vertical-swiper">
            <div class="swiper-wrapper">
                <!-- 여기에 프로젝트 슬라이드가 동적으로 추가됨 -->
            </div>
            <div class="swiper-pagination vertical-pagination"></div>
            <div class="swiper-button-next vertical-button-next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon">
                    <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="swiper-button-prev vertical-button-prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow-icon">
                    <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
    `;
    
    // 프로젝트 데이터 로드
    const projects = await loadProjects();
    const verticalWrapper = document.querySelector('.vertical-swiper .swiper-wrapper');
    
    // 각 프로젝트에 대한 슬라이드 생성
    projects.forEach((project, index) => {
        const verticalSlide = document.createElement('div');
        verticalSlide.className = 'swiper-slide project-slide';
        
        // 각 프로젝트의 가로 슬라이더 생성 - 고유 ID 추가
        const sliderId = `horizontal-swiper-${index}`;
        
        verticalSlide.innerHTML = `
            <div class="project-title">${project.name}</div>
            <div class="horizontal-swiper-container">
                <div class="horizontal-swiper ${sliderId}">
                    <div class="swiper-wrapper">
                        ${project.images.map(image => `
                            <div class="swiper-slide">
                                <img src="projects/images/${image}" alt="${project.name}">
                            </div>
                        `).join('')}
                    </div>
                    <div class="swiper-pagination horizontal-pagination-${index}"></div>
                    <div class="swiper-button-next horizontal-button-next-${index}"></div>
                    <div class="swiper-button-prev horizontal-button-prev-${index}"></div>
                </div>
            </div>
        `;
        
        verticalWrapper.appendChild(verticalSlide);
    });
    
    // 슬라이더 초기화
    initSwipers(projects.length);
}

// 슬라이더 초기화 함수
function initSwipers(projectCount) {
    // 세로 슬라이더 초기화
    const verticalSwiper = new Swiper('.vertical-swiper', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        pagination: {
            el: '.vertical-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.vertical-button-next',
            prevEl: '.vertical-button-prev'
        },
        // 중첩된 스와이퍼 처리
        noSwiping: false,
        nested: true,
        // 가로 스와이핑 사용 안함
        allowTouchMove: true,
        // 키보드 제어를 가능하게 하되 세로만 가능하게
        keyboard: {
            enabled: true,
            onlyInViewport: true
        }
    });

    // 각 가로 슬라이더 초기화 - 고유 선택자 사용
    for (let i = 0; i < projectCount; i++) {
        const horizontalSwiper = new Swiper(`.horizontal-swiper-${i}`, {
            slidesPerView: 1,
            spaceBetween: 0,
            // 중첩된 스와이퍼 설정
            nested: true,
            // 터치 이벤트가 부모 슬라이더에 전파되지 않게 설정
            stopPropagation: true,
            pagination: {
                el: `.horizontal-pagination-${i}`,
                clickable: true
            },
            navigation: {
                nextEl: `.horizontal-button-next-${i}`,
                prevEl: `.horizontal-button-prev-${i}`
            },
            // 수직 방향 스와이핑 방지
            direction: 'horizontal',
            touchStartPreventDefault: false
        });
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', setupSliders); 