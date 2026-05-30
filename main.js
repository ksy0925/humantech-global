import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase 구성 정보
const firebaseConfig = {
    apiKey: "AIzaSyBoX__cPDohu74CvVYs-yELQJ8SqHacQZg",
    authDomain: "humantech-global.firebaseapp.com",
    projectId: "humantech-global",
    storageBucket: "humantech-global.firebasestorage.app",
    messagingSenderId: "723576609298",
    appId: "1:723576609298:web:1b34f9e0f25201f11616cb",
    measurementId: "G-EPVYXDEVVR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    
    // ------------------ 1. 상단 메뉴 탭 전환 및 뒤로가기 제어 ------------------
    const menuItems = document.querySelectorAll('.nav-menu-item');
    const pages = document.querySelectorAll('.page-content');
    const logo = document.getElementById('nav-logo');

    function switchPage(targetPageId, pushHistory = true) {
        // 모든 페이지 숨기기
        pages.forEach(page => page.style.display = 'none');

        // 선택한 페이지만 깨끗이 보여주기
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
            targetPage.style.display = 'block';
        }

        // 활성화된 네비게이션 탭 스타일링 업데이트
        menuItems.forEach(item => {
            if (item.getAttribute('data-target') === targetPageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // 전환 시 화면 맨 위로 스크롤 이동
        window.scrollTo(0, 0);

        // 브라우저 뒤로가기용 주소창 기록 추가
        if (pushHistory) {
            history.pushState({ pageId: targetPageId }, '', '');
        }
    }

    // 네비게이션 메뉴 클릭 이벤트
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = item.getAttribute('data-target');
            switchPage(targetPageId);
        });
    });

    // 로고 클릭 시 홈 화면으로 이동
    if (logo) {
        logo.addEventListener('click', () => {
            switchPage('page-home');
        });
    }

    // 구글 및 브라우저 뒤로가기/앞으로가기 완벽 제어
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.pageId) {
            switchPage(e.state.pageId, false);
        } else {
            switchPage('page-home', false);
        }
    });

    // 초기 히스토리 상태 셋팅
    history.replaceState({ pageId: 'page-home' }, '', '');
    switchPage('page-home', false);


    // ------------------ 2. 임시 카테고리 탭(1~7) 선택 효과 ------------------
    const categoryTabs = document.querySelectorAll('.channel-tabs .tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // 여기에서 카테고리별 필터링 연동을 추가할 수 있습니다.
        });
    });


    // ------------------ 3. 로그인 및 회원가입 모달 제어 ------------------
    const loginBtn = document.querySelector('.nav-link');
    const signupBtn = document.querySelector('.signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    const goToSignup = document.getElementById('go-to-signup');
    const goToLogin = document.getElementById('go-to-login');

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.style.display = 'flex';
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === signupModal) signupModal.style.display = 'none';
    });

    if (goToSignup) {
        goToSignup.addEventListener('click', () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'flex';
        });
    }

    if (goToLogin) {
        goToLogin.addEventListener('click', () => {
            signupModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }


    // ------------------ 4. Firebase Authentication 기능 구현 ------------------
    
    // [회원가입 처리]
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert('회원가입이 완료되었습니다!');
                    signupModal.style.display = 'none';
                    signupForm.reset();
                })
                .catch((error) => {
                    alert('회원가입 실패: ' + error.message);
                });
        });
    }

    // [로그인 처리]
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert('로그인에 성공했습니다!');
                    loginModal.style.display = 'none';
                    loginForm.reset();
                })
                .catch((error) => {
                    alert('로그인 실패: ' + error.message);
                });
        });
    }
});
