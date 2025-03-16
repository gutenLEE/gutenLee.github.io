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
}); 