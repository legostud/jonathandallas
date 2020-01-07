import GlobalHeader from "./global-header.js";
GlobalHeader(document, window);

import Forms from "./forms.js";
Forms(document, window);

const recaptchaEl = document.querySelector(".js-recaptcha");
console.log("loading", recaptchaEl);
if (recaptchaEl) {
  recaptchaEl.onload = () => {
    console.log("loaded recaptcha");
    if (grecaptcha) {
      console.log("gre", grecaptcha);
      grecaptcha.ready(function() {
        console.log("gre ready");
        grecaptcha
          .execute("6LeYf8sUAAAAAJS-lw76lzcr-UoyCB6iqZP9CbJ9", {
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
}
