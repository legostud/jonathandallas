export default function(document = document, window = window) {
  document.querySelectorAll(".js-form").forEach(elForm => {
    const elItems = elForm.querySelectorAll(".js-form-required");
    const url =
      elForm.getAttribute("data-post-url") || elForm.getAttribute("action");

    elForm.addEventListener("submit", e => {
      e.preventDefault();
      elForm
        .querySelectorAll(".js-form-general-error")
        .forEach(el => el.classList.remove("has-error"));
      if (validFields(elItems)) {
        if (elForm.getAttribute("method").toLowerCase() === "get") {
          elForm.submit();
        }
        else {
          elForm.querySelectorAll("button[type=submit]").forEach(el => {
            el.setAttribute("disabled", true);
            el.classList.add("is-loading");
          });
          postFormData(elForm, url);
        }
      }
      else {
        elForm.querySelectorAll(".has-error [aria-required]")[0].focus();
      }
    });

    elItems.forEach(item => {
      const field = item.querySelector("[aria-required]");
      const errorId = item.querySelector("js-form-error-msg")
        ? item.querySelector("js-form-error-msg").id
        : "";

      if (field === null) {
        return;
      }

      if (field.dataset.type === "select") {
        field.addEventListener("change", e => {
          if (validateField(field)) {
            toggleError(true);
          }
          else {
            toggleError(false);
          }
        });
      }
      else {
        field.addEventListener("keyup", e => {
          if (validateField(field)) {
            toggleError(true);
          }
          else {
            toggleError(false);
          }
        });
      }

      function toggleError(valid = true) {
        if (valid) {
          item.classList.remove("has-error");
          field.removeAttribute("aria-describedby");
        }
        else {
          item.classList.add("has-error");
          field.setAttribute("aria-describedby", errorId);
        }
      }
    });
  });

  // functions submit form data to a POST api
  // params
  // - elForm => node object of the form element
  // - urls => url for the api post request
  function postFormData(elForm, url) {
    const params = new FormData(elForm);
    const submitButtons = elForm.querySelectorAll("button[type=submit]");

    fetch(url, {
      body: params,
      credentials: "same-origin",
      method: "post",
    })
      .then(response => response.json())
      .then(data => {
        if (data.IsValid) {
          setTimeout(() => {
            window.location.reload();
          }, 5000);
          elForm.querySelectorAll(".js-form-general-success").forEach(el => {
            el.classList.add("is-visible");
          });
        }
        else {
          elForm.querySelectorAll(".js-form-general-error").forEach(el => {
            el.classList.add("has-error");
          });
        }
        submitButtons.forEach(resetButton);
      })
      .catch(err => {
        console.error(err);
        elForm.querySelectorAll(".js-form-general-error").forEach(el => {
          el.classList.add("has-error");
          el.textContent = "Server Error. Please try again";
        });
        submitButtons.forEach(resetButton);
      });

    function resetButton(button) {
      button.classList.remove("is-loading");
      button.removeAttribute("disabled");
    }
  }

  // takes in a node array of field items
  // returns true or false
  function validFields(items) {
    let valid = true;

    items.forEach(item => {
      const field = item.querySelector("[aria-required]");
      const errorId = item.querySelector("js-form-error-msg")
        ? item.querySelector("js-form-error-msg").id
        : "";

      if (field === null) {
        return;
      }

      if (validateField(field)) {
        item.classList.remove("has-error");
        field.removeAttribute("aria-describedby");
      }
      else {
        item.classList.add("has-error");
        field.setAttribute("aria-describedby", errorId);
        valid = false;
      }
    });

    return valid;
  }

  // takes in a field items
  // returns true or false
  // adds error class to invalid fields
  function validateField(field) {
    let valid = true;

    switch (field.dataset.type) {
      case "email":
        valid = !!field.value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i);
        break;
      case "password":
        const re = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*[\s]).*$/;
        // more than eight characters
        // contains digits
        // contains lower case alpha
        // contains upper case alpha
        // contains special characters
        // does not contain white space
        if (re.test(field.value)) {
          valid = true;
        }
        else {
          valid = false;
        }
        break;
      case "select":
      case "text":
      default:
        if (field.value.trim().length === 0) {
          valid = false;
        }
    }

    return valid;
  }
}
