export default function(document = document, window = window) {
  const el = document.querySelector(".js-global-header");

  if (el === null) {
    return;
  }

  const hamburger = el.querySelector(".js-hamburger-button");
  const headerLinks = el.querySelectorAll(".js-header-link");
  const bpSmall = 620;

  let currentWidth = document.body.scrollWidth;
  let menuBuffer = setTimeout(() => {}, 1);
  let mainBuffer = setTimeout(() => {}, 1);

  resetHeader();
  window.onresize = resetHeader;

  function resetHeader() {
    currentWidth = document.body.scrollWidth;
    closeHeader();
  }

  headerLinks.forEach((link, index) => {
    link.addEventListener("keydown", e => {
      if (currentWidth > bpSmall) {
        return;
      }

      let target = index;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          hamburger.focus();
          closeHeader();
          break;
        case "Up":
        case "ArrowUp":
          e.preventDefault();
          if (index === 0) {
            target = headerLinks.length;
          }
          headerLinks[target - 1].focus();
          break;
        case "Down":
        case "ArrowDown":
          e.preventDefault();
          if (index === headerLinks.length - 1) {
            target = -1;
          }
          headerLinks[target + 1].focus();
          break;
        case "Tab":
          if (e.shiftKey) {
            if (index === 0) {
              e.preventDefault();
              hamburger.focus();
              closeHeader();
            }
          }
          else {
            if (index === headerLinks.length - 1) {
              e.preventDefault();
              closeHeader();
              hamburger.focus();
            }
          }
          break;
        default:
      }
    });
  });

  hamburger.addEventListener("click", e => {
    e.preventDefault();
    el.classList.toggle("is-open");

    if (el.classList.contains("is-open")) {
      clearTimeout(mainBuffer);

      mainBuffer = setTimeout(() => {
        headerLinks[0].focus();
      }, 600);
    }
  });

  function closeHeader() {
    el.classList.remove("is-open");
  }
}
