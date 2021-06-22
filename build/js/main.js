const btnContSelector = '.side-menu__buttons-container'
const btnContainer = document.querySelector(`${btnContSelector}`);
const checkbox = document.querySelector(".switch__check-b");
const caption = document.querySelector(".switch__text");
const popup = document.querySelector('.page__popup');
const popupOverlay = document.querySelector('.popup__overlay');
const infoLikeBtn = document.querySelector('[data-like="like"]')

// remove welcome popup without logic
const closeWelcomePopup = () => {
  popup.style.display = 'none'
}

// close/open for modals
const toggleModal = (e) => {
  let isOpen = false;
  const openedM = document.querySelector(".m-visible");
  const target = e.target;
  const modalTrigger = document.querySelectorAll('[data-target]')

  const openModal = (open) => {
    open.classList.toggle("m-visible");
  };
  
  const closeModal = (close) => {
    close.classList.remove("m-visible");
  };

  if (target.dataset.target) {

    if (target.dataset.target !== "close" && !isOpen) {
      const dataTarget = target.getAttribute("data-target");
      const targetEl = document.querySelector(`[data-modal="${dataTarget}"]`);

      openModal(targetEl);
      isOpen = true;

      // switcher for opened state modal section
      switch (target.dataset.target) {
        case "appartment-view":
          document.querySelectorAll('.modal > [data-modal]:not([data-modal="appartment-view"])').forEach(body => body.classList.remove('m-visible'))
          document.querySelectorAll(`${btnContSelector} > [data-target]:not([data-target="appartment-view"])`).forEach(btn => btn.classList.remove('active'))
        break;
        case "favorite":
          document.querySelectorAll('.modal > [data-modal]:not([data-modal="favorite"])').forEach(body => body.classList.remove('m-visible'))
          document.querySelectorAll(`${btnContSelector} > [data-target]:not([data-target="favorite"])`).forEach(btn => btn.classList.remove('active'))
        break;
        case "filter":
          document.querySelectorAll('.modal > [data-modal]:not([data-modal="filter"])').forEach(body => body.classList.remove('m-visible'))
          document.querySelectorAll(`${btnContSelector} > [data-target]:not([data-target="filter"])`).forEach(btn => btn.classList.remove('active'))
        break;
        default: break;
      }
    }
  }

  // for close modal btn
  if (target.dataset.close == "close") {
    closeModal(openedM);
    isOpen = false;

    modalTrigger.forEach(item => item.classList.remove('active'))
  }
};

// toggler for active state of right side btns
const toggleMenuBtnState = (e) => {
  e.preventDefault();
  let target = e.target;

  if (target.classList.contains("menu-button__item") && !target.dataset.reset) {
    target.classList.toggle("active");
  }
};

const viewChangerCont = document.querySelector('.side-menu__view-changer')
const viewChangerElem = document.querySelectorAll('.side-menu__view-changer > .menu-button__item')

const viewChanger = (e) => {
  let target = e.target;

  if (target.classList.contains('menu-button__item') && !target.classList.contains('active')) {
    viewChangerElem.forEach(item => item.classList.remove('active'))
  }
}

// class toggler for header switch btn
const headerSwitcherToggleTextColor = () => {
  caption.classList.toggle("checked");
};

// accordion initialization
const initAcc = (elem, option) => {
  document.addEventListener("click", function (e) {
    if (!e.target.matches(elem + " .a-btn")) return;
    else {
      if (!e.target.parentElement.classList.contains("active")) {
        if (option == true) {
          var elementList = document.querySelectorAll(elem + " .a-container");
          Array.prototype.forEach.call(elementList, function (e) {
            e.classList.remove("active");
          });
        }
        e.target.parentElement.classList.add("active");
      } else {
        e.target.parentElement.classList.remove("active");
      }
    }
  });
};

const toggleInfoLike = () => {
  infoLikeBtn.classList.toggle("active")
}

const setListeners = () => {
  popupOverlay.addEventListener('click', closeWelcomePopup)
  checkbox.addEventListener("click", headerSwitcherToggleTextColor);
  btnContainer.addEventListener("click", toggleMenuBtnState);
  viewChangerCont.addEventListener('click', viewChanger);
  infoLikeBtn.addEventListener('click', toggleInfoLike);
  document.addEventListener("click", toggleModal);
  initAcc(".modal-body__accordion.v1", true);
};

setListeners();

// range sliders setups
const priceSlider = document.querySelector('[data-id="slider-price"]');
const areaSlider = document.querySelector('[data-id="slider-area"]');
const roomNumberSlider = document.querySelector(
  '[data-id="slider-room-number"]'
);

noUiSlider.create(priceSlider, {
  start: [2.5, 3.4],
  // step: 0.1,
  direction: "rtl",
  connect: true,
  tooltips: [true, true],
  range: {
    min: [2.3],
    max: [3.7],
  },
  format: wNumb({ decimals: 1 }),
});

noUiSlider.create(areaSlider, {
  start: [140, 320],
  // step: 1,
  direction: "rtl",
  connect: true,
  tooltips: [true, true],
  range: {
    min: [140],
    max: [320],
  },
  format: wNumb({ decimals: 0 }),
});

noUiSlider.create(roomNumberSlider, {
  start: [2, 3],
  // step: 1,
  animate: true,
  direction: "rtl",
  connect: true,
  tooltips: [true, true],
  range: {
    min: [1],
    max: [5],
  },
  format: wNumb({ decimals: 0 }),
});
