let products = document.getElementById("products").children;

let pos = 1;

function updateCarrossel() {
  let circles = document.getElementById("slide-counter").children;
  for (let i = 0; i < circles.length; i++) {
    circles[i].classList.remove("full");
    if (pos == i) {
      circles[i].classList.add("full");
    }
  }

  for (let i = 0; i < products.length; i++) {
    if (pos + 1 != i) products[i].classList.remove("closed-right");
    if (pos - 1 != i) products[i].classList.remove("closed-left");

    if (i < pos && pos - 1 != i) products[i].classList.add("hidden-left");
    if (i > pos && pos + 1 != i) products[i].classList.add("hidden-right");

    products[i].classList.add("closed");

    if (pos == i) {
      products[i].classList.remove("closed");
      products[i].classList.remove("hidden-left", "Hidden-right");


      if (pos > 0) {
        products[i - 1].classList.remove("hidden-left");
        products[i - 1].classList.add("closed", "closed-left");
        
      }

      if (pos < products.length - 1) {
        products[i + 1].classList.remove("hidden-right");
        products[i + 1].classList.add("closed", "closed-right");
      }
    }
  }
}

document.getElementById("slide-left").addEventListener("click", () => {
  pos--;
  if (pos < 0) {
    pos = 0;
    return;
  }

  updateCarrossel();
});

document.getElementById("slide-right").addEventListener("click", () => {
  pos++;
  if (pos == products.length) {
    pos = products.length - 1;
    return;
  }

  updateCarrossel();
});
