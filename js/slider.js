document.addEventListener('DOMContentLoaded', function() {
    // 슬라이더 컨테이너 선택
    const verticalSlider = document.getElementById('vertical-slider');
    const sliderContainer = document.querySelector('.slider-container');
    const projectTitles = document.querySelectorAll('.project-title');
    
    // 프로젝트 슬라이드 동적 생성 함수
    function createProjectSlides() {
        // 모든 프로젝트 데이터를 순회하며 슬라이드 생성
        const projectTitleWrapper = document.createElement('div');
        projectTitleWrapper.className = 'project-title-wrapper';
        
        projectsData.forEach((project, index) => {
            // 프로젝트 슬라이드 요소 생성
            const projectSlide = document.createElement('section');
            projectSlide.className = 'project-slide';
            if (index === 0) projectSlide.classList.add('active'); // 첫 번째 슬라이드 활성화
            
            // 가로 슬라이더 생성
            const horizontalSlider = document.createElement('div');
            horizontalSlider.className = 'horizontal-slider';
            
            // 슬라이더 래퍼 생성
            const horizontalSliderWrapper = document.createElement('div');
            horizontalSliderWrapper.className = 'horizontal-slider-wrapper';
            
            // 이미지 슬라이드 추가
            project.images.forEach((image, imgIndex) => {
                const slide = document.createElement('div');
                slide.className = 'slide';
                
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt;
                
                slide.appendChild(img);
                horizontalSliderWrapper.appendChild(slide);
            });
            
            // 네비게이션 점(dots) 생성
            const horizontalNav = document.createElement('div');
            horizontalNav.className = 'horizontal-nav';
            
            // 각 이미지에 대한 네비게이션 점 생성
            project.images.forEach((_, imgIndex) => {
                const dot = document.createElement('span');
                dot.className = 'dot';
                if (imgIndex === 0) dot.classList.add('active');
                dot.setAttribute('data-index', imgIndex);
                horizontalNav.appendChild(dot);
            });
            
            // 가로 슬라이더에 요소 추가
            horizontalSlider.appendChild(horizontalSliderWrapper);
            horizontalSlider.appendChild(horizontalNav);
            
            // 프로젝트 정보 섹션 생성
            const projectInfo = document.createElement('div');
            projectInfo.className = 'project-info';
            
            // 프로젝트 제목
            const projectTitle = document.createElement('div');
            projectTitle.className = 'project-title';
            projectTitle.textContent = project.title;
            
            // 프로젝트 제목에 클릭 이벤트 리스너 추가
            projectTitle.addEventListener('click', function() {
                // 세로 슬라이드 이동
                goToVerticalSlide(index);
                
                // 타이틀 활성화 상태 업데이트
                projectTitles.forEach(t => t.classList.remove('active'));
                projectTitle.classList.add('active');
                
            });
            
            // 프로젝트 상세 정보
            const projectDetails = document.createElement('div');
            projectDetails.className = 'project-details';
            
            // 프로젝트 상세 행 추가
            const details = [
                { label: 'Project', value: project.details.project },
                { label: 'Area', value: project.details.area },
                { label: 'Design / Construction', value: project.details.design },
                { label: 'Location', value: project.details.location }
            ];
            
            details.forEach(detail => {
                const detailRow = document.createElement('div');
                detailRow.className = 'detail-row';
                
                const detailLabel = document.createElement('span');
                detailLabel.className = 'detail-label';
                detailLabel.textContent = detail.label;
                
                const detailValue = document.createElement('span');
                detailValue.className = 'detail-value';
                detailValue.textContent = detail.value;
                
                detailRow.appendChild(detailLabel);
                detailRow.appendChild(detailValue);
                projectDetails.appendChild(detailRow);
            });

            // 프로젝트 제목
            const title = document.createElement('div');
            title.className = 'title';
            title.textContent = project.title;
            
            // 프로젝트 정보에 요소 추가
            projectTitleWrapper.appendChild(projectTitle);

            projectInfo.appendChild(title);
            projectInfo.appendChild(projectDetails);
            
            
            // 프로젝트 슬라이드에 요소 추가
            projectSlide.appendChild(horizontalSlider);
            projectSlide.appendChild(projectInfo);
            
            // 중요: 네비게이션을 프로젝트 슬라이드에 직접 추가 (가로 슬라이더 내부가 아닌)
            projectSlide.appendChild(horizontalNav);
            
            // 수직 슬라이더에 프로젝트 슬라이드 추가
            verticalSlider.appendChild(projectSlide);
        });
        sliderContainer.appendChild(projectTitleWrapper);
    }
    
    // 프로젝트 슬라이드 생성 호출
    createProjectSlides();
    
    // 여기서부터는 기존의 슬라이더 기능 코드
    const projectSlides = document.querySelectorAll('.project-slide');
    
    // 변수 초기화
    let isScrolling = false;
    const scrollCooldown = 800; // 스크롤 간 대기 시간(ms)
    let currentVerticalIndex = 0;
    
    // 가로 슬라이더 이벤트 설정
    initializeHorizontalSliders();
    
    // 가로 슬라이더 초기화 함수
    function initializeHorizontalSliders() {
        projectSlides.forEach((slide) => {
            const dots = slide.querySelectorAll('.dot');
            
            // 각 점(dot)에 클릭 이벤트 추가
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-index'));
                    goToHorizontalSlide(slide, slideIndex);
                });
            });
            
            // 터치/스와이프 이벤트 처리
            initializeTouchEvents(slide);
        });
    }
    
    // 터치 이벤트 초기화
    function initializeTouchEvents(slide) {
        let startX, moveX;
        const horizontalSlider = slide.querySelector('.horizontal-slider');
        
        horizontalSlider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        horizontalSlider.addEventListener('touchmove', function(e) {
            moveX = e.touches[0].clientX;
        });
        
        horizontalSlider.addEventListener('touchend', function() {
            if (startX - moveX > 50) { // 오른쪽으로 스와이프
                const dots = slide.querySelectorAll('.dot');
                const activeIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
                if (activeIndex < dots.length - 1) {
                    goToHorizontalSlide(slide, activeIndex + 1);
                }
            } else if (moveX - startX > 50) { // 왼쪽으로 스와이프
                const dots = slide.querySelectorAll('.dot');
                const activeIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
                if (activeIndex > 0) {
                    goToHorizontalSlide(slide, activeIndex - 1);
                }
            }
        });
    }
    
    // 가로 슬라이드 이동 함수
    function goToHorizontalSlide(slideElement, index) {
        const horizontalWrapper = slideElement.querySelector('.horizontal-slider-wrapper');
        const dots = slideElement.querySelectorAll('.dot');
        const slides = slideElement.querySelectorAll('.slide');
        
        // 유효한 인덱스 범위 확인
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;
        
        // 슬라이드 이동
        horizontalWrapper.style.transform = `translateX(-${index * 100}%)`;
        
        // 활성 점 업데이트
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // 세로 슬라이드 이동 함수 - 개선된 버전
    function goToVerticalSlide(index) {
        const slides = verticalSlider.querySelectorAll('.project-slide');
        if (!slides || slides.length === 0) return;
        
        // 인덱스 범위 제한
        if (index < 0) index = 0;
        if (index >= slides.length) index = slides.length - 1;
        
        // 이미 현재 슬라이드면 무시
        if (index === currentVerticalIndex && slides[index].classList.contains('active')) {
            return;
        }
        
        // 현재 인덱스 업데이트
        currentVerticalIndex = index;
        
        // 모든 슬라이드 비활성화
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 선택한 슬라이드 활성화
        slides[index].classList.add('active');
        
        // 프로젝트 타이틀 업데이트
        updateActiveTitle(index);
        
        console.log(`슬라이드 ${index}로 이동`);
    }
    
    // 타이틀 활성화 함수
    function updateActiveTitle(index) {
        if (!projectTitles || projectTitles.length === 0) return;
        
        projectTitles.forEach((title, i) => {
            if (i === index) {
                title.classList.add('active');
            } else {
                title.classList.remove('active');
            }
        });
    }
    
    // 휠 이벤트 처리 함수
    function handleWheel(event) {
        event.preventDefault(); // 기본 스크롤 방지
        
        // 스크롤 중복 방지
        if (isScrolling) return;
        
        isScrolling = true;
        
        // 스크롤 방향 감지
        if (event.deltaY > 0) {
            // 아래로 스크롤 - 다음 슬라이드
            goToVerticalSlide(currentVerticalIndex + 1);
        } else {
            // 위로 스크롤 - 이전 슬라이드
            goToVerticalSlide(currentVerticalIndex - 1);
        }
        
        // 스크롤 쿨다운
        setTimeout(() => {
            isScrolling = false;
        }, scrollCooldown);
    }
    
    // 이벤트 리스너 추가
    sliderContainer.addEventListener('wheel', handleWheel, { passive: false });
    
    // 프로젝트 타이틀 클릭 이벤트
    if (projectTitles && projectTitles.length > 0) {
        projectTitles.forEach((title, index) => {
            title.addEventListener('click', function() {
                goToVerticalSlide(index);
            });
        });
    }
    
    // 터치 이벤트 지원 (모바일용)
    let touchStartY = 0;
    let touchEndY = 0;
    
    sliderContainer.addEventListener('touchstart', function(event) {
        touchStartY = event.changedTouches[0].screenY;
    });
    
    sliderContainer.addEventListener('touchend', function(event) {
        if (isScrolling) return;
        
        touchEndY = event.changedTouches[0].screenY;
        
        // 터치 방향 감지
        if (touchStartY - touchEndY > 50) {
            // 위로 스와이프 - 다음 슬라이드
            goToVerticalSlide(currentVerticalIndex + 1);
        } else if (touchEndY - touchStartY > 50) {
            // 아래로 스와이프 - 이전 슬라이드
            goToVerticalSlide(currentVerticalIndex - 1);
        }
        
        // 스크롤 쿨다운
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, scrollCooldown);
    });
    
    // 초기 슬라이드 설정
    goToVerticalSlide(0);
    
    // 프로젝트 타이틀 클릭 이벤트 추가
    const projectTitlesInWrapper = document.querySelectorAll('.project-title-wrapper .project-title');
    if (projectTitlesInWrapper && projectTitlesInWrapper.length > 0) {
        projectTitlesInWrapper.forEach((title, index) => {
            title.addEventListener('click', function() {
                // 세로 슬라이드 이동
                goToVerticalSlide(index);
                
                // 타이틀 활성화 상태 업데이트
                projectTitlesInWrapper.forEach(t => t.classList.remove('active'));
                title.classList.add('active');
                
                console.log(`타이틀 래퍼의 프로젝트 타이틀 ${index} 클릭`);
            });
        });
    }
}); 