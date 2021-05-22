$(document).ready(() => {
  //  Verificação se o DOM está loaded
  let stateCheck = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(stateCheck);

      loadElements();
      loadCostum();

      //  Mostra o body enquanto o DOM não está fully loaded
      $("body").css({
        opacity: 1,
      });
    }
  }, 100);
});

function loadElements() {
  loadDropdowns();
  loadAnimations();
  loadCarousel();
  loadFooterWidget();
  loadAccordion();
}

function loadCostum() {
  loadNavbar();
  loadHeros();

  loadServicos();
}

function loadDropdowns() {
  $(".dropdown-content").animate(
    {
      height: "hide",
    },
    $(":root").css("--transition-time")
  );

  $(".dropdown-label").click((e) => {
    const parent = $(e.target).parents(".dropdown");

    $(parent).children(".dropdown-content").animate(
      {
        height: "toggle",
      },
      $(":root").css("--transition-time")
    );

    $(parent).toggleClass("open");
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

function loadCarousel() {
  const element = $(".carousel");

  $(element).slick({
    infinite: true,
    centerMode: true,
    dots: $(element).attr("data-dots") || true,
    fade: $(element).attr("data-fade") || false,
    arrows: $(element).attr("data-arrows") || true,
    slidesToShow: $(element).attr("data-items") || 1,
    slidesToScroll: $(element).attr("data-items-per-scroll") || 4,
    prevArrow: `<button type="button" class="carousel-prev"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.9427 23.0574L11.2187 17.3334H24V14.6667H11.2187L16.9427 8.94271L15.0573 7.05737L6.11465 16L15.0573 24.9427L16.9427 23.0574Z" fill="#00BAE3"/>
    </svg>
    </button>`,
    nextArrow: `<button type="button" class="carousel-next"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0573 23.0574L16.9427 24.9427L25.8853 16L16.9427 7.05737L15.0573 8.94271L20.7813 14.6667H8V17.3334H20.7813L15.0573 23.0574Z" fill="#00BAE3"/>
    </svg></button>`,
  });
}

function loadFooterWidget() {
  if ($(window).width() <= 768) {
    $(".footer-widget-content").animate(
      {
        height: "toggle",
      },
      $(":root").css("--transition-time")
    );
  }

  $(".footer-widget-label").click((e) => {
    if ($(window).width() <= 768) {
      const parent = $(e.target).parents(".footer-widget");
      $(parent).toggleClass("open");

      $(parent).children(".footer-widget-content").animate(
        {
          height: "toggle",
        },
        $(":root").css("--transition-time")
      );
    }
  });
}

function loadAccordion() {
  $(".accordion")
    .children(".accordion-item")
    .children(".accordion-item-content")
    .animate(
      {
        height: "hide",
      },
      0
    );


    $(".accordion-item-label").click(e => {
      const target = $(e.target).parents(".accordion-item")
      $(target).toggleClass("open")
      $(target).children(".accordion-item-content").animate({
        height: "toggle"
      })


      $(target).parents(".accordion").children(".accordion-item").not(target).removeClass("open").children(".accordion-item-content").animate({
        height: "hide"
      })
    })
}

/**  COSTUM  */
function loadNavbar() {
  $("#overlay").hide();
  $(".hoverable-container").hide();
  $(".navbar-mobile-navigation").hide();

  function showHoverable(parent) {
    $(parent).children(".hoverable-label").addClass("color-secondary");
    $(parent).children(".hoverable-container").show();

    setTimeout(() => {
      $(parent).addClass("hovering");
    }, 50);
  }

  function hideHoverable(parent) {
    $(parent).removeClass("hovering");
    $(parent).children(".hoverable-label").removeClass("color-secondary");
    $(parent).children(".hoverable-container").hide();
  }

  $(".hoverable-label").mouseenter((e) => {
    const parent = $(e.target).parents(".hoverable-link");

    showHoverable(parent);
  });

  $(".hoverable-link").mouseleave((e) => {
    let parent = $(e.target).parents(".hoverable-link");
    if (!parent.length) parent = $(e.target);

    hideHoverable(parent);
  });

  /** MOBILE */
  $(".hoverable-label").click((e) => {
    const parent = $(e.target).parents(".hoverable-link");

    if ($(parent).hasClass("hovering")) {
      hideHoverable(parent);
      $("#overlay").hide();
    } else {
      showHoverable(parent);
      $("#overlay").show();
    }
  });

  $(".hoverable-label").mouseenter((e) => {
    const parent = $(e.target).parents(".hoverable-link");

    if ($(parent).hasClass("navbar-mobile")) {
      $("#overlay").show();
    }
  });

  $(".hoverable-link").mouseleave((e) => {
    let parent = $(e.target).parents(".hoverable-link");
    if (!parent.length) parent = $(e.target);

    if ($(parent).hasClass("navbar-mobile")) {
      $("#overlay").hide();
    }
  });
}

function loadHeros() {
  $(".hero-carousel").slick({
    infinite: true,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    // speed: 1000,
    cssEase: "linear",
    arrows: false,
  });
}

function loadServicos() {
  /** CAROUSEL */
  const element = $(".servicos-carousel.carousel");
  $(element).slick("unslick");

  setTimeout(() => {
    $(element).slick({
      infinite: true,
      dots: false,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      prevArrow: `<button type="button" class="carousel-prev"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.9427 23.0574L11.2187 17.3334H24V14.6667H11.2187L16.9427 8.94271L15.0573 7.05737L6.11465 16L15.0573 24.9427L16.9427 23.0574Z" fill="#00BAE3"/>
      </svg>
      </button>`,
      nextArrow: `<button type="button" class="carousel-next"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.0573 23.0574L16.9427 24.9427L25.8853 16L16.9427 7.05737L15.0573 8.94271L20.7813 14.6667H8V17.3334H20.7813L15.0573 23.0574Z" fill="#00BAE3"/>
      </svg></button>`,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 990,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }, 100);

  setTimeout(() => {
    /** ITEMS */
    $(".servico-content-text").animate({
      height: "hide",
    });

    $(".servico").mouseenter((e) => {
      let parent = $(e.target);
      if (!$(parent).hasClass("servico"))
        parent = $(parent).parents(".servico");

      if ($(parent).hasClass("active")) return;

      if (
        $(parent).find(".servico-content-text").queue() &&
        $(parent).find(".servico-content-text").queue().length > 1
      )
        return;

      $(parent).addClass("active");
      $(parent).find(".servico-content-text").animate({
        height: "show",
      });
    });

    $(".servico").mouseleave((e) => {
      let parent = $(e.target);
      if (!$(parent).hasClass("servico"))
        parent = $(parent).parents(".servico");

      $(parent).removeClass("active");
      $(parent).find(".servico-content-text").animate({
        height: "hide",
      });
    });
  }, 150);
}
