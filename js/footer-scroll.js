document.addEventListener('DOMContentLoaded', function() {
    console.log('Footer script loaded');
    
    // 푸터와 카드 컨테이너 요소 가져오기
    const footer = document.querySelector('.footer');
    const cardContainer = document.getElementById('project-cards');
    
    if (footer && cardContainer) {
        console.log('Footer and card container found');
        
        // 모바일 화면인지 확인
        const isMobile = window.innerWidth <= 768;
        console.log('Is mobile:', isMobile);
        
        if (isMobile) {
            // 기존 클래스 제거 및 초기화
            footer.classList.remove('show-full');
            
            // 푸터 높이 계산
            const footerHeight = footer.offsetHeight;
            console.log('Footer height:', footerHeight);
            
            // 푸터 초기 위치 설정 - 강제로 절반만 보이게
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.left = '0';
            footer.style.width = '100%';
            footer.style.zIndex = '90';
            footer.style.transform = `translateY(${Math.floor(footerHeight / 2)}px)`;
            
            console.log('Initial footer transform:', footer.style.transform);
            
            // 스크롤 이벤트 리스너
            function handleScroll() {
                // 스크롤 위치 계산
                const scrollPosition = cardContainer.scrollTop;
                const scrollHeight = cardContainer.scrollHeight;
                const clientHeight = cardContainer.clientHeight;
                const isAtBottom = scrollPosition + clientHeight >= scrollHeight - 30;
                
                console.log('Scroll check - At bottom:', isAtBottom);
                
                // 스크롤 위치에 따라 푸터 위치 조정
                if (isAtBottom) {
                    // 스크롤이 끝에 도달하면 푸터 완전히 노출
                    footer.style.transform = 'translateY(0)';
                    footer.classList.add('show-full');
                    console.log('Footer should be fully visible');
                } else {
                    // 그렇지 않으면 절반만 노출
                    footer.style.transform = `translateY(${Math.floor(footerHeight / 2)}px)`;
                    footer.classList.remove('show-full');
                    console.log('Footer should be half visible');
                }
            }
            
            // 스크롤 이벤트 등록
            cardContainer.addEventListener('scroll', handleScroll);
            
            // 터치 이벤트 등록 (모바일에서 더 정확한 감지)
            cardContainer.addEventListener('touchend', function() {
                setTimeout(handleScroll, 100);
            });
            
            // 초기 스크롤 상태 확인
            setTimeout(handleScroll, 300);
            
            // 화면 크기 변경 이벤트
            window.addEventListener('resize', function() {
                const isMobileNow = window.innerWidth <= 768;
                
                if (isMobileNow) {
                    // 모바일 화면으로 변경된 경우 푸터 위치 재설정
                    handleScroll();
                } else {
                    // 데스크톱 화면으로 변경된 경우 푸터 원래 상태로
                    footer.style.position = '';
                    footer.style.transform = '';
                    footer.classList.remove('show-full');
                }
            });
            
            // 디버깅용 전역 함수
            window.fixFooter = function() {
                footer.style.transform = `translateY(${Math.floor(footerHeight / 2)}px)`;
                console.log('Footer position fixed manually');
            };
            
            // 1초 후 다시 한번 확인 (페이지 완전 로드 후)
            setTimeout(window.fixFooter, 1000);
        }
    } else {
        console.log('Footer or card container not found');
    }
});

// 스크롤 감지 개선을 위한 추가 코드
if (cardContainer) {
    // 터치 이벤트 리스너 추가 (모바일에서 더 정확한 감지)
    cardContainer.addEventListener('touchmove', function() {
        if (window.innerWidth <= 768) {
            // 터치 이동 중에는 타이머 취소
            clearTimeout(window.scrollEndTimer);
            
            // 터치 이동이 끝나면 스크롤 위치 확인
            window.scrollEndTimer = setTimeout(function() {
                checkScrollPosition();
            }, 100);
        }
    });
    
    // 터치 종료 시 스크롤 위치 확인
    cardContainer.addEventListener('touchend', function() {
        if (window.innerWidth <= 768) {
            setTimeout(function() {
                checkScrollPosition();
            }, 100);
        }
    });
    
    // 수동으로 스크롤 이벤트 발생시키는 함수 (디버깅용)
    window.triggerScroll = function() {
        console.log('Manually triggering scroll event');
        cardContainer.dispatchEvent(new Event('scroll'));
    };
    
    // 수동으로 푸터 표시/숨김 전환 함수 (디버깅용)
    window.toggleFooter = function() {
        if (footer.classList.contains('show-full')) {
            footer.classList.remove('show-full');
            footer.style.transform = `translateY(${Math.floor(footer.offsetHeight / 2)}px)`;
            console.log('Footer hidden');
        } else {
            footer.classList.add('show-full');
            footer.style.transform = 'translateY(0)';
            console.log('Footer shown');
        }
    };
}

// 디버깅을 위한 전역 함수
window.debugFooter = function() {
    const footer = document.querySelector('.footer');
    const cardContainer = document.getElementById('project-cards');
    
    console.log('Footer:', footer);
    console.log('Footer classes:', footer.className);
    console.log('Footer has show-full class:', footer.classList.contains('show-full'));
    console.log('Footer position:', getComputedStyle(footer).position);
    console.log('Footer transform:', getComputedStyle(footer).transform);
    
    if (cardContainer) {
        console.log('Card container:', cardContainer);
        console.log('Scroll position:', cardContainer.scrollTop);
        console.log('Scroll height:', cardContainer.scrollHeight);
        console.log('Client height:', cardContainer.clientHeight);
        console.log('Is at bottom:', cardContainer.scrollTop + cardContainer.clientHeight >= cardContainer.scrollHeight - 30);
    }
};

// 콘솔에서 실행할 수 있는 명령어 안내
console.log('Debug footer by running: window.debugFooter()'); 