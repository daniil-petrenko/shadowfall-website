//  ======================[ Header ]======================

export function componentHeader() {
  const isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    IOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|IPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.IOS() ||
        isMobile.Opera() ||
        isMobile.Windows());
    }
  };
  if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    let menuSubArrows = document.querySelectorAll('.menu__sub-arrow');

    let currentList = false;
    let currentSubList = false;

    // Обробка натиснення на основне меню
    if (menuArrows.length > 0) {
      menuArrows.forEach(elem => {
        elem.addEventListener('click', function(e) {
          const parentItem = e.target.parentElement;

          // Закриваємо попереднє відкрите підменю
          if (currentList && currentList !== parentItem) {
            currentList.classList.remove('_active');
          }

          // Відкриваємо/закриваємо поточне підменю
          parentItem.classList.toggle('_active');
          currentList = parentItem.classList.contains('_active') ? parentItem : false;
        });
      });
    }

    // Обробка натиснення на підменю
    if (menuSubArrows.length > 0) {
      menuSubArrows.forEach(elem => {
        elem.addEventListener('click', function(e) {
          const parentSubItem = e.target.parentElement;

          // Закриваємо попереднє відкрите sub-sub-menu
          if (currentSubList && currentSubList !== parentSubItem) {
            currentSubList.classList.remove('_active');
          }

          // Відкриваємо/закриваємо поточне sub-sub-menu
          parentSubItem.classList.toggle('_active');
          currentSubList = parentSubItem.classList.contains('_active') ? parentSubItem : false;
        });
      });
    }
    // Додайте обробник події на документ для закриття меню
    document.addEventListener('click', function (e) {
      const menuBody = document.querySelector('.menu__body');
      const menuArrows = document.querySelectorAll('.menu__arrow, .menu__sub-arrow');

      // Перевірте, чи клік був поза меню та стрілками
      if (!menuBody.contains(e.target) && !Array.from(menuArrows).some(arrow => arrow.contains(e.target))) {
        // Сховати всі активні підменю
        menuArrows.forEach(arrow => {
          arrow.parentElement.classList.remove('_active');
        });
        currentList = false; // Скинути поточний список
      }
    });
  } else {
    document.body.classList.add('_pc');
  }
  // ============ Burger menu ============
  const iconMenu = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');
  if (iconMenu) {
    iconMenu.addEventListener('click', function(e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    });
  }
}


// ============ Scroll by click ============

// Enter goal class in attribute data-goto, example: data-goto='.section_1'
export function componentHeaderScroll() {
  const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
  if (menuLinks.length > 0) {
  	menuLinks.forEach(menuLink => {
  		menuLink.addEventListener('click', onMenuLinkClick);
  	});

  	function onMenuLinkClick(e) {
  		const menuLink = e.target;
  		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
  			const gotoBlock = document.querySelector(menuLink.dataset.goto);
  			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

  			if (iconMenu.classList.contains('_active')) {
  				document.body.classList.remove('_lock');
  				iconMenu.classList.remove('_active');
  				menuBody.classList.remove('_active')
  			}

  			window.scrollTo({
  				top: gotoBlockValue,
  				behavior: 'smooth'
  			});
  			e.preventDefault();
  		}
  	}
  }
}