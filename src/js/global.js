$(document).ready(() => {
  loadProjects();
  loadTechnologies();
  loadAnimations();
  loadHeader();
});

/**LOADING FUNCTION */
function loadTechnologies() {
  $.each($(".skill"), (key, element) => {
    $(element)
      .addClass("animated")
      .attr("data-animation", "fadeInUp")
      .attr("data-delay", `${key * 200 + 1000}`);
  });
}

function loadProjects() {
  $.each($(".project"), (key, element) => {
    const color = $(element).attr("data-color");

    $(element)
      .children(".project-color")
      .css({ backgroundColor: color || "#000000" });

    $(element)
      .addClass("animated")
      .attr("data-animation", "fadeInUp")
      .attr("data-delay", `${key * 250 + 1000}`);
  });
}

function loadHeader() {
  $(".mobile-menu-trigger").click((e) => {
    $("#main-header").toggleClass("hide");
    $("#mobile-navigation").toggleClass("show");
  });
}

/** ANIMATION */
$.fn.PVAnimate = function () {
  let animation = $(this).attr("data-animation");
  let delay = $(this).attr("data-delay");

  if (!animation) return;

  setTimeout(() => {
    $(this).removeClass("animated").addClass(animation);
  }, parseInt(delay));
};

function loadAnimations() {
  /** LETTERS SLIDE IN */
  $.each(
    $(".animated").filter(`[data-animation=letters-slide-in]`),
    (key, element) => {
      const text = $(element).attr("data-value");
      const parentDelay = parseInt($(element).attr("data-delay")) || 0;

      for (let i = 0; i < text.length; i++) {
        $(element).append(
          `<span data-letter-count="${i}" data-delay="${
            (i + 1) * 100 + parentDelay
          }" class="animated" data-animation="letter-slide-in">${
            text[i] == " " ? "&nbsp" : text[i]
          }</span>`
        );
      }
    }
  );

  function checkAnimation() {
    const elements = $(".animated");

    if (!elements.length) return;

    $(elements).each(function (key, element) {
      let topOfElement = $(element).offset().top;
      let bottomOfElement = $(element).offset().top + $(element).outerHeight();
      let bottomOfScreen = $(window).scrollTop() + $(window).innerHeight();
      let topOfScreen = $(window).scrollTop();

      if(topOfScreen > bottomOfElement){
        $(element).attr("data-delay",0).PVAnimate()
        return
      }

      if (bottomOfScreen > topOfElement && topOfScreen < bottomOfElement) {
        $(element).PVAnimate();
      }
    });
  }

  checkAnimation();
  $(window).scroll(checkAnimation);
}
