document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 기능
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // 토글 버튼 활성화/비활성화
            this.classList.toggle('active');
            
            // 메뉴 표시/숨김
            mainNav.classList.toggle('active');
            
            // 스크롤 방지 (메뉴 열린 상태에서)
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 푸터 스크롤 동작 제어
    const footer = document.querySelector('.footer');
    if (!footer) return; // 푸터가 없으면 실행하지 않음
    
    let footerHeight = footer.offsetHeight;
    let footerTop = footer.offsetTop;
    let footerVisibilityPoint = footerTop - window.innerHeight + 100; // 푸터 상단 100px 지점
    
    // 초기 설정
    updateFooterPosition();
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', updateFooterPosition);
    window.addEventListener('resize', function() {
        // 창 크기 변경 시 값 재계산
        footerHeight = footer.offsetHeight;
        footerTop = footer.offsetTop;
        footerVisibilityPoint = footerTop - window.innerHeight + 100;
        updateFooterPosition();
    });
    
    // 푸터 위치 업데이트 함수
    function updateFooterPosition() {
        const scrollPosition = window.scrollY || window.pageYOffset;
        
        // 문서 전체 높이
        const docHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        
        // 스크롤이 푸터 상단 100px 지점에 도달했는지 확인
        if (scrollPosition >= footerVisibilityPoint) {
            // 스크롤이 문서 끝에 가까워지면 푸터를 완전히 표시
            if (scrollPosition + window.innerHeight >= docHeight - footerHeight) {
                footer.classList.add('show-full');
            } else {
                footer.classList.remove('show-full');
            }
        }
    }

    const homeLogo = document.querySelector('.home-logo');
    console.log('efef');
    
    // 초기 위치 설정
    adjustLogoPosition();
    
    // 창 크기 변경 시 위치 재조정
    window.addEventListener('resize', adjustLogoPosition);
    
    function adjustLogoPosition() {
        if (!homeLogo) return;
        
        // 로고의 현재 높이 가져오기
        const logoHeight = homeLogo.offsetHeight;
        
        // 로고가 정확히 경계선에 걸치도록 위치 조정
        homeLogo.style.transform = `translate(-50%, -${logoHeight / 2}px)`;
        
        console.log('로고 위치 조정:', {
            logoHeight: logoHeight,
            transform: homeLogo.style.transform
        });
    }
}); 