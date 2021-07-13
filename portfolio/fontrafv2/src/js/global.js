let listener = {
  onMobileChange: [],
  onLaptopChange: [],
  onDesktopChange: [],
};

let transitionTime = $(":root").css("--transition-time");

/** Main */
$(document).ready(() => {
  //  Verificação se o DOM está loaded
  let stateCheck = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(stateCheck);

      loadHeader();
      loadAnimations();
      loadCarousel();
      loadHeros();
      loadProducts();

      //  Mostra o body enquanto o DOM não está fully loaded
      $("body").css({
        opacity: 1,
      });
    }
  }, 100);

  /**  ON BREAKPOINT CHANGE */
  $(window).bind("breakpoint-change", (breakpoint) => {
    if ($(window).width() <= 768) {
      changeToMobile();
      return;
    }
    if ($(window).width() <= 1080) {
      changeToLaptop();
      return;
    }
    changeToDesktop();
  });
});

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
/** LOADING FUNCTIONS */
function loadProducts() {
  $(".product .content").hide();

  $(".product").each(function (key, element) {
    const content = $(element).children(".content");

    $(element).hover(
      () => {
        if (!$(content).queue()) return;

        if ($(content).queue().length > 1) return;

        $(content).animate({
          height: "show",
        });
      },
      () => {
        $(content).animate({
          height: "hide",
        });
      }
    );
  });
}

function loadHeader() {
  $(".mobile-menu").hide();
  $(".mobile-menu-trigger").removeClass("open");

  $(".mobile-menu-trigger").click((e) => {
    const button = $(e.target).parents(".mobile-menu-trigger");

    $(button).toggleClass("open");
    $(".mobile-menu").toggle();

    const isOpen = $(button).hasClass("open");
    isOpen ? disableScroll() : enableScroll();
  });

  $(".mobile-menu .menu-item").click((e) => {
    const button = $(e.target)
      .parents(".navbar")
      .find(".mobile-menu-trigger");

    console.log(button);

    $(button).toggleClass("open");
    $(".mobile-menu").toggle();

    const isOpen = $(button).hasClass("open");
    isOpen ? disableScroll() : enableScroll();

    console.log("ey");
  });
}

function loadHeros() {
  $(".hero-carousel").slick({
    infinite: true,
    dots: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    speed: 1000,
    cssEase: "linear",
    arrows: false,
  });
}

function loadCarousel() {
  const element = $(".carousel");

  $(element).slick({
    infinite: true,
    dots: $(element).attr("data-dots") || true,
    fade: $(element).attr("data-fade") || false,
    arrows: $(element).attr("data-arrows") || true,
    slidesToShow: 4,
    prevArrow: `<button type="button" class="carousel-prev"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.9427 23.0574L11.2187 17.3334H24V14.6667H11.2187L16.9427 8.94271L15.0573 7.05737L6.11465 16L15.0573 24.9427L16.9427 23.0574Z" fill="#F2890D"/>
    </svg>
    </button>`,
    nextArrow: `<button type="button" class="carousel-next"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0573 23.0574L16.9427 24.9427L25.8853 16L16.9427 7.05737L15.0573 8.94271L20.7813 14.6667H8V17.3334H20.7813L15.0573 23.0574Z" fill="#F2890D"/>
    </svg></button>`,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
}

$.fn.PVAnimate = function () {
  let animation = $(this).attr("data-animation");
  let delay = $(this).attr("data-delay");

  if (!animation) return;

  setTimeout(() => {
    $(this).removeClass("animated").addClass(animation);
  }, parseInt(delay));
};

function loadAnimations() {
  function checkAnimation() {
    const elements = $(".animated");

    if (!elements.length) return;

    $(elements).each(function (key, element) {
      let topOfElement = $(element).offset().top;
      let bottomOfElement = $(element).offset().top + $(element).outerHeight();
      let bottomOfScreen = $(window).scrollTop() + $(window).innerHeight();
      let topOfScreen = $(window).scrollTop();

      if (bottomOfScreen > topOfElement && topOfScreen < bottomOfElement) {
        $(element).PVAnimate();
      }
    });
  }

  checkAnimation();
  $(window).scroll(checkAnimation);
}

/** EVENT FUNCTIONS */
function changeToMobile() {
  listener.onMobileChange.forEach((f) => {
    if (typeof f === "function") {
      f();
    }
  });
}

function changeToLaptop() {
  listener.onLaptopChange.forEach((f) => {
    if (typeof f === "function") {
      f();
    }
  });
}

function changeToDesktop() {
  listener.onDesktopChange.forEach((f) => {
    if (typeof f === "function") {
      f();
    }
  });
}

/** LISTENER FUNCTIONS */
function onMobileChange(...fn) {
  fn.forEach((f) => listener.onMobileChange.push(f));
}
function onDesktopChange(...fn) {
  fn.forEach((f) => listener.onDesktopChange.push(f));
}
function onLaptopChange(...fn) {
  fn.forEach((f) => listener.onLaptopChange.push(f));
}

/** FUNCTIONALITY FUNCTIONS */
function disableScroll() {
  scrollable = false;
  $("body").addClass("disable-scroll");
}

function enableScroll() {
  scrollable = true;
  $("body").removeClass("disable-scroll");
}
