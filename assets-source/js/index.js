import GlobalHeader from "./global-header.js";
GlobalHeader(document, window);

import Forms from "./forms.js";
Forms(document, window);

const initRecaptcha = () => {
  if (grecaptcha) {
    grecaptcha.ready(function() {
      grecaptcha
        .execute("6Lf1SM0UAAAAAD-bKbwCYcFTpI5VhcNEVf3sGLQn", {
          action: "homepage",
        })
        .then(function(token) {
          const formEl = document.querySelector("form");
          if (formEl) {
            const inputEl = document.createElement("input");
            inputEl.setAttribute("type", "hidden");
            inputEl.setAttribute("name", "recaptcha");
            inputEl.setAttribute("value", token);
            formEl.append(inputEl);
          }
        });
    });
  }
};

if (typeof grecaptcha !== "undefined") {
  initRecaptcha();
}
else {
  const recaptchaEl = document.querySelector(".js-recaptcha");
  if (recaptchaEl) {
    recaptchaEl.onload = initRecaptcha;
  }
}
