document.addEventListener('DOMContentLoaded', function() {
    // 슬라이더 컨테이너 선택
    const verticalSlider = document.getElementById('vertical-slider');
    
    // 프로젝트 슬라이드 동적 생성 함수
    function createProjectSlides() {
        // 모든 프로젝트 데이터를 순회하며 슬라이드 생성
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
            
            // 프로젝트 정보 섹션 생성
            const projectInfo = document.createElement('div');
            projectInfo.className = 'project-info';
            
            // 프로젝트 제목
            const projectTitle = document.createElement('div');
            projectTitle.className = 'project-title';
            projectTitle.textContent = project.title;
            
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
            
            // 프로젝트 정보에 요소 추가
            projectInfo.appendChild(projectTitle);
            projectInfo.appendChild(projectDetails);
            
            // 프로젝트 슬라이드에 요소 추가
            projectSlide.appendChild(horizontalSlider);
            projectSlide.appendChild(projectInfo);
            
            // 중요: 네비게이션을 프로젝트 슬라이드에 직접 추가 (가로 슬라이더 내부가 아닌)
            projectSlide.appendChild(horizontalNav);
            
            // 수직 슬라이더에 프로젝트 슬라이드 추가
            verticalSlider.appendChild(projectSlide);
        });
    }
    
    // 프로젝트 슬라이드 생성 호출
    createProjectSlides();
    
    // 여기서부터는 기존의 슬라이더 기능 코드
    const projectSlides = document.querySelectorAll('.project-slide');
    const upArrow = document.querySelector('.nav-arrow.up');
    const downArrow = document.querySelector('.nav-arrow.down');
    
    // 세로 슬라이더 상태
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
    
    // 세로 슬라이드 이동 함수
    function goToVerticalSlide(index) {
        // 유효한 인덱스 범위 확인
        if (index < 0) index = 0;
        if (index >= projectSlides.length) index = projectSlides.length - 1;
        
        currentVerticalIndex = index;
        
        // 활성 슬라이드 전환
        projectSlides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    // 화살표 클릭 이벤트
    upArrow.addEventListener('click', function() {
        goToVerticalSlide(currentVerticalIndex - 1);
    });
    
    downArrow.addEventListener('click', function() {
        goToVerticalSlide(currentVerticalIndex + 1);
    });
    
    // 키보드 이벤트 처리 (화살표 키)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp') {
            goToVerticalSlide(currentVerticalIndex - 1);
        } else if (e.key === 'ArrowDown') {
            goToVerticalSlide(currentVerticalIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            const activeSlide = document.querySelector('.project-slide.active');
            const dots = activeSlide.querySelectorAll('.dot');
            const activeIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
            if (activeIndex > 0) {
                goToHorizontalSlide(activeSlide, activeIndex - 1);
            }
        } else if (e.key === 'ArrowRight') {
            const activeSlide = document.querySelector('.project-slide.active');
            const dots = activeSlide.querySelectorAll('.dot');
            const activeIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
            if (activeIndex < dots.length - 1) {
                goToHorizontalSlide(activeSlide, activeIndex + 1);
            }
        }
    });
    
    // 휠 이벤트 처리 (세로 슬라이딩)
    let wheelTimeout;
    document.addEventListener('wheel', function(e) {
        clearTimeout(wheelTimeout);
        
        wheelTimeout = setTimeout(function() {
            if (e.deltaY > 0) {
                goToVerticalSlide(currentVerticalIndex + 1);
            } else {
                goToVerticalSlide(currentVerticalIndex - 1);
            }
        }, 50);
    });
    
    // 첫 번째 슬라이드 활성화
    goToVerticalSlide(0);
}); 