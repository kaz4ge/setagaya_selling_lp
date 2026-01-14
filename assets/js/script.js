// assets/js/script.js
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  let worksSwiper = null;
  let modalSwiper = null;

  // Swiper初期化（過去の担当物件）
  if (typeof Swiper !== 'undefined') {
    worksSwiper = new Swiper('.works-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.works-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.works-swiper .swiper-button-next',
        prevEl: '.works-swiper .swiper-button-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 'auto',
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 'auto',
          spaceBetween: 40,
        },
      },
    });

    // モーダル内のSwiper初期化
    modalSwiper = new Swiper('.work-modal-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      pagination: {
        el: '.work-modal-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.work-modal-swiper .swiper-button-next',
        prevEl: '.work-modal-swiper .swiper-button-prev',
      },
    });
  }

  // モーダルの開閉機能
  const modal = document.getElementById('workModal');
  const modalOverlay = document.querySelector('.work-modal-overlay');
  const modalClose = document.querySelector('.work-modal-close');
  const workCards = document.querySelectorAll('.work-card');

  // カードクリックでモーダルを開く
  workCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      openModal(index);
    });
  });

  // モーダルを開く
  function openModal(index) {
    if (modalSwiper) {
      modalSwiper.slideToLoop(index, 0);
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 背景のスクロールを無効化
  }

  // モーダルを閉じる
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // 背景のスクロールを有効化
  }

  // 閉じるボタン
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // オーバーレイクリックで閉じる
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 電話モーダルの処理
  const phoneModal = document.getElementById('phoneModal');
  const phoneModalOverlay = document.querySelector('.phone-modal-overlay');
  const phoneModalCancel = document.querySelector('.phone-modal-cancel');
  const phoneLinks = document.querySelectorAll('[data-phone-action]');

  // 電話リンククリックでモーダルを開く
  phoneLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openPhoneModal();
    });
  });

  // 電話モーダルを開く
  function openPhoneModal() {
    phoneModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // 電話モーダルを閉じる
  function closePhoneModal() {
    phoneModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // キャンセルボタン
  if (phoneModalCancel) {
    phoneModalCancel.addEventListener('click', closePhoneModal);
  }

  // オーバーレイクリックで閉じる
  if (phoneModalOverlay) {
    phoneModalOverlay.addEventListener('click', closePhoneModal);
  }

  // ESCキーで電話モーダルを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && phoneModal.classList.contains('active')) {
      closePhoneModal();
    }
  });

  // ハンバーガーメニューの処理
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.site-nav a');

  // ハンバーガーメニューの開閉
  if (mobileMenuToggle && siteNav) {
    mobileMenuToggle.addEventListener('click', () => {
      const isActive = siteNav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      mobileMenuToggle.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // メニュー内のリンクをクリックしたらメニューを閉じる
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // オーバーレイクリックでメニューを閉じる（背景クリック）
    document.addEventListener('click', (e) => {
      if (siteNav.classList.contains('active') && 
          !siteNav.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        siteNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('active')) {
        siteNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
});
